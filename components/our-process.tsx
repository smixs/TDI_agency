import React from 'react';
import { Search, Lightbulb, Rocket, ChartBar } from 'lucide-react';
import { AnimateOnScroll } from '@/components/animate-on-scroll';

interface ProcessStep {
  number: number;
  icon: React.ElementType;
  title: string;
  description: string;
}

export function OurProcess() {
  const steps: ProcessStep[] = [
    {
      number: 1,
      icon: Search,
      title: "Discovery & Analysis",
      description: "We start by understanding your business, market, and customers in depth. Our team analyzes your current performance, identifies challenges, and uncovers opportunities for growth."
    },
    {
      number: 2,
      icon: Lightbulb,
      title: "Strategy Development",
      description: "Based on our findings, we create a tailored growth strategy that aligns with your goals. We define clear metrics, timelines, and action plans for implementation."
    },
    {
      number: 3,
      icon: Rocket,
      title: "Implementation & Execution",
      description: "Our specialists work closely with your team to execute the strategy across all channels. We deploy optimizations, run campaigns, and implement growth initiatives."
    },
    {
      number: 4,
      icon: ChartBar,
      title: "Measurement & Optimization",
      description: "We continuously monitor performance, analyze results, and make data-driven adjustments. This iterative approach ensures long-term growth and sustainable results."
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 transform md:translate-x-[-0.5px]" />
        
        {/* Process steps */}
        {steps.map((step, index) => (
          <AnimateOnScroll 
            key={index} 
            delay={0.15 * index}
            direction={index % 2 === 0 ? "left" : "right"}
          >
            <div className={`relative mb-12 md:mb-16 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12 md:ml-auto'} md:w-1/2`}>
              {/* Step number bubble */}
              <div className="absolute left-0 md:left-auto md:top-0 w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-semibold z-10
                            md:translate-x-[-50%]
                            md:translate-y-[-50%] 
                            md:w-12 md:h-12
                            md:text-lg
                            shadow-lg
                            md:border-4 md:border-background"
                   style={{ [index % 2 === 0 ? 'right' : 'left']: '-24px' }}>
                {step.number}
              </div>
              
              {/* Content card */}
              <div className="ml-12 md:ml-0 p-6 bg-muted/50 rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <step.icon className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                </div>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
          </AnimateOnScroll>
        ))}
      </div>
    </div>
  );
} 