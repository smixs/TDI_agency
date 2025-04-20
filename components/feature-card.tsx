import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  className?: string;
}

export function FeatureCard({ icon: Icon, title, description, className }: FeatureCardProps) {
  return (
    <div 
      className={cn(
        "group flex flex-col items-center p-5 rounded-xl border border-border/40 bg-card/50 backdrop-blur-sm shadow-sm hover:shadow-lg hover:border-primary/40 transition-all duration-300 transform hover:-translate-y-1 hover:bg-card/70",
        className
      )}
    >
      <div className="p-3 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 mb-4 ring-1 ring-primary/10 transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-primary/30 group-hover:to-primary/10 group-hover:ring-primary/20">
        <Icon className="h-6 w-6 text-accent transition-colors duration-300 group-hover:text-accent" />
      </div>
      <h3 className="text-base font-semibold text-center mb-1 group-hover:text-primary/90 transition-colors duration-300">{title}</h3>
      {description && (
        <p className="text-xs text-muted-foreground mt-2 text-center leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
} 