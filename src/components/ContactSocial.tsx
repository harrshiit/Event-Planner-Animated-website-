import React from 'react';
import { COMPANY_CONFIG } from '../data/companyConfig';
import { InstagramQrCard } from './InstagramQrCard';
import { MessageCircle, Phone, Mail, Instagram, Sparkles, ExternalLink } from 'lucide-react';

export const ContactSocial: React.FC = () => {
  return (
    <section id="contact" className="py-20 lg:py-28 bg-black/20 text-[#F7F3ED] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 bg-black/40 p-6 sm:p-8 rounded-3xl border border-[#D4AF72]/25 shadow-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-[#D4AF72] text-shadow-gold">
            <Sparkles className="w-4 h-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]" />
            <span>Connect With Us</span>
          </div>

          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight text-shadow-heading">
            Let's Plan Your Next Milestone
          </h2>

          <p className="text-base sm:text-lg text-white font-normal leading-relaxed text-shadow-contrast">
            Reach out via WhatsApp, phone, email, or explore our latest celebration reels on Instagram.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Direct Contact Channels */}
          <div className="lg:col-span-7 space-y-6">
            {/* WhatsApp Card */}
            <a
              href={COMPANY_CONFIG.whatsappBaseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 sm:p-7 rounded-3xl bg-black/50 border border-[#D4AF72]/30 hover:border-[#D4AF72] hover:bg-black/65 hover:shadow-2xl transition-all duration-300 flex items-start justify-between group block"
            >
              <div className="flex items-start gap-4">
                <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#063B33] to-[#075546] border border-[#D4AF72]/40 text-[#D4AF72] group-hover:scale-105 transition-transform shadow-md">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold tracking-wider uppercase text-[#D4AF72] text-shadow-gold">
                    Primary Contact
                  </span>
                  <h3 className="font-editorial text-xl font-bold text-white mt-0.5 text-shadow-heading">
                    Message Us on WhatsApp
                  </h3>
                  <p className="text-sm font-semibold text-white mt-1 text-shadow-contrast">
                    {COMPANY_CONFIG.whatsappNumber}
                  </p>
                  <p className="text-xs text-white/90 mt-1 font-normal text-shadow-contrast">
                    Fast response for dates, quotes, catering discussions & venue visits.
                  </p>
                </div>
              </div>
              <ExternalLink className="w-5 h-5 text-[#D4AF72]/60 group-hover:text-[#D4AF72] transition-colors shrink-0 mt-1" />
            </a>

            {/* Direct Phone Call Card */}
            <a
              href={`tel:${COMPANY_CONFIG.phoneClean}`}
              className="p-6 sm:p-7 rounded-3xl bg-black/50 border border-[#D4AF72]/30 hover:border-[#D4AF72] hover:bg-black/65 hover:shadow-2xl transition-all duration-300 flex items-start justify-between group block"
            >
              <div className="flex items-start gap-4">
                <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#063B33] to-[#075546] border border-[#D4AF72]/40 text-[#D4AF72] group-hover:scale-105 transition-transform shadow-md">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold tracking-wider uppercase text-[#D4AF72] text-shadow-gold">
                    Direct Call
                  </span>
                  <h3 className="font-editorial text-xl font-bold text-white mt-0.5 text-shadow-heading">
                    Speak Directly With Us
                  </h3>
                  <p className="text-sm font-semibold text-white mt-1 text-shadow-contrast">
                    {COMPANY_CONFIG.phone}
                  </p>
                  <p className="text-xs text-white/90 mt-1 font-normal text-shadow-contrast">
                    Available for consultations, event queries, and emergency date bookings.
                  </p>
                </div>
              </div>
              <ExternalLink className="w-5 h-5 text-[#D4AF72]/60 group-hover:text-[#D4AF72] transition-colors shrink-0 mt-1" />
            </a>

            {/* Email Card */}
            <a
              href={`mailto:${COMPANY_CONFIG.email}`}
              className="p-6 sm:p-7 rounded-3xl bg-black/50 border border-[#D4AF72]/30 hover:border-[#D4AF72] hover:bg-black/65 hover:shadow-2xl transition-all duration-300 flex items-start justify-between group block"
            >
              <div className="flex items-start gap-4">
                <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#063B33] to-[#075546] border border-[#D4AF72]/40 text-[#D4AF72] group-hover:scale-105 transition-transform shadow-md">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold tracking-wider uppercase text-[#D4AF72] text-shadow-gold">
                    Formal Correspondence
                  </span>
                  <h3 className="font-editorial text-xl font-bold text-white mt-0.5 text-shadow-heading">
                    Email Us
                  </h3>
                  <p className="text-sm font-semibold text-white mt-1 break-all text-shadow-contrast">
                    {COMPANY_CONFIG.email}
                  </p>
                  <p className="text-xs text-white/90 mt-1 font-normal text-shadow-contrast">
                    Share your detailed event briefs, vendor requests, or corporate RFPs.
                  </p>
                </div>
              </div>
              <ExternalLink className="w-5 h-5 text-[#D4AF72]/60 group-hover:text-[#D4AF72] transition-colors shrink-0 mt-1" />
            </a>

            {/* Instagram Profile Card */}
            <a
              href={COMPANY_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 sm:p-7 rounded-3xl bg-black/50 border border-[#D4AF72]/30 hover:border-[#D4AF72] hover:bg-black/65 hover:shadow-2xl transition-all duration-300 flex items-start justify-between group block"
            >
              <div className="flex items-start gap-4">
                <div className="p-3.5 rounded-2xl bg-gradient-to-tr from-[#FED373] via-[#F15245] to-[#D92E7F] text-white group-hover:scale-105 transition-transform shadow-md">
                  <Instagram className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold tracking-wider uppercase text-[#D4AF72]">
                    Social Gallery
                  </span>
                  <h3 className="font-editorial text-xl font-bold text-white mt-0.5">
                    Follow Us on Instagram
                  </h3>
                  <p className="text-sm font-semibold text-[#F4E8D3] mt-1">
                    {COMPANY_CONFIG.instagramHandle}
                  </p>
                  <p className="text-xs text-[#F4E8D3]/75 mt-1 font-light">
                    Daily stories, live ceremony decor reels & behind-the-scenes glimpses.
                  </p>
                </div>
              </div>
              <ExternalLink className="w-5 h-5 text-[#D4AF72]/60 group-hover:text-[#D4AF72] transition-colors shrink-0 mt-1" />
            </a>
          </div>

          {/* Right Column: Scan to Follow Instagram QR Component */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <InstagramQrCard />
            <p className="text-xs text-[#F4E8D3]/75 text-center mt-4 max-w-xs font-light">
              Scan with your mobile camera or tap to follow our official Instagram page for the latest decor stories.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
