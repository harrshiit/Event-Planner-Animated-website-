import React, { useEffect, useRef, useState } from 'react';

const TOTAL_FRAMES = 300;
const CONCURRENT_DOWNLOADS = 8;
const LERP_FACTOR = 0.12;

const FRAME_VERSION = Date.now();

function getFrameUrl(index: number): string {
  const frameNum = String(index + 1).padStart(4, '0');
  return `/frames/frame_${frameNum}.jpg?v=${FRAME_VERSION}`;
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

    const images: (HTMLImageElement | null)[] = new Array(TOTAL_FRAMES).fill(null);
    // 0 = unrequested, 1 = fetching, 2 = loaded, 3 = failed
    const frameStatus = new Uint8Array(TOTAL_FRAMES);

    let loadedCount = 0;
    let targetFrame = 0;
    let currentFrame = 0;
    let lastDrawnIndex = -1;
    let activeWorkers = 0;
    let rafId: number | null = null;
    let isDisposed = false;

    function resizeCanvas() {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
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
      ctx.imageSmoothingQuality = 'high';
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
      targetFrame = progress * (TOTAL_FRAMES - 1);
      pumpLoader();
    }

    function rafLoop() {
      if (isDisposed) return;
      const delta = targetFrame - currentFrame;
      if (Math.abs(delta) > 0.0001) {
        currentFrame += delta * LERP_FACTOR;
        const frameIdx = Math.round(currentFrame);
        drawFrame(frameIdx);
      }
      rafId = requestAnimationFrame(rafLoop);
    }

    function getNextIndexToLoad(): number {
      const currentTarget = Math.round(targetFrame);
      let bestIndex = -1;
      let minDistance = Infinity;

      for (let i = 0; i < TOTAL_FRAMES; i++) {
        if (frameStatus[i] === 0) {
          const dist = Math.abs(i - currentTarget);
          if (dist < minDistance) {
            minDistance = dist;
            bestIndex = i;
          }
        }
      }
      return bestIndex;
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
        loadedCount++;
        activeWorkers--;

        if (progressBarRef.current) {
          const percent = Math.min(100, Math.round((loadedCount / TOTAL_FRAMES) * 100));
          progressBarRef.current.style.width = `${percent}%`;
          if (loadedCount >= TOTAL_FRAMES) {
            setIsLoaded(true);
          }
        }

        if (success) {
          const curIdx = Math.round(currentFrame);
          if (lastDrawnIndex < 0 || Math.abs(index - curIdx) < Math.abs(lastDrawnIndex - curIdx)) {
            drawFrame(curIdx, true);
          }
        }

        pumpLoader();
      };

      img.onload = () => onComplete(true);
      img.onerror = () => onComplete(false);
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
    updateScrollProgress();
    currentFrame = targetFrame;

    // Load first frame immediately
    frameStatus[0] = 1;
    const firstFrame = new Image();
    images[0] = firstFrame;
    let firstDone = false;
    const onFirstDone = (success: boolean) => {
      if (firstDone || isDisposed) return;
      firstDone = true;
      frameStatus[0] = success ? 2 : 3;
      loadedCount++;
      drawFrame(0, true);
      pumpLoader();
    };
    firstFrame.onload = () => onFirstDone(true);
    firstFrame.onerror = () => onFirstDone(false);
    firstFrame.src = getFrameUrl(0);
    if (firstFrame.complete && firstFrame.naturalWidth > 0) {
      onFirstDone(true);
    }

    // Start RAF
    rafId = requestAnimationFrame(rafLoop);

    return () => {
      isDisposed = true;
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', updateScrollProgress);
      document.removeEventListener('scroll', updateScrollProgress);
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
