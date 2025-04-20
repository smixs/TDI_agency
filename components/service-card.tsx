import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';

const PixelCanvas = dynamic(() => import('@/components/ui/pixel-canvas'), {
  ssr: false, // Отключаем серверный рендеринг для этого компонента
});

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  tags: string[];
  className?: string;
}

export function ServiceCard({ icon: Icon, title, description, tags, className }: ServiceCardProps) {
  return (
    <div 
      className={cn(
        "group flex flex-col p-6 rounded-xl border border-border/40 bg-gradient-to-br from-card/80 to-background shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 hover:border-primary/30",
        "min-h-full relative overflow-hidden",
        className
      )}
    >
      {/* Pixel Canvas эффект */}
      <PixelCanvas
        gap={2}
        speed={30}
        colors={['#FFFF00']}
        variant="default"
        noFocus={false}
      />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="p-3 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 mb-4 ring-1 ring-primary/10 self-start">
          <Icon className="h-6 w-6 text-accent group-hover:text-accent group-hover:rotate-3 transition-all duration-300" />
        </div>
        
        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary/90 transition-colors duration-300">{title}</h3>
        
        <p className="flex-grow text-sm text-foreground mb-4 leading-relaxed">{description}</p>
        
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-auto">
            {tags.map((tag, index) => (
              <Badge 
                key={index}
                variant="outline" 
                className="text-xs border-primary/30 text-foreground bg-primary/10 hover:bg-primary/20 transition-colors"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 