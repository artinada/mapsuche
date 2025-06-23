// Image optimization utilities for MapSuche

export interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpg' | 'png';
  fit?: 'crop' | 'fill' | 'scale' | 'pad';
  crop?: 'center' | 'top' | 'bottom' | 'left' | 'right';
}

/**
 * Generate optimized Unsplash URL with WebP format and compression
 */
export const optimizeUnsplashImage = (
  url: string, 
  options: ImageOptimizationOptions = {}
): string => {
  const {
    width = 800,
    height = 600,
    quality = 75,
    format = 'webp',
    fit = 'crop',
    crop = 'center'
  } = options;

  if (!url.includes('unsplash.com')) {
    return url;
  }

  // Build optimized URL with Unsplash API parameters
  const params = new URLSearchParams();
  params.set('w', width.toString());
  params.set('h', height.toString());
  params.set('q', quality.toString());
  params.set('fm', format);
  params.set('fit', fit);
  if (fit === 'crop') {
    params.set('crop', crop);
  }

  return `${url}&${params.toString()}`;
};

/**
 * Generate responsive image srcSet for different screen densities
 */
export const generateResponsiveSrcSet = (
  url: string,
  baseWidth: number,
  baseHeight: number,
  quality = 75
): string => {
  if (!url.includes('unsplash.com')) {
    return '';
  }

  const densities = [0.5, 0.75, 1, 1.25, 1.5, 2];
  const srcSetEntries = densities.map(density => {
    const width = Math.round(baseWidth * density);
    const height = Math.round(baseHeight * density);
    const optimizedUrl = optimizeUnsplashImage(url, { width, height, quality });
    return `${optimizedUrl} ${width}w`;
  });

  return srcSetEntries.join(', ');
};

/**
 * Generate low-quality image placeholder (LQIP) for faster perceived loading
 */
export const generateLQIP = (url: string): string => {
  return optimizeUnsplashImage(url, {
    width: 20,
    height: 15,
    quality: 10,
    format: 'jpg'
  });
};

/**
 * Get optimal image sizes based on screen breakpoints
 */
export const getResponsiveSizes = (
  maxWidthMobile = '100vw',
  maxWidthTablet = '50vw', 
  maxWidthDesktop = '33vw'
): string => {
  return `(max-width: 768px) ${maxWidthMobile}, (max-width: 1200px) ${maxWidthTablet}, ${maxWidthDesktop}`;
};

/**
 * Preload critical images for better Core Web Vitals
 */
export const preloadImage = (url: string, options: ImageOptimizationOptions = {}): void => {
  if (typeof window === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = optimizeUnsplashImage(url, options);
  
  // Add media query for responsive preloading
  if (options.width && options.width <= 768) {
    link.media = '(max-width: 768px)';
  }
  
  document.head.appendChild(link);
};

/**
 * Image format support detection
 */
export const supportsWebP = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
};

/**
 * Calculate optimal image dimensions for mobile devices
 */
export const getMobileOptimizedDimensions = (
  originalWidth: number,
  originalHeight: number,
  maxWidth = 400
): { width: number; height: number } => {
  const aspectRatio = originalWidth / originalHeight;
  
  if (originalWidth <= maxWidth) {
    return { width: originalWidth, height: originalHeight };
  }
  
  return {
    width: maxWidth,
    height: Math.round(maxWidth / aspectRatio)
  };
};

/**
 * Intersection Observer for lazy loading images
 */
export const createImageObserver = (callback: (entry: IntersectionObserverEntry) => void) => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return null;
  }

  return new IntersectionObserver(
    (entries) => {
      entries.forEach(callback);
    },
    {
      rootMargin: '50px 0px', // Start loading 50px before image enters viewport
      threshold: 0.01
    }
  );
}; 