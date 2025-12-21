// Hero V2 - Single background with moving overlay and content
export function initHeroV2() {
    const hero = document.querySelector('.hero-v2');
    if (!hero)
        return;
    const overlay = hero.querySelector('.hero-v2__overlay');
    const contentItems = hero.querySelectorAll('.hero-v2__content');
    const paginationDots = hero.querySelectorAll('.hero-v2__pagination-dot');
    if (!overlay || contentItems.length === 0)
        return;
    let currentIndex = 0;
    const totalSlides = contentItems.length;
    let autoplayTimer = null;
    const autoplayDelay = 5000; // 5 seconds
    // Position classes for overlay and content wrapper
    const positions = ['left', 'center', 'right'];
    // Update slide
    function updateSlide(index) {
        if (index < 0 || index >= totalSlides)
            return;
        currentIndex = index;
        const position = positions[index % positions.length];
        // Update overlay position (content is now inside overlay, so it moves with it)
        overlay.classList.remove('hero-v2__overlay--left', 'hero-v2__overlay--center', 'hero-v2__overlay--right');
        overlay.classList.add(`hero-v2__overlay--${position}`);
        // Update content visibility
        contentItems.forEach((item, i) => {
            if (i === index) {
                // Fade in active content
                setTimeout(() => {
                    item.classList.add('is-active');
                }, 100);
            }
            else {
                // Fade out inactive content
                item.classList.remove('is-active');
            }
        });
        // Update pagination
        paginationDots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('is-active');
            }
            else {
                dot.classList.remove('is-active');
            }
        });
    }
    // Go to next slide
    function nextSlide() {
        const nextIndex = (currentIndex + 1) % totalSlides;
        updateSlide(nextIndex);
    }
    // Go to previous slide
    function prevSlide() {
        const prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlide(prevIndex);
    }
    // Go to specific slide
    function goToSlide(index) {
        updateSlide(index);
    }
    // Autoplay
    function startAutoplay() {
        stopAutoplay();
        autoplayTimer = setInterval(() => {
            nextSlide();
        }, autoplayDelay);
    }
    function stopAutoplay() {
        if (autoplayTimer) {
            clearInterval(autoplayTimer);
            autoplayTimer = null;
        }
    }
    // Event listeners
    paginationDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            stopAutoplay();
            startAutoplay(); // Restart autoplay after manual navigation
        });
    });
    // Pause autoplay on hover
    hero.addEventListener('mouseenter', stopAutoplay);
    hero.addEventListener('mouseleave', startAutoplay);
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (hero.contains(document.activeElement) || document.activeElement === document.body) {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                prevSlide();
                stopAutoplay();
                startAutoplay();
            }
            else if (e.key === 'ArrowRight') {
                e.preventDefault();
                nextSlide();
                stopAutoplay();
                startAutoplay();
            }
        }
    });
    // Initialize
    updateSlide(0);
    startAutoplay();
    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        stopAutoplay();
    });
}
//# sourceMappingURL=hero-v2.js.map