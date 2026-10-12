import React from 'react';
import { CalendarHeart, Palette, Users, UtensilsCrossed, Sparkles, Gem } from 'lucide-react';

const VALUES = [
  {
    icon: CalendarHeart,
    title: 'Personalized Event Planning',
    description:
      'We listen deeply to your wishes and family customs, building a tailor-made celebration timeline from concept to reality.',
  },
  {
    icon: Palette,
    title: 'Thoughtful Event Design',
    description:
      'Harmonious color palettes, romantic lighting, and signature floral aesthetics tailored to your chosen venue.',
  },
  {
    icon: Users,
    title: 'Celebration Coordination',
    description:
      'Graceful day-of management and flow so that your family can enjoy every ritual without stress or haste.',
  },
  {
    icon: UtensilsCrossed,
    title: 'Catering Arrangements',
    description:
      'Sumptuous multi-cuisine banquets presented with hygiene, royal brass vessels, and attentive table service.',
  },
  {
    icon: Gem,
    title: 'Attention to Detail',
    description:
      'From guest welcome gestures to the final farewell, every nuance is planned with meticulous care and warmth.',
  },
];

export const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-black/20 text-[#F7F3ED] relative border-b border-[#D4AF72]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 bg-black/40 p-6 sm:p-8 rounded-3xl border border-[#D4AF72]/25 shadow-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-[#D4AF72] text-shadow-gold">
            <Sparkles className="w-4 h-4 text-[#D4AF72] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]" />
            <span>The SG Difference</span>
          </div>

          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight text-shadow-heading">
            Crafting Celebrations With Care & Bonding
          </h2>

          <p className="text-base sm:text-lg text-white font-normal leading-relaxed text-shadow-contrast">
            Our philosophy is rooted in our motto: "Spread Love With Strong Bonding." We treat your special occasion
            with the same devotion we would give our own family gathering.
          </p>
        </div>

        {/* Value Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {VALUES.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-black/50 border border-[#D4AF72]/25 hover:border-[#D4AF72]/60 hover:bg-black/65 shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#063B33] to-[#075546] border border-[#D4AF72]/40 text-[#D4AF72] flex items-center justify-center mb-6 shadow-md transition-transform duration-300 group-hover:scale-105">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-editorial text-xl font-bold text-white mb-3 text-shadow-heading">
                    {val.title}
                  </h3>
                  <p className="text-sm text-white/95 font-normal leading-relaxed text-shadow-contrast">
                    {val.description}
                  </p>
                </div>
              </div>
            );
          })}

          {/* Sixth Special Quote Card to balance 2x3 grid */}
          <div className="p-8 rounded-3xl bg-black/65 text-white border border-[#D4AF72]/40 flex flex-col justify-between shadow-2xl">
            <div>
              <span className="text-[10px] font-bold tracking-[0.25em] text-[#D4AF72] uppercase text-shadow-gold">
                Our Promise
              </span>
              <p className="font-editorial text-2xl font-bold text-[#F4E8D3] italic mt-3 leading-snug text-shadow-gold">
                "Spread Love With Strong Bonding"
              </p>
              <p className="text-xs text-white/90 font-normal leading-relaxed mt-4 text-shadow-contrast">
                We believe true hospitality turns any occasion into a lifelong, heartfelt treasure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
