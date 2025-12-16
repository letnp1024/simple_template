document.addEventListener('DOMContentLoaded', () => {
    const hero = document.querySelector('.hero');
    const swiperEl = document.querySelector('.hero__swiper');
    const mainNavbar = document.querySelector('.main-navbar');
    const searchModel = document.querySelector('.search-model');
    const searchClose = document.querySelector('.search-close-switch');
    const searchInput = document.querySelector('#search-input');
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
    // Search Switch (TypeScript version of the jQuery snippet)
    if (searchModel) {
        const searchSwitches = document.querySelectorAll('.search-switch');
        // Open search model
        searchSwitches.forEach((trigger) => {
            trigger.addEventListener('click', (event) => {
                event.preventDefault();
                // Show model – CSS can handle fade via transitions on a class
                searchModel.classList.add('is-open');
                searchModel.style.display = 'block';
            });
        });
        // Close search model
        if (searchClose) {
            searchClose.addEventListener('click', (event) => {
                event.preventDefault();
                // Hide model – again, CSS can add smooth fade
                searchModel.classList.remove('is-open');
                searchModel.style.display = 'none';
                if (searchInput) {
                    searchInput.value = '';
                }
            });
        }
    }
});
//# sourceMappingURL=main.js.map