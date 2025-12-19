// Testimonial Section - Swiper carousel init

export function initTestimonialSection() {
  const testimonialSection = document.querySelector('.testimonial') as HTMLElement | null;
  const carouselEl = document.querySelector('.testimonial__carousel') as HTMLElement | null;

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
  (window as any).testimonialSwiper = swiper;
}


