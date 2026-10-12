import React, { useEffect, useRef, useState } from 'react';

const TOTAL_FRAMES = 300;
const LERP_FACTOR = 0.12;

function getFrameUrl(index: number): string {
  const frameNum = String(index + 1).padStart(4, '0');
  return `/frames/frame_${frameNum}.jpg`;
}

export const ScrollBackgroundCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Device-adaptive parameters
    const isMobile = window.innerWidth < 768;
    const CONCURRENT_DOWNLOADS = isMobile ? 2 : 4;
    const WINDOW_AHEAD = isMobile ? 12 : 20;
    const WINDOW_BEHIND = isMobile ? 4 : 8;
    const MAX_IN_MEMORY = isMobile ? 36 : 75;
    const ANCHOR_STEP = isMobile ? 25 : 15;

    const images: (HTMLImageElement | null)[] = new Array(TOTAL_FRAMES).fill(null);
    // 0 = unrequested, 1 = fetching, 2 = loaded in RAM, 3 = failed
    const frameStatus = new Uint8Array(TOTAL_FRAMES);

    let loadedCount = 0;
    let targetFrame = 0;
    let currentFrame = 0;
    let lastTargetFrame = 0;
    let lastDrawnIndex = -1;
    let activeWorkers = 0;
    let rafId: number | null = null;
    let isDisposed = false;

    function resizeCanvas() {
      if (!canvas) return;
      const maxDpr = isMobile ? 1.5 : 2;
      const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      if (lastDrawnIndex >= 0) {
        drawFrame(lastDrawnIndex, true);
      } else {
        drawFrame(0, true);
      }
    }

    function drawImageCover(img: HTMLImageElement) {
      if (!canvas || !ctx || !img || !img.complete || img.naturalWidth === 0) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      const scale = Math.max(cw / iw, ch / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      const dx = (cw - dw) * 0.5;
      const dy = (ch - dh) * 0.5;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = isMobile ? 'medium' : 'high';
      ctx.drawImage(img, dx, dy, dw, dh);
    }

    function getClosestLoadedImage(index: number): HTMLImageElement | null {
      if (frameStatus[index] === 2 && images[index]) {
        return images[index];
      }

      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        const left = index - offset;
        const right = index + offset;
        if (left >= 0 && frameStatus[left] === 2 && images[left]) {
          return images[left];
        }
        if (right < TOTAL_FRAMES && frameStatus[right] === 2 && images[right]) {
          return images[right];
        }
      }
      return null;
    }

    function drawFrame(index: number, force = false) {
      index = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(index)));
      if (index === lastDrawnIndex && !force) return;

      const img = getClosestLoadedImage(index);
      if (img) {
        drawImageCover(img);
        lastDrawnIndex = index;
      }
    }

    function updateScrollProgress() {
      const docElem = document.documentElement;
      const docBody = document.body;
      const scrollY = window.pageYOffset || window.scrollY || docElem.scrollTop || (docBody ? docBody.scrollTop : 0) || 0;
      const maxScroll = Math.max(
        docElem.scrollHeight - window.innerHeight,
        (docBody ? docBody.scrollHeight : 0) - window.innerHeight,
        1
      );
      const progress = maxScroll > 0 ? Math.max(0, Math.min(1, scrollY / maxScroll)) : 0;
      lastTargetFrame = targetFrame;
      targetFrame = progress * (TOTAL_FRAMES - 1);
      pumpLoader();
    }

    function rafLoop() {
      if (isDisposed) return;
      const delta = targetFrame - currentFrame;
      if (Math.abs(delta) > 0.0001) {
        currentFrame += delta * LERP_FACTOR;
        const frameIdx = Math.round(currentFrame);
        if (frameIdx !== lastDrawnIndex) {
          drawFrame(frameIdx);
        }
      }
      rafId = requestAnimationFrame(rafLoop);
    }

    // Free distant in-memory images to keep mobile RAM usage bounded
    function evictDistantFrames(center: number) {
      let count = 0;
      for (let i = 0; i < TOTAL_FRAMES; i++) {
        if (frameStatus[i] === 2) count++;
      }
      if (count <= MAX_IN_MEMORY) return;

      const safeDistance = WINDOW_AHEAD + 12;
      for (let i = 0; i < TOTAL_FRAMES; i++) {
        // Never evict frame 0 (fallback)
        if (i === 0) continue;
        if (frameStatus[i] === 2 && Math.abs(i - center) > safeDistance) {
          images[i] = null;
          frameStatus[i] = 0;
          count--;
          if (count <= MAX_IN_MEMORY) break;
        }
      }
    }

    // Windowed, priority-based loader that only downloads frames near the active scroll position
    function getNextIndexToLoad(): number {
      const currentTarget = Math.round(targetFrame);
      const isScrollingDown = targetFrame >= lastTargetFrame;

      const windowStart = Math.max(0, currentTarget - WINDOW_BEHIND);
      const windowEnd = Math.min(TOTAL_FRAMES - 1, currentTarget + WINDOW_AHEAD);

      // 1. Prioritize immediate target frame first
      if (frameStatus[currentTarget] === 0) {
        return currentTarget;
      }

      // 2. Prioritize forward direction within active window
      if (isScrollingDown) {
        for (let i = currentTarget + 1; i <= windowEnd; i++) {
          if (frameStatus[i] === 0) return i;
        }
        for (let i = currentTarget - 1; i >= windowStart; i--) {
          if (frameStatus[i] === 0) return i;
        }
      } else {
        for (let i = currentTarget - 1; i >= windowStart; i--) {
          if (frameStatus[i] === 0) return i;
        }
        for (let i = currentTarget + 1; i <= windowEnd; i++) {
          if (frameStatus[i] === 0) return i;
        }
      }

      // 3. Opportunistically prefetch nearby sparse anchor frames
      for (let step = 1; step <= 3; step++) {
        const anchorForward = Math.min(TOTAL_FRAMES - 1, Math.round(currentTarget / ANCHOR_STEP + step) * ANCHOR_STEP);
        if (frameStatus[anchorForward] === 0) return anchorForward;

        const anchorBack = Math.max(0, Math.round(currentTarget / ANCHOR_STEP - step) * ANCHOR_STEP);
        if (frameStatus[anchorBack] === 0) return anchorBack;
      }

      // Outside the active scroll region? Do not download.
      return -1;
    }

    function pumpLoader() {
      if (isDisposed) return;
      while (activeWorkers < CONCURRENT_DOWNLOADS) {
        const nextIndex = getNextIndexToLoad();
        if (nextIndex === -1) break;

        activeWorkers++;
        loadFrame(nextIndex);
      }
    }

    function loadFrame(index: number) {
      if (frameStatus[index] !== 0) return;
      frameStatus[index] = 1;
      const img = new Image();
      images[index] = img;

      let finished = false;
      const onComplete = (success: boolean) => {
        if (finished || isDisposed) return;
        finished = true;
        frameStatus[index] = success ? 2 : 3;
        activeWorkers--;

        if (success) {
          loadedCount++;
          const curIdx = Math.round(currentFrame);
          if (lastDrawnIndex < 0 || Math.abs(index - curIdx) < Math.abs(lastDrawnIndex - curIdx)) {
            drawFrame(curIdx, true);
          }

          evictDistantFrames(Math.round(targetFrame));
        }

        pumpLoader();
      };

      img.onload = () => onComplete(true);
      img.onerror = () => onComplete(false);
      img.decoding = 'async';
      img.src = getFrameUrl(index);

      if (img.complete && img.naturalWidth > 0) {
        onComplete(true);
      }
    }

    // Set up listeners
    window.addEventListener('resize', resizeCanvas, { passive: true });
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    document.addEventListener('scroll', updateScrollProgress, { passive: true });

    // Initial canvas setup
    resizeCanvas();
    const docElem = document.documentElement;
    const docBody = document.body;
    const scrollY = window.pageYOffset || window.scrollY || docElem.scrollTop || (docBody ? docBody.scrollTop : 0) || 0;
    const maxScroll = Math.max(
      docElem.scrollHeight - window.innerHeight,
      (docBody ? docBody.scrollHeight : 0) - window.innerHeight,
      1
    );
    const initialProgress = maxScroll > 0 ? Math.max(0, Math.min(1, scrollY / maxScroll)) : 0;
    targetFrame = initialProgress * (TOTAL_FRAMES - 1);
    currentFrame = targetFrame;
    const startIdx = Math.round(targetFrame);

    // Load initial visible frame immediately for instant background paint
    frameStatus[startIdx] = 1;
    const firstFrame = new Image();
    images[startIdx] = firstFrame;
    let firstDone = false;
    const onFirstDone = (success: boolean) => {
      if (firstDone || isDisposed) return;
      firstDone = true;
      frameStatus[startIdx] = success ? 2 : 3;
      loadedCount++;
      drawFrame(startIdx, true);
      setIsLoaded(true);
      if (progressBarRef.current) {
        progressBarRef.current.style.width = '100%';
      }
    };
    firstFrame.onload = () => onFirstDone(true);
    firstFrame.onerror = () => onFirstDone(false);
    firstFrame.decoding = 'async';
    firstFrame.src = getFrameUrl(startIdx);
    if (firstFrame.complete && firstFrame.naturalWidth > 0) {
      onFirstDone(true);
    }

    // Trigger forward frame preloading on user scroll or touch interaction
    const onUserInteraction = () => {
      pumpLoader();
    };
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    document.addEventListener('scroll', updateScrollProgress, { passive: true });
    window.addEventListener('touchstart', onUserInteraction, { passive: true, once: true });
    window.addEventListener('wheel', onUserInteraction, { passive: true, once: true });

    // Fallback: fade out progress bar within 300ms
    const readyTimer = setTimeout(() => {
      setIsLoaded(true);
      if (progressBarRef.current) {
        progressBarRef.current.style.width = '100%';
      }
    }, 300);

    // Start RAF
    rafId = requestAnimationFrame(rafLoop);

    return () => {
      isDisposed = true;
      clearTimeout(readyTimer);
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', updateScrollProgress);
      document.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('touchstart', onUserInteraction);
      window.removeEventListener('wheel', onUserInteraction);
    };
  }, []);

  return (
    <>
      {/* Top Preloading Progress Indicator */}
      <div
        ref={progressBarRef}
        className={`fixed top-0 left-0 h-[2.5px] z-[9999] pointer-events-none transition-opacity duration-700 bg-gradient-to-r from-[#D4AF72] via-[#F4E8D3] to-white shadow-[0_0_10px_rgba(212,175,114,0.7)] ${
          isLoaded ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ width: '0%' }}
      />

      {/* Fixed Full-Viewport Canvas Background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-screen h-screen object-cover pointer-events-none z-0 bg-[#050505]"
      />

      {/* Subtle Ambient Contrast Scrim allowing full background visibility */}
      <div
        className="fixed inset-0 pointer-events-none z-[1] bg-black/10"
        aria-hidden="true"
      />
    </>
  );
};
