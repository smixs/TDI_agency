import { AnimateOnScroll } from '@/components/animate-on-scroll';

export function MarketChallenge() {
  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <AnimateOnScroll>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Launching is Just Lap One. Winning Takes Strategy.
            </h2>
          </AnimateOnScroll>
          
          <AnimateOnScroll delay={0.2}>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Your MVP/MVE proves the concept. But in a crowded digital landscape,
              visibility, user adoption, and monetization don't happen by chance. You
              need more than just features; you need a narrative, a community, and a
              smart plan to cut through the noise. Generic marketing won't cut it here.
            </p>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}