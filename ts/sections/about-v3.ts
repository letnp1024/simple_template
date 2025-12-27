// About V3 Section with Card Content Switching and Horizontal Scroll Bar

export function initAboutV3() {
  const aboutSection = document.querySelector('.about-v3') as HTMLElement | null;
  const cardContents = document.querySelectorAll('.about-v3__card-content') as NodeListOf<HTMLElement>;
  const barItems = document.querySelectorAll('.about-v3__bar-item') as NodeListOf<HTMLElement>;
  const barItemsContainer = document.querySelector('.about-v3__bar-items') as HTMLElement | null;
  const prevButton = document.querySelector('.about-v3__bar-nav--prev') as HTMLButtonElement | null;
  const nextButton = document.querySelector('.about-v3__bar-nav--next') as HTMLButtonElement | null;

  if (!aboutSection || !barItemsContainer) {
    return;
  }

  // ====================
  // CONTENT SWITCHING
  // ====================
  let activeIndex = 0;

  const switchContent = (index: number) => {
    if (index < 0 || index >= cardContents.length) return;
    if (index === activeIndex) return;

    // Hide current active content
    const currentContent = cardContents[activeIndex];
    if (currentContent) {
      currentContent.classList.remove('is-active');
    }

    // Show new content
    activeIndex = index;
    const newContent = cardContents[activeIndex];
    if (newContent) {
      newContent.classList.add('is-active');
    }

    // Update bar items active state
    barItems.forEach((item, i) => {
      if (i === activeIndex) {
        item.classList.add('is-active');
      } else {
        item.classList.remove('is-active');
      }
    });

    // Scroll active item into view
    scrollToActiveItem();
  };

  // Bar item click handlers
  barItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      switchContent(index);
    });
  });

  // ====================
  // HORIZONTAL SCROLL
  // ====================
  const scrollToActiveItem = () => {
    const activeItem = barItems[activeIndex];
    if (!activeItem || !barItemsContainer) return;

    const containerRect = barItemsContainer.getBoundingClientRect();
    const itemRect = activeItem.getBoundingClientRect();
    const scrollLeft = barItemsContainer.scrollLeft;
    const itemLeft = itemRect.left - containerRect.left + scrollLeft;
    const itemWidth = itemRect.width;
    const containerWidth = containerRect.width;

    // Calculate scroll position to center the item
    const targetScroll = itemLeft - (containerWidth / 2) + (itemWidth / 2);

    barItemsContainer.scrollTo({
      left: targetScroll,
      behavior: 'smooth',
    });
  };

  // Check scroll position and update button states
  const updateNavButtons = () => {
    if (!barItemsContainer || !prevButton || !nextButton) return;

    const { scrollLeft, scrollWidth, clientWidth } = barItemsContainer;
    const isAtStart = scrollLeft <= 0;
    const isAtEnd = scrollLeft >= scrollWidth - clientWidth - 1; // -1 for rounding errors

    prevButton.disabled = isAtStart;
    nextButton.disabled = isAtEnd;
  };

  // Navigation button handlers
  if (prevButton) {
    prevButton.addEventListener('click', () => {
      if (!barItemsContainer) return;
      const scrollAmount = barItemsContainer.clientWidth * 0.8;
      barItemsContainer.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth',
      });
    });
  }

  if (nextButton) {
    nextButton.addEventListener('click', () => {
      if (!barItemsContainer) return;
      const scrollAmount = barItemsContainer.clientWidth * 0.8;
      barItemsContainer.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    });
  }

  // Update button states on scroll
  if (barItemsContainer) {
    barItemsContainer.addEventListener('scroll', updateNavButtons);
    // Initial check
    updateNavButtons();

    // Check on resize
    let resizeTimeout: ReturnType<typeof setTimeout>;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        updateNavButtons();
        scrollToActiveItem();
      }, 250);
    });
  }

  // Initialize: Scroll to active item on load
  setTimeout(() => {
    scrollToActiveItem();
    updateNavButtons();
  }, 100);
}

