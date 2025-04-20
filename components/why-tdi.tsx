import React from 'react';
import { 
  Search, 
  Palette, 
  Rocket, 
  LineChart
} from 'lucide-react';
import { AnimateOnScroll } from '@/components/animate-on-scroll';

interface ProcessStep {
  icon: React.ElementType;
  title: string;
  description: string;
  step: number;
}

export function WhyTDI() {
  const steps: ProcessStep[] = [
    {
      icon: Search,
      title: "Market & Product Analysis",
      description: "Deep dive into your market position and growth opportunities",
      step: 1
    },
    {
      icon: Palette,
      title: "Brand & Content Packaging",
      description: "Craft compelling messaging and launch assets",
      step: 2
    },
    {
      icon: Rocket,
      title: "Targeted Campaign Launch",
      description: "Execute data-driven acquisition strategies",
      step: 3
    },
    {
      icon: LineChart,
      title: "Scaling & Optimization",
      description: "Continuous refinement for sustainable growth",
      step: 4
    }
  ];

  return (
    <div className="w-full">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Do</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Our proven 4-step process takes your SaaS from validated product to market success
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
        {steps.map((step, index) => (
          <AnimateOnScroll 
            key={index} 
            delay={0.1 * index}
            className="h-full"
          >
            <div className="flex flex-col h-full hover:translate-y-[-4px] transition-transform duration-300 ease-in-out">
              <div className="flex gap-4 items-start mb-4">
                <div className="bg-primary/10 p-3 rounded-xl relative">
                  <step.icon className="h-5 w-5 text-accent" />
                  <div className="absolute -top-2 -right-2 bg-primary text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
              </div>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          </AnimateOnScroll>
        ))}
      </div>
    </div>
  );
} 