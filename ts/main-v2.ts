import { initHeroV2 } from './sections/hero-v2.js';
import { initNavbarAndInfoRow, initSearchOverlay } from './sections/navbar.js';
import { initAboutSection } from './sections/about.js';
import { initServicesSection } from './sections/services.js';
import { initCategoryNewsSection } from './sections/category-news.js';
import { initTestimonialSection } from './sections/testimonial.js';

// Root bootstrapper for V2 – only coordinates section initialisation
document.addEventListener('DOMContentLoaded', () => {
  initHeroV2(); // Use hero-v2 instead of hero
  initNavbarAndInfoRow();
  initSearchOverlay();
  initAboutSection();
  initServicesSection();
  initCategoryNewsSection();
  initTestimonialSection();
});

