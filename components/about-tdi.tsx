import { AnimateOnScroll } from '@/components/animate-on-scroll';

export function AboutTDI() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <AnimateOnScroll>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
              We Architect Growth for Digital Products
            </h2>
          </AnimateOnScroll>
          
          <AnimateOnScroll delay={0.2}>
            <p className="text-lg text-muted-foreground text-center leading-relaxed">
              We are TDI Group, a specialized agency focused entirely on the
              post-development journey of tech products. We understand the nuances of SaaS retention, app adoption
              hooks, and marketplace network effects. Our team combines strategic
              insight, creative execution, and a relentless focus on driving engagement
              and measurable business outcomes.
            </p>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}