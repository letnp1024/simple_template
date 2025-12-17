// Hero / Swiper cube slider and readiness state
export function initHeroSection() {
    const hero = document.querySelector('.hero');
    const swiperEl = document.querySelector('.hero__swiper');
    if (!hero || !swiperEl || typeof Swiper === 'undefined') {
        return;
    }
    const swiper = new Swiper('.hero__swiper', {
        loop: true,
        speed: 900,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.hero__pagination',
            clickable: true,
        },
        effect: 'cube',
        cubeEffect: {
            shadow: true,
            slideShadows: true,
            shadowOffset: 40,
            shadowScale: 0.94,
        },
        grabCursor: true,
        on: {
            init: () => {
                hero.classList.add('is-ready');
            },
            slideChangeTransitionStart: () => {
                hero.classList.remove('is-ready');
            },
            slideChangeTransitionEnd: () => {
                hero.classList.add('is-ready');
            },
        },
    });
    // Expose for debugging if needed
    window.heroSwiper = swiper;
}
//# sourceMappingURL=hero.js.map