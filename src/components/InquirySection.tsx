import React, { useState } from 'react';
import { COMPANY_CONFIG, getWhatsAppUrl, getCustomInquiryWhatsAppUrl } from '../data/companyConfig';
import { MessageCircle, Send, Calendar, Users, Sparkles } from 'lucide-react';

export const InquirySection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    eventType: 'Wedding',
    eventDate: '',
    guestCount: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = getCustomInquiryWhatsAppUrl({
      name: formData.name,
      eventType: formData.eventType,
      eventDate: formData.eventDate,
      guestCount: formData.guestCount,
      notes: formData.notes,
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="book-event" className="py-20 lg:py-28 bg-black/20 text-[#F7F3ED] relative overflow-hidden border-b border-[#D4AF72]/20">
      {/* Decorative ambient styling */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-[#D4AF72] blur-3xl" />
        <div className="absolute bottom-0 right-10 w-80 h-80 rounded-full bg-[#063B33] blur-2xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Direct WhatsApp Booking CTA */}
          <div className="lg:col-span-6 space-y-6 bg-black/40 p-6 sm:p-8 rounded-3xl border border-[#D4AF72]/25 shadow-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-[#D4AF72] text-shadow-gold">
              <Sparkles className="w-4 h-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]" />
              <span>Ready to Celebrate</span>
            </div>

            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight text-balance text-shadow-heading">
              Your Dream Event Starts With a Conversation.
            </h2>

            <p className="text-base sm:text-lg text-white font-normal leading-relaxed text-shadow-contrast">
              Tell us what you're planning, and let's create something memorable together.
            </p>

            <div className="p-6 rounded-2xl bg-black/60 border border-[#D4AF72]/30 space-y-4 shadow-xl">
              <p className="text-sm text-white/95 font-normal leading-relaxed text-shadow-contrast">
                Connect directly with our event director on WhatsApp for immediate date availability, decor
                consultations, and catering quotes.
              </p>

              {/* Direct WhatsApp Action Button */}
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 rounded-full text-sm font-semibold tracking-wider uppercase text-[#063B33] bg-gradient-to-r from-[#F4E8D3] via-[#D4AF72] to-[#C49B58] hover:from-white hover:to-[#D4AF72] shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 text-center"
              >
                <MessageCircle className="w-5 h-5 fill-[#063B33]/20" />
                <span>Book Your Event on WhatsApp</span>
              </a>

              <p className="text-[11px] text-[#D4AF72] font-semibold text-shadow-gold">
                Direct WhatsApp: {COMPANY_CONFIG.whatsappNumber}
              </p>
            </div>
          </div>

          {/* Right Column: Tailored Inquiry Composer */}
          <div className="lg:col-span-6">
            <div className="bg-black/60 rounded-3xl p-6 sm:p-8 border border-[#D4AF72]/40 shadow-2xl">
              <div className="mb-6">
                <span className="text-xs uppercase font-bold tracking-widest text-[#D4AF72] text-shadow-gold">
                  Quick Event Details
                </span>
                <h3 className="font-editorial text-2xl font-bold text-white mt-1 text-shadow-heading">
                  Compose WhatsApp Enquiry
                </h3>
                <p className="text-xs text-white/90 font-normal mt-1 text-shadow-contrast">
                  Fill in your requirements below to launch WhatsApp with your pre-composed message.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div>
                  <label htmlFor="client-name" className="block text-xs font-medium text-gray-300 mb-1">
                    Your Name
                  </label>
                  <input
                    id="client-name"
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/45 border border-white/20 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-[#D4AF72] focus:ring-1 focus:ring-[#D4AF72]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="event-type" className="block text-xs font-medium text-gray-300 mb-1">
                      Event Category
                    </label>
                    <select
                      id="event-type"
                      value={formData.eventType}
                      onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/45 border border-white/20 text-white text-sm focus:outline-none focus:border-[#D4AF72] focus:ring-1 focus:ring-[#D4AF72]"
                    >
                      <option value="Wedding" className="bg-[#063B33] text-white">Wedding Planning</option>
                      <option value="Engagement & Ring Ceremony" className="bg-[#063B33] text-white">Engagement / Ring Ceremony</option>
                      <option value="Birthday Celebration" className="bg-[#063B33] text-white">Birthday Celebration</option>
                      <option value="Corporate Event" className="bg-[#063B33] text-white">Corporate Gala / Event</option>
                      <option value="Catering Services" className="bg-[#063B33] text-white">Catering Services Only</option>
                      <option value="Special Custom Celebration" className="bg-[#063B33] text-white">Other Custom Celebration</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="event-date" className="block text-xs font-medium text-gray-300 mb-1">
                      Approximate Date
                    </label>
                    <input
                      id="event-date"
                      type="text"
                      placeholder="e.g. December 2026 / Nov 15"
                      value={formData.eventDate}
                      onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/45 border border-white/20 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-[#D4AF72] focus:ring-1 focus:ring-[#D4AF72]"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="guest-count" className="block text-xs font-medium text-gray-300 mb-1">
                    Estimated Guest Count
                  </label>
                  <input
                    id="guest-count"
                    type="text"
                    placeholder="e.g. 150 - 300 Guests"
                    value={formData.guestCount}
                    onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/45 border border-white/20 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-[#D4AF72] focus:ring-1 focus:ring-[#D4AF72]"
                  />
                </div>

                <div>
                  <label htmlFor="notes" className="block text-xs font-medium text-gray-300 mb-1">
                    Specific Vision or Requirements
                  </label>
                  <textarea
                    id="notes"
                    rows={3}
                    placeholder="Tell us about the venue, catering preferences, or decor style you envision..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/45 border border-white/20 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-[#D4AF72] focus:ring-1 focus:ring-[#D4AF72] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full text-xs font-semibold tracking-wider uppercase text-[#063B33] bg-gradient-to-r from-[#F4E8D3] via-[#D4AF72] to-[#C49B58] hover:from-white hover:to-[#D4AF72] shadow-lg transition-all duration-200 mt-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Enquiry via WhatsApp</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
