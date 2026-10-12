export type CategoryKey =
  | 'all'
  | 'weddings'
  | 'engagements'
  | 'birthdays'
  | 'corporate'
  | 'catering'
  | 'special-custom'
  | 'other';

export interface GalleryCategoryMeta {
  key: CategoryKey;
  label: string;
  folderName: string;
  shortDescription: string;
}

export interface GalleryItem {
  id: string;
  category: 'weddings' | 'engagements' | 'birthdays' | 'corporate' | 'catering' | 'special-custom';
  categoryLabel: string;
  folderName: string;
  fileName: string;
  title: string;
  mediaType: 'image' | 'video';
  src: string;
  thumbnail: string;
  aspectRatio?: '16:9' | '4:3' | '3:4' | '1:1';
  alt: string;
  caption: string;
  isStockPhoto?: boolean;
}

/**
 * Safely constructs web URLs preserving folder and file names containing spaces and ampersands.
 */
export function safeMediaUrl(folder: string, fileName: string): string {
  return `/media/${encodeURI(folder)}/${encodeURI(fileName)}`;
}

export const GALLERY_CATEGORIES: GalleryCategoryMeta[] = [
  {
    key: 'all',
    label: 'All Celebrations',
    folderName: '',
    shortDescription: 'Comprehensive multimedia showcase of weddings, ceremonies, banquets, and milestone celebrations.',
  },
  {
    key: 'weddings',
    label: 'Weddings',
    folderName: 'Weddings',
    shortDescription: 'Grand royal mandap setups, floral stage architecture, bridal pathways, and ceremonial banquets.',
  },
  {
    key: 'engagements',
    label: 'Engagements & Ring Ceremonies',
    folderName: 'Engagements & Ring Ceremonies',
    shortDescription: 'Romantic floral arches, fairy light canopies, intimate couple stage seating, and ring exchange setups.',
  },
  {
    key: 'birthdays',
    label: 'Birthday Celebrations',
    folderName: 'Birthday Celebrations',
    shortDescription: 'Vibrant milestone celebrations, customized balloon installations, neon signage, and dessert podiums.',
  },
  {
    key: 'corporate',
    label: 'Corporate Events',
    folderName: 'Corporate Events',
    shortDescription: 'Executive conference dinners, annual galas, stage lighting, and professional formal dining concepts.',
  },
  {
    key: 'catering',
    label: 'Catering Services',
    folderName: 'Catering Services',
    shortDescription: 'Artisanal multi-cuisine buffets, royal chafer displays, gourmet grazing tables, and gracious table service.',
  },
  {
    key: 'special-custom',
    label: 'Special & Custom Celebrations',
    folderName: 'Special & Custom Celebrations',
    shortDescription: 'Bespoke baby showers, family reunions, housewarmings, anniversaries, and custom thematic styling.',
  },
];

export const GALLERY_DATA: GalleryItem[] = [
  // ==========================================
  // 1. WEDDINGS (13 Images + 5 Videos = 18 items)
  // Folder: "Weddings"
  // ==========================================
  {
    id: 'wed-img-01',
    category: 'weddings',
    categoryLabel: 'Weddings',
    folderName: 'Weddings',
    fileName: 'WhatsApp Image 2026-10-05 at 22.12.57.jpeg',
    title: 'Grand Royal Mandap & Ceremonial Stage Architecture',
    mediaType: 'image',
    src: safeMediaUrl('Weddings', 'WhatsApp Image 2026-10-05 at 22.12.57.jpeg'),
    thumbnail: safeMediaUrl('Weddings', 'WhatsApp Image 2026-10-05 at 22.12.57.jpeg'),
    aspectRatio: '16:9',
    alt: 'Royal mandap setup with golden pillars, crystal chandeliers, and lush floral draping',
    caption: 'Opulent ceremonial mandap featuring gold-accented pillars, crystal chandeliers, ivory floral draping, and royal ambient illumination.',
  },
  {
    id: 'wed-img-02',
    category: 'weddings',
    categoryLabel: 'Weddings',
    folderName: 'Weddings',
    fileName: 'WhatsApp Image 2026-10-05 at 22.12.58 (1).jpeg',
    title: 'Majestic Reception Stage & Chandelier Canopy',
    mediaType: 'image',
    src: safeMediaUrl('Weddings', 'WhatsApp Image 2026-10-05 at 22.12.58 (1).jpeg'),
    thumbnail: safeMediaUrl('Weddings', 'WhatsApp Image 2026-10-05 at 22.12.58 (1).jpeg'),
    aspectRatio: '16:9',
    alt: 'Reception stage with elevated flower columns and glowing chandeliers',
    caption: 'High-ceiling banquet hall transformation with suspended crystal chandeliers, theatrical stage lighting, and champagne drape styling.',
  },
  {
    id: 'wed-img-03',
    category: 'weddings',
    categoryLabel: 'Weddings',
    folderName: 'Weddings',
    fileName: 'WhatsApp Image 2026-10-05 at 22.12.58 (2).jpeg',
    title: 'Sacred Mandap Havankund & Ceremonial Seating',
    mediaType: 'image',
    src: safeMediaUrl('Weddings', 'WhatsApp Image 2026-10-05 at 22.12.58 (2).jpeg'),
    thumbnail: safeMediaUrl('Weddings', 'WhatsApp Image 2026-10-05 at 22.12.58 (2).jpeg'),
    aspectRatio: '4:3',
    alt: 'Traditional sacred wedding ritual mandap with fresh floral tassels',
    caption: 'Traditional sacred ritual setup with brass accents, fresh marigold borders, and comfortable royal seating for the couple and families.',
  },
  {
    id: 'wed-img-04',
    category: 'weddings',
    categoryLabel: 'Weddings',
    folderName: 'Weddings',
    fileName: 'WhatsApp Image 2026-10-05 at 22.12.58.jpeg',
    title: 'Bespoke Floral Stage Arch & Backdrop Draping',
    mediaType: 'image',
    src: safeMediaUrl('Weddings', 'WhatsApp Image 2026-10-05 at 22.12.58.jpeg'),
    thumbnail: safeMediaUrl('Weddings', 'WhatsApp Image 2026-10-05 at 22.12.58.jpeg'),
    aspectRatio: '4:3',
    alt: 'Sculpted floral backdrop arch with emerald fabric borders',
    caption: 'Layered velvet and gold backdrop framing an artistic floral arch composed of seasonal white blooms and romantic rose cascades.',
  },
  {
    id: 'wed-img-05',
    category: 'weddings',
    categoryLabel: 'Weddings',
    folderName: 'Weddings',
    fileName: 'WhatsApp Image 2026-10-05 at 22.12.59 (1).jpeg',
    title: 'Bridal Walkway & Golden Aisle Lighting',
    mediaType: 'image',
    src: safeMediaUrl('Weddings', 'WhatsApp Image 2026-10-05 at 22.12.59 (1).jpeg'),
    thumbnail: safeMediaUrl('Weddings', 'WhatsApp Image 2026-10-05 at 22.12.59 (1).jpeg'),
    aspectRatio: '4:3',
    alt: 'Illuminated wedding entrance walkway with decorated floral pedestals',
    caption: 'Luminous aisle styling flanked by botanical pedestals, warm fairy lighting, and golden brass lamps creating a grand entry pathway.',
  },
  {
    id: 'wed-img-06',
    category: 'weddings',
    categoryLabel: 'Weddings',
    folderName: 'Weddings',
    fileName: 'WhatsApp Image 2026-10-05 at 22.12.59 (2).jpeg',
    title: 'Floral Stage Pillars & Symmetrical Framing',
    mediaType: 'image',
    src: safeMediaUrl('Weddings', 'WhatsApp Image 2026-10-05 at 22.12.59 (2).jpeg'),
    thumbnail: safeMediaUrl('Weddings', 'WhatsApp Image 2026-10-05 at 22.12.59 (2).jpeg'),
    aspectRatio: '4:3',
    alt: 'Detailed view of lush floral columns on stage',
    caption: 'Meticulous architectural styling with towering floral columns creating an awe-inspiring focal point for wedding photography.',
  },
  {
    id: 'wed-img-07',
    category: 'weddings',
    categoryLabel: 'Weddings',
    folderName: 'Weddings',
    fileName: 'WhatsApp Image 2026-10-05 at 22.12.59.jpeg',
    title: 'Royal Couple Sofa Seating & Backdrop Detailing',
    mediaType: 'image',
    src: safeMediaUrl('Weddings', 'WhatsApp Image 2026-10-05 at 22.12.59.jpeg'),
    thumbnail: safeMediaUrl('Weddings', 'WhatsApp Image 2026-10-05 at 22.12.59.jpeg'),
    aspectRatio: '4:3',
    alt: 'Velvet couple throne with backlit gold panels and flower wall',
    caption: 'Plush gold-trimmed velvet seating against a radiant illuminated backdrop designed for family greetings and portrait sessions.',
  },
  {
    id: 'wed-img-08',
    category: 'weddings',
    categoryLabel: 'Weddings',
    folderName: 'Weddings',
    fileName: 'WhatsApp Image 2026-10-05 at 22.13.00 (1).jpeg',
    title: 'Vibrant Sangeet & Reception Illumination',
    mediaType: 'image',
    src: safeMediaUrl('Weddings', 'WhatsApp Image 2026-10-05 at 22.13.00 (1).jpeg'),
    thumbnail: safeMediaUrl('Weddings', 'WhatsApp Image 2026-10-05 at 22.13.00 (1).jpeg'),
    aspectRatio: '4:3',
    alt: 'Celebration hall illuminated with festive warm golden spotlights',
    caption: 'Dynamic LED stage lighting and golden ambient glow crafted to elevate the festive energy and evening performances.',
  },
  {
    id: 'wed-img-09',
    category: 'weddings',
    categoryLabel: 'Weddings',
    folderName: 'Weddings',
    fileName: 'WhatsApp Image 2026-10-05 at 22.13.00.jpeg',
    title: 'Grand Hall Overview & Banquet Symmetry',
    mediaType: 'image',
    src: safeMediaUrl('Weddings', 'WhatsApp Image 2026-10-05 at 22.13.00.jpeg'),
    thumbnail: safeMediaUrl('Weddings', 'WhatsApp Image 2026-10-05 at 22.13.00.jpeg'),
    aspectRatio: '16:9',
    alt: 'Full view of decorated wedding hall and guest banquet area',
    caption: 'Wide hall perspective showing the harmonious flow between guest banquet seating, ceremonial stage, and decorated pathways.',
  },
  {
    id: 'wed-img-10',
    category: 'weddings',
    categoryLabel: 'Weddings',
    folderName: 'Weddings',
    fileName: 'WhatsApp Image 2026-10-08 at 23.48.52 (1).jpeg',
    title: 'Artistic Floral Gate & Welcome Archway',
    mediaType: 'image',
    src: safeMediaUrl('Weddings', 'WhatsApp Image 2026-10-08 at 23.48.52 (1).jpeg'),
    thumbnail: safeMediaUrl('Weddings', 'WhatsApp Image 2026-10-08 at 23.48.52 (1).jpeg'),
    aspectRatio: '4:3',
    alt: 'Fresh floral entrance archway welcoming guests to wedding ceremony',
    caption: 'Spectacular entrance gate adorned with dense natural foliage and blush florals welcoming guests with majestic warmth.',
  },
  {
    id: 'wed-img-11',
    category: 'weddings',
    categoryLabel: 'Weddings',
    folderName: 'Weddings',
    fileName: 'WhatsApp Image 2026-10-08 at 23.48.52.jpeg',
    title: 'Intimate Mandap Canopy Detailing',
    mediaType: 'image',
    src: safeMediaUrl('Weddings', 'WhatsApp Image 2026-10-08 at 23.48.52.jpeg'),
    thumbnail: safeMediaUrl('Weddings', 'WhatsApp Image 2026-10-08 at 23.48.52.jpeg'),
    aspectRatio: '4:3',
    alt: 'Handcrafted floral roof canopy inside wedding mandap',
    caption: 'Close-up view of intricate floral tassels, hanging brass bells, and golden detailing enhancing traditional wedding rituals.',
  },
  {
    id: 'wed-img-12',
    category: 'weddings',
    categoryLabel: 'Weddings',
    folderName: 'Weddings',
    fileName: 'WhatsApp Image 2026-10-08 at 23.48.59.jpeg',
    title: 'Luxe Wedding Stage Panorama',
    mediaType: 'image',
    src: safeMediaUrl('Weddings', 'WhatsApp Image 2026-10-08 at 23.48.59.jpeg'),
    thumbnail: safeMediaUrl('Weddings', 'WhatsApp Image 2026-10-08 at 23.48.59.jpeg'),
    aspectRatio: '16:9',
    alt: 'Panoramic perspective of wedding reception stage setup',
    caption: 'Comprehensive stage setup showcasing multi-tier floral installations, golden balustrades, and soft ambient stage floodlights.',
  },
  {
    id: 'wed-img-13',
    category: 'weddings',
    categoryLabel: 'Weddings',
    folderName: 'Weddings',
    fileName: 'WhatsApp Image 2026-10-08 at 23.49.00.jpeg',
    title: 'Evening Wedding Reception Glow',
    mediaType: 'image',
    src: safeMediaUrl('Weddings', 'WhatsApp Image 2026-10-08 at 23.49.00.jpeg'),
    thumbnail: safeMediaUrl('Weddings', 'WhatsApp Image 2026-10-08 at 23.49.00.jpeg'),
    aspectRatio: '16:9',
    alt: 'Evening lighting illumination across decorated wedding stage',
    caption: 'Warm twilight atmosphere highlighting the rich golden and emerald brand color palette across the entire ceremonial venue.',
  },
  {
    id: 'wed-vid-01',
    category: 'weddings',
    categoryLabel: 'Weddings',
    folderName: 'Weddings',
    fileName: 'WhatsApp Video 2026-10-05 at 22.04.48.mp4',
    title: 'Grand Wedding Stage & Lighting Walkthrough',
    mediaType: 'video',
    src: safeMediaUrl('Weddings', 'WhatsApp Video 2026-10-05 at 22.04.48.mp4'),
    thumbnail: safeMediaUrl('Weddings', 'WhatsApp Image 2026-10-05 at 22.12.57.jpeg'),
    aspectRatio: '16:9',
    alt: 'Video walkthrough of grand wedding stage lighting and chandeliers',
    caption: 'Live video walkthrough capturing the dynamic scale, radiant chandeliers, and grand stage lighting of our wedding production.',
  },
  {
    id: 'wed-vid-02',
    category: 'weddings',
    categoryLabel: 'Weddings',
    folderName: 'Weddings',
    fileName: 'WhatsApp Video 2026-10-05 at 22.04.52.mp4',
    title: 'Mandap Floral Motion & Ambiance Reel',
    mediaType: 'video',
    src: safeMediaUrl('Weddings', 'WhatsApp Video 2026-10-05 at 22.04.52.mp4'),
    thumbnail: safeMediaUrl('Weddings', 'WhatsApp Image 2026-10-05 at 22.12.58.jpeg'),
    aspectRatio: '16:9',
    alt: 'Video clip demonstrating mandap flower decor and gentle hall motion',
    caption: 'Cinematic reel showcasing the depth and gentle movement of fresh floral draping under banquet hall spotlighting.',
  },
  {
    id: 'wed-vid-03',
    category: 'weddings',
    categoryLabel: 'Weddings',
    folderName: 'Weddings',
    fileName: 'WhatsApp Video 2026-10-05 at 22.05.03 (1).mp4',
    title: 'Royal Reception Hall Pan & Visual Flow',
    mediaType: 'video',
    src: safeMediaUrl('Weddings', 'WhatsApp Video 2026-10-05 at 22.05.03 (1).mp4'),
    thumbnail: safeMediaUrl('Weddings', 'WhatsApp Image 2026-10-05 at 22.13.00.jpeg'),
    aspectRatio: '16:9',
    alt: 'Video sweep showing reception hall layout and chandelier ceiling',
    caption: 'Full banquet hall scan demonstrating seamless guest flow, ceiling chandelier accents, and expansive stage presence.',
  },
  {
    id: 'wed-vid-04',
    category: 'weddings',
    categoryLabel: 'Weddings',
    folderName: 'Weddings',
    fileName: 'WhatsApp Video 2026-10-05 at 22.05.03.mp4',
    title: 'Ceremonial Mandap Evening Glow',
    mediaType: 'video',
    src: safeMediaUrl('Weddings', 'WhatsApp Video 2026-10-05 at 22.05.03.mp4'),
    thumbnail: safeMediaUrl('Weddings', 'WhatsApp Image 2026-10-05 at 22.12.58 (2).jpeg'),
    aspectRatio: '16:9',
    alt: 'Video footage of mandap ritual area illuminated for evening ceremony',
    caption: 'Video showcase of the sacred mandap as twilight descends, highlighting candlelight accents and golden glow.',
  },
  {
    id: 'wed-vid-05',
    category: 'weddings',
    categoryLabel: 'Weddings',
    folderName: 'Weddings',
    fileName: 'WhatsApp Video 2026-10-08 at 23.48.59.mp4',
    title: 'Complete Wedding Stage Tour & Entrance Flow',
    mediaType: 'video',
    src: safeMediaUrl('Weddings', 'WhatsApp Video 2026-10-08 at 23.48.59.mp4'),
    thumbnail: safeMediaUrl('Weddings', 'WhatsApp Image 2026-10-08 at 23.48.59.jpeg'),
    aspectRatio: '16:9',
    alt: 'Video walkthrough of wedding aisle and main backdrop stage',
    caption: 'High-definition walkthrough of the bridal entry aisle leading seamlessly to the royal wedding stage.',
  },

  // ==========================================
  // 2. ENGAGEMENTS & RING CEREMONIES (3 Images + 1 Video = 4 items)
  // Folder: "Engagements & Ring Ceremonies"
  // ==========================================
  {
    id: 'eng-img-01',
    category: 'engagements',
    categoryLabel: 'Engagements & Ring Ceremonies',
    folderName: 'Engagements & Ring Ceremonies',
    fileName: 'WhatsApp Image 2026-10-08 at 23.52.54.jpeg',
    title: 'Romantic Floral Ring Ceremony Backdrop',
    mediaType: 'image',
    src: safeMediaUrl('Engagements & Ring Ceremonies', 'WhatsApp Image 2026-10-08 at 23.52.54.jpeg'),
    thumbnail: safeMediaUrl('Engagements & Ring Ceremonies', 'WhatsApp Image 2026-10-08 at 23.52.54.jpeg'),
    aspectRatio: '4:3',
    alt: 'Delicate floral arch backdrop for engagement ceremony',
    caption: 'Delicate circular floral arch framed by fairy light curtains and warm candle stands for an intimate ring exchange.',
  },
  {
    id: 'eng-img-02',
    category: 'engagements',
    categoryLabel: 'Engagements & Ring Ceremonies',
    folderName: 'Engagements & Ring Ceremonies',
    fileName: 'WhatsApp Image 2026-10-08 at 23.52.54 (1).jpeg',
    title: 'Champagne Rose Arch & Custom Couple Seating',
    mediaType: 'image',
    src: safeMediaUrl('Engagements & Ring Ceremonies', 'WhatsApp Image 2026-10-08 at 23.52.54 (1).jpeg'),
    thumbnail: safeMediaUrl('Engagements & Ring Ceremonies', 'WhatsApp Image 2026-10-08 at 23.52.54 (1).jpeg'),
    aspectRatio: '4:3',
    alt: 'Engagement couple sofa with rose accents and warm backlight',
    caption: 'Bespoke ivory and gold seating arrangement accented with champagne florals and soft romantic backlighting.',
  },
  {
    id: 'eng-img-03',
    category: 'engagements',
    categoryLabel: 'Engagements & Ring Ceremonies',
    folderName: 'Engagements & Ring Ceremonies',
    fileName: 'WhatsApp Image 2026-10-08 at 23.52.55.jpeg',
    title: 'Enchanted Fairy Light Canopy & Stage Styling',
    mediaType: 'image',
    src: safeMediaUrl('Engagements & Ring Ceremonies', 'WhatsApp Image 2026-10-08 at 23.52.55.jpeg'),
    thumbnail: safeMediaUrl('Engagements & Ring Ceremonies', 'WhatsApp Image 2026-10-08 at 23.52.55.jpeg'),
    aspectRatio: '4:3',
    alt: 'Canopy of sparkling fairy lights above engagement stage',
    caption: 'Stunning overhead fairy light installation casting a warm, romantic aura across the entire engagement stage.',
  },
  {
    id: 'eng-vid-01',
    category: 'engagements',
    categoryLabel: 'Engagements & Ring Ceremonies',
    folderName: 'Engagements & Ring Ceremonies',
    fileName: 'WhatsApp Video 2026-10-08 at 23.52.53.mp4',
    title: 'Engagement Stage Atmosphere & Entry Reel',
    mediaType: 'video',
    src: safeMediaUrl('Engagements & Ring Ceremonies', 'WhatsApp Video 2026-10-08 at 23.52.53.mp4'),
    thumbnail: safeMediaUrl('Engagements & Ring Ceremonies', 'WhatsApp Image 2026-10-08 at 23.52.54.jpeg'),
    aspectRatio: '16:9',
    alt: 'Video reel highlighting romantic engagement decor and fairy lighting',
    caption: 'Video reel featuring the intimate glow, fairy lights, and musical ambience of our engagement ceremony setup.',
  },

  // ==========================================
  // 3. BIRTHDAY CELEBRATIONS (3 Images + 1 Video = 4 items)
  // Folder: "Birthday Celebrations"
  // ==========================================
  {
    id: 'bday-img-01',
    category: 'birthdays',
    categoryLabel: 'Birthday Celebrations',
    folderName: 'Birthday Celebrations',
    fileName: 'WhatsApp Image 2026-10-08 at 23.59.53.jpeg',
    title: 'Vibrant Milestone Birthday Stage & Balloon Arch',
    mediaType: 'image',
    src: safeMediaUrl('Birthday Celebrations', 'WhatsApp Image 2026-10-08 at 23.59.53.jpeg'),
    thumbnail: safeMediaUrl('Birthday Celebrations', 'WhatsApp Image 2026-10-08 at 23.59.53.jpeg'),
    aspectRatio: '4:3',
    alt: 'Custom birthday balloon decor with festive illuminated arch',
    caption: 'Contemporary celebration backdrop featuring organic balloon garlands, neon signage, and thematic floral accents.',
  },
  {
    id: 'bday-img-02',
    category: 'birthdays',
    categoryLabel: 'Birthday Celebrations',
    folderName: 'Birthday Celebrations',
    fileName: 'WhatsApp Image 2026-10-08 at 23.59.54.jpeg',
    title: 'Luxe Birthday Dessert & Cake Pedestal Setup',
    mediaType: 'image',
    src: safeMediaUrl('Birthday Celebrations', 'WhatsApp Image 2026-10-08 at 23.59.54.jpeg'),
    thumbnail: safeMediaUrl('Birthday Celebrations', 'WhatsApp Image 2026-10-08 at 23.59.54.jpeg'),
    aspectRatio: '4:3',
    alt: 'Decorated cake pedestal and dessert display for birthday celebration',
    caption: 'Dedicated cake-cutting podium framed with customized decorative pedestals and warm golden mood lighting.',
  },
  {
    id: 'bday-img-03',
    category: 'birthdays',
    categoryLabel: 'Birthday Celebrations',
    folderName: 'Birthday Celebrations',
    fileName: 'WhatsApp Image 2026-10-08 at 23.59.54 (1).jpeg',
    title: 'Thematic Photo Booth & Celebration Details',
    mediaType: 'image',
    src: safeMediaUrl('Birthday Celebrations', 'WhatsApp Image 2026-10-08 at 23.59.54 (1).jpeg'),
    thumbnail: safeMediaUrl('Birthday Celebrations', 'WhatsApp Image 2026-10-08 at 23.59.54 (1).jpeg'),
    aspectRatio: '4:3',
    alt: 'Birthday party photo booth with colorful balloons and party lighting',
    caption: 'Interactive photo zone designed for memorable guest selfies and festive family portraits.',
  },
  {
    id: 'bday-vid-01',
    category: 'birthdays',
    categoryLabel: 'Birthday Celebrations',
    folderName: 'Birthday Celebrations',
    fileName: 'WhatsApp Video 2026-10-08 at 23.59.53.mp4',
    title: 'Festive Birthday Party Walkthrough & Lights Reel',
    mediaType: 'video',
    src: safeMediaUrl('Birthday Celebrations', 'WhatsApp Video 2026-10-08 at 23.59.53.mp4'),
    thumbnail: safeMediaUrl('Birthday Celebrations', 'WhatsApp Image 2026-10-08 at 23.59.54.jpeg'),
    aspectRatio: '16:9',
    alt: 'Video walkthrough of festive birthday stage and balloon backdrop',
    caption: 'Lively video tour showing the balloon sculptures, ambient stage glow, and celebratory party setting.',
  },

  // ==========================================
  // 4. CORPORATE EVENTS (2 Images = 2 items)
  // Folder: "Corporate Events" (Pexels Stock Reference)
  // ==========================================
  {
    id: 'corp-img-01',
    category: 'corporate',
    categoryLabel: 'Corporate Events',
    folderName: 'Corporate Events',
    fileName: 'corporate-gala-stage-pexels-16120239.jpg',
    title: 'Executive Gala Stage & Lighting Design Concept',
    mediaType: 'image',
    src: safeMediaUrl('Corporate Events', 'corporate-gala-stage-pexels-16120239.jpg'),
    thumbnail: safeMediaUrl('Corporate Events', 'corporate-gala-stage-pexels-16120239.jpg'),
    aspectRatio: '16:9',
    alt: 'Executive gala stage setup with professional lighting and formal banquet seating',
    caption: 'Curated aesthetic layout demonstrating stage lighting and seating possibilities for corporate annual galas.',
    isStockPhoto: true,
  },
  {
    id: 'corp-img-02',
    category: 'corporate',
    categoryLabel: 'Corporate Events',
    folderName: 'Corporate Events',
    fileName: 'corporate-event-banquet-pexels-38446275.jpg',
    title: 'Corporate Banquet & Conference Dining Concept',
    mediaType: 'image',
    src: safeMediaUrl('Corporate Events', 'corporate-event-banquet-pexels-38446275.jpg'),
    thumbnail: safeMediaUrl('Corporate Events', 'corporate-event-banquet-pexels-38446275.jpg'),
    aspectRatio: '16:9',
    alt: 'Formal corporate banquet hall arrangement with fine table settings',
    caption: 'Inspirational formal dining setup illustrating refined seating arrangements and professional event ambience.',
    isStockPhoto: true,
  },

  // ==========================================
  // 5. CATERING SERVICES (2 Images = 2 items)
  // Folder: "Catering Services" (Pexels Stock Reference)
  // ==========================================
  {
    id: 'cat-img-01',
    category: 'catering',
    categoryLabel: 'Catering Services',
    folderName: 'Catering Services',
    fileName: 'catering-buffet-pexels-34307855.jpg',
    title: 'Artisanal Buffet & Fine Dining Setup Concept',
    mediaType: 'image',
    src: safeMediaUrl('Catering Services', 'catering-buffet-pexels-34307855.jpg'),
    thumbnail: safeMediaUrl('Catering Services', 'catering-buffet-pexels-34307855.jpg'),
    aspectRatio: '16:9',
    alt: 'Gourmet buffet catering display with fresh salads and curated warm dishes',
    caption: 'Curated catering display concept showcasing gourmet buffet styling, fresh presentation, and attentive service flow.',
    isStockPhoto: true,
  },
  {
    id: 'cat-img-02',
    category: 'catering',
    categoryLabel: 'Catering Services',
    folderName: 'Catering Services',
    fileName: 'catering-board-pexels-37382218.jpg',
    title: 'Gourmet Charcuterie & Grazing Table Concept',
    mediaType: 'image',
    src: safeMediaUrl('Catering Services', 'catering-board-pexels-37382218.jpg'),
    thumbnail: safeMediaUrl('Catering Services', 'catering-board-pexels-37382218.jpg'),
    aspectRatio: '16:9',
    alt: 'Artisan appetizers and grazing table with cheeses and fresh seasonal fruits',
    caption: 'Inspirational culinary presentation illustrating artisanal appetizers and creative live food station styling.',
    isStockPhoto: true,
  },

  // ==========================================
  // 6. SPECIAL & CUSTOM CELEBRATIONS (2 Images = 2 items)
  // Folder: "Special & Custom Celebrations" (Pexels Stock Reference)
  // ==========================================
  {
    id: 'oth-img-01',
    category: 'special-custom',
    categoryLabel: 'Special & Custom Celebrations',
    folderName: 'Special & Custom Celebrations',
    fileName: 'baby-shower-balloons-pexels-20551991.jpg',
    title: 'Pastel Balloon Arch & Celebration Backdrop Concept',
    mediaType: 'image',
    src: safeMediaUrl('Special & Custom Celebrations', 'baby-shower-balloons-pexels-20551991.jpg'),
    thumbnail: safeMediaUrl('Special & Custom Celebrations', 'baby-shower-balloons-pexels-20551991.jpg'),
    aspectRatio: '16:9',
    alt: 'Pastel organic balloon installation for baby shower or family celebration',
    caption: 'Design inspiration featuring soft pastel organic balloon styling for baby showers, welcome celebrations, and milestone anniversaries.',
    isStockPhoto: true,
  },
  {
    id: 'oth-img-02',
    category: 'special-custom',
    categoryLabel: 'Special & Custom Celebrations',
    folderName: 'Special & Custom Celebrations',
    fileName: 'baby-shower-teddy-bears-pexels-37385721.jpg',
    title: 'Thematic Teddy Bear & Floral Stage Concept',
    mediaType: 'image',
    src: safeMediaUrl('Special & Custom Celebrations', 'baby-shower-teddy-bears-pexels-37385721.jpg'),
    thumbnail: safeMediaUrl('Special & Custom Celebrations', 'baby-shower-teddy-bears-pexels-37385721.jpg'),
    aspectRatio: '16:9',
    alt: 'Charming teddy bear themed stage decor with flowers and warm lighting',
    caption: 'Whimsical celebration design concept showcasing bespoke teddy bear motifs, floral cascades, and warm ambient lighting.',
    isStockPhoto: true,
  },
];

/**
 * Normalizes category key, mapping legacy 'other' to 'special-custom'
 */
export function normalizeCategoryKey(key: string): CategoryKey {
  if (key === 'other') return 'special-custom';
  return key as CategoryKey;
}

/**
 * Returns all media items for a given category key ('all' returns everything)
 */
export function getItemsByCategory(categoryKey: string): GalleryItem[] {
  const normKey = normalizeCategoryKey(categoryKey);
  if (normKey === 'all') return GALLERY_DATA;
  return GALLERY_DATA.filter((item) => item.category === normKey);
}

/**
 * Returns breakdown counts (total, images, videos) for a category
 */
export function getCategoryMediaCounts(categoryKey: string) {
  const items = getItemsByCategory(categoryKey);
  const images = items.filter((i) => i.mediaType === 'image').length;
  const videos = items.filter((i) => i.mediaType === 'video').length;
  return {
    total: items.length,
    images,
    videos,
  };
}
