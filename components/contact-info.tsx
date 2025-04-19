import React from 'react';
import { Mail, Phone, Linkedin, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CONTACT_EMAIL = "hello@tdigroup.agency";
// const CONTACT_PHONE = "+1234567890"; // Опционально
// const LINKEDIN_URL = "https://linkedin.com/company/tdigroup"; // Опционально
// const TWITTER_URL = "https://twitter.com/tdigroup"; // Опционально

export function ContactInfo() {
  return (
    <div className="max-w-3xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-6">
        Давайте обсудим ваш проект
      </h2>
      <p className="text-lg text-muted-foreground mb-10 md:mb-12 leading-relaxed max-w-xl mx-auto">
        Готовы обсудить ваш проект или есть вопросы? Свяжитесь с нами напрямую. Мы здесь, чтобы помочь воплотить ваше видение в реальность.
      </p>

      <div className="flex flex-col items-center space-y-6">
        {/* Email - Основной контакт */}
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="inline-flex items-center text-lg md:text-xl font-medium text-primary hover:text-primary/80 transition-colors group"
        >
          <Mail className="w-5 h-5 md:w-6 md:h-6 mr-2 transition-transform group-hover:scale-110" />
          {CONTACT_EMAIL}
        </a>

        {/* Опционально: Телефон */}
        {/* {CONTACT_PHONE && (
          <a
            href={`tel:${CONTACT_PHONE}`}
            className="inline-flex items-center text-lg text-muted-foreground hover:text-primary/80 transition-colors group"
          >
            <Phone className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
            {CONTACT_PHONE}
          </a>
        )} */}

        {/* Опционально: Соцсети */}
        <div className="flex space-x-6 pt-4">
          {/* {LINKEDIN_URL && (
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin className="w-6 h-6" />
              <span className="sr-only">LinkedIn</span>
            </a>
          )}
          {TWITTER_URL && (
            <a href={TWITTER_URL} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Twitter className="w-6 h-6" />
              <span className="sr-only">Twitter</span>
            </a>
          )} */}
        </div>

        {/* Кнопка mailto для большего акцента */}
        <Button size="lg" asChild className="mt-4">
          <a href={`mailto:${CONTACT_EMAIL}`}>
            Отправить нам email
          </a>
        </Button>
      </div>
    </div>
  );
}
