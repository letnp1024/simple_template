// Category & News Section with Parallax and Filtering

export function initCategoryNewsSection() {
  const categoryNewsSection = document.querySelector('#category-news') as HTMLElement | null;
  const categorySidebar = document.querySelector('.category-sidebar') as HTMLElement | null;
  const categoryBg = document.querySelector('.category-sidebar__bg') as HTMLImageElement | null;
  const categoryItems = document.querySelectorAll('.category-item') as NodeListOf<HTMLElement>;
  const newsItems = document.querySelectorAll('.news-item') as NodeListOf<HTMLElement>;

  if (!categoryNewsSection || !categorySidebar || typeof gsap === 'undefined') {
    return;
  }

  const isMobile = window.innerWidth < 992;

  // ====================
  // PARALLAX EFFECT
  // ====================
  // Parallax effect for category background image (scroll-based, vertical movement)
  // Image moves up/down as user scrolls, similar to about section
  const handleParallax = () => {
    if (isMobile || !categoryBg || !categorySidebar) return;

    const sidebarRect = categorySidebar.getBoundingClientRect();
    const sidebarTop = sidebarRect.top;
    const sidebarHeight = sidebarRect.height;
    const viewportHeight = window.innerHeight;
    const windowCenter = viewportHeight / 2;

    // Calculate when sidebar is in viewport
    if (sidebarTop < viewportHeight && sidebarTop + sidebarHeight > 0) {
      // Calculate distance from sidebar center to viewport center
      const sidebarCenter = sidebarTop + sidebarHeight / 2;
      const distanceFromCenter = windowCenter - sidebarCenter;

      // Parallax factor: image moves opposite to scroll direction (vertical)
      // Image height is 200% of container, so we can move it up to 50% of its own height
      // Limit movement to keep image within bounds
      const imageHeight = categoryBg.offsetHeight;
      const maxParallax = imageHeight * 0.5; // Max movement is 50% of image height
      const parallaxY = (distanceFromCenter / viewportHeight) * maxParallax;
      
      // Clamp the parallax value to prevent image from going out of bounds
      // The image is centered at -25% (translateY(-25%)), so we can move it ±25% of its height
      const clampedY = Math.max(-maxParallax, Math.min(maxParallax, parallaxY));

      gsap.to(categoryBg, {
        y: clampedY,
        duration: 0.3,
        ease: 'power1.out',
      });
    } else {
      // Reset when sidebar is out of view
      gsap.to(categoryBg, {
        y: 0,
        duration: 0.3,
        ease: 'power1.out',
      });
    }
  };

  // Handle parallax on scroll (only on desktop/tablet)
  if (!isMobile && categoryBg) {
    // Wait for image to load to get accurate dimensions
    if (categoryBg.complete && categoryBg.naturalHeight > 0) {
      window.addEventListener('scroll', handleParallax, { passive: true });
    } else {
      categoryBg.addEventListener('load', () => {
        window.addEventListener('scroll', handleParallax, { passive: true });
      }, { once: true });
    }
  }

  // ====================
  // CATEGORY FILTERING
  // ====================
  // News data structure (will be populated from HTML data attributes)
  interface NewsItem {
    element: HTMLElement;
    category: string;
  }

  const newsData: NewsItem[] = Array.from(newsItems).map((item) => {
    const category = item.getAttribute('data-category') || 'all';
    return {
      element: item,
      category: category.toLowerCase(),
    };
  });

  // Get all unique categories from news items
  const allCategories = new Set<string>(['all']);
  newsData.forEach((item) => {
    if (item.category && item.category !== 'all') {
      allCategories.add(item.category);
    }
  });

  // Active category state
  let activeCategory = 'all';

  // Filter news items based on selected category
  const filterNews = (category: string) => {
    if (category === activeCategory) return; // Prevent re-filtering same category

    activeCategory = category;

    // Update active category item
    categoryItems.forEach((item) => {
      const itemCategory = item.getAttribute('data-category')?.toLowerCase() || 'all';
      if (itemCategory === category) {
        item.classList.add('is-active');
      } else {
        item.classList.remove('is-active');
      }
    });

    // Create GSAP timeline for smooth filtering animation
    const tl = gsap.timeline();

    // Filter logic
    newsData.forEach((newsItem) => {
      const shouldShow = category === 'all' || newsItem.category === category;

      if (shouldShow) {
        // Show item: fade in and scale up
        if (newsItem.element.classList.contains('is-hidden')) {
          newsItem.element.classList.remove('is-hidden');
          gsap.set(newsItem.element, {
            opacity: 0,
            scale: 0.9,
          });

          tl.to(
            newsItem.element,
            {
              opacity: 1,
              scale: 1,
              duration: 0.4,
              ease: 'power2.out',
            },
            '<0.1', // Slight stagger
          );
        }
      } else {
        // Hide item: fade out and scale down
        if (!newsItem.element.classList.contains('is-hidden')) {
          tl.to(
            newsItem.element,
            {
              opacity: 0,
              scale: 0.9,
              duration: 0.3,
              ease: 'power2.in',
              onComplete: () => {
                newsItem.element.classList.add('is-hidden');
              },
            },
            '<0.1', // Slight stagger
          );
        }
      }
    });
  };

  // Initialize: Set "All" as active
  const allCategoryItem = Array.from(categoryItems).find(
    (item) => item.getAttribute('data-category')?.toLowerCase() === 'all',
  );
  if (allCategoryItem) {
    allCategoryItem.classList.add('is-active');
  }

  // Category click handlers
  categoryItems.forEach((item) => {
    item.addEventListener('click', () => {
      const category = item.getAttribute('data-category')?.toLowerCase() || 'all';
      filterNews(category);
    });
  });

  // ====================
  // RESPONSIVE HANDLING
  // ====================
  let resizeTimeout: ReturnType<typeof setTimeout>;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      const newIsMobile = window.innerWidth < 992;

      // Reinitialize parallax if breakpoint changed
      if (newIsMobile !== isMobile && categoryBg) {
        // Remove old scroll listener and re-add if needed
        // The handleParallax function checks isMobile internally, so it will work correctly
        // Just need to ensure scroll listener is active for desktop
        if (!newIsMobile) {
          window.addEventListener('scroll', handleParallax, { passive: true });
        }
      }
    }, 250);
  });
}

