import { initHeroSection } from './sections/hero.js';
import { initNavbarAndInfoRow, initSearchOverlay } from './sections/navbar.js';
import { initAboutSection } from './sections/about.js';
import { initServicesSection } from './sections/services.js';
import { initCategoryNewsSection } from './sections/category-news.js';
// Root bootstrapper – only coordinates section initialisation
document.addEventListener('DOMContentLoaded', () => {
    initHeroSection();
    initNavbarAndInfoRow();
    initSearchOverlay();
    initAboutSection();
    initServicesSection();
    initCategoryNewsSection();
});
//# sourceMappingURL=main.js.map