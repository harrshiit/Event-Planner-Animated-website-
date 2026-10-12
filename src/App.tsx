/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Gallery } from './components/Gallery';
import { CategoryGalleryModal } from './components/CategoryGalleryModal';
import { CateringShowcase } from './components/CateringShowcase';
import { WhyChooseUs } from './components/WhyChooseUs';
import { InquirySection } from './components/InquirySection';
import { ContactSocial } from './components/ContactSocial';
import { Footer } from './components/Footer';
import { MobileStickyBar } from './components/MobileStickyBar';
import { ScrollBackgroundCanvas } from './components/ScrollBackgroundCanvas';

export default function App() {
  const [selectedGalleryCategory, setSelectedGalleryCategory] = useState<string>('all');
  const [activeCategoryModalKey, setActiveCategoryModalKey] = useState<string | null>(null);

  const handleSelectCategory = (categoryKey: string) => {
    setSelectedGalleryCategory(categoryKey);
    setActiveCategoryModalKey(categoryKey);
  };

  const handleExploreGallery = () => {
    setSelectedGalleryCategory('all');
    setActiveCategoryModalKey(null);
    const galleryEl = document.getElementById('gallery');
    if (galleryEl) {
      galleryEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-[#252525] flex flex-col font-sans selection:bg-[#D4AF72] selection:text-[#063B33] relative">
      {/* Scroll-based Video Background Animation */}
      <ScrollBackgroundCanvas />

      {/* Fixed Luxury Navigation Header */}
      <Navbar
        onNavigate={(id) => {
          if (id === 'gallery') {
            setSelectedGalleryCategory('all');
            setActiveCategoryModalKey(null);
          }
        }}
      />

      {/* Main Content Sections */}
      <main className="flex-1 relative z-10">
        {/* A. Hero Section with transparent backdrop showcasing the banquet hall */}
        <Hero onExploreClick={handleExploreGallery} />

        {/* B. About SG Event Planner Section with Brand Emblem */}
        <About />

        {/* C. Our Services Section with Category Media Actions */}
        <Services onSelectCategory={handleSelectCategory} />

        {/* D. Event Multimedia Gallery (Photos & Videos) */}
        <Gallery
          initialCategory={selectedGalleryCategory}
          onOpenCategoryModal={(key) => setActiveCategoryModalKey(key)}
        />

        {/* E. Catering Showcase */}
        <CateringShowcase />

        {/* F. Why SG Event Planner */}
        <WhyChooseUs />

        {/* G. Booking CTA & Custom Inquiry Section */}
        <InquirySection />

        {/* H. Contact & Social Media Section */}
        <ContactSocial />
      </main>

      {/* Dedicated Category-Specific Gallery Modal */}
      {activeCategoryModalKey && (
        <CategoryGalleryModal
          isOpen={Boolean(activeCategoryModalKey)}
          categoryKey={activeCategoryModalKey}
          onClose={() => setActiveCategoryModalKey(null)}
          onSelectCategory={(newKey) => {
            setActiveCategoryModalKey(newKey);
            setSelectedGalleryCategory(newKey);
          }}
        />
      )}

      {/* I. Luxury Footer with Developer Credit */}
      <Footer onSelectCategory={handleSelectCategory} />

      {/* Mobile Sticky WhatsApp Action */}
      <MobileStickyBar />
    </div>
  );
}
