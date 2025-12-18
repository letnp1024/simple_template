// Services Section - Premium Multi-Card Slider with GSAP

export function initServicesSection() {
  const servicesSection = document.querySelector('#services') as HTMLElement | null;
  const serviceCards = document.querySelectorAll(
    '.service-card',
  ) as NodeListOf<HTMLElement>;
  const prevButton = document.querySelector(
    '.services__nav--prev',
  ) as HTMLButtonElement | null;
  const nextButton = document.querySelector(
    '.services__nav--next',
  ) as HTMLButtonElement | null;

  if (!servicesSection || serviceCards.length === 0 || typeof gsap === 'undefined') {
    return;
  }

  // Card spacing configuration
  const CARD_SPACING = {
    SECONDARY: 360, // Distance from main card to secondary cards (left/right)
    BACKGROUND: 500, // Distance from main card to background cards (outer left/outer right)
  };

  let currentIndex = 2; // Start with card 3 (index 2)
  const totalCards = serviceCards.length;
  const isMobile = window.innerWidth < 992;
  let isAnimating = false;

  // Calculate card positions and states
  const updateCardStates = () => {
    serviceCards.forEach((card, index) => {
      const diff = index - currentIndex;

      // Remove all state classes
      card.classList.remove('is-main', 'is-secondary', 'is-background', 'is-hidden');

      if (isMobile) {
        // Mobile: Only show main card
        if (diff === 0) {
          card.classList.add('is-main');
        } else {
          card.classList.add('is-hidden');
        }
      } else {
        // Desktop: Multi-card layout
        if (diff === 0) {
          // Main card (center)
          card.classList.add('is-main');
          card.style.left = '50%';
          card.style.top = '50%';
          card.style.transform = 'translate(-50%, -50%) scale(1)';
        } else if (diff === -1) {
          // Secondary card (left of main)
          card.classList.add('is-secondary');
          card.style.left = '50%';
          card.style.top = '50%';
          card.style.transform = `translate(calc(-50% - ${CARD_SPACING.SECONDARY}px), -50%) scale(0.66)`;
        } else if (diff === 1) {
          // Secondary card (right of main)
          card.classList.add('is-secondary');
          card.style.left = '50%';
          card.style.top = '50%';
          card.style.transform = `translate(calc(-50% + ${CARD_SPACING.SECONDARY}px), -50%) scale(0.66)`;
        } else if (diff === -2) {
          // Background card (outer left)
          card.classList.add('is-background');
          card.style.left = '50%';
          card.style.top = '50%';
          card.style.transform = `translate(calc(-50% - ${CARD_SPACING.BACKGROUND}px), -50%) scale(0.44)`;
        } else if (diff === 2) {
          // Background card (outer right)
          card.classList.add('is-background');
          card.style.left = '50%';
          card.style.top = '50%';
          card.style.transform = `translate(calc(-50% + ${CARD_SPACING.BACKGROUND}px), -50%) scale(0.44)`;
        } else {
          // Hidden cards (beyond visible range)
          card.classList.add('is-hidden');
        }
      }
    });

    // Update navigation buttons
    if (prevButton) {
      prevButton.disabled = currentIndex === 0 || isAnimating;
    }
    if (nextButton) {
      nextButton.disabled = currentIndex === totalCards - 1 || isAnimating;
    }
  };

  // Animate card transition
  const animateCardTransition = (newIndex: number, direction: 'next' | 'prev' | 'direct') => {
    if (isAnimating) return;
    isAnimating = true;

    const oldCard = serviceCards[currentIndex];
    const newCard = serviceCards[newIndex];

    // Create GSAP timeline for smooth transition
    const tl = gsap.timeline({
      onComplete: () => {
        isAnimating = false;
        updateCardStates();
      },
    });

    if (isMobile) {
      // Mobile: Simple fade transition
      tl.to(oldCard, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
      })
        .set(oldCard, { visibility: 'hidden' })
        .set(newCard, { visibility: 'visible' })
        .fromTo(
          newCard,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.4,
            ease: 'power2.out',
          },
        );
    } else {
      // Desktop: Multi-card animation
      // Calculate target positions for all cards
      const targetStates: Array<{
        card: HTMLElement;
        transform: string;
        opacity: number;
      }> = [];

      serviceCards.forEach((card, index) => {
        const newDiff = index - newIndex;
        let transform = '';
        let opacity = 1;

        if (newDiff === 0) {
          // New main card
          transform = 'translate(-50%, -50%) scale(1)';
          opacity = 1;
        } else if (newDiff === -1) {
          // Secondary left
          transform = `translate(calc(-50% - ${CARD_SPACING.SECONDARY}px), -50%) scale(0.66)`;
          opacity = 0.7;
        } else if (newDiff === 1) {
          // Secondary right
          transform = `translate(calc(-50% + ${CARD_SPACING.SECONDARY}px), -50%) scale(0.66)`;
          opacity = 0.7;
        } else if (newDiff === -2) {
          // Background left
          transform = `translate(calc(-50% - ${CARD_SPACING.BACKGROUND}px), -50%) scale(0.44)`;
          opacity = 0.5;
        } else if (newDiff === 2) {
          // Background right
          transform = `translate(calc(-50% + ${CARD_SPACING.BACKGROUND}px), -50%) scale(0.44)`;
          opacity = 0.5;
        } else {
          // Hidden
          transform = 'translate(-50%, -50%) scale(0.44)';
          opacity = 0;
        }

        targetStates.push({ card, transform, opacity });
      });

      // Animate all cards to their new positions simultaneously
      targetStates.forEach(({ card, transform, opacity }) => {
        tl.to(
          card,
          {
            transform: transform,
            opacity: opacity,
            duration: 0.6,
            ease: 'power3.out',
          },
          0, // All animations start at the same time
        );
      });
    }

    // Update current index
    currentIndex = newIndex;

    // Animate content in for new main card (stagger effect)
    if (!isMobile) {
      const icon = newCard.querySelector('.service-card__icon');
      const title = newCard.querySelector('.service-card__title');
      const description = newCard.querySelector('.service-card__description');
      const button = newCard.querySelector('.service-card__button');

      // Reset content opacity
      gsap.set([icon, title, description, button], {
        opacity: 0,
        y: 20,
      });

      // Animate content in with stagger
      tl.to(
        [icon, title, description, button],
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
        },
        '-=0.3', // Start slightly before card animation completes
      );
    }
  };

  // Navigate to specific card
  const goToCard = (index: number, direction: 'next' | 'prev' | 'direct' = 'direct') => {
    if (index < 0 || index >= totalCards || index === currentIndex || isAnimating) {
      return;
    }

    animateCardTransition(index, direction);
  };

  // Navigate next
  const goNext = () => {
    if (currentIndex < totalCards - 1) {
      goToCard(currentIndex + 1, 'next');
    }
  };

  // Navigate previous
  const goPrev = () => {
    if (currentIndex > 0) {
      goToCard(currentIndex - 1, 'prev');
    }
  };

  // Handle card click
  const handleCardClick = (card: HTMLElement, index: number) => {
    if (isMobile || index === currentIndex || isAnimating) return;

    // Allow clicks on secondary and background cards
    if (card.classList.contains('is-secondary') || card.classList.contains('is-background')) {
      goToCard(index, index > currentIndex ? 'next' : 'prev');
    }
  };

  // Initialize
  const init = () => {
    // Set initial positions
    serviceCards.forEach((card, index) => {
      card.style.position = 'absolute';
      card.style.left = '50%';
      card.style.top = '50%';
      card.style.transformOrigin = 'center center';
    });

    // Set initial states
    updateCardStates();

    // Animate initial main card content in
    if (!isMobile) {
      const mainCard = serviceCards[currentIndex];
      const icon = mainCard.querySelector('.service-card__icon');
      const title = mainCard.querySelector('.service-card__title');
      const description = mainCard.querySelector('.service-card__description');
      const button = mainCard.querySelector('.service-card__button');

      gsap.fromTo(
        [icon, title, description, button],
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          delay: 0.3,
        },
      );
    }
  };

  // Event listeners
  if (prevButton) {
    prevButton.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      goPrev();
    });
  }

  if (nextButton) {
    nextButton.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      goNext();
    });
  }

  // Card click handlers
  serviceCards.forEach((card, index) => {
    card.addEventListener('click', () => {
      handleCardClick(card, index);
    });
  });

  // Handle window resize
  let resizeTimeout: ReturnType<typeof setTimeout>;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      const wasMobile = isMobile;
      const newIsMobile = window.innerWidth < 992;

      if (wasMobile !== newIsMobile) {
        // Reinitialize on breakpoint change
        init();
      } else {
        updateCardStates();
      }
    }, 250);
  });

  // Initialize on load
  init();
}

