import React from 'react';
import { Mail, Phone, Linkedin, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimateOnScroll } from '@/components/animate-on-scroll';

const CONTACT_EMAIL = "hello@tdigroup.agency";
// const CONTACT_PHONE = "+1234567890"; // Optional
// const LINKEDIN_URL = "https://linkedin.com/company/tdigroup"; // Optional
// const TWITTER_URL = "https://twitter.com/tdigroup"; // Optional

export function ContactInfo() {
  return (
    <div className="max-w-3xl mx-auto text-center">
      <AnimateOnScroll>
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Let's discuss your project
        </h2>
      </AnimateOnScroll>
      
      <AnimateOnScroll delay={0.2}>
        <p className="text-lg text-muted-foreground mb-10 md:mb-12 leading-relaxed max-w-xl mx-auto">
          Ready to discuss your project or have questions? Contact us directly. We're here to help bring your vision to reality.
        </p>
      </AnimateOnScroll>

      <div className="flex flex-col items-center space-y-6">
        {/* Email - Primary contact */}
        <AnimateOnScroll delay={0.3}>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-flex items-center text-lg md:text-xl font-medium text-primary hover:text-primary/80 transition-colors group"
          >
            <Mail className="w-5 h-5 md:w-6 md:h-6 mr-2 text-accent transition-transform group-hover:scale-110" />
            {CONTACT_EMAIL}
          </a>
        </AnimateOnScroll>

        {/* Optional: Phone */}
        {/* {CONTACT_PHONE && (
          <a
            href={`tel:${CONTACT_PHONE}`}
            className="inline-flex items-center text-lg text-muted-foreground hover:text-primary/80 transition-colors group"
          >
            <Phone className="w-5 h-5 mr-2 text-accent transition-transform group-hover:scale-110" />
            {CONTACT_PHONE}
          </a>
        )} */}

        {/* Optional: Social media */}
        <AnimateOnScroll delay={0.4}>
          <div className="flex space-x-6 pt-4">
            {/* {LINKEDIN_URL && (
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="w-6 h-6 text-accent" />
                <span className="sr-only">LinkedIn</span>
              </a>
            )}
            {TWITTER_URL && (
              <a href={TWITTER_URL} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="w-6 h-6 text-accent" />
                <span className="sr-only">Twitter</span>
              </a>
            )} */}
          </div>
        </AnimateOnScroll>

        {/* Mailto button for greater emphasis */}
        <AnimateOnScroll delay={0.5}>
          <Button size="lg" asChild className="mt-4">
            <a href={`mailto:${CONTACT_EMAIL}`}>
              Send us an email
            </a>
          </Button>
        </AnimateOnScroll>
      </div>
    </div>
  );
}
