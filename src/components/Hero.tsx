import React from 'react';
import { COMPANY_CONFIG, getWhatsAppUrl } from '../data/companyConfig';
import { MessageCircle, ArrowRight, Sparkles, Award } from 'lucide-react';
import sgLogoImg from '../assets/images/sg_event_planner_logo_1791458315006.jpg';
import heroWeddingImg from '../assets/images/hero_luxury_wedding_1791457065780.jpg';
import cateringPreviewImg from '../assets/images/catering_banquet_dining_1791457076406.jpg';

interface HeroProps {
  onExploreClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  const handleExplore = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onExploreClick) {
      onExploreClick();
    } else {
      const el = document.getElementById('gallery');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative pt-24 sm:pt-28 pb-12 lg:pb-20 overflow-hidden bg-transparent text-[#F7F3ED]">
      {/* Subtle luxury background glow and pattern */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#D4AF72] blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-96 h-96 rounded-full bg-[#075546] blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Desktop Split / Asymmetric Layout inspired by reference */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6 pt-4 lg:pt-0 bg-black/40 p-6 sm:p-8 rounded-3xl border border-[#D4AF72]/25 shadow-2xl">
            {/* Tagline kicker */}
            <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-[#D4AF72] text-shadow-gold">
              <Sparkles className="w-4 h-4 text-[#D4AF72] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]" />
              <span>{COMPANY_CONFIG.tagline}</span>
            </div>

            {/* Main Editorial Headline */}
            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.08] tracking-tight text-white text-balance text-shadow-heading">
              Every Celebration Deserves to Be{' '}
              <span className="italic font-normal text-gold-gradient">Extraordinary.</span>
            </h1>

            {/* Supporting Description */}
            <p className="text-base sm:text-lg text-white leading-relaxed font-normal max-w-xl text-shadow-contrast">
              From beautiful celebrations to unforgettable experiences, SG Event Planner brings your vision to
              life with thoughtful planning, elegant décor, and memorable hospitality.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-sm font-semibold tracking-wider uppercase text-[#063B33] bg-gradient-to-r from-[#F4E8D3] via-[#D4AF72] to-[#C49B58] hover:from-white hover:to-[#D4AF72] shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 text-center"
              >
                <MessageCircle className="w-4 h-4 fill-[#063B33]/20" />
                <span>Plan Your Event</span>
              </a>

              <button
                type="button"
                onClick={handleExplore}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-sm font-medium tracking-wide text-white border border-[#D4AF72]/40 hover:border-[#D4AF72] hover:bg-white/10 transition-all duration-200 text-shadow-contrast"
              >
                <span>Explore Our Work</span>
                <ArrowRight className="w-4 h-4 text-[#D4AF72]" />
              </button>
            </div>

            {/* Brand Core Pillars */}
            <div className="pt-6 border-t border-[#D4AF72]/20 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs tracking-wider text-[#D4AF72] uppercase font-semibold text-shadow-gold">
              <span>Weddings</span>
              <span aria-hidden="true" className="text-white/40">·</span>
              <span>Engagements</span>
              <span aria-hidden="true" className="text-white/40">·</span>
              <span>Catering Banquets</span>
              <span aria-hidden="true" className="text-white/40">·</span>
              <span>Bespoke Decor</span>
            </div>
          </div>

          {/* Right Column: Hero Visual composition with luxury curved frame & circular badge */}
          <div className="lg:col-span-6 relative mt-4 lg:mt-0">
            {/* Circular Official Logo Crest Badge (Featuring exact SG Logo) */}
            <div className="absolute -top-6 -left-6 sm:-top-8 sm:-left-8 z-20 w-24 h-24 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-tr from-[#8A642B] via-[#D4AF72] to-[#FFF4DE] shadow-2xl flex items-center justify-center">
              <div className="w-full h-full rounded-full overflow-hidden bg-[#063B33] border border-[#D4AF72]/40 relative">
                <img
                  src={sgLogoImg}
                  alt="Official SG Event Planner Crest"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover scale-110"
                />
              </div>
            </div>

            {/* Main Featured Image Container with sculpted asymmetrical corners */}
            <div className="relative rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl border border-[#D4AF72]/30 group aspect-[4/3] sm:aspect-[16/11]">
              <img
                src={heroWeddingImg}
                alt="Luxury Indian Wedding and Reception Banquet Decor by SG Event Planner"
                referrerPolicy="no-referrer"
                loading="eager"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {/* Refined gradient scrim for contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#063B33]/80 via-transparent to-black/20 pointer-events-none" />

              {/* Bottom Card Caption */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 bg-[#063B33]/90 rounded-2xl p-4 sm:p-5 border border-[#D4AF72]/30 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-widest text-[#D4AF72] font-semibold">
                    Grand Celebrations
                  </p>
                  <p className="font-editorial text-lg sm:text-xl font-bold text-white mt-0.5">
                    Curated With Passion & Elegance
                  </p>
                </div>
                <div className="text-right hidden sm:block">
                  <span className="text-xs text-[#F4E8D3]/70 font-light">Delhi NCR & Beyond</span>
                </div>
              </div>
            </div>

            {/* Overlapping Secondary Preview Image (Inspired by reference's overlapping food/dish element) */}
            <div className="hidden sm:block absolute -bottom-8 -right-6 w-44 sm:w-52 aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-2 border-[#D4AF72]/50 bg-[#063B33]">
              <img
                src={cateringPreviewImg}
                alt="Bespoke Catering and Dining Setup"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-2.5 flex items-end">
                <span className="text-[11px] font-semibold text-[#F4E8D3] tracking-wide">
                  Royal Catering Banquets
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
