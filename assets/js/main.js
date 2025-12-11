document.addEventListener('DOMContentLoaded', () => {
    const hero = document.querySelector('.hero');
    const swiperEl = document.querySelector('.hero__swiper');
    if (!hero || !swiperEl || typeof Swiper === 'undefined')
        return;
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
        effect: 'slide',
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
    // Expose if debugging needed
    window.heroSwiper = swiper;
});
//# sourceMappingURL=main.js.map