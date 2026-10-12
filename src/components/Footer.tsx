import React from 'react';
import { COMPANY_CONFIG } from '../data/companyConfig';
import { SERVICES_DATA } from '../data/servicesData';
import { SgLogo } from './SgLogo';
import { MessageCircle, Phone, Mail, Instagram, ArrowUp } from 'lucide-react';

interface FooterProps {
  onSelectCategory?: (categoryKey: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory }) => {
  const currentYear = new Date().getFullYear();

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleServiceClick = (categoryKey: string) => {
    if (onSelectCategory) {
      onSelectCategory(categoryKey);
    }
    const gallerySection = document.getElementById('gallery');
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-black/85 text-[#F7F3ED] pt-16 pb-12 border-t border-[#D4AF72]/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-white/10">
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <SgLogo variant="crest" size="md" />
              <div>
                <span className="font-editorial text-xl sm:text-2xl font-bold tracking-[0.15em] text-[#D4AF72] uppercase block text-shadow-gold">
                  {COMPANY_CONFIG.name}
                </span>
                <span className="text-[10px] tracking-[0.2em] text-[#F4E8D3] uppercase font-semibold text-shadow-gold">
                  {COMPANY_CONFIG.tagline}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-white/95 font-normal leading-relaxed max-w-md pt-2 text-shadow-contrast">
              Curating luxury celebrations, royal weddings, elegant corporate banquets, and bespoke catering services.
              Spreading love and building cherished bonds across every unforgettable moment.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={COMPANY_CONFIG.whatsappBaseUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-full bg-[#075546] hover:bg-[#D4AF72] hover:text-[#063B33] text-[#D4AF72] flex items-center justify-center transition-colors border border-[#D4AF72]/40"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={COMPANY_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-[#075546] hover:bg-[#D4AF72] hover:text-[#063B33] text-[#D4AF72] flex items-center justify-center transition-colors border border-[#D4AF72]/40"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`tel:${COMPANY_CONFIG.phoneClean}`}
                aria-label="Phone"
                className="w-9 h-9 rounded-full bg-[#075546] hover:bg-[#D4AF72] hover:text-[#063B33] text-[#D4AF72] flex items-center justify-center transition-colors border border-[#D4AF72]/40"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${COMPANY_CONFIG.email}`}
                aria-label="Email"
                className="w-9 h-9 rounded-full bg-[#075546] hover:bg-[#D4AF72] hover:text-[#063B33] text-[#D4AF72] flex items-center justify-center transition-colors border border-[#D4AF72]/40"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF72]">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-gray-300 font-light">
              <li>
                <a href="#home" className="hover:text-[#D4AF72] transition-colors">Home</a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#D4AF72] transition-colors">About Us</a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#D4AF72] transition-colors">Our Services</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#D4AF72] transition-colors">Event Gallery</a>
              </li>
              <li>
                <a href="#catering" className="hover:text-[#D4AF72] transition-colors">Catering Services</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#D4AF72] transition-colors">Contact Us</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF72]">
              Services
            </h4>
            <ul className="space-y-2 text-xs text-gray-300 font-light">
              {SERVICES_DATA.map((service) => (
                <li key={service.id}>
                  <button
                    type="button"
                    onClick={() => handleServiceClick(service.categoryKey)}
                    className="hover:text-[#D4AF72] transition-colors text-left"
                  >
                    {service.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Summary */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF72]">
              Direct Contact
            </h4>
            <div className="space-y-2.5 text-xs text-gray-300 font-light">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#D4AF72]/80 block">Phone / WhatsApp</span>
                <a href={`tel:${COMPANY_CONFIG.phoneClean}`} className="hover:text-[#D4AF72] font-medium text-white transition-colors">
                  {COMPANY_CONFIG.phone}
                </a>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#D4AF72]/80 block">Email Address</span>
                <a href={`mailto:${COMPANY_CONFIG.email}`} className="hover:text-[#D4AF72] transition-colors break-all">
                  {COMPANY_CONFIG.email}
                </a>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#D4AF72]/80 block">Instagram</span>
                <a
                  href={COMPANY_CONFIG.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#D4AF72] transition-colors"
                >
                  {COMPANY_CONFIG.instagramHandle}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Copyright and Back to Top */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>
            © {currentYear} <strong className="text-white font-medium">{COMPANY_CONFIG.name}</strong>. All rights reserved.
          </p>
          <button
            type="button"
            onClick={handleScrollTop}
            className="inline-flex items-center gap-1.5 hover:text-[#D4AF72] transition-colors cursor-pointer text-xs"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Developer Credit (Minimal, Small, Muted, Clickable Mailto to coderbhai188@gmail.com) */}
        <div className="pt-4 border-t border-white/5 text-center">
          <p className="text-[11px] text-gray-500 font-light tracking-wide">
            Designed & Developed by{' '}
            <a
              href={`mailto:${COMPANY_CONFIG.developerCredit.email}?subject=Website%20Development%20Enquiry`}
              className="text-gray-400 hover:text-[#D4AF72] transition-colors underline underline-offset-2 decoration-gray-600 hover:decoration-[#D4AF72]"
              title="Contact website developer"
            >
              {COMPANY_CONFIG.developerCredit.companyName}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
