'use client';

import React, { ReactNode, CSSProperties } from 'react';
import { useIntersection } from '@/hooks/use-intersection';
import { cn } from '@/lib/utils';

export type AnimationType = 
  | 'fade-in'
  | 'fade-up'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'zoom-in'
  | 'zoom-out';

export interface AnimatedElementProps {
  children: ReactNode;
  className?: string;
  animation?: AnimationType;
  duration?: number;
  delay?: number;
  threshold?: number;
  once?: boolean;
  rootMargin?: string;
  as?: React.ElementType;
  style?: CSSProperties;
}

export function AnimatedElement({
  children,
  className,
  animation = 'fade-up',
  duration = 0.4,
  delay = 0,
  threshold = 0.1,
  once = true,
  rootMargin = '0px',
  as: Component = 'div',
  style,
  ...props
}: AnimatedElementProps & Omit<React.HTMLAttributes<HTMLElement>, 'style'>) {
  const [ref, isIntersecting] = useIntersection({
    threshold,
    triggerOnce: once,
    rootMargin,
  });

  // Базовые стили для всех анимаций
  const baseStyles: CSSProperties = {
    opacity: 0,
    transition: `transform ${duration}s ease-out, opacity ${duration}s ease-out`,
    transitionDelay: `${delay}s`,
    willChange: 'transform, opacity',
  };

  // Специфичные стили для каждого типа анимации
  const animationStyles: Record<AnimationType, CSSProperties> = {
    'fade-in': {
      opacity: 0,
    },
    'fade-up': {
      opacity: 0,
      transform: 'translateY(30px)',
    },
    'fade-down': {
      opacity: 0,
      transform: 'translateY(-30px)',
    },
    'fade-left': {
      opacity: 0,
      transform: 'translateX(30px)',
    },
    'fade-right': {
      opacity: 0,
      transform: 'translateX(-30px)',
    },
    'zoom-in': {
      opacity: 0,
      transform: 'scale(0.9)',
    },
    'zoom-out': {
      opacity: 0,
      transform: 'scale(1.1)',
    },
  };

  // Активные стили, когда элемент в зоне видимости
  const activeStyles: CSSProperties = {
    opacity: 1,
    transform: 'translate3d(0, 0, 0) scale(1)',
  };

  return (
    <Component
      ref={ref}
      className={cn(className)}
      style={{
        ...baseStyles,
        ...(animationStyles[animation] || {}),
        ...(isIntersecting ? activeStyles : {}),
        ...style,
      }}
      {...props}
    >
      {children}
    </Component>
  );
}

export interface AnimatedGroupProps extends Omit<AnimatedElementProps, 'children'> {
  children: ReactNode[];
  staggerDelay?: number;
}

export function AnimatedGroup({
  children,
  staggerDelay = 0.05,
  delay = 0,
  ...props
}: AnimatedGroupProps) {
  return (
    <>
      {React.Children.map(children, (child, index) => (
        <AnimatedElement
          key={index}
          delay={delay + index * staggerDelay}
          {...props}
        >
          {child}
        </AnimatedElement>
      ))}
    </>
  );
} 