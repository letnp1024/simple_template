// Main navbar sticky behavior, info-row dropdown, and global search overlay
export function initNavbarAndInfoRow() {
    const mainNavbar = document.querySelector('.main-navbar');
    // Sticky navbar background on scroll
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
        handleScroll(); // Initial state
    }
    // Info-row dropdown on mobile
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
}
export function initSearchOverlay() {
    const searchModel = document.querySelector('.search-model');
    const searchClose = document.querySelector('.search-close-switch');
    const searchInput = document.querySelector('#search-input');
    if (!searchModel)
        return;
    const searchSwitches = document.querySelectorAll('.search-switch');
    // Open search model
    searchSwitches.forEach((trigger) => {
        trigger.addEventListener('click', (event) => {
            event.preventDefault();
            // Show model – CSS handles fade via transitions on a class
            searchModel.classList.add('is-open');
            searchModel.style.display = 'block';
        });
    });
    // Close search model
    if (searchClose) {
        searchClose.addEventListener('click', (event) => {
            event.preventDefault();
            // Hide model – CSS handles fade
            searchModel.classList.remove('is-open');
            searchModel.style.display = 'none';
            if (searchInput) {
                searchInput.value = '';
            }
        });
    }
}
//# sourceMappingURL=navbar.js.map