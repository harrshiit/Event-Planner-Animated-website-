import React, { useState } from 'react';
import sgLogoImg from '../assets/images/sg_event_planner_logo_1791458315006.jpg';

export const SG_LOGO_ASSET = sgLogoImg;

interface SgLogoProps {
  variant?: 'full' | 'crest' | 'wordmark';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const SgLogo: React.FC<SgLogoProps> = ({
  variant = 'full',
  className = '',
  size = 'md',
}) => {
  const [imageError, setImageError] = useState(false);

  const sizeMap = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-24 h-24',
    xl: 'w-36 h-36',
  };

  if (variant === 'wordmark') {
    return (
      <div className={`inline-flex flex-col ${className}`}>
        <span className="font-editorial text-xl sm:text-2xl font-bold tracking-[0.18em] text-[#D4AF72] uppercase leading-none">
          SG EVENT PLANNER
        </span>
        <span className="text-[9px] sm:text-[10px] tracking-[0.24em] text-[#D4AF72]/80 uppercase font-medium mt-1">
          Spread Love With Strong Bonding
        </span>
      </div>
    );
  }

  if (variant === 'crest') {
    return (
      <div
        className={`relative inline-block rounded-full p-0.5 bg-gradient-to-tr from-[#8A642B] via-[#D4AF72] to-[#FFF2D6] shadow-md overflow-hidden shrink-0 ${sizeMap[size]} ${className}`}
      >
        <div className="w-full h-full rounded-full overflow-hidden bg-[#063B33] flex items-center justify-center">
          {!imageError ? (
            <img
              src={SG_LOGO_ASSET}
              alt="SG Event Planner Emblem"
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover scale-110"
            />
          ) : (
            <svg
              className="w-full h-full p-1"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="goldGradCrest" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFF2D6" />
                  <stop offset="40%" stopColor="#D4AF72" />
                  <stop offset="100%" stopColor="#8A642B" />
                </linearGradient>
              </defs>
              <circle cx="50" cy="50" r="46" fill="#075546" stroke="url(#goldGradCrest)" strokeWidth="2" />
              <path
                d="M 30 70 L 30 42 A 20 20 0 0 1 70 42 L 70 70 Z"
                fill="none"
                stroke="url(#goldGradCrest)"
                strokeWidth="2.5"
              />
              <polygon points="50,18 54,22 50,26 46,22" fill="#FFFFFF" stroke="url(#goldGradCrest)" strokeWidth="0.8" />
              <path
                d="M 46 36 C 38 36 34 40 34 46 C 34 52 44 54 44 60 C 44 64 40 66 34 65"
                fill="none"
                stroke="url(#goldGradCrest)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M 54 48 C 50 42 46 41 42 41 C 35 41 34 47 34 55 C 34 63 40 66 48 66 C 56 66 58 61 58 55 L 48 55"
                fill="none"
                stroke="url(#goldGradCrest)"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          )}
        </div>
      </div>
    );
  }

  // Full Brand Emblem Badge (faithfully showcasing the exact original logo artwork)
  return (
    <div
      className={`relative inline-block rounded-3xl overflow-hidden shadow-2xl border-2 border-[#D4AF72]/60 p-2 sm:p-3 bg-gradient-to-br from-[#8A642B] via-[#D4AF72] to-[#FFF4DE] ${className}`}
    >
      <div className="relative rounded-2xl overflow-hidden bg-[#063B33] shadow-inner">
        {!imageError ? (
          <img
            src={SG_LOGO_ASSET}
            alt="SG Event Planner Official Logo - Spread Love With Strong Bonding"
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-auto max-w-sm mx-auto object-cover rounded-2xl shadow-2xl transition-transform duration-500 hover:scale-102"
          />
        ) : (
          <div className="p-6 bg-[#075546]">
            <svg
              className="w-48 h-56 mx-auto drop-shadow-2xl"
              viewBox="0 0 240 260"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="gold3dFallback" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFF4DE" />
                  <stop offset="25%" stopColor="#E5C287" />
                  <stop offset="60%" stopColor="#D4AF72" />
                  <stop offset="100%" stopColor="#8A642B" />
                </linearGradient>
              </defs>
              <path
                d="M 45 195 L 45 95 A 75 75 0 0 1 195 95 L 195 195 Z"
                fill="none"
                stroke="url(#gold3dFallback)"
                strokeWidth="6"
              />
              <text
                x="120"
                y="201"
                textAnchor="middle"
                fontFamily="'Playfair Display', Georgia, serif"
                fontSize="12.5"
                fontWeight="bold"
                fill="url(#gold3dFallback)"
              >
                EVENT PLANNER
              </text>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

