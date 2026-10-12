(function () {
  'use strict';

  const TOTAL_FRAMES = 300;
  const CONCURRENT_DOWNLOADS = 8;
  const LERP_FACTOR = 0.12;

  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d', { alpha: false });
  const progressBar = document.getElementById('progress-bar');

  const images = new Array(TOTAL_FRAMES);
  // Status: 0 = unrequested, 1 = fetching, 2 = loaded, 3 = failed
  const frameStatus = new Uint8Array(TOTAL_FRAMES);

  let loadedCount = 0;
  let targetFrame = 0;
  let currentFrame = 0;
  let lastDrawnIndex = -1;
  let activeWorkers = 0;

  function getFrameUrl(index) {
    const frameNum = String(index + 1).padStart(4, '0');
    return `frames/frame_${frameNum}.jpg`;
  }

  // High-DPI responsive canvas sizing
  function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);

    // Force redraw of current frame
    if (lastDrawnIndex >= 0) {
      drawFrame(lastDrawnIndex, true);
    } else {
      drawFrame(0, true);
    }
  }

  // Cover-fit image drawing onto canvas
  function drawImageCover(img) {
    if (!img || !img.complete || img.naturalWidth === 0) return;

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

  // Find nearest loaded frame if current target is not yet loaded
  function getClosestLoadedImage(index) {
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

  function drawFrame(index, force = false) {
    index = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(index)));
    if (index === lastDrawnIndex && !force) return;

    const img = getClosestLoadedImage(index);
    if (img) {
      drawImageCover(img);
      lastDrawnIndex = index;
    }
  }

  // Update target frame from scroll position
  function updateScrollProgress() {
    const docElem = document.documentElement;
    const docBody = document.body;
    const scrollY = window.pageYOffset || window.scrollY || docElem.scrollTop || (docBody ? docBody.scrollTop : 0) || 0;
    const maxScroll = Math.max(docElem.scrollHeight, docBody ? docBody.scrollHeight : 0, 5000) - window.innerHeight;
    const progress = maxScroll > 0 ? Math.max(0, Math.min(1, scrollY / maxScroll)) : 0;
    targetFrame = progress * (TOTAL_FRAMES - 1);
    pumpLoader();
  }

  // Smooth inertial animation loop
  function rafLoop() {
    const delta = targetFrame - currentFrame;
    if (Math.abs(delta) > 0.0001) {
      currentFrame += delta * LERP_FACTOR;
      const frameIdx = Math.round(currentFrame);
      drawFrame(frameIdx);
    }

    requestAnimationFrame(rafLoop);
  }

  // Intelligent priority-based frame loader
  function getNextIndexToLoad() {
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
    while (activeWorkers < CONCURRENT_DOWNLOADS) {
      const nextIndex = getNextIndexToLoad();
      if (nextIndex === -1) break;

      activeWorkers++;
      loadFrame(nextIndex);
    }
  }

  function loadFrame(index) {
    if (frameStatus[index] !== 0) return;
    frameStatus[index] = 1; // fetching
    const img = new Image();
    images[index] = img;

    let finished = false;
    const onComplete = (success) => {
      if (finished) return;
      finished = true;
      frameStatus[index] = success ? 2 : 3;
      loadedCount++;
      activeWorkers--;

      // Update progress bar
      if (progressBar) {
        const percent = Math.min(100, Math.round((loadedCount / TOTAL_FRAMES) * 100));
        progressBar.style.width = percent + '%';
        if (loadedCount >= TOTAL_FRAMES) {
          progressBar.classList.add('done');
          setTimeout(() => {
            if (progressBar && progressBar.parentNode) {
              progressBar.parentNode.removeChild(progressBar);
            }
          }, 800);
        }
      }

      // If the newly loaded frame is closer to the current frame than what's currently drawn, upgrade display
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

  // Initialize
  window.addEventListener('resize', resizeCanvas, { passive: true });
  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  document.addEventListener('scroll', updateScrollProgress, { passive: true });

  // Initial setup
  resizeCanvas();
  updateScrollProgress();
  currentFrame = targetFrame;

  // Immediate priority: load frame 0 first so screen is never blank
  frameStatus[0] = 1;
  const firstFrame = new Image();
  images[0] = firstFrame;
  let firstDone = false;
  const onFirstDone = (success) => {
    if (firstDone) return;
    firstDone = true;
    frameStatus[0] = success ? 2 : 3;
    loadedCount++;
    drawFrame(0, true);
    // Start loader workers for all remaining frames
    pumpLoader();
  };
  firstFrame.onload = () => onFirstDone(true);
  firstFrame.onerror = () => onFirstDone(false);
  firstFrame.src = getFrameUrl(0);
  if (firstFrame.complete && firstFrame.naturalWidth > 0) {
    onFirstDone(true);
  }

  // Start RAF render loop
  requestAnimationFrame(rafLoop);
})();
