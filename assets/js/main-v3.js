import { initHeroV3 } from './sections/hero-v3.js';
import { initNavbarAndInfoRow, initSearchOverlay } from './sections/navbar.js';
import { initAboutSection } from './sections/about.js';
import { initServicesSection } from './sections/services.js';
import { initCategoryNewsSection } from './sections/category-news.js';
import { initTestimonialSection } from './sections/testimonial.js';
// Root bootstrapper for V3 – only coordinates section initialisation
document.addEventListener('DOMContentLoaded', () => {
    initHeroV3(); // Use hero-v3 instead of hero
    initNavbarAndInfoRow();
    initSearchOverlay();
    initAboutSection();
    initServicesSection();
    initCategoryNewsSection();
    initTestimonialSection();
});
//# sourceMappingURL=main-v3.js.map