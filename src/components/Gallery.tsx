import React, { useState, useEffect } from 'react';
import {
  GALLERY_DATA,
  GALLERY_CATEGORIES,
  GalleryItem,
  getItemsByCategory,
  getCategoryMediaCounts,
  normalizeCategoryKey,
} from '../data/galleryData';
import { GalleryLightbox } from './GalleryLightbox';
import { Play, Sparkles, Image as ImageIcon, Film, ArrowRight, RotateCcw } from 'lucide-react';

interface GalleryProps {
  initialCategory?: string;
  onOpenCategoryModal?: (categoryKey: string) => void;
}

export const Gallery: React.FC<GalleryProps> = ({
  initialCategory = 'all',
  onOpenCategoryModal,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  useEffect(() => {
    if (initialCategory) {
      setActiveCategory(initialCategory);
    }
  }, [initialCategory]);

  const normalizedKey = normalizeCategoryKey(activeCategory);
  const filteredItems = getItemsByCategory(normalizedKey);
  const activeMeta = GALLERY_CATEGORIES.find((c) => c.key === normalizedKey);
  const activeCounts = getCategoryMediaCounts(normalizedKey);

  const currentLightboxIndex = lightboxItem
    ? filteredItems.findIndex((item) => item.id === lightboxItem.id)
    : -1;

  const handlePrev = () => {
    if (currentLightboxIndex > 0) {
      setLightboxItem(filteredItems[currentLightboxIndex - 1]);
    } else {
      setLightboxItem(filteredItems[filteredItems.length - 1]);
    }
  };

  const handleNext = () => {
    if (currentLightboxIndex < filteredItems.length - 1) {
      setLightboxItem(filteredItems[currentLightboxIndex + 1]);
    } else {
      setLightboxItem(filteredItems[0]);
    }
  };

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-black/20 text-[#F7F3ED] relative border-b border-[#D4AF72]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4 bg-black/40 p-6 sm:p-8 rounded-3xl border border-[#D4AF72]/25 shadow-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-[#D4AF72] text-shadow-gold">
            <Sparkles className="w-4 h-4 text-[#D4AF72] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]" />
            <span>Visual Portfolio</span>
          </div>

          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight text-shadow-heading">
            Memories in Motion & Still Moments
          </h2>

          <p className="text-base sm:text-lg text-white font-normal leading-relaxed text-shadow-contrast">
            Browse our curated showcase of weddings, engagements, birthday galas, corporate setups, and royal catering
            presentations.
          </p>
        </div>

        {/* Category Tabs with Media Counts */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-8 gap-2 scrollbar-none px-2">
          {GALLERY_CATEGORIES.map((cat) => {
            const isTabActive = normalizedKey === cat.key;
            const count = getCategoryMediaCounts(cat.key).total;
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold tracking-wider rounded-full uppercase transition-all duration-200 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF72] flex items-center gap-2 ${
                  isTabActive
                    ? 'bg-gradient-to-r from-[#D4AF72] to-[#B38D48] text-[#063B33] font-bold shadow-lg border border-[#D4AF72]'
                    : 'bg-black/50 text-white hover:text-[#D4AF72] border border-white/20 hover:border-[#D4AF72]/60 text-shadow-contrast'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                    isTabActive ? 'bg-[#063B33] text-[#D4AF72]' : 'bg-white/10 text-white/80'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Category Banner if filtered */}
        {normalizedKey !== 'all' && activeMeta && (
          <div className="mb-8 p-5 sm:p-6 rounded-2xl bg-black/50 border border-[#D4AF72]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF72] text-shadow-gold">
                Viewing Folder: {activeMeta.folderName}
              </span>
              <h3 className="font-editorial text-2xl font-bold text-white text-shadow-heading">
                {activeMeta.label}
              </h3>
              <p className="text-xs sm:text-sm text-gray-200 text-shadow-contrast">
                {activeCounts.total} Media Items: {activeCounts.images} Photographs
                {activeCounts.videos > 0 ? ` · ${activeCounts.videos} Video Reels` : ''}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {onOpenCategoryModal && (
                <button
                  type="button"
                  onClick={() => onOpenCategoryModal(normalizedKey)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider text-[#063B33] bg-[#D4AF72] hover:bg-white transition-all shadow-md"
                >
                  <span>Open Dedicated Gallery</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setActiveCategory('all')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium text-white/80 hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Show All (32)</span>
              </button>
            </div>
          </div>
        )}

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setLightboxItem(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setLightboxItem(item);
                }
              }}
              className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-black/50 shadow-2xl border border-[#D4AF72]/30 hover:border-[#D4AF72] cursor-pointer transition-all duration-300 transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF72]"
            >
              {/* Media Container with 4:3 Aspect Ratio */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/40">
                {item.mediaType === 'video' ? (
                  <>
                    <video
                      src={item.src}
                      preload="metadata"
                      muted
                      playsInline
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                      <div className="w-13 h-13 rounded-full bg-[#063B33]/85 border-2 border-[#D4AF72] flex items-center justify-center shadow-2xl group-hover:scale-115 transition-transform duration-300">
                        <Play className="w-6 h-6 fill-[#D4AF72] text-[#D4AF72] ml-0.5" />
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 p-2 rounded-full bg-black/70 text-[#D4AF72] border border-[#D4AF72]/40">
                      <Film className="w-4 h-4" />
                    </div>
                  </>
                ) : (
                  <>
                    <img
                      src={item.src}
                      alt={item.alt}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    />
                    <div className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white border border-white/20 transition-transform duration-300 group-hover:scale-110">
                      <ImageIcon className="w-4 h-4 text-white" />
                    </div>
                  </>
                )}

                {/* Ambient Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-80 group-hover:opacity-70 transition-opacity" />

                {/* Content Overlay */}
                <div className="absolute bottom-4 left-5 right-5 text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] uppercase tracking-widest text-[#D4AF72] font-semibold text-shadow-gold">
                      {item.categoryLabel || item.category}
                    </span>
                    {item.mediaType === 'video' && (
                      <span className="text-[10px] uppercase tracking-wider text-white/90 text-shadow-contrast">
                        · Video Reel
                      </span>
                    )}
                  </div>
                  <h3 className="font-editorial text-lg sm:text-xl font-bold text-white line-clamp-1 leading-snug text-shadow-heading">
                    {item.title}
                  </h3>
                  <p className="text-xs text-white/95 line-clamp-1 mt-0.5 font-normal text-shadow-contrast">
                    {item.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="mt-12 text-center">
          <p className="text-xs text-white/80 max-w-xl mx-auto italic text-shadow-contrast">
            * SG Event Planner customizes every celebration uniquely. All 32 curated photographs and video reels are
            organized directly from our event categories.
          </p>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <GalleryLightbox
        item={lightboxItem}
        items={filteredItems}
        currentIndex={currentLightboxIndex}
        onClose={() => setLightboxItem(null)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </section>
  );
};
