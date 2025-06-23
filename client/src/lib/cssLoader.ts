// CSS Loading utilities for performance optimization

/**
 * Load CSS file asynchronously without blocking render
 */
export const loadCSS = (href: string, media = 'all'): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      resolve();
      return;
    }

    // Check if CSS is already loaded
    const existingLink = document.querySelector(`link[href="${href}"]`);
    if (existingLink) {
      resolve();
      return;
    }

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.media = 'print'; // Load as print first to avoid blocking
    
    link.onload = () => {
      link.media = media; // Switch to target media after load
      resolve();
    };
    
    link.onerror = () => {
      reject(new Error(`Failed to load CSS: ${href}`));
    };

    document.head.appendChild(link);
  });
};

/**
 * Load CSS with intersection observer for deferred loading
 */
export const loadCSSOnIntersection = (
  href: string, 
  targetSelector: string,
  media = 'all'
): void => {
  if (typeof window === 'undefined') return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadCSS(href, media);
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '50px' }
  );

  const target = document.querySelector(targetSelector);
  if (target) {
    observer.observe(target);
  }
};

/**
 * Load CSS after page load to avoid blocking critical rendering
 */
export const loadCSSDeferred = (href: string, media = 'all'): void => {
  if (typeof window === 'undefined') return;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      loadCSS(href, media);
    });
  } else {
    // Use requestIdleCallback if available, otherwise setTimeout
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => loadCSS(href, media));
    } else {
      setTimeout(() => loadCSS(href, media), 100);
    }
  }
};

/**
 * Preload CSS for faster subsequent loads
 */
export const preloadCSS = (href: string): void => {
  if (typeof window === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'style';
  link.href = href;
  document.head.appendChild(link);
};

/**
 * Load fonts with display:swap for better performance
 */
export const loadFontsOptimized = (): void => {
  if (typeof window === 'undefined') return;

  // Check if fonts are already loaded
  if (document.querySelector('link[href*="fonts.googleapis.com"]')) {
    return;
  }

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
  link.media = 'print';
  
  link.onload = () => {
    link.media = 'all';
  };

  document.head.appendChild(link);
};

/**
 * Remove unused CSS classes from the DOM (for development debugging)
 */
export const detectUnusedCSS = (): string[] => {
  if (typeof window === 'undefined') return [];

  const allElements = document.querySelectorAll('*');
  const usedClasses = new Set<string>();

  allElements.forEach((element) => {
    element.classList.forEach((className) => {
      usedClasses.add(className);
    });
  });

  // Common Tailwind classes that might be unused
  const commonUnusedClasses = [
    'dark:', // Dark mode classes
    'print:', // Print-specific classes
    'motion-reduce:', // Motion preference classes
    'contrast-more:', // Accessibility classes
    'contrast-less:',
    'portrait:', // Orientation classes
    'landscape:',
  ];

  return commonUnusedClasses.filter(prefix => 
    !Array.from(usedClasses).some(className => className.startsWith(prefix))
  );
}; 