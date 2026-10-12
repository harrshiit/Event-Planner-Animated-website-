import React from 'react';
import { COMPANY_CONFIG } from '../data/companyConfig';
import { ExternalLink, Instagram } from 'lucide-react';

export const InstagramQrCard: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div
      className={`relative rounded-3xl p-6 sm:p-8 overflow-hidden shadow-2xl bg-gradient-to-br from-[#FED373] via-[#F15245] to-[#D92E7F] text-center max-w-sm mx-auto ${className}`}
    >
      {/* Decorative background glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/20 pointer-events-none" />

      {/* Inner White QR Card */}
      <div className="relative bg-white rounded-2xl p-5 sm:p-6 shadow-xl border border-white/60 mx-auto">
        {/* Instagram Header Badge */}
        <div className="flex items-center justify-between mb-4 px-1">
          <div className="flex items-center gap-1.5 text-[#D92E7F] font-semibold text-xs tracking-wider uppercase">
            <Instagram className="w-4 h-4" />
            <span>Scan to Follow</span>
          </div>
          <span className="text-[10px] text-gray-400 font-medium tracking-widest uppercase">Official</span>
        </div>

        {/* QR Code Graphic with corner markers & central Instagram glyph */}
        <div className="relative p-2 bg-white rounded-xl aspect-square flex items-center justify-center border border-gray-100">
          <svg className="w-full h-full" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="igGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F58529" />
                <stop offset="50%" stopColor="#DD2A7B" />
                <stop offset="100%" stopColor="#8134AF" />
              </linearGradient>
            </defs>

            {/* Top-Left Position Detection Marker */}
            <rect x="15" y="15" width="46" height="46" rx="10" stroke="url(#igGrad)" strokeWidth="6" fill="none" />
            <rect x="27" y="27" width="22" height="22" rx="4" fill="url(#igGrad)" />

            {/* Top-Right Position Detection Marker */}
            <rect x="139" y="15" width="46" height="46" rx="10" stroke="url(#igGrad)" strokeWidth="6" fill="none" />
            <rect x="151" y="27" width="22" height="22" rx="4" fill="url(#igGrad)" />

            {/* Bottom-Left Position Detection Marker */}
            <rect x="15" y="139" width="46" height="46" rx="10" stroke="url(#igGrad)" strokeWidth="6" fill="none" />
            <rect x="27" y="151" width="22" height="22" rx="4" fill="url(#igGrad)" />

            {/* Authentic Data Matrix Scatter Pattern (stylized dots) */}
            <g fill="url(#igGrad)">
              {/* Row 1 */}
              <circle cx="70" cy="20" r="3" />
              <circle cx="85" cy="20" r="3" />
              <circle cx="100" cy="20" r="3" />
              <circle cx="115" cy="20" r="3" />
              <circle cx="125" cy="28" r="3" />
              {/* Row 2 */}
              <circle cx="75" cy="35" r="3.5" />
              <circle cx="95" cy="35" r="3.5" />
              <circle cx="115" cy="35" r="3.5" />
              {/* Row 3 */}
              <circle cx="70" cy="50" r="3" />
              <circle cx="85" cy="50" r="3" />
              <circle cx="110" cy="50" r="3" />
              <circle cx="125" cy="50" r="3" />

              {/* Side Columns */}
              <circle cx="20" cy="72" r="3.2" />
              <circle cx="35" cy="72" r="3.2" />
              <circle cx="50" cy="72" r="3.2" />
              <circle cx="20" cy="88" r="3.2" />
              <circle cx="40" cy="88" r="3.2" />
              <circle cx="20" cy="104" r="3.2" />
              <circle cx="35" cy="104" r="3.2" />
              <circle cx="50" cy="104" r="3.2" />
              <circle cx="30" cy="120" r="3.2" />

              <circle cx="150" cy="72" r="3.2" />
              <circle cx="165" cy="72" r="3.2" />
              <circle cx="180" cy="72" r="3.2" />
              <circle cx="160" cy="88" r="3.2" />
              <circle cx="178" cy="88" r="3.2" />
              <circle cx="150" cy="104" r="3.2" />
              <circle cx="170" cy="104" r="3.2" />
              <circle cx="160" cy="120" r="3.2" />
              <circle cx="175" cy="120" r="3.2" />

              {/* Bottom Right Quadrant */}
              <circle cx="75" cy="145" r="3.5" />
              <circle cx="95" cy="145" r="3.5" />
              <circle cx="115" cy="145" r="3.5" />
              <circle cx="135" cy="145" r="3.5" />
              <circle cx="155" cy="145" r="3.5" />
              <circle cx="175" cy="145" r="3.5" />

              <circle cx="80" cy="165" r="3.5" />
              <circle cx="100" cy="165" r="3.5" />
              <circle cx="120" cy="165" r="3.5" />
              <circle cx="140" cy="165" r="3.5" />
              <circle cx="160" cy="165" r="3.5" />
              <circle cx="180" cy="165" r="3.5" />

              <circle cx="75" cy="180" r="3.5" />
              <circle cx="95" cy="180" r="3.5" />
              <circle cx="115" cy="180" r="3.5" />
              <circle cx="135" cy="180" r="3.5" />
              <circle cx="155" cy="180" r="3.5" />
              <circle cx="175" cy="180" r="3.5" />
            </g>

            {/* Central Instagram Emblem Badge */}
            <rect x="76" y="76" width="48" height="48" rx="12" fill="white" />
            <rect x="80" y="80" width="40" height="40" rx="10" stroke="url(#igGrad)" strokeWidth="4" fill="none" />
            <circle cx="100" cy="100" r="8" stroke="url(#igGrad)" strokeWidth="3.5" fill="none" />
            <circle cx="112" cy="88" r="2.2" fill="url(#igGrad)" />
          </svg>
        </div>

        {/* Username Banner */}
        <div className="mt-4 pt-3 border-t border-gray-100">
          <p className="font-bold text-base sm:text-lg tracking-wide bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] bg-clip-text text-transparent uppercase">
            {COMPANY_CONFIG.instagramHandle}
          </p>
        </div>
      </div>

      {/* Direct Interactive Instagram Link */}
      <a
        href={COMPANY_CONFIG.instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-white/20 hover:bg-white/30 text-white font-medium text-xs tracking-wider uppercase transition-all backdrop-blur-sm border border-white/30 focus-visible:ring-2 focus-visible:ring-white"
      >
        <span>Open In Instagram</span>
        <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </div>
  );
};
