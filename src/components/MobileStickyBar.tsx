import React, { useState, useEffect } from 'react';
import { getWhatsAppUrl } from '../data/companyConfig';
import { MessageCircle } from 'lucide-react';

export const MobileStickyBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show floating button once user scrolls past hero section
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Quick WhatsApp booking"
      className="fixed bottom-5 right-5 z-40 sm:hidden transition-transform duration-300"
    >
      <a
        href={getWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#063B33] text-[#D4AF72] border border-[#D4AF72]/60 shadow-2xl active:scale-95 transition-all text-xs font-semibold tracking-wider uppercase backdrop-blur-md"
        aria-label="Book Your Event on WhatsApp"
      >
        <div className="w-6 h-6 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-xs">
          <MessageCircle className="w-3.5 h-3.5 fill-white" />
        </div>
        <span className="text-[#F7F3ED]">Book Event</span>
      </a>
    </aside>
  );
};
