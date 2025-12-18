import { initHeroSection } from './sections/hero.js';
import { initNavbarAndInfoRow, initSearchOverlay } from './sections/navbar.js';
import { initAboutSection } from './sections/about.js';
import { initServicesSection } from './sections/services.js';
// Root bootstrapper – only coordinates section initialisation
document.addEventListener('DOMContentLoaded', () => {
    initHeroSection();
    initNavbarAndInfoRow();
    initSearchOverlay();
    initAboutSection();
    initServicesSection();
});
//# sourceMappingURL=main.js.map