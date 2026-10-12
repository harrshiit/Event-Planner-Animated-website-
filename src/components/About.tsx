import React from 'react';
import { COMPANY_CONFIG } from '../data/companyConfig';
import { SgLogo } from './SgLogo';
import { Heart, Sparkles, CheckCircle2 } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 lg:py-28 bg-black/20 text-[#F7F3ED] relative overflow-hidden border-y border-[#D4AF72]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Column 1: Brand Emblem Showcase & Photography */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* Dedicated Brand Identity Presentation featuring the original SG Logo */}
            <div className="w-full max-w-md flex flex-col items-center bg-black/40 p-6 rounded-3xl border border-[#D4AF72]/25 shadow-2xl">
              <SgLogo variant="full" className="w-full" />
            </div>
          </div>

          {/* Column 2: Editorial Story & Values */}
          <div className="lg:col-span-7 space-y-6 bg-black/40 p-6 sm:p-8 rounded-3xl border border-[#D4AF72]/25 shadow-2xl">
            {/* Section Tagline Kicker */}
            <div className="flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-[#D4AF72] text-shadow-gold">
              <Sparkles className="w-4 h-4 text-[#D4AF72] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]" />
              <span>About SG Event Planner</span>
            </div>

            {/* Heading */}
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight text-balance text-shadow-heading">
              Beautiful Moments. Thoughtfully Planned.
            </h2>

            {/* Brand Tagline Display */}
            <div className="p-4 rounded-xl bg-[#063B33]/60 border border-[#D4AF72]/40 flex items-center gap-3 shadow-lg">
              <Heart className="w-5 h-5 text-[#D4AF72] shrink-0 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]" />
              <p className="font-editorial text-lg sm:text-xl font-semibold text-[#F4E8D3] italic text-shadow-gold">
                "{COMPANY_CONFIG.tagline}"
              </p>
            </div>

            {/* Prose description */}
            <p className="text-base sm:text-lg text-white leading-relaxed font-normal text-shadow-contrast">
              At <strong className="font-bold text-[#F4E8D3] underline decoration-[#D4AF72]/50 underline-offset-4">SG EVENT PLANNER</strong>, we believe every milestone in life
              is an opportunity to create cherished memories. We specialize in comprehensive event management, bespoke wedding
              celebrations, thematic decor, and exquisite catering arrangements.
            </p>

            <p className="text-base text-white/95 leading-relaxed font-normal text-shadow-contrast">
              Whether you are planning a grand royal wedding, an intimate ring ceremony, a festive milestone birthday, or an executive
              corporate gala, our team approaches every occasion with precision, artistic care, and deep dedication to hospitality.
              We take care of the intricate details so you and your loved ones can truly be present to celebrate your bond.
            </p>

            {/* Key Service Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF72] shrink-0 mt-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]" />
                <span className="text-sm font-medium text-white text-shadow-contrast">
                  Comprehensive Event Planning & Management
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF72] shrink-0 mt-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]" />
                <span className="text-sm font-medium text-white text-shadow-contrast">
                  Artistic Floral & Thematic Stage Styling
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF72] shrink-0 mt-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]" />
                <span className="text-sm font-medium text-white text-shadow-contrast">
                  Royal Multi-Cuisine Catering Services
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF72] shrink-0 mt-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]" />
                <span className="text-sm font-medium text-white text-shadow-contrast">
                  End-to-End Coordination & Warm Hospitality
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
