import { Header } from '@/components/header';
import { HeroSection } from '@/components/hero-section';
import { ClientLogos } from '@/components/client-logos';
import { MarketChallenge } from '@/components/market-challenge';
import { AboutTDI } from '@/components/about-tdi';
import { ServicesSection } from '@/components/services-section';
import { TdiDifference } from '@/components/tdi-difference';
import { GrowthJourney } from '@/components/growth-journey';
import { ResultsSection } from '@/components/results-section';
import { ContactInfo } from '@/components/contact-info';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <HeroSection />
      
      <section id="clients" className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <ClientLogos />
        </div>
      </section>
      
      <section id="challenge" className="py-16 md:py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-4">
          <MarketChallenge />
        </div>
      </section>
      
      <section id="about" className="py-16 md:py-24 lg:py-32 bg-muted/30">
        <div className="container mx-auto px-4">
          <AboutTDI />
        </div>
      </section>
      
      <section id="services" className="py-16 md:py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-4">
          <ServicesSection />
        </div>
      </section>
      
      <section id="approach" className="py-16 md:py-24 lg:py-32 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            The TDI Difference
          </h2>
          <TdiDifference />
        </div>
      </section>
      
      <section id="process" className="py-16 md:py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Your Growth Journey, Simplified
          </h2>
          <GrowthJourney />
        </div>
      </section>
      
      <section id="results" className="py-16 md:py-24 lg:py-32 bg-muted/30">
        <div className="container mx-auto px-4">
          <ResultsSection />
        </div>
      </section>
      
      <section id="contact" className="py-16 md:py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-4">
          <ContactInfo />
        </div>
      </section>
      
      <Footer />
    </main>
  );
}