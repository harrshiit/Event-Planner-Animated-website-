import { safeMediaUrl } from './galleryData';

export interface ServiceItem {
  id: string;
  name: string;
  categoryKey: string;
  shortDescription: string;
  longDescription: string;
  image: string;
  features: string[];
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'weddings',
    name: 'Weddings',
    categoryKey: 'weddings',
    shortDescription:
      'Grand royal wedding decor, traditional mandap designs, seamless day-of management, and unforgettable ceremonies.',
    longDescription:
      'From opulent floral stages and entryways to complete ceremony coordination, we curate unforgettable wedding experiences that honor traditions with modern elegance.',
    image: safeMediaUrl('Weddings', 'WhatsApp Image 2026-10-05 at 22.12.57.jpeg'),
    features: ['Stage & Mandap Design', 'Bridal Entry & Theme Decor', 'Guest Hospitality & Flow'],
  },
  {
    id: 'engagements',
    name: 'Engagements & Ring Ceremonies',
    categoryKey: 'engagements',
    shortDescription:
      'Romantic stage backdrops, personalized photo booths, delicate floral styling, and memorable ring exchange moments.',
    longDescription:
      'Celebrate your milestone commitment with intimate, picturesque stage settings, fairy light canopies, and artistic styling that captures romance in every photograph.',
    image: safeMediaUrl('Engagements & Ring Ceremonies', 'WhatsApp Image 2026-10-08 at 23.52.54.jpeg'),
    features: ['Romantic Arch Backdrops', 'Custom Lighting Ambience', 'Stage Seating Styling'],
  },
  {
    id: 'birthdays',
    name: 'Birthday Celebrations',
    categoryKey: 'birthdays',
    shortDescription:
      'Themed milestones, sophisticated adult dinner parties, vibrant kid birthday setups, and custom dessert stages.',
    longDescription:
      'Whether a glamorous milestone 25th, 50th, or a cheerful family celebration, we design bespoke themes with vibrant balloons, florals, and dessert displays.',
    image: safeMediaUrl('Birthday Celebrations', 'WhatsApp Image 2026-10-08 at 23.59.54.jpeg'),
    features: ['Custom Thematic Decor', 'Dessert & Cake Stations', 'Entertainment & Sound Coordination'],
  },
  {
    id: 'corporate',
    name: 'Corporate Events',
    categoryKey: 'corporate',
    shortDescription:
      'Executive annual galas, award nights, product launches, corporate luncheons, and polished conference banquets.',
    longDescription:
      'Flawless execution for brand experiences and executive gatherings with punctual logistics, stage audiovisual setups, and refined corporate hospitality.',
    image: safeMediaUrl('Corporate Events', 'corporate-gala-stage-pexels-16120239.jpg'),
    features: ['Audio-Visual & Stage Management', 'Executive Gala Seating', 'Professional Coordination'],
  },
  {
    id: 'catering',
    name: 'Catering Services',
    categoryKey: 'catering',
    shortDescription:
      'Exquisite multi-cuisine royal banquets, live cooking counters, brass chafer displays, and gracious hospitality.',
    longDescription:
      'A culinary journey tailored to your guests, featuring authentic flavors, artistic buffet styling, hygienic food preparation, and courteous table service.',
    image: safeMediaUrl('Catering Services', 'catering-buffet-pexels-34307855.jpg'),
    features: ['Royal Buffet Styling', 'Live Gourmet Counters', 'Dedicated Service Staff'],
  },
  {
    id: 'special-custom',
    name: 'Special & Custom Celebrations',
    categoryKey: 'special-custom',
    shortDescription:
      'Anniversaries, baby showers, housewarmings, festive gatherings, and personalized intimate celebrations.',
    longDescription:
      'Every bond is unique. We tailor specialized event designs to bring family and friends together in warmth, elegance, and joyful harmony.',
    image: safeMediaUrl('Special & Custom Celebrations', 'baby-shower-balloons-pexels-20551991.jpg'),
    features: ['Tailored Theme Conception', 'Intimate Venue Styling', 'Personalized Details'],
  },
];
