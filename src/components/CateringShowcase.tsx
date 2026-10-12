import React from 'react';
import { getCateringWhatsAppUrl } from '../data/companyConfig';
import { MessageCircle, Utensils, Sparkles, Check } from 'lucide-react';
import cateringDiningImg from '../assets/images/catering_banquet_dining_1791457076406.jpg';

export const CateringShowcase: React.FC = () => {
  const cateringWhatsappUrl = getCateringWhatsAppUrl();

  return (
    <section id="catering" className="py-20 lg:py-28 bg-black/20 text-[#F7F3ED] relative overflow-hidden border-b border-[#D4AF72]/20">
      {/* Subtle luxury ambient glow */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/3 -right-20 w-80 h-80 rounded-full bg-[#D4AF72] blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-[#075546] blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Visual Bento / Feature Cards */}
          <div className="lg:col-span-6 space-y-6">
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-[#D4AF72]/30 aspect-[4/3]">
              <img
                src={cateringDiningImg}
                alt="Luxury Catering and Banquet Table Arrangement"
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-xs uppercase tracking-widest text-[#D4AF72] font-semibold text-shadow-gold">
                  Royal Hospitality
                </span>
                <p className="font-editorial text-2xl font-bold text-white mt-1 text-shadow-heading">
                  Artisanal Food Presentation & Warm Table Service
                </p>
              </div>
            </div>

            {/* Sub-cards row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-black/50 border border-[#D4AF72]/25 shadow-lg">
                <div className="flex items-center gap-2 text-[#D4AF72] mb-2 text-shadow-gold">
                  <Utensils className="w-4 h-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" />
                  <span className="text-xs font-bold uppercase tracking-wider">Live Counters</span>
                </div>
                <p className="text-xs text-white/95 font-normal leading-relaxed text-shadow-contrast">
                  Interactive culinary stations crafted with fresh preparations and theatrical presentation.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-black/50 border border-[#D4AF72]/25 shadow-lg">
                <div className="flex items-center gap-2 text-[#D4AF72] mb-2 text-shadow-gold">
                  <Sparkles className="w-4 h-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" />
                  <span className="text-xs font-bold uppercase tracking-wider">Royal Chafer Setups</span>
                </div>
                <p className="text-xs text-white/95 font-normal leading-relaxed text-shadow-contrast">
                  Traditional brass, copper, and gold tableware enhancing the majestic banquet feel.
                </p>
              </div>
            </div>
          </div>

          {/* Right Editorial Copy & Catering Call to Action */}
          <div className="lg:col-span-6 space-y-6 bg-black/40 p-6 sm:p-8 rounded-3xl border border-[#D4AF72]/25 shadow-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-[#D4AF72] text-shadow-gold">
              <Utensils className="w-4 h-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" />
              <span>Bespoke Catering & Dining</span>
            </div>

            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight text-balance text-shadow-heading">
              Exceptional Celebrations. Delightful Hospitality.
            </h2>

            <p className="text-base sm:text-lg text-white font-normal leading-relaxed text-shadow-contrast">
              Food is the heart of every Indian celebration. At SG Event Planner, our catering arrangements
              are curated with the finest ingredients, meticulous hygiene, rich culinary tradition, and
              gracious service.
            </p>

            <p className="text-sm sm:text-base text-white/95 font-normal leading-relaxed text-shadow-contrast">
              Whether you envision an expansive royal wedding banquet, bespoke festive live counters, or an intimate
              curated family feast, we work closely with you to design a tailored culinary journey that delights every guest.
            </p>

            {/* Key Catering Pillars */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#D4AF72]/20 border border-[#D4AF72] flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-[#D4AF72]" />
                </div>
                <span className="text-sm text-white font-medium text-shadow-contrast">
                  Curated multi-cuisine offerings honoring regional tastes & family traditions
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#D4AF72]/20 border border-[#D4AF72] flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-[#D4AF72]" />
                </div>
                <span className="text-sm text-white font-medium text-shadow-contrast">
                  Impeccable dining setup with royal chafers, clean buffet lines & floral decor
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#D4AF72]/20 border border-[#D4AF72] flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-[#D4AF72]" />
                </div>
                <span className="text-sm text-white font-medium text-shadow-contrast">
                  Trained, courteous hospitality staff ensuring attentive guest service
                </span>
              </div>
            </div>

            {/* Direct WhatsApp Catering Action */}
            <div className="pt-4">
              <a
                href={cateringWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-sm font-semibold tracking-wider uppercase text-[#063B33] bg-gradient-to-r from-[#F4E8D3] via-[#D4AF72] to-[#C49B58] hover:from-white hover:to-[#D4AF72] shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 text-center"
              >
                <MessageCircle className="w-4 h-4 fill-[#063B33]/20" />
                <span>Discuss Catering Requirements</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
