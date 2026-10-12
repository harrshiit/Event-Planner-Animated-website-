import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { GalleryItem } from '../data/galleryData';
import { getServiceWhatsAppUrl } from '../data/companyConfig';
import {
  X,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Info,
  Sparkles,
  Film,
  Image as ImageIcon,
} from 'lucide-react';

interface GalleryLightboxProps {
  item: GalleryItem | null;
  items: GalleryItem[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export const GalleryLightbox: React.FC<GalleryLightboxProps> = ({
  item,
  currentIndex,
  items,
  onClose,
  onPrev,
  onNext,
}) => {
  const [mounted, setMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const triggerElementRef = useRef<HTMLElement | null>(null);

  // Scroll lock refs
  const scrollYRef = useRef(0);
  const prevOverflowRef = useRef('');
  const prevPositionRef = useRef('');
  const prevTopRef = useRef('');
  const prevWidthRef = useRef('');
  const wasAlreadyLockedRef = useRef(false);

  // Browser history refs to prevent duplicate entries or back-button loops
  const hasPushedHistoryRef = useRef(false);
  const closedByPopstateRef = useRef(false);
  const isProgrammaticBackRef = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Safe close handler that stops playback and cleans up history cleanly
  const handleClose = () => {
    // 1. Immediately pause and reset video playback
    if (videoRef.current) {
      try {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      } catch {
        // ignore video pause errors
      }
    }

    // 2. Clean up browser history if we pushed an entry and this wasn't triggered by popstate
    if (hasPushedHistoryRef.current && !closedByPopstateRef.current) {
      isProgrammaticBackRef.current = true;
      hasPushedHistoryRef.current = false;
      try {
        window.history.back();
      } catch {
        // ignore history back errors
      }
    }

    // 3. Close the modal
    onClose();
  };

  // Browser history integration: Exactly ONE entry on open, replaceState on item switch
  useEffect(() => {
    if (!item) return;

    if (!hasPushedHistoryRef.current) {
      // First time opening the lightbox: push exactly one entry
      hasPushedHistoryRef.current = true;
      closedByPopstateRef.current = false;
      isProgrammaticBackRef.current = false;
      try {
        window.history.pushState(
          { ...window.history.state, sgLightboxOpen: true, sgLightboxItem: item.id },
          '',
          window.location.href
        );
      } catch {
        // ignore pushState errors in sandboxed environments
      }
    } else {
      // Switching between photos/videos: MUST NOT create repeated history entries!
      // Use replaceState so user can press Back once to exit
      try {
        window.history.replaceState(
          { ...window.history.state, sgLightboxOpen: true, sgLightboxItem: item.id },
          '',
          window.location.href
        );
      } catch {
        // ignore replaceState errors
      }
    }
  }, [item?.id]);

  // Listen for browser Back/Forward (popstate)
  useEffect(() => {
    if (!item) return;

    const handlePopState = (e: PopStateEvent) => {
      // If we initiated history.back() programmatically on X/Escape close, consume and reset
      if (isProgrammaticBackRef.current) {
        isProgrammaticBackRef.current = false;
        hasPushedHistoryRef.current = false;
        return;
      }

      // If user pressed browser/hardware Back button:
      // State no longer has sgLightboxOpen
      if (!e.state || !e.state.sgLightboxOpen) {
        closedByPopstateRef.current = true;
        hasPushedHistoryRef.current = false;
        if (videoRef.current) {
          try {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
          } catch {
            // ignore
          }
        }
        onClose();
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [item, onClose]);

  // Cleanup on unmount if component is closed externally without X or Back
  useEffect(() => {
    return () => {
      if (hasPushedHistoryRef.current && !closedByPopstateRef.current) {
        hasPushedHistoryRef.current = false;
        isProgrammaticBackRef.current = true;
        try {
          window.history.back();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  // Stop video playback when item changes
  useEffect(() => {
    return () => {
      if (videoRef.current) {
        try {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        } catch {
          // ignore
        }
      }
    };
  }, [item?.id]);

  // Lock background scroll and preserve exact page scroll position
  useEffect(() => {
    if (!item) return;

    if (document.body.style.position === 'fixed') {
      wasAlreadyLockedRef.current = true;
      return;
    }

    wasAlreadyLockedRef.current = false;
    scrollYRef.current =
      window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
    prevOverflowRef.current = document.body.style.overflow;
    prevPositionRef.current = document.body.style.position;
    prevTopRef.current = document.body.style.top;
    prevWidthRef.current = document.body.style.width;

    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollYRef.current}px`;
    document.body.style.width = '100%';

    return () => {
      if (wasAlreadyLockedRef.current) return;
      document.body.style.overflow = prevOverflowRef.current;
      document.body.style.position = prevPositionRef.current;
      document.body.style.top = prevTopRef.current;
      document.body.style.width = prevWidthRef.current;
      window.scrollTo(0, scrollYRef.current);
    };
  }, [Boolean(item)]);

  // Trap focus & restore focus on close
  useEffect(() => {
    if (!item) return;

    triggerElementRef.current = document.activeElement as HTMLElement | null;

    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    return () => {
      clearTimeout(timer);
      if (triggerElementRef.current && typeof triggerElementRef.current.focus === 'function') {
        try {
          triggerElementRef.current.focus();
        } catch {
          // ignore
        }
      }
    };
  }, [Boolean(item)]);

  // Keyboard navigation & Focus trap
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      handleClose();
      return;
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      onPrev();
      return;
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      onNext();
      return;
    }
    if (e.key === 'Tab') {
      if (!dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]), video[controls]'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  };

  if (!item || !mounted) return null;

  const whatsappUrl = getServiceWhatsAppUrl(item.title);

  const content = (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title} - Media Viewer`}
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      className="fixed inset-0 z-[99999] overflow-y-auto overflow-x-hidden bg-black/95 select-none animate-fadeIn flex flex-col items-center justify-start sm:justify-center p-3 sm:p-6"
      style={{
        paddingTop: 'max(16px, env(safe-area-inset-top, 16px))',
        paddingBottom: 'max(16px, env(safe-area-inset-bottom, 16px))',
        paddingLeft: 'max(12px, env(safe-area-inset-left, 12px))',
        paddingRight: 'max(12px, env(safe-area-inset-right, 12px))',
      }}
      onClick={handleClose}
    >
      {/* 1. Dedicated High-Contrast Close Button with 44x44px Touch Target & Safe-Area Spacing */}
      <button
        ref={closeButtonRef}
        onClick={(e) => {
          e.stopPropagation();
          handleClose();
        }}
        type="button"
        className="fixed z-[100000] min-w-[44px] min-h-[44px] w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-black/95 hover:bg-[#D4AF72] text-white hover:text-[#063B33] border-2 border-[#D4AF72] hover:border-white shadow-[0_4px_25px_rgba(0,0,0,0.9)] transition-all duration-200 transform hover:scale-105 active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#D4AF72]/60"
        style={{
          top: 'max(12px, env(safe-area-inset-top, 12px))',
          right: 'max(12px, env(safe-area-inset-right, 12px))',
        }}
        aria-label="Close viewer (Escape)"
        title="Close (Esc)"
      >
        <X className="w-6 h-6 stroke-[2.5]" />
      </button>

      {/* 2. Top-Left Category & Counter Info Pill (Safely separated from close button) */}
      <div
        className="fixed z-[99999] max-w-[calc(100vw-80px)] flex items-center gap-2 sm:gap-3 bg-black/90 backdrop-blur-md px-3.5 py-1.5 sm:py-2 rounded-full border border-[#D4AF72]/40 shadow-xl pointer-events-auto"
        style={{
          top: 'max(12px, env(safe-area-inset-top, 12px))',
          left: 'max(12px, env(safe-area-inset-left, 12px))',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <span className="text-[11px] sm:text-xs uppercase tracking-widest text-[#D4AF72] font-bold truncate">
          {item.categoryLabel || item.category}
        </span>
        <span className="text-white/40">·</span>
        <span className="text-[11px] sm:text-xs text-white/90 font-semibold whitespace-nowrap">
          {currentIndex + 1} of {items.length}
        </span>
        {item.mediaType === 'video' ? (
          <span className="hidden sm:inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-[#D4AF72] bg-[#075546]/90 px-2 py-0.5 rounded-full border border-[#D4AF72]/30">
            <Film className="w-3 h-3" /> Video Reel
          </span>
        ) : (
          <span className="hidden sm:inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-white/90 bg-white/15 px-2 py-0.5 rounded-full">
            <ImageIcon className="w-3 h-3" /> Photo
          </span>
        )}
      </div>

      {/* 3. Navigation Controls (Flanking media at mid-height, well clear of bottom video controls) */}
      {items.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            type="button"
            className="fixed left-2 sm:left-6 top-1/2 -translate-y-1/2 z-[99999] min-w-[44px] min-h-[44px] w-11 h-11 sm:w-13 sm:h-13 flex items-center justify-center rounded-full bg-black/90 hover:bg-[#D4AF72] text-white hover:text-[#063B33] border-2 border-[#D4AF72]/70 hover:border-white shadow-[0_4px_25px_rgba(0,0,0,0.85)] transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#D4AF72]/60"
            aria-label="Previous item (Left Arrow)"
            title="Previous (Left Arrow)"
          >
            <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            type="button"
            className="fixed right-2 sm:right-6 top-1/2 -translate-y-1/2 z-[99999] min-w-[44px] min-h-[44px] w-11 h-11 sm:w-13 sm:h-13 flex items-center justify-center rounded-full bg-black/90 hover:bg-[#D4AF72] text-white hover:text-[#063B33] border-2 border-[#D4AF72]/70 hover:border-white shadow-[0_4px_25px_rgba(0,0,0,0.85)] transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#D4AF72]/60"
            aria-label="Next item (Right Arrow)"
            title="Next (Right Arrow)"
          >
            <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
          </button>
        </>
      )}

      {/* 4. Media Content Wrapper (Fitted to viewport with room for captions and controls) */}
      <div
        className="relative max-w-5xl w-full flex flex-col items-center justify-center z-[99998] my-auto pt-16 sm:pt-14 pb-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Media Frame with constrained viewport height */}
        <div className="relative w-full max-w-4xl max-h-[min(65vh,calc(100vh-230px))] flex items-center justify-center rounded-2xl overflow-hidden bg-black/95 shadow-2xl border border-[#D4AF72]/40 shrink-0">
          {item.mediaType === 'video' ? (
            <video
              ref={videoRef}
              key={item.src}
              src={item.src}
              controls
              autoPlay
              playsInline
              preload="metadata"
              className="max-h-[min(65vh,calc(100vh-230px))] max-w-full w-auto h-auto object-contain focus:outline-none bg-black rounded-2xl"
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              src={item.src}
              alt={item.alt}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="max-h-[min(65vh,calc(100vh-230px))] max-w-full w-auto h-auto object-contain rounded-2xl shadow-2xl select-none"
            />
          )}
        </div>

        {/* 5. Caption & Metadata Bar */}
        <div className="mt-4 text-center max-w-2xl px-4 space-y-2.5">
          <h4 className="font-editorial text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-wide text-shadow-heading">
            {item.title}
          </h4>

          <p className="text-xs sm:text-sm text-gray-200 font-normal leading-relaxed text-shadow-contrast">
            {item.caption}
          </p>

          {/* Stock Reference Notice vs Official Portfolio Badge */}
          {item.isStockPhoto ? (
            <div className="inline-flex items-center gap-1.5 text-[11px] text-[#D4AF72] bg-black/80 px-3.5 py-1 rounded-full border border-[#D4AF72]/40 shadow-md">
              <Info className="w-3.5 h-3.5 text-[#D4AF72] shrink-0" />
              <span>Conceptual Styling Reference (Stock Photography — See stock-image-sources.txt)</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 text-[11px] text-[#D4AF72] bg-[#075546]/80 px-3.5 py-1 rounded-full border border-[#D4AF72]/40 shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF72] shrink-0" />
              <span>Official SG Event Planner Event Portfolio</span>
            </div>
          )}

          {/* WhatsApp Enquiry CTA */}
          <div className="pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#063B33] bg-gradient-to-r from-[#F4E8D3] via-[#D4AF72] to-[#C49B58] hover:from-white hover:to-[#D4AF72] shadow-xl hover:shadow-2xl transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <MessageCircle className="w-4 h-4 fill-[#063B33]/20" />
              <span>Enquire About This Setup on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
};
