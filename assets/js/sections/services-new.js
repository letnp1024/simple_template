// Services Component with Carousel
export function initServicesSection() {
    const carouselElement = document.querySelector('.services__carousel');
    if (!carouselElement || typeof Swiper === 'undefined')
        return;
    // Initialize Swiper
    const swiper = new Swiper(carouselElement, {
        slidesPerView: 3,
        spaceBetween: 30,
        navigation: {
            nextEl: '.services__carousel-btn--next',
            prevEl: '.services__carousel-btn--prev',
        },
        breakpoints: {
            // Mobile
            320: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            // Tablet
            768: {
                slidesPerView: 2,
                spaceBetween: 25,
            },
            // Desktop
            992: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
        },
    });
    // Expose for debugging if needed
    window.servicesSwiper = swiper;
}
//# sourceMappingURL=services-new.js.map