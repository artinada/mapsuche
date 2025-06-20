import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQPage() {
  const { t, language } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
      }
    ]
  };

  const currentFaqs = faqs[language];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            {language === 'en' ? 'Frequently Asked Questions' : 'Häufig gestellte Fragen'}
          </h1>
          <p className="text-xl text-gray-600">
            {language === 'en' 
              ? 'Everything you need to know about our local SEO and digital marketing services'
              : 'Alles was Sie über unsere lokalen SEO- und Digital-Marketing-Dienstleistungen wissen müssen'}
          </p>
        </div>

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

        <div className="mt-16 text-center bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {language === 'en' ? 'Still Have Questions?' : 'Haben Sie noch Fragen?'}
          </h2>
          <p className="text-gray-600 mb-6">
            {language === 'en' 
              ? "We're here to help! Contact us for personalized answers about your local SEO needs."
              : 'Wir sind hier, um zu helfen! Kontaktieren Sie uns für persönliche Antworten zu Ihren lokalen SEO-Bedürfnissen.'}
          </p>
          <a
            href="/contact"
            className="inline-flex items-center bg-primary hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            {language === 'en' ? 'Contact Our Experts' : 'Kontaktieren Sie unsere Experten'}
          </a>
        </div>
      </div>
    </div>
  );
}