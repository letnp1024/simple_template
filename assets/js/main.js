document.addEventListener("DOMContentLoaded", function () {
    var hero = document.querySelector('.hero');
    var swiperEl = document.querySelector('.hero__swiper');
    if (!hero || !swiperEl || typeof Swiper === 'undefined')
        return;
    var swiper = new Swiper('.hero__swiper', {
        loop: true,
        speed: 900,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        pagination: {
            el: '.hero__pagination',
            clickable: true
        },
        effect: 'slide',
        grabCursor: true,
        on: {
            init: function () {
                hero.classList.add('is-ready');
            },
            slideChangeTransitionStart: function () {
                hero.classList.remove('is-ready');
            },
            slideChangeTransitionEnd: function () {
                hero.classList.add('is-ready');
            }
        }
    });
    window.heroSwiper = swiper;
});

