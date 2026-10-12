import React from 'react';
import { SERVICES_DATA } from '../data/servicesData';
import { ServiceCard } from './ServiceCard';
import { Sparkles } from 'lucide-react';

interface ServicesProps {
  onSelectCategory: (categoryKey: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectCategory }) => {
  const handleViewGallery = (categoryKey: string) => {
    onSelectCategory(categoryKey);
    const gallerySection = document.getElementById('gallery');
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-20 lg:py-28 bg-black/15 text-[#F7F3ED] relative border-b border-[#D4AF72]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 bg-black/40 p-6 sm:p-8 rounded-3xl border border-[#D4AF72]/25 shadow-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-[#D4AF72] text-shadow-gold">
            <Sparkles className="w-4 h-4 text-[#D4AF72] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]" />
            <span>Our Expertise</span>
          </div>

          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight text-shadow-heading">
            Celebrations We Bring to Life
          </h2>

          <p className="text-base sm:text-lg text-white font-normal leading-relaxed text-shadow-contrast">
            From regal wedding stages and intimate ceremonies to royal banquet catering, our services are thoughtfully
            tailored to create flawless celebrations.
          </p>
        </div>

        {/* Responsive Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_DATA.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onViewGallery={handleViewGallery}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
