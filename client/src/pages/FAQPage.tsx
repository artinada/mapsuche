import { useState } from 'react';
import { ChevronDown, ChevronUp, MessageCircle, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { useSEO } from '@/hooks/useSEO';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQPage() {
  const { language } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // SEO optimization for FAQ page
  useSEO({ 
    page: 'faq',
    customKeywords: [
      'local seo questions',
      'digital marketing faq',
      'google maps help',
      'business profile questions',
      'seo consultation',
      'local marketing help'
    ]
  });

  const faqs: { [key: string]: FAQItem[] } = {
    en: [
      {
        question: "How long does it take to see results from Google Maps optimization?",
        answer: "Most businesses see improved visibility within 2-4 weeks. Full optimization results typically appear within 2-3 months, depending on competition and current online presence."
      },
      {
        question: "What's included in Google Business Profile setup?",
        answer: "Complete profile creation, business verification, photo optimization, service/product listings, review management setup, and ongoing optimization recommendations."
      },
      {
        question: "Do you work with businesses outside Germany?",
        answer: "While we specialize in German markets, we can help businesses in other European countries with their local SEO and Google optimization needs."
      },
      {
        question: "How much does local SEO cost for small businesses?",
        answer: "Our packages are designed for small business budgets, starting from affordable monthly plans. Contact us for a free consultation and custom quote based on your specific needs."
      },
      {
        question: "Can you help if my business already has a Google listing?",
        answer: "Absolutely! We can audit your existing listing, optimize it for better performance, and fix any issues that might be limiting your visibility."
      },
      {
        question: "What makes your local SEO different from other agencies?",
        answer: "We focus exclusively on local businesses, understand German market specifics, and provide personalized service with transparent reporting and proven results."
      },
      {
        question: "Do I need a new website or can you optimize my existing one?",
        answer: "We can work with your existing website to improve its local SEO performance, or create a new mobile-optimized site designed specifically for local search."
      },
      {
        question: "How do you track and report results?",
        answer: "We provide monthly reports showing Google ranking improvements, website traffic increases, and local search visibility metrics with clear, easy-to-understand data."
      },
      {
        question: "What is the Ablauf-Audit service and what does it include?",
        answer: "Our Ablauf-Audit service helps organize your business processes to reduce chaos and improve efficiency. It includes appointment and customer management systems, GDPR-compliant document storage, and professional templates for emails, invoices, and offers."
      },
      {
        question: "How long does the process optimization take?",
        answer: "Most process audits are completed within 2-4 weeks, depending on business complexity. We work at your pace and provide step-by-step implementation to ensure you're comfortable with all changes."
      },
      {
        question: "Is Ablauf-Audit suitable for my type of business?",
        answer: "Yes! Our process optimization works for restaurants, handwerkers, retail stores, service providers, and most small businesses. We customize solutions based on your specific industry and workflow needs."
      },
      {
        question: "How does the Ablauf-Audit help with GDPR compliance?",
        answer: "We implement secure, GDPR-compliant document storage and management systems. This includes proper data handling procedures, secure archiving, and clear documentation processes to meet German privacy regulations."
      },
      {
        question: "What kind of templates do you provide?",
        answer: "We create professional templates for your most common business communications: email responses, invoice formats, quote templates, appointment confirmations, and customer follow-up messages - all branded consistently for your business."
      },
      {
        question: "How do you ensure confidentiality during the process audit?",
        answer: "We treat all business information with strict confidentiality. We work discreetly, can sign NDAs if required, and focus on helping you organize processes without disrupting your daily operations."
      },
      {
        question: "Do you provide ongoing support after the Ablauf-Audit?",
        answer: "Yes! We provide follow-up support to ensure systems are working well and can make adjustments as your business evolves. We're here to help you maintain organized, efficient processes long-term."
      },
      {
        question: "How much does the Ablauf-Audit cost?",
        answer: "Pricing depends on your business size and complexity. We offer transparent, fixed-price packages with no hidden fees. Contact us for a free consultation and custom quote based on your specific needs."
      }
    ],
    de: [
      {
        question: "Wie lange dauert es, bis ich Ergebnisse von der Google Maps Optimierung sehe?",
        answer: "Die meisten Unternehmen sehen verbesserte Sichtbarkeit innerhalb von 2-4 Wochen. Vollständige Optimierungsergebnisse zeigen sich typischerweise innerhalb von 2-3 Monaten, abhängig von der Konkurrenz und der aktuellen Online-Präsenz."
      },
      {
        question: "Was ist im Google Unternehmensprofil Setup enthalten?",
        answer: "Vollständige Profilerstellung, Unternehmensverifizierung, Foto-Optimierung, Service-/Produktlistings, Bewertungsmanagement-Setup und laufende Optimierungsempfehlungen."
      },
      {
        question: "Arbeiten Sie auch mit Unternehmen außerhalb Deutschlands?",
        answer: "Obwohl wir uns auf deutsche Märkte spezialisiert haben, können wir Unternehmen in anderen europäischen Ländern bei ihren lokalen SEO- und Google-Optimierungsanforderungen helfen."
      },
      {
        question: "Wie viel kostet lokale SEO für kleine Unternehmen?",
        answer: "Unsere Pakete sind für kleine Unternehmensbudgets konzipiert und beginnen mit erschwinglichen monatlichen Plänen. Kontaktieren Sie uns für eine kostenlose Beratung und ein individuelles Angebot."
      },
      {
        question: "Können Sie helfen, wenn mein Unternehmen bereits einen Google-Eintrag hat?",
        answer: "Auf jeden Fall! Wir können Ihren bestehenden Eintrag prüfen, für bessere Leistung optimieren und alle Probleme beheben, die Ihre Sichtbarkeit einschränken könnten."
      },
      {
        question: "Was macht Ihre lokale SEO anders als andere Agenturen?",
        answer: "Wir konzentrieren uns ausschließlich auf lokale Unternehmen, verstehen deutsche Marktspezifika und bieten persönlichen Service mit transparenter Berichterstattung und bewährten Ergebnissen."
      },
      {
        question: "Brauche ich eine neue Website oder können Sie meine bestehende optimieren?",
        answer: "Wir können mit Ihrer bestehenden Website arbeiten, um ihre lokale SEO-Leistung zu verbessern, oder eine neue mobiloptimierte Site erstellen, die speziell für lokale Suche entwickelt wurde."
      },
      {
        question: "Wie verfolgen und berichten Sie Ergebnisse?",
        answer: "Wir liefern monatliche Berichte mit Google-Ranking-Verbesserungen, Website-Traffic-Steigerungen und lokalen Suchsichtbarkeits-Metriken mit klaren, leicht verständlichen Daten."
      },
      {
        question: "Was ist der Ablauf-Audit Service und was beinhaltet er?",
        answer: "Unser Ablauf-Audit Service hilft dabei, Ihre Geschäftsprozesse zu organisieren, um Chaos zu reduzieren und die Effizienz zu verbessern. Er umfasst Termin- und Kundenmanagementsysteme, DSGVO-konforme Dokumentenspeicherung und professionelle Vorlagen für E-Mails, Rechnungen und Angebote."
      },
      {
        question: "Wie lange dauert die Prozessoptimierung?",
        answer: "Die meisten Prozessaudits werden innerhalb von 2-4 Wochen abgeschlossen, abhängig von der Komplexität des Unternehmens. Wir arbeiten in Ihrem Tempo und bieten schrittweise Umsetzung, um sicherzustellen, dass Sie mit allen Änderungen vertraut sind."
      },
      {
        question: "Ist der Ablauf-Audit für meinen Unternehmenstyp geeignet?",
        answer: "Ja! Unsere Prozessoptimierung funktioniert für Restaurants, Handwerker, Einzelhandelsgeschäfte, Dienstleister und die meisten kleinen Unternehmen. Wir passen Lösungen an Ihre spezifischen Branchen- und Workflow-Bedürfnisse an."
      },
      {
        question: "Wie hilft der Ablauf-Audit bei der DSGVO-Compliance?",
        answer: "Wir implementieren sichere, DSGVO-konforme Dokumentenspeicher- und Verwaltungssysteme. Dies umfasst ordnungsgemäße Datenverarbeitungsverfahren, sichere Archivierung und klare Dokumentationsprozesse zur Erfüllung deutscher Datenschutzbestimmungen."
      },
      {
        question: "Welche Art von Vorlagen stellen Sie zur Verfügung?",
        answer: "Wir erstellen professionelle Vorlagen für Ihre häufigsten Geschäftskommunikationen: E-Mail-Antworten, Rechnungsformate, Angebotsvorlagen, Terminbestätigungen und Kundennachfassungen - alles einheitlich für Ihr Unternehmen gebrandet."
      },
      {
        question: "Wie gewährleisten Sie Vertraulichkeit während des Prozessaudits?",
        answer: "Wir behandeln alle Geschäftsinformationen streng vertraulich. Wir arbeiten diskret, können bei Bedarf Geheimhaltungsvereinbarungen unterzeichnen und konzentrieren uns darauf, Ihnen bei der Prozessorganisation zu helfen, ohne Ihre täglichen Abläufe zu stören."
      },
      {
        question: "Bieten Sie nach dem Ablauf-Audit laufende Unterstützung an?",
        answer: "Ja! Wir bieten Folgeunterstützung, um sicherzustellen, dass die Systeme gut funktionieren und können Anpassungen vornehmen, wenn sich Ihr Unternehmen weiterentwickelt. Wir sind hier, um Ihnen langfristig bei der Aufrechterhaltung organisierter, effizienter Prozesse zu helfen."
      },
      {
        question: "Wie viel kostet der Ablauf-Audit?",
        answer: "Die Preise hängen von Ihrer Unternehmensgröße und -komplexität ab. Wir bieten transparente Festpreispakete ohne versteckte Kosten. Kontaktieren Sie uns für eine kostenlose Beratung und ein individuelles Angebot basierend auf Ihren spezifischen Bedürfnissen."
      }
    ]
  };

  const currentFaqs = faqs[language];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-primary to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <MessageCircle className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            {language === 'en' ? 'Frequently Asked Questions' : 'Häufig gestellte Fragen'}
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            {language === 'en' 
              ? 'Everything you need to know about our local SEO and digital marketing services'
              : 'Alles was Sie über unsere lokalen SEO- und Digital-Marketing-Dienstleistungen wissen müssen'}
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {currentFaqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'en' ? 'Still Have Questions?' : 'Haben Sie noch Fragen?'}
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            {language === 'en' 
              ? "We're here to help! Contact us for personalized answers about your local SEO needs."
              : 'Wir sind hier, um zu helfen! Kontaktieren Sie uns für persönliche Antworten zu Ihren lokalen SEO-Bedürfnissen.'}
          </p>
          <a
            href="/contact"
            className="inline-flex items-center bg-accent hover:bg-red-700 text-white px-8 py-4 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {language === 'en' ? 'Contact Our Experts' : 'Kontaktieren Sie unsere Experten'}
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </section>
    </div>
  );
}