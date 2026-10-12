/**
 * Centralized Company Configuration for SG EVENT PLANNER
 * All business details, contact information, and WhatsApp generators are maintained here.
 */

export const COMPANY_CONFIG = {
  name: 'SG EVENT PLANNER',
  tagline: 'Spread Love With Strong Bonding',
  industry: 'Event Planning, Event Management, Wedding Celebrations, and Catering Services',
  phone: '+91 8512072004',
  phoneClean: '918512072004',
  whatsappNumber: '+91 8512072004',
  whatsappClean: '918512072004',
  email: 'info.shadeeghar@gmail.com',
  instagramHandle: '@sgevent_planner',
  instagramUrl: 'https://www.instagram.com/sgevent_planner/',
  whatsappBaseUrl: 'https://wa.me/918512072004',
  developerCredit: {
    text: 'Designed & Developed by Coder Bhai Enterprises',
    companyName: 'Coder Bhai Enterprises',
    email: 'coderbhai188@gmail.com',
  },
} as const;

/**
 * Generate WhatsApp URL with pre-filled inquiry text
 */
export function getWhatsAppUrl(customMessage?: string): string {
  const defaultMessage =
    'Hello SG Event Planner! I would like to enquire about planning an event. Please share the details.';
  const message = customMessage || defaultMessage;
  return `https://wa.me/${COMPANY_CONFIG.whatsappClean}?text=${encodeURIComponent(message)}`;
}

/**
 * Generate Service-specific WhatsApp inquiry URL
 */
export function getServiceWhatsAppUrl(serviceName: string): string {
  const message = `Hello SG Event Planner! I am interested in your ${serviceName} services. I would like to know more.`;
  return `https://wa.me/${COMPANY_CONFIG.whatsappClean}?text=${encodeURIComponent(message)}`;
}

/**
 * Generate Catering inquiry WhatsApp URL
 */
export function getCateringWhatsAppUrl(): string {
  const message =
    'Hello SG Event Planner! I would like to discuss catering requirements for our upcoming event.';
  return `https://wa.me/${COMPANY_CONFIG.whatsappClean}?text=${encodeURIComponent(message)}`;
}

/**
 * Generate Form-based WhatsApp URL with custom details
 */
export function getCustomInquiryWhatsAppUrl(params: {
  name: string;
  eventType: string;
  eventDate?: string;
  guestCount?: string;
  notes?: string;
}): string {
  let message = `Hello SG Event Planner! My name is ${params.name || 'a client'}.\n`;
  message += `I would like to enquire about: ${params.eventType || 'Event Planning'}.\n`;
  if (params.eventDate) {
    message += `Tentative Date: ${params.eventDate}\n`;
  }
  if (params.guestCount) {
    message += `Estimated Guests: ${params.guestCount}\n`;
  }
  if (params.notes) {
    message += `Details: ${params.notes}\n`;
  }
  message += `Please get in touch with me. Thank you!`;

  return `https://wa.me/${COMPANY_CONFIG.whatsappClean}?text=${encodeURIComponent(message)}`;
}
