// Testimonial Section - Swiper carousel init
export function initTestimonialSection() {
    const testimonialSection = document.querySelector('.testimonial');
    const carouselEl = document.querySelector('.testimonial__carousel');
    if (!testimonialSection || !carouselEl || typeof Swiper === 'undefined') {
        return;
    }
    // Initialise Swiper for testimonial carousel (using global Swiper)
    const swiper = new Swiper('.testimonial__carousel', {
        slidesPerView: 2,
        spaceBetween: 30,
        navigation: {
            nextEl: '.testimonial__carousel-btn--next',
            prevEl: '.testimonial__carousel-btn--prev',
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 1,
                spaceBetween: 24,
            },
            992: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
        },
    });
    // Expose for debugging if needed
    window.testimonialSwiper = swiper;
}
//# sourceMappingURL=testimonial.js.map