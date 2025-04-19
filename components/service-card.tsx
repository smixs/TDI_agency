import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

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
        "min-h-full",
        className
      )}
    >
      <div className="p-3 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 mb-4 ring-1 ring-primary/10 self-start">
        <Icon className="h-6 w-6 text-primary group-hover:text-primary group-hover:rotate-3 transition-all duration-300" />
      </div>
      
      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary/90 transition-colors duration-300">{title}</h3>
      
      <p className="flex-grow text-sm text-muted-foreground mb-4 leading-relaxed">{description}</p>
      
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-auto">
          {tags.map((tag, index) => (
            <Badge 
              key={index}
              variant="secondary" 
              className="text-xs bg-secondary/30 hover:bg-secondary/40"
            >
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
} 