import { AnimateOnScroll } from '@/components/animate-on-scroll';

export function MarketChallenge() {
  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="flex gap-8">
          <div className="max-w-2xl">
            <AnimateOnScroll>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                An MVP Isn't Enough. You Need an MVE.
              </h2>
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.2}>
              <p className="text-lg text-muted-foreground mb-4">
                Building the core product is just the start.
                If no one sees it, understands it, or trusts it — it dies in silence.
                That's where the MVE comes in: Minimum Viable Execution.
              </p>

              <p className="text-lg text-muted-foreground mb-6">
                It's the strategy, brand, and launch layer that makes your MVP visible, desirable, and usable.
                Your MVE includes:
              </p>

              <ul className="text-lg text-muted-foreground space-y-2 mb-6">
                <li>• Clear positioning and product story</li>
                <li>• Visual identity and landing page</li>
                <li>• Content and communication channels</li>
                <li>• Community and early users</li>
                <li>• Go-to-market plan with actual traction</li>
              </ul>

              <p className="text-lg text-muted-foreground">
                Without this layer, your MVP is just potential.<br/>
                With it — it's a business.
              </p>
            </AnimateOnScroll>
          </div>

          <div className="flex-1">
            {/* Здесь будет картинка */}
          </div>
        </div>
      </div>
    </section>
  );
}