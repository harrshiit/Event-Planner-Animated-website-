import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  GalleryItem,
  GALLERY_CATEGORIES,
  getItemsByCategory,
  getCategoryMediaCounts,
  normalizeCategoryKey,
} from '../data/galleryData';
import { GalleryLightbox } from './GalleryLightbox';
import { getServiceWhatsAppUrl } from '../data/companyConfig';
import {
  X,
  ArrowLeft,
  Play,
  Image as ImageIcon,
  Film,
  Sparkles,
  MessageCircle,
  ExternalLink,
  Layers,
} from 'lucide-react';

interface CategoryGalleryModalProps {
  isOpen: boolean;
  categoryKey: string;
  onClose: () => void;
  onSelectCategory: (categoryKey: string) => void;
}

export const CategoryGalleryModal: React.FC<CategoryGalleryModalProps> = ({
  isOpen,
  categoryKey,
  onClose,
  onSelectCategory,
}) => {
  const [mounted, setMounted] = useState(false);
  const [activeType, setActiveType] = useState<'all' | 'image' | 'video'>('all');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const triggerElementRef = useRef<HTMLElement | null>(null);
  const lightboxItemRef = useRef<GalleryItem | null>(null);
  lightboxItemRef.current = lightboxItem;

  // Scroll lock refs
  const scrollYRef = useRef(0);
  const prevOverflowRef = useRef('');
  const prevPositionRef = useRef('');
  const prevTopRef = useRef('');
  const prevWidthRef = useRef('');

  // Browser history refs to prevent duplicate entries or back-button loops
  const hasPushedHistoryRef = useRef(false);
  const closedByPopstateRef = useRef(false);
  const isProgrammaticBackRef = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const normalizedKey = normalizeCategoryKey(categoryKey);
  const categoryMeta =
    GALLERY_CATEGORIES.find((c) => c.key === normalizedKey) || GALLERY_CATEGORIES[1]; // default Weddings

  // Fetch all items for this category
  const categoryItems = getItemsByCategory(normalizedKey);

  // Filter by media type if selected
  const displayItems =
    activeType === 'all'
      ? categoryItems
      : categoryItems.filter((item) => item.mediaType === activeType);

  const counts = getCategoryMediaCounts(normalizedKey);

  // Lightbox navigation helpers
  const currentLightboxIndex = lightboxItem
    ? displayItems.findIndex((item) => item.id === lightboxItem.id)
    : -1;

  const handlePrevLightbox = () => {
    if (currentLightboxIndex > 0) {
      setLightboxItem(displayItems[currentLightboxIndex - 1]);
    } else {
      setLightboxItem(displayItems[displayItems.length - 1]);
    }
  };

  const handleNextLightbox = () => {
    if (currentLightboxIndex < displayItems.length - 1) {
      setLightboxItem(displayItems[currentLightboxIndex + 1]);
    } else {
      setLightboxItem(displayItems[0]);
    }
  };

  // Safe close handler that cleans up browser history safely
  const handleClose = () => {
    if (hasPushedHistoryRef.current && !closedByPopstateRef.current) {
      isProgrammaticBackRef.current = true;
      hasPushedHistoryRef.current = false;
      try {
        window.history.back();
      } catch {
        // ignore history back errors
      }
    }
    onClose();
  };

  // Browser history integration: Exactly ONE entry on open, replaceState on category switch
  useEffect(() => {
    if (!isOpen) return;

    if (!hasPushedHistoryRef.current) {
      hasPushedHistoryRef.current = true;
      closedByPopstateRef.current = false;
      isProgrammaticBackRef.current = false;
      try {
        window.history.pushState(
          { ...window.history.state, sgCategoryModal: normalizedKey },
          '',
          window.location.href
        );
      } catch {
        // ignore pushState errors in sandboxed environments
      }
    } else {
      try {
        window.history.replaceState(
          { ...window.history.state, sgCategoryModal: normalizedKey },
          '',
          window.location.href
        );
      } catch {
        // ignore replaceState errors
      }
    }
  }, [isOpen, normalizedKey]);

  // Listen for browser Back/Forward (popstate)
  useEffect(() => {
    if (!isOpen) return;

    const handlePopState = (e: PopStateEvent) => {
      // If lightbox is currently open, lightbox's own popstate listener will close it
      if (lightboxItemRef.current) {
        return;
      }

      // If we initiated history.back() programmatically on X/Escape close, consume and reset
      if (isProgrammaticBackRef.current) {
        isProgrammaticBackRef.current = false;
        hasPushedHistoryRef.current = false;
        return;
      }

      // If user pressed browser/hardware Back button:
      if (!e.state || !e.state.sgCategoryModal) {
        closedByPopstateRef.current = true;
        hasPushedHistoryRef.current = false;
        onClose();
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isOpen, onClose]);

  // Clean up history on unmount if component closed externally
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

  // Lock background scroll and preserve exact page scroll position
  useEffect(() => {
    if (!isOpen) return;

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
      document.body.style.overflow = prevOverflowRef.current;
      document.body.style.position = prevPositionRef.current;
      document.body.style.top = prevTopRef.current;
      document.body.style.width = prevWidthRef.current;
      window.scrollTo(0, scrollYRef.current);
    };
  }, [isOpen]);

  // Trap focus & restore focus on close
  useEffect(() => {
    if (!isOpen) return;

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
  }, [isOpen]);

  // Keyboard Escape & Focus trap
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // If lightbox is open, lightbox handles its own escape & focus
    if (lightboxItem) return;

    if (e.key === 'Escape') {
      e.preventDefault();
      handleClose();
      return;
    }

    if (e.key === 'Tab') {
      if (!dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
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

  // Reset type filter when category changes
  useEffect(() => {
    setActiveType('all');
  }, [categoryKey]);

  if (!isOpen || !mounted) return null;

  const whatsappUrl = getServiceWhatsAppUrl(categoryMeta.label);

  const modalContent = (
    <>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${categoryMeta.label} Media Gallery`}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        className="fixed inset-0 z-[9990] overflow-y-auto bg-black/95 text-[#F7F3ED] select-none animate-fadeIn"
      >
        {/* Subtle Luxury Ambient Glow */}
        <div className="fixed inset-0 pointer-events-none opacity-20">
          <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#D4AF72] blur-3xl" />
          <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-[#075546] blur-3xl" />
        </div>

        {/* Sticky Header Bar with Close and Back Controls & Safe Area Padding */}
        <header
          className="sticky top-0 z-40 bg-black/85 backdrop-blur-md border-b border-[#D4AF72]/25 px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5"
          style={{
            paddingTop: 'max(12px, env(safe-area-inset-top, 12px))',
            paddingLeft: 'max(16px, env(safe-area-inset-left, 16px))',
            paddingRight: 'max(16px, env(safe-area-inset-right, 16px))',
          }}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            {/* Back Button with 44x44px min touch target */}
            <button
              type="button"
              onClick={handleClose}
              className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase text-white hover:text-[#063B33] bg-white/10 hover:bg-[#D4AF72] border border-[#D4AF72]/40 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF72]"
              aria-label="Back to page"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            {/* Category Title & Badge */}
            <div className="flex flex-col items-center text-center">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF72] text-shadow-gold">
                Category Gallery
              </span>
              <h2 className="font-editorial text-lg sm:text-2xl font-bold text-white tracking-wide truncate max-w-[180px] sm:max-w-md text-shadow-heading">
                {categoryMeta.label}
              </h2>
            </div>

            {/* Close Button with 44x44px min touch target */}
            <button
              ref={closeButtonRef}
              type="button"
              onClick={handleClose}
              className="min-w-[44px] min-h-[44px] w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#D4AF72] text-white hover:text-[#063B33] border border-[#D4AF72]/40 hover:border-white transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF72]"
              aria-label="Close gallery modal (Esc)"
              title="Close (Esc)"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Category Switcher Tabs */}
          <div className="max-w-7xl mx-auto mt-3 pt-2.5 border-t border-white/10 flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
            {GALLERY_CATEGORIES.filter((c) => c.key !== 'all').map((cat) => {
              const isSelected = cat.key === normalizedKey;
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => onSelectCategory(cat.key)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium tracking-wide whitespace-nowrap transition-all duration-200 ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#D4AF72] to-[#B38D48] text-[#063B33] font-bold shadow-md'
                      : 'bg-black/50 text-white/80 hover:text-white border border-white/15 hover:border-[#D4AF72]/60'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </header>

        {/* Modal Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10">
          {/* Category Header Hero Card */}
          <div className="mb-10 p-6 sm:p-8 rounded-3xl bg-black/50 border border-[#D4AF72]/30 shadow-2xl space-y-4 text-center sm:text-left flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-[#D4AF72] text-shadow-gold">
                <Sparkles className="w-4 h-4 text-[#D4AF72] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" />
                <span>{categoryMeta.folderName} Portfolio</span>
              </div>
              <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-shadow-heading">
                {categoryMeta.label}
              </h1>
              <p className="text-sm sm:text-base text-gray-200 font-normal leading-relaxed text-shadow-contrast">
                {categoryMeta.shortDescription}
              </p>

              {/* Total Count Badge */}
              <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-semibold text-white/90">
                <span className="px-3 py-1 rounded-full bg-[#075546]/80 border border-[#D4AF72]/40 text-[#D4AF72] shadow-sm">
                  {counts.total} Total Items
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20">
                  {counts.images} Photographs
                </span>
                {counts.videos > 0 && (
                  <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20">
                    {counts.videos} Video Reels
                  </span>
                )}
              </div>
            </div>

            {/* Direct WhatsApp Category Enquiry */}
            <div className="flex flex-col sm:items-end justify-center shrink-0">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#063B33] bg-gradient-to-r from-[#F4E8D3] via-[#D4AF72] to-[#C49B58] hover:from-white hover:to-[#D4AF72] shadow-xl hover:shadow-2xl transition-all duration-200 transform hover:-translate-y-0.5"
              >
                <MessageCircle className="w-4 h-4 fill-[#063B33]/20" />
                <span>Enquire For This Event</span>
              </a>
              <span className="text-[11px] text-[#D4AF72]/80 mt-1.5 text-center sm:text-right">
                Direct date availability & custom quote
              </span>
            </div>
          </div>

          {/* Media Type Filter Chips (if videos exist) */}
          {counts.videos > 0 && (
            <div className="flex items-center gap-2 mb-8">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 mr-1">
                Filter:
              </span>
              <button
                type="button"
                onClick={() => setActiveType('all')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                  activeType === 'all'
                    ? 'bg-[#D4AF72] text-[#063B33]'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                All ({counts.total})
              </button>
              <button
                type="button"
                onClick={() => setActiveType('image')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                  activeType === 'image'
                    ? 'bg-[#D4AF72] text-[#063B33]'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Photos ({counts.images})</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveType('video')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                  activeType === 'video'
                    ? 'bg-[#D4AF72] text-[#063B33]'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <Film className="w-3.5 h-3.5" />
                <span>Videos ({counts.videos})</span>
              </button>
            </div>
          )}

          {/* Media Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayItems.map((item) => (
              <div
                key={item.id}
                role="button"
                tabIndex={0}
                onClick={() => setLightboxItem(item)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setLightboxItem(item);
                  }
                }}
                className="group relative rounded-2xl overflow-hidden bg-black/60 shadow-xl border border-[#D4AF72]/30 hover:border-[#D4AF72] cursor-pointer transition-all duration-300 transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF72]"
              >
                {/* Media Container with 4:3 Aspect Ratio */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
                  {item.mediaType === 'video' ? (
                    <>
                      {/* Video element with preload=metadata for immediate first frame preview */}
                      <video
                        src={item.src}
                        preload="metadata"
                        muted
                        playsInline
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
                      />
                      {/* Video Play Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/25 group-hover:bg-black/10 transition-colors">
                        <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#063B33]/90 border-2 border-[#D4AF72] flex items-center justify-center shadow-2xl group-hover:scale-115 transition-transform duration-300">
                          <Play className="w-6 h-6 fill-[#D4AF72] text-[#D4AF72] ml-0.5" />
                        </div>
                      </div>
                      {/* Video Badge */}
                      <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-black/75 text-[#D4AF72] border border-[#D4AF72]/40 text-[10px] font-bold tracking-wider uppercase flex items-center gap-1 shadow-md">
                        <Film className="w-3 h-3" />
                        <span>Video Reel</span>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Image element with lazy loading */}
                      <img
                        src={item.src}
                        alt={item.alt}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                      />
                      {/* Photo Badge */}
                      <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-black/75 text-white/90 border border-white/20 text-[10px] font-bold tracking-wider uppercase flex items-center gap-1 shadow-md">
                        <ImageIcon className="w-3 h-3" />
                        <span>Photo</span>
                      </div>
                    </>
                  )}

                  {/* Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-85 group-hover:opacity-75 transition-opacity" />

                  {/* Content Overlay */}
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <h3 className="font-editorial text-base sm:text-lg font-bold text-white line-clamp-1 leading-snug text-shadow-heading">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-200 line-clamp-1 mt-0.5 font-normal text-shadow-contrast">
                      {item.caption}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Navigation & Close Footer */}
          <div className="mt-16 pt-8 border-t border-[#D4AF72]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <p className="text-xs text-gray-300 font-light">
              Viewing <strong className="text-white font-medium">{displayItems.length} items</strong> from{' '}
              <span className="text-[#D4AF72] font-semibold">{categoryMeta.folderName}</span>.
            </p>

            <div className="flex items-center gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[#063B33] bg-gradient-to-r from-[#F4E8D3] to-[#D4AF72] hover:from-white hover:to-[#D4AF72] shadow-md"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Enquire on WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={handleClose}
                className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-colors cursor-pointer"
              >
                Close Gallery
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Lightbox for individual item preview */}
      <GalleryLightbox
        item={lightboxItem}
        items={displayItems}
        currentIndex={currentLightboxIndex}
        onClose={() => setLightboxItem(null)}
        onPrev={handlePrevLightbox}
        onNext={handleNextLightbox}
      />
    </>
  );

  return createPortal(modalContent, document.body);
};
