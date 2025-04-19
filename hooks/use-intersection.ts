'use client';

import { useState, useEffect, useRef, MutableRefObject } from 'react';

interface UseIntersectionOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  triggerOnce?: boolean;
}

export function useIntersection<T extends Element>(
  options: UseIntersectionOptions = {}
): [MutableRefObject<T | null>, boolean] {
  const { 
    root = null, 
    rootMargin = '0px', 
    threshold = 0, 
    triggerOnce = false 
  } = options;
  
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<T | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsIntersecting(entry.isIntersecting);
        
        // Если элемент стал видимым и нужно наблюдать только один раз,
        // прекращаем наблюдение
        if (triggerOnce && entry.isIntersecting && ref.current) {
          observer.unobserve(ref.current);
        }
      },
      { 
        root, 
        rootMargin, 
        threshold 
      }
    );
    
    observerRef.current = observer;
    
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [root, rootMargin, threshold, triggerOnce]);

  // Подключаем и отключаем observer, когда ref меняется
  useEffect(() => {
    const currentRef = ref.current;
    const currentObserver = observerRef.current;
    
    if (currentRef && currentObserver) {
      currentObserver.observe(currentRef);
      
      return () => {
        if (currentRef) {
          currentObserver.unobserve(currentRef);
        }
      };
    }
    
    return undefined;
  }, [ref.current]);

  return [ref, isIntersecting];
} 