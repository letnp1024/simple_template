declare const Swiper: any;

document.addEventListener('DOMContentLoaded', () => {
  const hero = document.querySelector('.hero') as HTMLElement | null;
  const swiperEl = document.querySelector('.hero__swiper') as HTMLElement | null;

  if (!hero || !swiperEl || typeof Swiper === 'undefined') return;

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
  (window as any).heroSwiper = swiper;
});

