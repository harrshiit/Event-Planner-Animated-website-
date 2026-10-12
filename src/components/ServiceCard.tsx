import React from 'react';
import { ServiceItem } from '../data/servicesData';
import { getServiceWhatsAppUrl } from '../data/companyConfig';
import { getCategoryMediaCounts } from '../data/galleryData';
import { MessageCircle, Image as ImageIcon, ArrowUpRight, Film } from 'lucide-react';

interface ServiceCardProps {
  service: ServiceItem;
  onViewGallery: (categoryKey: string) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onViewGallery }) => {
  const whatsappUrl = getServiceWhatsAppUrl(service.name);
  const counts = getCategoryMediaCounts(service.categoryKey);

  return (
    <div className="group relative rounded-3xl overflow-hidden bg-black/50 shadow-2xl hover:shadow-[0_0_30px_rgba(212,175,114,0.25)] border border-[#D4AF72]/30 hover:border-[#D4AF72]/70 hover:bg-black/65 transition-all duration-300 flex flex-col">
      {/* Image Container with smooth hover zoom */}
      <div
        className="relative aspect-[4/3] w-full overflow-hidden bg-black/40 cursor-pointer"
        onClick={() => onViewGallery(service.categoryKey)}
      >
        <img
          src={service.image}
          alt={service.name}
          referrerPolicy="no-referrer"
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
        />
        {/* Subtle gradient scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-85 group-hover:opacity-70 transition-opacity" />

        {/* Media count badge on top-left */}
        <div className="absolute top-4 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/75 text-[#D4AF72] border border-[#D4AF72]/40 text-[11px] font-bold tracking-wider shadow-lg">
          <ImageIcon className="w-3 h-3" />
          <span>{counts.total} Media</span>
          {counts.videos > 0 && (
            <span className="text-[10px] text-white/80 font-normal">
              · {counts.videos} Reels
            </span>
          )}
        </div>

        {/* Quick View Gallery Badge Overlay on top-right */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onViewGallery(service.categoryKey);
          }}
          className="absolute top-4 right-4 p-2.5 rounded-full bg-black/70 text-[#D4AF72] border border-[#D4AF72]/40 hover:bg-[#D4AF72] hover:text-[#063B33] shadow-lg transition-all duration-200 hover:scale-110 focus-visible:ring-2 focus-visible:ring-[#D4AF72]"
          title={`View ${service.name} in Gallery`}
          aria-label={`View ${service.name} Gallery`}
        >
          <ArrowUpRight className="w-4 h-4" />
        </button>

        {/* Service Title on Media */}
        <div className="absolute bottom-4 left-5 right-5 text-white">
          <h3 className="font-editorial text-2xl font-bold tracking-tight text-white text-shadow-heading">
            {service.name}
          </h3>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
        <p className="text-sm text-white/95 leading-relaxed font-normal text-shadow-contrast">
          {service.shortDescription}
        </p>

        {/* Feature bullets */}
        <div className="space-y-1.5 pt-1 border-t border-white/10">
          {service.features.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs text-[#FFFDF8] font-medium text-shadow-contrast">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF72] shadow-[0_0_6px_#D4AF72]" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3">
          {/* View Gallery Link */}
          <button
            type="button"
            onClick={() => onViewGallery(service.categoryKey)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-[#D4AF72] hover:text-white transition-colors py-2 group/btn text-shadow-gold"
          >
            <ImageIcon className="w-3.5 h-3.5 text-[#D4AF72] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" />
            <span>View Gallery ({counts.total})</span>
          </button>

          {/* Enquire Now on WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase text-[#063B33] bg-gradient-to-r from-[#F4E8D3] via-[#D4AF72] to-[#C49B58] hover:from-white hover:to-[#D4AF72] transition-all shadow-md"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-[#063B33]/20" />
            <span>Enquire Now</span>
          </a>
        </div>
      </div>
    </div>
  );
};
