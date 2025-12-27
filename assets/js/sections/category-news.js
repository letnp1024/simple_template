// Category & News Section with Parallax and Filtering (using MixItUp)
export function initCategoryNewsSection() {
    const categoryNewsSection = document.querySelector('#category-news');
    const categorySidebar = document.querySelector('.category-sidebar');
    const categoryBg = document.querySelector('.category-sidebar__bg');
    const categoryItems = document.querySelectorAll('.category-item');
    const newsGrid = document.querySelector('.news-grid');
    if (!categoryNewsSection || !categorySidebar || typeof gsap === 'undefined') {
        return;
    }
    const isMobile = window.innerWidth < 992;
    // ====================
    // PARALLAX EFFECT
    // ====================
    // Parallax effect for category background image (scroll-based, vertical movement)
    // Image moves up/down as user scrolls, similar to about section
    const handleParallax = () => {
        if (isMobile || !categoryBg || !categorySidebar)
            return;
        const sidebarRect = categorySidebar.getBoundingClientRect();
        const sidebarTop = sidebarRect.top;
        const sidebarHeight = sidebarRect.height;
        const viewportHeight = window.innerHeight;
        const windowCenter = viewportHeight / 2;
        // Calculate when sidebar is in viewport
        if (sidebarTop < viewportHeight && sidebarTop + sidebarHeight > 0) {
            // Calculate distance from sidebar center to viewport center
            const sidebarCenter = sidebarTop + sidebarHeight / 2;
            const distanceFromCenter = windowCenter - sidebarCenter;
            // Parallax factor: image moves opposite to scroll direction (vertical)
            // Image height is 200% of container, so we can move it up to 50% of its own height
            // Limit movement to keep image within bounds
            const imageHeight = categoryBg.offsetHeight;
            const maxParallax = imageHeight * 0.5; // Max movement is 50% of image height
            const parallaxY = (distanceFromCenter / viewportHeight) * maxParallax;
            // Clamp the parallax value to prevent image from going out of bounds
            // The image is centered at -25% (translateY(-25%)), so we can move it ±25% of its height
            const clampedY = Math.max(-maxParallax, Math.min(maxParallax, parallaxY));
            gsap.to(categoryBg, {
                y: clampedY,
                duration: 0.3,
                ease: 'power1.out',
            });
        }
        else {
            // Reset when sidebar is out of view
            gsap.to(categoryBg, {
                y: 0,
                duration: 0.3,
                ease: 'power1.out',
            });
        }
    };
    // Handle parallax on scroll (only on desktop/tablet)
    if (!isMobile && categoryBg) {
        // Wait for image to load to get accurate dimensions
        if (categoryBg.complete && categoryBg.naturalHeight > 0) {
            window.addEventListener('scroll', handleParallax, { passive: true });
        }
        else {
            categoryBg.addEventListener('load', () => {
                window.addEventListener('scroll', handleParallax, { passive: true });
            }, { once: true });
        }
    }
    // ====================
    // CATEGORY FILTERING (using MixItUp)
    // ====================
    // Initialize MixItUp when DOM and library are ready
    const initMixItUp = () => {
        // Check if MixItUp is available
        if (typeof mixitup === 'undefined' || !newsGrid) {
            console.warn('MixItUp is not loaded or news grid not found');
            return;
        }
        // Initialize MixItUp
        const mixer = mixitup(newsGrid, {
            animation: {
                enable: true,
                effects: 'fade scale', // Animation effects
                duration: 600, // Duration in ms
                easing: 'ease',
            },
            controls: {
                enable: true,
                live: false, // Don't auto-update when new items are added
            },
            selectors: {
                target: '.mix', // Selector for news items
            },
        });
        // Handle category item clicks
        categoryItems.forEach((item) => {
            item.addEventListener('click', () => {
                var _a;
                // Remove active class from all category items
                categoryItems.forEach((catItem) => {
                    catItem.classList.remove('is-active');
                });
                // Add active class to clicked item
                item.classList.add('is-active');
                // Get category from data-category attribute
                const category = ((_a = item.getAttribute('data-category')) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || 'all';
                // Convert to MixItUp filter format
                const filterValue = category === 'all' ? '*' : `.${category}`;
                // Use MixItUp filter
                mixer.filter(filterValue);
            });
        });
    };
    // Initialize MixItUp when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMixItUp);
    }
    else {
        // DOM is already ready, but wait a bit for MixItUp script to load
        setTimeout(initMixItUp, 100);
    }
    // ====================
    // RESPONSIVE HANDLING
    // ====================
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const newIsMobile = window.innerWidth < 992;
            // Reinitialize parallax if breakpoint changed
            if (newIsMobile !== isMobile && categoryBg) {
                // Remove old scroll listener and re-add if needed
                // The handleParallax function checks isMobile internally, so it will work correctly
                // Just need to ensure scroll listener is active for desktop
                if (!newIsMobile) {
                    window.addEventListener('scroll', handleParallax, { passive: true });
                }
            }
        }, 250);
    });
}
//# sourceMappingURL=category-news.js.map