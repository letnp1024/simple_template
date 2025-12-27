import { initHeroSection } from './sections/hero.js';
import { initNavbarAndInfoRow, initSearchOverlay } from './sections/navbar.js';
import { initAboutSection } from './sections/about.js';
import { initServicesSection } from './sections/services.js';
import { initCategoryNewsSection } from './sections/category-news.js';
import { initCategoryPortfolioSection } from './sections/category-portfolio.js';
import { initTestimonialSection } from './sections/testimonial.js';
// Root bootstrapper – only coordinates section initialisation
document.addEventListener('DOMContentLoaded', () => {
    initHeroSection();
    initNavbarAndInfoRow();
    initSearchOverlay();
    initAboutSection();
    initServicesSection();
    initCategoryNewsSection();
    initCategoryPortfolioSection();
    initTestimonialSection();
});
//# sourceMappingURL=main-hp-01.js.map