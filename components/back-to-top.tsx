'use client';

import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Отслеживаем прокрутку страницы
  useEffect(() => {
    const toggleVisibility = () => {
      // Показывать кнопку, когда пользователь прокрутил страницу вниз на 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Инициализация состояния
    toggleVisibility();
    
    window.addEventListener('scroll', toggleVisibility);

    // Очистка слушателя событий при размонтировании компонента
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Функция плавной прокрутки вверх
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={cn(
        'fixed bottom-8 right-8 z-50 rounded-full p-3 bg-accent text-accent-foreground shadow-lg hover:bg-accent/90 transition-all duration-300 ease-in-out',
        'focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2',
        'transform hover:scale-110 active:scale-95',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      )}
      aria-label="Scroll to top"
    >
      <ChevronUp 
        className={cn(
          "h-6 w-6",
          isHovering && "animate-bounce"
        )} 
        strokeWidth={2.5} 
      />
    </button>
  );
} 