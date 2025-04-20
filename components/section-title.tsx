import React from 'react';
import { cn } from '@/lib/utils';

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
  centered?: boolean;
  withAccentLine?: boolean;
  accentColor?: 'primary' | 'accent' | 'gradient';
}

export function SectionTitle({ 
  children, 
  className, 
  centered = true, 
  withAccentLine = true,
  accentColor = 'gradient' 
}: SectionTitleProps) {
  
  // Определяем классы для акцентной линии в зависимости от параметра accentColor
  const accentLineClasses = {
    'primary': 'bg-primary',
    'accent': 'bg-accent',
    'gradient': 'bg-gradient-to-r from-primary to-accent'
  };
  
  return (
    <div className={cn(
      "relative", 
      centered && "flex flex-col items-center",
      className
    )}>
      <h2 className={cn(
        "text-3xl md:text-4xl font-bold",
        centered && "text-center",
        "mb-4"
      )}>
        {children}
      </h2>
      
      {withAccentLine && (
        <div className={cn(
          "h-1 rounded-full mt-2 mb-10",
          centered ? "w-24" : "w-32",
          accentLineClasses[accentColor]
        )} />
      )}
    </div>
  );
} 