import React from 'react';
import { LucideIcon } from 'lucide-react';
import { ServiceCard } from '@/components/service-card';
import { cn } from '@/lib/utils';

export interface ServiceData {
  icon: LucideIcon;
  title: string;
  description: string;
  tags: string[];
}

interface ServicesGridProps {
  services: ServiceData[];
  className?: string;
}

export function ServicesGrid({ services, className }: ServicesGridProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            icon={service.icon}
            title={service.title}
            description={service.description}
            tags={service.tags}
          />
        ))}
      </div>
    </div>
  );
} 