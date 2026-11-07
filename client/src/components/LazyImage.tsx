import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { 
  optimizeUnsplashImage, 
  generateResponsiveSrcSet, 
  generateLQIP,
  createImageObserver
} from '@/lib/imageOptimization';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  placeholder?: 'blur' | 'empty';
  onLoad?: () => void;
  onError?: () => void;
}

const LazyImage = ({
  src,
  alt,
  className,
  width = 800,
  height = 600,
  priority = false,
  quality = 75,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  placeholder = 'blur',
  onLoad,
  onError
}: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>('');
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate image URLs
  const lqipUrl = generateLQIP(src);
  const optimizedUrl = optimizeUnsplashImage(src, { width, height, quality });
  const srcSet = generateResponsiveSrcSet(src, width, height, quality);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || !containerRef.current) return;

    const observer = createImageObserver((entry) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer?.unobserve(entry.target);
      }
    });

    if (observer && containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (observer && containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [priority]);

  // Load image when in view
  useEffect(() => {
    if (!isInView) return;

    const img = new Image();
    img.src = optimizedUrl;
    img.srcset = srcSet;
    
    img.onload = () => {
      setImageUrl(optimizedUrl);
      setIsLoaded(true);
      onLoad?.();
    };
    
    img.onerror = () => {
      setHasError(true);
      onError?.();
    };
  }, [isInView, optimizedUrl, srcSet, onLoad, onError]);

  // Error fallback
  if (hasError) {
    return (
      <div 
        ref={containerRef}
        className={cn(
          'flex items-center justify-center bg-gray-100 text-gray-400 rounded-lg',
          className
        )}
        style={{ aspectRatio: `${width}/${height}` }}
      >
        <div className="text-center p-4">
          <div className="text-2xl mb-1">📷</div>
          <p className="text-xs">Image unavailable</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={cn('relative overflow-hidden', className)}
      style={{ aspectRatio: `${width}/${height}` }}
    >
      {/* Low Quality Image Placeholder (LQIP) */}
      {placeholder === 'blur' && !isLoaded && (
        <img
          src={lqipUrl}
          alt=""
          className="absolute inset-0 w-full h-full object-cover filter blur-sm scale-110 transition-opacity duration-300"
          style={{ aspectRatio: `${width}/${height}` }}
        />
      )}

      {/* Loading skeleton */}
      {placeholder === 'empty' && !isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}

      {/* Main optimized image */}
      {isInView && (
        <img
          ref={imgRef}
          src={imageUrl || optimizedUrl}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className={cn(
            'w-full h-full object-cover transition-opacity duration-500',
            isLoaded ? 'opacity-100' : 'opacity-0'
          )}
          style={{ aspectRatio: `${width}/${height}` }}
        />
      )}

      {/* Mobile optimization indicator (dev only) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
          {width}x{height} | Q{quality}
        </div>
      )}
    </div>
  );
};

export default LazyImage;
