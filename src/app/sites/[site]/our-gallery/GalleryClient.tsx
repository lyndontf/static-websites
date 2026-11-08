'use client';

import { useState, useEffect, useCallback } from 'react';

/* ── Types ─────────────────────────────────────────────────────────── */

interface GalleryImage {
  src: string;
  alt: string;
  category: string;
}

/* ── Categories ────────────────────────────────────────────────────── */

const CATEGORIES = ['All', 'Facilities', 'Care & Rehab', 'Dining', 'Our Centres'] as const;

/* ── Gallery Data ──────────────────────────────────────────────────── */
/* To add a new image: copy any line below and update src, alt, category */

const galleryImages: GalleryImage[] = [
  // ── Facilities ──
  { src: '/images/services/bedded-room.jpg',        alt: 'Comfortable bedded room with medical equipment',          category: 'Facilities' },
  { src: '/images/services/single-room.jpg',        alt: 'Private single room for residents',                       category: 'Facilities' },
  { src: '/images/services/common-area-scenic.jpg', alt: 'Bright common area with scenic garden view',              category: 'Facilities' },
  { src: '/images/services/family-visit-area.jpg',  alt: 'Family visit area for residents and loved ones',          category: 'Facilities' },
  { src: '/images/services/nursing-station.jpg',    alt: 'Professional nursing station with monitoring equipment',  category: 'Facilities' },
  { src: '/images/services/rehab-department.jpg',   alt: 'Rehabilitation department with therapy equipment',        category: 'Facilities' },
  { src: '/images/services/stroke-bed.jpg',         alt: 'Specialised stroke care bed with support equipment',      category: 'Facilities' },
  { src: '/images/general/common-area-graded.png',  alt: 'Welcoming common area for residents',                     category: 'Facilities' },

  // ── Care & Rehab ──
  { src: '/images/services/hand-training.jpg',          alt: 'Hand rehabilitation training for motor recovery',         category: 'Care & Rehab' },
  { src: '/images/services/therapy-exercise.jpg',       alt: 'Guided therapy exercise session with physiotherapist',    category: 'Care & Rehab' },
  { src: '/images/services/walking-training.jpg',       alt: 'Walking rehabilitation training for mobility recovery',   category: 'Care & Rehab' },
  { src: '/images/services/homecare-ambulation.jpg',    alt: 'Ambulation assistance for elderly patient',               category: 'Care & Rehab' },
  { src: '/images/services/homecare-auscultation.jpg',  alt: 'Nurse performing auscultation check',                     category: 'Care & Rehab' },
  { src: '/images/services/homecare-care.jpg',          alt: 'Compassionate care service for elderly',                  category: 'Care & Rehab' },
  { src: '/images/services/homecare-standing.jpg',      alt: 'Standing exercise assistance for rehabilitation',         category: 'Care & Rehab' },
  { src: '/images/services/homecare-vitals.jpg',        alt: 'Nurse monitoring patient vital signs',                    category: 'Care & Rehab' },
  { src: '/images/general/dr-sue-rounds.jpg',           alt: 'Doctor conducting medical rounds with care team',         category: 'Care & Rehab' },
  { src: '/images/general/staff-care.jpg',              alt: 'Caregiver assisting elderly resident with daily activities', category: 'Care & Rehab' },

  // ── Dining ──
  { src: '/images/services/halal-dinner.jpg', alt: 'Nutritious dinner prepared for residents',  category: 'Dining' },
  { src: '/images/services/halal-lunch.jpg',  alt: 'Balanced lunch meal for residents',         category: 'Dining' },

  // ── Our Centres ──
  { src: '/images/pj-centre.jpg',        alt: 'Genesis Life Care Petaling Jaya centre',   category: 'Our Centres' },
  { src: '/images/klang-centre.jpg',     alt: 'Genesis Life Care Klang centre',            category: 'Our Centres' },
  { src: '/images/kajang-centre.jpeg',   alt: 'Genesis Life Care Kajang centre',            category: 'Our Centres' },
  { src: '/images/puchong-centre.jpeg',  alt: 'Genesis Life Care Puchong centre',           category: 'Our Centres' },
  { src: '/images/jb-centre.jpeg',       alt: 'Genesis Life Care Johor Bahru centre',       category: 'Our Centres' },
];

/* ── Component ─────────────────────────────────────────────────────── */

export default function GalleryClient() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredImages =
    activeCategory === 'All'
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  /* ── Keyboard navigation ──────────────────────────────────────── */

  const goToPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + filteredImages.length) % filteredImages.length : null,
    );
  }, [filteredImages.length]);

  const goToNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % filteredImages.length : null,
    );
  }, [filteredImages.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'ArrowRight') goToNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, goToPrev, goToNext]);

  /* ── Body scroll lock ─────────────────────────────────────────── */

  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxIndex]);

  /* ── Filter change closes lightbox ────────────────────────────── */

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setLightboxIndex(null);
  };

  /* ── Render ───────────────────────────────────────────────────── */

  return (
    <>
      {/* Override global custom_css !important rules for dark-bg sections */}
      <style dangerouslySetInnerHTML={{ __html: `
        .hero-dark h1, .hero-dark h2, .hero-dark p, .hero-dark span, .hero-dark div { color: inherit; }
        .hero-dark h1, .hero-dark h2, .hero-dark p, .hero-dark span, .hero-dark div,
        .hero-dark .text-4xl, .hero-dark .text-5xl, .hero-dark .sm\\:text-5xl,
        .hero-dark .text-3xl, .hero-dark .text-lg, .hero-dark .text-sm,
        .hero-dark .text-white { color: #ffffff !important; }
        .hero-dark .text-gray-900 { color: rgb(17 24 39) !important; }
        .hero-dark .text-gray-800 { color: rgb(31 41 55) !important; }
        .hero-dark .text-gold { color: #FAB515 !important; }
        .gallery-scroll::-webkit-scrollbar { display: none; }
        .gallery-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      ` }} />

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="hero-dark relative bg-gradient-to-br from-primary-800 via-primary to-secondary overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full translate-y-1/2 -translate-x-1/3" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
          <span className="inline-block bg-gold text-gray-900 text-xs font-bold tracking-wide px-4 py-1.5 rounded-full uppercase mb-6">
            Our Gallery
          </span>
          <h1
            className="text-4xl sm:text-5xl font-extrabold leading-[1.1] tracking-tight text-white mb-5"
            style={{ color: 'white' }}
          >
            A Glimpse Into Life<br />at Genesis
          </h1>
          <p
            className="text-lg text-white leading-relaxed max-w-2xl mx-auto"
            style={{ color: 'white' }}
          >
            Explore our centres, facilities, and the compassionate care we provide
            every day across 5 locations in Malaysia.
          </p>
        </div>
      </section>

      {/* ── FILTER TABS ───────────────────────────────────────────── */}
      <section className="bg-white border-b border-gray-100 sticky top-[72px] sm:top-[80px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto py-4 gallery-scroll">
            {CATEGORIES.map((cat) => {
              const count =
                cat === 'All'
                  ? galleryImages.length
                  : galleryImages.filter((img) => img.category === cat).length;
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-primary text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                  <span className={`ml-1.5 text-xs ${isActive ? 'text-white' : 'text-gray-400'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── IMAGE GRID ────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 bg-[#f4f8fb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredImages.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No images in this category yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredImages.map((img, index) => (
                <button
                  key={img.src}
                  onClick={() => setLightboxIndex(index)}
                  className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 bg-white"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-end">
                    <div className="w-full p-3 bg-gradient-to-t from-black/50 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-white text-xs font-medium truncate">{img.alt}</p>
                      <p className="text-white/70 text-[10px]">{img.category}</p>
                    </div>
                  </div>
                  {/* Zoom icon */}
                  <div className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── LIGHTBOX ──────────────────────────────────────────────── */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setLightboxIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          {/* Close */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            aria-label="Close lightbox"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Previous */}
          <button
            onClick={(e) => { e.stopPropagation(); goToPrev(); }}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            aria-label="Previous image"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); goToNext(); }}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            aria-label="Next image"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Main image */}
          <div
            className="max-w-5xl max-h-[85vh] mx-4 sm:mx-8"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filteredImages[lightboxIndex].src}
              alt={filteredImages[lightboxIndex].alt}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            <div className="text-center mt-3">
              <p className="text-white text-sm font-medium">{filteredImages[lightboxIndex].alt}</p>
              <p className="text-white/50 text-xs mt-1">
                {lightboxIndex + 1} / {filteredImages.length}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── BOTTOM CTA ────────────────────────────────────────────── */}
      <section className="hero-dark relative bg-gradient-to-r from-primary via-primary-800 to-secondary overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Come Visit Us in Person
          </h2>
          <p className="text-lg text-white mb-8 max-w-2xl mx-auto" style={{ color: 'white' }}>
            Photos only tell part of the story. Book a free tour at any of our centres
            to experience the Genesis standard of care for yourself.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-gold text-gray-900 font-bold px-6 py-4 rounded-xl hover:bg-yellow-400 transition-colors whitespace-nowrap"
            >
              Book a Free Tour
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="tel:+60193250457"
              className="inline-flex items-center gap-2 border-2 border-white/30 text-white font-bold px-6 py-4 rounded-xl hover:bg-white/10 transition-colors whitespace-nowrap"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call +6019-325-0457
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
