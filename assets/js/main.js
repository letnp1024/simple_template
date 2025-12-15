document.addEventListener('DOMContentLoaded', () => {
    const hero = document.querySelector('.hero');
    const swiperEl = document.querySelector('.hero__swiper');
    const mainNavbar = document.querySelector('.main-navbar');
    // Initialize Swiper
    if (hero && swiperEl && typeof Swiper !== 'undefined') {
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
    }
    // Handle sticky navbar background on scroll
    if (mainNavbar) {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                mainNavbar.classList.add('is-scrolled');
            }
            else {
                mainNavbar.classList.remove('is-scrolled');
            }
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Call once on load to set initial state
    }
    // Handle info-row dropdown on mobile
    const infoRowToggle = document.querySelector('.info-row__dropdown-toggle');
    const infoRowMenu = document.querySelector('.info-row__dropdown-menu');
    if (infoRowToggle && infoRowMenu) {
        infoRowToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const isExpanded = infoRowToggle.getAttribute('aria-expanded') === 'true';
            if (isExpanded) {
                infoRowToggle.setAttribute('aria-expanded', 'false');
                infoRowMenu.classList.remove('show');
            }
            else {
                infoRowToggle.setAttribute('aria-expanded', 'true');
                infoRowMenu.classList.add('show');
            }
        });
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            const target = e.target;
            if (!infoRowToggle.contains(target) && !infoRowMenu.contains(target)) {
                infoRowToggle.setAttribute('aria-expanded', 'false');
                infoRowMenu.classList.remove('show');
            }
        });
    }
});
//# sourceMappingURL=main.js.map