// Hero V3 - Multiple background images with pan in/out animation
export function initHeroV3() {
    const hero = document.querySelector('.hero-v3');
    if (!hero)
        return;
    const bgContainer = hero.querySelector('.hero-v3__bg-container');
    const bgImages = hero.querySelectorAll('.hero-v3__bg');
    if (!bgContainer || bgImages.length === 0)
        return;
    let currentIndex = 0;
    const totalImages = bgImages.length;
    let autoplayTimer = null;
    const autoplayDelay = 6000; // 6 seconds per image
    const panDuration = 12000; // 12 seconds for pan animation
    // Update background image
    function updateBackground(index) {
        if (index < 0 || index >= totalImages)
            return;
        // Remove active class from all images
        bgImages.forEach((img, i) => {
            img.classList.remove('is-active', 'is-panning');
            if (i === index) {
                // Set new active image
                img.classList.add('is-active');
                // Start panning animation after fade in
                setTimeout(() => {
                    img.classList.add('is-panning');
                }, 1500);
            }
        });
        currentIndex = index;
    }
    // Go to next background
    function nextBackground() {
        const nextIndex = (currentIndex + 1) % totalImages;
        updateBackground(nextIndex);
    }
    // Go to previous background
    function prevBackground() {
        const prevIndex = (currentIndex - 1 + totalImages) % totalImages;
        updateBackground(prevIndex);
    }
    // Go to specific background
    function goToBackground(index) {
        updateBackground(index);
    }
    // Autoplay
    function startAutoplay() {
        stopAutoplay();
        autoplayTimer = setInterval(() => {
            nextBackground();
        }, autoplayDelay);
    }
    function stopAutoplay() {
        if (autoplayTimer) {
            clearInterval(autoplayTimer);
            autoplayTimer = null;
        }
    }
    // Pause autoplay on hover
    hero.addEventListener('mouseenter', stopAutoplay);
    hero.addEventListener('mouseleave', startAutoplay);
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (hero.contains(document.activeElement) || document.activeElement === document.body) {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                prevBackground();
                stopAutoplay();
                startAutoplay();
            }
            else if (e.key === 'ArrowRight') {
                e.preventDefault();
                nextBackground();
                stopAutoplay();
                startAutoplay();
            }
        }
    });
    // Initialize
    updateBackground(0);
    startAutoplay();
    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        stopAutoplay();
    });
}
//# sourceMappingURL=hero-v3.js.map