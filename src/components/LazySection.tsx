import { useState, useRef, useEffect } from 'react';

interface LazySectionProps {
  children: React.ReactNode;
  className?: string;
  rootMargin?: string;
  threshold?: number;
  fallback?: React.ReactNode;
}

const LazySection = ({ 
  children, 
  className = '', 
  rootMargin = '100px',
  threshold = 0.1,
  fallback = null
}: LazySectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          setIsVisible(true);
          setHasLoaded(true);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [hasLoaded, threshold, rootMargin]);

  return (
    <div ref={elementRef} className={className}>
      {isVisible ? children : (fallback || (
        <div className="flex items-center justify-center py-20">
          <div className="animate-pulse bg-gray-200 rounded-lg w-full h-32" />
        </div>
      ))}
    </div>
  );
};

export default LazySection;
