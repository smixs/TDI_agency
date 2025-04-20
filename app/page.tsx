import { Header } from '@/components/header';
import { HeroSection } from '@/components/hero-section';
{/* import { ClientLogos } from '@/components/client-logos'; */}
import { MarketChallenge } from '@/components/market-challenge';
import { AboutTDI } from '@/components/about-tdi';
import { ServicesSection } from '@/components/services-section';
import { ResultsSection } from '@/components/results-section';
import { ContactInfo } from '@/components/contact-info';
import { Footer } from '@/components/footer';
import { AnimateOnScroll } from '@/components/animate-on-scroll';
import { WhyTDI } from '@/components/why-tdi';
import { CaseStudy } from '@/components/case-study';
import { BackToTop } from '@/components/back-to-top';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <HeroSection />
      
      {/* 
      <section id="clients" className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <AnimateOnScroll>
            <ClientLogos />
          </AnimateOnScroll>
        </div>
      </section>
      */}
      
      <section id="challenge" className="py-16 md:py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-4">
          <AnimateOnScroll>
            <MarketChallenge />
          </AnimateOnScroll>
        </div>
      </section>
      
      <section id="about" className="py-16 md:py-24 lg:py-32 bg-muted/30">
        <div className="container mx-auto px-4">
          <AnimateOnScroll>
            <AboutTDI />
          </AnimateOnScroll>
        </div>
      </section>
      
      <section id="services" className="py-16 md:py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-4">
          <ServicesSection />
        </div>
      </section>
      
      <section id="approach" className="py-16 md:py-24 lg:py-32 bg-muted/30">
        <div className="container mx-auto px-4">
          <AnimateOnScroll delay={0.2}>
            <WhyTDI />
          </AnimateOnScroll>
        </div>
      </section>
      
      <section id="case-study" className="py-16 md:py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-4">
          <AnimateOnScroll delay={0.2}>
            <CaseStudy />
          </AnimateOnScroll>
        </div>
      </section>
      
      <section id="contact" className="py-16 md:py-24 lg:py-32 bg-muted/30">
        <div className="container mx-auto px-4">
          <AnimateOnScroll>
            <ContactInfo />
          </AnimateOnScroll>
        </div>
      </section>
      
      <Footer />
      <BackToTop />
    </main>
  );
}