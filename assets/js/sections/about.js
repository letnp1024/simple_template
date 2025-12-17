// About Us Section - Canva-style slide experience with GSAP
export function initAboutSection() {
    const aboutSection = document.querySelector('#about-us');
    const aboutSlides = document.querySelectorAll('.about-slide');
    const prevButton = document.querySelector('.about-nav .prev');
    const nextButton = document.querySelector('.about-nav .next');
    if (!aboutSection || aboutSlides.length === 0 || typeof gsap === 'undefined') {
        return;
    }
    let currentSlideIndex = 0;
    const totalSlides = aboutSlides.length;
    const isMobile = window.innerWidth < 992;
    // Initialize: Set initial states for all slides
    const initSlides = () => {
        aboutSlides.forEach((slide, index) => {
            const image = slide.querySelector('.about-image img');
            if (index === 0) {
                // First slide: visible
                slide.classList.add('active');
                if (image) {
                    gsap.set(image, { x: 0, opacity: 1 });
                }
            }
            else {
                // Other slides: hidden
                slide.classList.remove('active');
                if (image) {
                    gsap.set(image, { x: -60, opacity: 0 });
                }
            }
        });
    };
    // Animate slide in
    const animateSlideIn = (slide) => {
        const image = slide.querySelector('.about-image img');
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        // Image: left to right with fade
        if (image) {
            tl.fromTo(image, { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 1.2 }, 0);
        }
    };
    // Animate slide out
    const animateSlideOut = (slide) => {
        const image = slide.querySelector('.about-image img');
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        if (image) {
            tl.to(image, { opacity: 0, duration: 0.6 }, 0);
        }
        return tl;
    };
    // Change slide
    const changeSlide = (direction) => {
        if (isMobile)
            return; // Disable on mobile
        const currentSlide = aboutSlides[currentSlideIndex];
        let nextIndex;
        if (direction === 'next') {
            nextIndex = (currentSlideIndex + 1) % totalSlides;
        }
        else {
            nextIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
        }
        const nextSlide = aboutSlides[nextIndex];
        // Animate out current slide
        const outTimeline = animateSlideOut(currentSlide);
        // After fade out, switch active class and animate in next slide
        outTimeline.call(() => {
            currentSlide.classList.remove('active');
            nextSlide.classList.add('active');
            animateSlideIn(nextSlide);
            currentSlideIndex = nextIndex;
            updateNavButtons();
        });
    };
    // Update navigation buttons state
    const updateNavButtons = () => {
        if (prevButton && nextButton) {
            // Always enable both buttons for loop navigation
            prevButton.disabled = false;
            nextButton.disabled = false;
        }
    };
    // Navigation button handlers
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            changeSlide('prev');
        });
    }
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            changeSlide('next');
        });
    }
    // Mouse wheel navigation (only when hovering over section)
    let wheelTimeout = null;
    let isWheeling = false;
    aboutSection.addEventListener('wheel', (e) => {
        if (isMobile)
            return;
        e.preventDefault();
        if (isWheeling)
            return;
        isWheeling = true;
        const delta = e.deltaY;
        if (delta > 0) {
            changeSlide('next');
        }
        else if (delta < 0) {
            changeSlide('prev');
        }
        // Debounce wheel events
        if (wheelTimeout)
            clearTimeout(wheelTimeout);
        wheelTimeout = window.setTimeout(() => {
            isWheeling = false;
        }, 1000);
    }, { passive: false });
    // Parallax effect for images (scroll-based, limited within image bounds)
    // Image moves up/down as user scrolls, centered frame keeps image in bounds
    const handleParallax = () => {
        if (isMobile)
            return;
        const activeSlide = aboutSlides[currentSlideIndex];
        const image = activeSlide === null || activeSlide === void 0 ? void 0 : activeSlide.querySelector('.about-image img');
        if (!image || !activeSlide.classList.contains('active'))
            return;
        const sectionRect = aboutSection.getBoundingClientRect();
        const sectionTop = sectionRect.top;
        const sectionHeight = sectionRect.height;
        const viewportHeight = window.innerHeight;
        const windowCenter = viewportHeight / 2;
        // Calculate when section is in viewport
        if (sectionTop < viewportHeight && sectionTop + sectionHeight > 0) {
            // Calculate distance from section center to viewport center
            const sectionCenter = sectionTop + sectionHeight / 2;
            const distanceFromCenter = windowCenter - sectionCenter;
            // Parallax factor: image moves opposite to scroll direction
            // Limit movement to ±30px to keep image within bounds
            const parallaxY = (distanceFromCenter / viewportHeight) * 60;
            const clampedY = Math.max(-30, Math.min(30, parallaxY));
            gsap.to(image, {
                y: clampedY,
                duration: 0.3,
                ease: 'power1.out',
            });
        }
        else {
            // Reset when section is out of view
            gsap.to(image, {
                y: 0,
                duration: 0.3,
                ease: 'power1.out',
            });
        }
    };
    // Initialize on load
    initSlides();
    updateNavButtons();
    // Animate first slide in
    if (aboutSlides[0]) {
        animateSlideIn(aboutSlides[0]);
    }
    // Handle parallax on scroll
    window.addEventListener('scroll', handleParallax, { passive: true });
    // Handle window resize (disable animations on mobile)
    window.addEventListener('resize', () => {
        const wasMobile = isMobile;
        const nowMobile = window.innerWidth < 992;
        if (wasMobile !== nowMobile) {
            // Simple approach: reload to ensure layout/logic matches breakpoint
            location.reload();
        }
    });
    // Expose for debugging
    window.aboutSection = {
        currentIndex: () => currentSlideIndex,
        goToSlide: (index) => {
            if (index >= 0 && index < totalSlides) {
                const direction = index > currentSlideIndex ? 'next' : 'prev';
                while (currentSlideIndex !== index) {
                    changeSlide(direction);
                }
            }
        },
    };
}
//# sourceMappingURL=about.js.map