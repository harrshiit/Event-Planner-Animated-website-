import React, { useState, useEffect } from 'react';
import { COMPANY_CONFIG, getWhatsAppUrl } from '../data/companyConfig';
import { SgLogo } from './SgLogo';
import { Menu, X, MessageCircle, Phone, Instagram } from 'lucide-react';

interface NavbarProps {
  onNavigate?: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const targetId = href.replace('#', '');
    if (onNavigate) {
      onNavigate(targetId);
    }
    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/80 shadow-xl border-b border-[#D4AF72]/30 py-3'
          : 'bg-black/40 border-b border-white/10 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Zone 1: Brand Mark */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF72] rounded-md"
            aria-label="SG Event Planner Home"
          >
            <SgLogo variant="crest" size="sm" className="shadow-md transition-transform duration-300 group-hover:scale-105" />
            <div className="flex flex-col">
              <span className="font-editorial text-lg sm:text-xl font-bold tracking-[0.15em] text-[#D4AF72] uppercase leading-tight text-shadow-gold">
                SG EVENT PLANNER
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-[0.2em] text-[#FFFDF8] uppercase font-semibold text-shadow-contrast">
                Spread Love With Strong Bonding
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium tracking-wide">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="text-white hover:text-[#D4AF72] transition-colors py-1 relative text-shadow-contrast hover:after:w-full after:w-0 after:h-0.5 after:bg-[#D4AF72] after:absolute after:bottom-0 after:left-0 after:transition-all"
            >
              Home
            </a>
            <a
              href="#about"
              onClick={(e) => handleNavClick(e, '#about')}
              className="text-white hover:text-[#D4AF72] transition-colors py-1 relative text-shadow-contrast hover:after:w-full after:w-0 after:h-0.5 after:bg-[#D4AF72] after:absolute after:bottom-0 after:left-0 after:transition-all"
            >
              About Us
            </a>
            <a
              href="#services"
              onClick={(e) => handleNavClick(e, '#services')}
              className="text-white hover:text-[#D4AF72] transition-colors py-1 relative text-shadow-contrast hover:after:w-full after:w-0 after:h-0.5 after:bg-[#D4AF72] after:absolute after:bottom-0 after:left-0 after:transition-all"
            >
              Our Services
            </a>
            <a
              href="#gallery"
              onClick={(e) => handleNavClick(e, '#gallery')}
              className="text-white hover:text-[#D4AF72] transition-colors py-1 relative text-shadow-contrast hover:after:w-full after:w-0 after:h-0.5 after:bg-[#D4AF72] after:absolute after:bottom-0 after:left-0 after:transition-all"
            >
              Gallery
            </a>
            <a
              href="#catering"
              onClick={(e) => handleNavClick(e, '#catering')}
              className="text-white hover:text-[#D4AF72] transition-colors py-1 relative text-shadow-contrast hover:after:w-full after:w-0 after:h-0.5 after:bg-[#D4AF72] after:absolute after:bottom-0 after:left-0 after:transition-all"
            >
              Catering
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="text-white hover:text-[#D4AF72] transition-colors py-1 relative text-shadow-contrast hover:after:w-full after:w-0 after:h-0.5 after:bg-[#D4AF72] after:absolute after:bottom-0 after:left-0 after:transition-all"
            >
              Contact Us
            </a>
          </nav>

          {/* Zone 3: Primary Action */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase text-[#063B33] bg-gradient-to-r from-[#F4E8D3] via-[#D4AF72] to-[#C49B58] hover:from-white hover:to-[#D4AF72] shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4 fill-[#063B33]/20" />
              <span>Book Your Event</span>
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center md:hidden gap-2">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="p-2 rounded-full bg-[#D4AF72] text-[#063B33] shadow-sm sm:hidden"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="p-2 rounded-lg text-[#F7F3ED] hover:text-[#D4AF72] hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF72]"
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#063B33] border-b border-[#D4AF72]/30 px-6 pt-4 pb-6 space-y-4 shadow-2xl transition-all">
          <nav className="flex flex-col space-y-3 font-medium text-base">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="text-[#F7F3ED] hover:text-[#D4AF72] py-2 border-b border-white/5 transition-colors"
            >
              Home
            </a>
            <a
              href="#about"
              onClick={(e) => handleNavClick(e, '#about')}
              className="text-[#F7F3ED] hover:text-[#D4AF72] py-2 border-b border-white/5 transition-colors"
            >
              About Us
            </a>
            <a
              href="#services"
              onClick={(e) => handleNavClick(e, '#services')}
              className="text-[#F7F3ED] hover:text-[#D4AF72] py-2 border-b border-white/5 transition-colors"
            >
              Our Services
            </a>
            <a
              href="#gallery"
              onClick={(e) => handleNavClick(e, '#gallery')}
              className="text-[#F7F3ED] hover:text-[#D4AF72] py-2 border-b border-white/5 transition-colors"
            >
              Event Gallery
            </a>
            <a
              href="#catering"
              onClick={(e) => handleNavClick(e, '#catering')}
              className="text-[#F7F3ED] hover:text-[#D4AF72] py-2 border-b border-white/5 transition-colors"
            >
              Catering Services
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="text-[#F7F3ED] hover:text-[#D4AF72] py-2 border-b border-white/5 transition-colors"
            >
              Contact Us
            </a>
          </nav>

          <div className="pt-2 flex flex-col gap-3">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-full text-xs font-semibold tracking-wider uppercase text-[#063B33] bg-[#D4AF72] hover:bg-[#E5C287] shadow-md transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Book Your Event on WhatsApp</span>
            </a>

            <div className="flex items-center justify-between text-xs text-[#F4E8D3]/80 pt-2 border-t border-white/10">
              <a href={`tel:${COMPANY_CONFIG.phoneClean}`} className="flex items-center gap-1.5 hover:text-[#D4AF72]">
                <Phone className="w-3.5 h-3.5" />
                <span>{COMPANY_CONFIG.phone}</span>
              </a>
              <a
                href={COMPANY_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-[#D4AF72]"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>{COMPANY_CONFIG.instagramHandle}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
