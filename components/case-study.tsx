import React from 'react';
import { TrendingUp, Target, Users, Star } from 'lucide-react';
import { AnimateOnScroll } from '@/components/animate-on-scroll';

interface Metric {
  icon: React.ElementType;
  value: string;
  label: string;
}

export function CaseStudy() {
  const metrics: Metric[] = [
    {
      icon: TrendingUp,
      value: '+5x',
      label: 'Revenue Growth in 6 Months'
    },
    {
      icon: Target,
      value: '-58%',
      label: 'Customer Acquisition Cost'
    },
    {
      icon: Users,
      value: '94%',
      label: 'User Retention Rate'
    },
    {
      icon: Star,
      value: '4.9',
      label: 'Client Satisfaction Score'
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Turning Potential into Performance
        </h2>
        <p className="text-xl text-muted-foreground mb-8">
          SaaS Success Stories
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {metrics.map((metric, index) => (
          <AnimateOnScroll
            key={index}
            delay={0.1 * index}
          >
            <div className="bg-muted/50 p-6 rounded-lg border border-border hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <metric.icon className="h-5 w-5 text-accent" />
                </div>
                <span className="text-3xl font-bold text-primary">{metric.value}</span>
              </div>
              <p className="text-muted-foreground">{metric.label}</p>
            </div>
          </AnimateOnScroll>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AnimateOnScroll delay={0.3}>
          <div className="bg-muted/50 p-6 rounded-lg border border-border">
            <h3 className="text-xl font-semibold mb-4">Challenge</h3>
            <p className="text-muted-foreground">
              A promising SaaS platform struggled with high CAC and inconsistent revenue growth 
              despite having a superior product. They needed a strategic approach to market 
              positioning and user acquisition.
            </p>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.4}>
          <div className="bg-muted/50 p-6 rounded-lg border border-border">
            <h3 className="text-xl font-semibold mb-4">Solution</h3>
            <p className="text-muted-foreground">
              We implemented our 4-step growth process, focusing on deep market analysis, 
              brand messaging refinement, and targeted acquisition campaigns. This was 
              supported by continuous optimization based on user feedback and performance data.
            </p>
          </div>
        </AnimateOnScroll>
      </div>
    </div>
  );
} 