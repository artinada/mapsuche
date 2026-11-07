import React from 'react';
import { Link } from 'wouter';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { useLanguage } from '../../hooks/useLanguage';
import { getPostBySlug } from '../../lib/blogConfig';
import { MapPin, CheckCircle, Star, Globe, Smartphone, Users, Target, ArrowLeft, TrendingUp, Search, Shield } from 'lucide-react';
import LazyImage from '../../components/LazyImage';

const LocalSeoGrundlagenKleineUnternehmen: React.FC = () => {
  const { language } = useLanguage();

  // Get the blog post configuration
  const blogPost = getPostBySlug('local-seo-grundlagen-kleine-unternehmen');

  const content = {
    de: {
      title: 'Local SEO: Grundlagen für kleine Unternehmen',
      subtitle: 'Wie du in deiner Umgebung online besser gefunden wirst',
      intro: 'Für kleine, lokale Unternehmen ist es wichtiger denn je, online sichtbar zu sein – genau dort, wo potenzielle Kund*innen suchen: in ihrer Nähe. Und genau hier kommt Local SEO ins Spiel.',
      introSubtext: 'In diesem Artikel erfährst du, was Local SEO bedeutet, warum es so wichtig ist – und welche einfachen Schritte du sofort umsetzen kannst.',
      
      whatIsLocalSeo: {
        title: 'Was ist Local SEO?',
        description: 'Local SEO (lokale Suchmaschinenoptimierung) hilft deinem Unternehmen dabei, bei Google und Google Maps dann gefunden zu werden, wenn Menschen nach Angeboten in deiner Nähe suchen.',
        examples: [
          '„Friseur Wittenberg"',
          '„Café in der Nähe"',
          '„Zahnarzt Dessau geöffnet"'
        ],
        goal: 'Das Ziel: Du erscheinst dort, wo Kund*innen dich brauchen – lokal und relevant.'
      },

      whyImportant: {
        title: 'Warum ist das so wichtig?',
        points: [
          'Über 70 % aller lokalen Suchanfragen kommen vom Smartphone.',
          'Fast die Hälfte dieser Nutzer*innen besucht ein Geschäft innerhalb von 24 Stunden.',
          'Kund*innen entscheiden sich oft für das erste oder zweite Ergebnis – wer nicht sichtbar ist, wird übersehen.'
        ],
        conclusion: 'Ohne Local SEO wird dein Unternehmen online nicht gefunden – selbst wenn du vor Ort großartig bist.'
      },

      tips: [
        {
          number: '1',
          title: 'Google Unternehmensprofil einrichten und pflegen',
          description: 'Trage dein Unternehmen bei Google Business ein.',
          details: [
            'Achte auf vollständige Angaben: Adresse, Öffnungszeiten, Telefonnummer, Website, Beschreibung.',
            'Halte alles aktuell und antworte auf Bewertungen.'
          ],
          icon: MapPin,
          color: 'bg-blue-50 border-blue-200',
          iconColor: 'text-blue-600'
        },
        {
          number: '2',
          title: 'Standortbezogene Keywords verwenden',
          description: 'Nutze Begriffe wie:',
          details: [
            '„Kosmetikstudio in Wittenberg"',
            '„Italienisches Restaurant Lutherstadt"',
            'So weiß Google, wo du bist und was du anbietest.'
          ],
          icon: Search,
          color: 'bg-green-50 border-green-200',
          iconColor: 'text-green-600'
        },
        {
          number: '3',
          title: 'Bewertungen aktiv sammeln',
          description: 'Ermutige zufriedene Kund*innen, dich zu bewerten.',
          details: [
            'Reagiere freundlich auf positives und negatives Feedback.',
            'Gute Bewertungen verbessern nicht nur dein Ranking, sondern stärken auch das Vertrauen.'
          ],
          icon: Star,
          color: 'bg-yellow-50 border-yellow-200',
          iconColor: 'text-yellow-600'
        },
        {
          number: '4',
          title: 'Mobilfreundliche Website oder Infoseite',
          description: 'Deine Seite sollte auf dem Handy gut aussehen und schnell laden.',
          details: [
            'Auch eine einfache Infoseite mit deinen Kontaktdaten und Leistungen ist besser als nichts.'
          ],
          icon: Smartphone,
          color: 'bg-purple-50 border-purple-200',
          iconColor: 'text-purple-600'
        },
        {
          number: '5',
          title: 'Lokale Verzeichnisse nutzen',
          description: 'Trage dich auf Plattformen wie mapsuche.de, Das Örtliche oder Gelbe Seiten ein.',
          details: [
            'Achte auch hier auf korrekte und einheitliche Angaben.'
          ],
          icon: Globe,
          color: 'bg-orange-50 border-orange-200',
          iconColor: 'text-orange-600'
        }
      ],

      extraTip: {
        title: 'Extra-Tipp: Einheitliche Daten',
        description: 'Stelle sicher, dass dein Name, deine Adresse und deine Telefonnummer (NAP-Daten) überall gleich geschrieben sind – auf deiner Website, bei Google, in Branchenverzeichnissen usw.',
        benefit: 'Das stärkt dein Ranking und vermeidet Verwirrung.'
      },

      statistics: {
        title: 'Warum Local SEO so wichtig ist',
        stats: [
          { value: '70%', label: 'aller lokalen Suchanfragen kommen vom Smartphone' },
          { value: '46%', label: 'der Nutzer besuchen ein Geschäft innerhalb von 24 Stunden' },
          { value: '76%', label: 'der lokalen Suchanfragen führen zu einem Anruf oder Besuch' }
        ]
      },

      conclusion: {
        title: 'Fazit: Local SEO ist deine Chance, gefunden zu werden',
        text: 'Du musst kein Marketing-Profi sein – mit ein paar gezielten Schritten kannst du dafür sorgen, dass Menschen dich finden, wenn sie dich brauchen. Und genau das bringt dir neue Kund*innen.'
      },

      quickTips: {
        title: 'Quick-Start Checkliste',
        items: [
          'Google Unternehmensprofil vollständig ausfüllen',
          'Standort in alle Beschreibungen integrieren',
          'Aktiv um Bewertungen bitten',
          'Website für mobile Geräte optimieren',
          'Einheitliche NAP-Daten überall verwenden'
        ]
      },

      ctaTitle: 'Du möchtest Unterstützung beim Einstieg in Local SEO?',
      ctaText: 'Ich helfe kleinen Unternehmen dabei, online sichtbar zu werden – mit Google-Profilen, lokaler Optimierung und klaren Texten.',
      ctaFooter: ''
    },
    en: {
      title: 'Local SEO: Basics for Small Businesses',
      subtitle: 'How to be found better online in your area',
      intro: 'For small, local businesses, it\'s more important than ever to be visible online – exactly where potential customers are searching: nearby. And this is where Local SEO comes into play.',
      introSubtext: 'In this article, you\'ll learn what Local SEO means, why it\'s so important – and which simple steps you can implement immediately.',
      
      whatIsLocalSeo: {
        title: 'What is Local SEO?',
        description: 'Local SEO (local search engine optimization) helps your business be found on Google and Google Maps when people search for services in your area.',
        examples: [
          '"Hair salon Wittenberg"',
          '"Cafe nearby"',
          '"Dentist Dessau open"'
        ],
        goal: 'The goal: You appear where customers need you – locally and relevantly.'
      },

      whyImportant: {
        title: 'Why is this so important?',
        points: [
          'Over 70% of all local searches come from smartphones.',
          'Almost half of these users visit a business within 24 hours.',
          'Customers often choose the first or second result – those not visible are overlooked.'
        ],
        conclusion: 'Without Local SEO, your business won\'t be found online – even if you\'re great locally.'
      },

      tips: [
        {
          number: '1',
          title: 'Set up and maintain Google Business Profile',
          description: 'Register your business with Google Business.',
          details: [
            'Ensure complete information: address, opening hours, phone number, website, description.',
            'Keep everything current and respond to reviews.'
          ],
          icon: MapPin,
          color: 'bg-blue-50 border-blue-200',
          iconColor: 'text-blue-600'
        },
        {
          number: '2',
          title: 'Use location-based keywords',
          description: 'Use terms like:',
          details: [
            '"Beauty salon in Wittenberg"',
            '"Italian restaurant Luther city"',
            'This tells Google where you are and what you offer.'
          ],
          icon: Search,
          color: 'bg-green-50 border-green-200',
          iconColor: 'text-green-600'
        },
        {
          number: '3',
          title: 'Actively collect reviews',
          description: 'Encourage satisfied customers to review you.',
          details: [
            'Respond kindly to positive and negative feedback.',
            'Good reviews not only improve your ranking but also build trust.'
          ],
          icon: Star,
          color: 'bg-yellow-50 border-yellow-200',
          iconColor: 'text-yellow-600'
        },
        {
          number: '4',
          title: 'Mobile-friendly website or info page',
          description: 'Your site should look good and load quickly on mobile.',
          details: [
            'Even a simple info page with your contact details and services is better than nothing.'
          ],
          icon: Smartphone,
          color: 'bg-purple-50 border-purple-200',
          iconColor: 'text-purple-600'
        },
        {
          number: '5',
          title: 'Use local directories',
          description: 'Register on platforms like mapsuche.de, local directories or Yellow Pages.',
          details: [
            'Ensure correct and consistent information here too.'
          ],
          icon: Globe,
          color: 'bg-orange-50 border-orange-200',
          iconColor: 'text-orange-600'
        }
      ],

      extraTip: {
        title: 'Extra Tip: Consistent Data',
        description: 'Ensure your name, address, and phone number (NAP data) are written the same everywhere – on your website, Google, business directories, etc.',
        benefit: 'This strengthens your ranking and avoids confusion.'
      },

      statistics: {
        title: 'Why Local SEO is so important',
        stats: [
          { value: '70%', label: 'of all local searches come from smartphones' },
          { value: '46%', label: 'of users visit a business within 24 hours' },
          { value: '76%', label: 'of local searches lead to a call or visit' }
        ]
      },

      conclusion: {
        title: 'Conclusion: Local SEO is your chance to be found',
        text: 'You don\'t have to be a marketing professional – with a few targeted steps, you can ensure people find you when they need you. And that\'s exactly what brings you new customers.'
      },

      quickTips: {
        title: 'Quick-Start Checklist',
        items: [
          'Complete Google Business Profile fully',
          'Integrate location into all descriptions',
          'Actively ask for reviews',
          'Optimize website for mobile devices',
          'Use consistent NAP data everywhere'
        ]
      },

      ctaTitle: 'Would you like support getting started with Local SEO?',
      ctaText: 'I help small businesses become visible online – with Google profiles, local optimization and clear texts.',
      ctaFooter: ''
    }
  };

  const currentContent = content[language];


  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link href="/blog">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {language === 'de' ? 'Zurück zum Blog' : 'Back to Blog'}
          </Button>
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center mb-4">
            <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium">
              {language === 'de' ? 'SEO Grundlagen' : 'SEO Basics'}
            </span>
            <span className="mx-2 text-gray-400">•</span>
            <span className="text-gray-500 text-sm">
              {language === 'de' ? '8 Minuten Lesezeit' : '8 min read'}
            </span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {currentContent.title}
          </h1>
          <p className="text-xl text-gray-600">
            {currentContent.subtitle}
          </p>
        </div>

        {/* Featured Image */}
        <div className="mb-12">
          <LazyImage
            src={blogPost?.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop&auto=format&q=80"}
            alt={currentContent.title}
            className="w-full h-64 md:h-80 object-cover rounded-lg"
          />
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          {/* Introduction */}
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            {currentContent.intro}
          </p>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            {currentContent.introSubtext}
          </p>

          {/* What is Local SEO Section */}
          <Card className="mb-8 bg-white hover:shadow-lg transition-all duration-300 border border-gray-100">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <MapPin className="h-6 w-6 text-primary mr-3" />
                {currentContent.whatIsLocalSeo.title}
              </h2>
              <p className="text-gray-700 text-lg mb-4 leading-relaxed">
                {currentContent.whatIsLocalSeo.description}
              </p>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 mb-4">
                <p className="text-gray-700 font-medium mb-2">
                  {language === 'de' ? 'Zum Beispiel:' : 'For example:'}
                </p>
                <ul className="space-y-2">
                  {currentContent.whatIsLocalSeo.examples.map((example, index) => (
                    <li key={index} className="text-gray-600 flex items-center">
                      <CheckCircle className="h-4 w-4 text-secondary mr-2 flex-shrink-0" />
                      {example}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-primary font-medium">
                {currentContent.whatIsLocalSeo.goal}
              </p>
            </CardContent>
          </Card>

          {/* Why Important Section */}
          <Card className="mb-8 bg-white hover:shadow-lg transition-all duration-300 border border-gray-100">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <TrendingUp className="h-6 w-6 text-primary mr-3" />
                {currentContent.whyImportant.title}
              </h2>
              <ul className="space-y-4 mb-6">
                {currentContent.whyImportant.points.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
              <div className="bg-primary/5 p-6 rounded-lg border border-primary/10">
                <p className="text-gray-700 font-medium">
                  <strong>{language === 'de' ? 'Kurz gesagt:' : 'In short:'}</strong>
                </p>
                <p className="text-gray-700 mt-2">{currentContent.whyImportant.conclusion}</p>
              </div>
            </CardContent>
          </Card>

          {/* Statistics Section */}
          <Card className="mb-8 bg-white hover:shadow-lg transition-all duration-300 border border-gray-100">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <TrendingUp className="h-6 w-6 text-primary mr-3" />
                {currentContent.statistics.title}
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {currentContent.statistics.stats.map((stat, index) => (
                  <div key={index} className="text-center p-6 bg-primary/5 rounded-lg border border-primary/10">
                    <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                    <p className="text-gray-700 text-sm leading-relaxed">{stat.label}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tips Section */}
          <Card className="mb-8 bg-white hover:shadow-lg transition-all duration-300 border border-gray-100">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                <Target className="h-6 w-6 text-primary mr-3" />
                {language === 'de' ? 'Die 5 wichtigsten Grundlagen für Local SEO' : 'The 5 Most Important Local SEO Basics'}
              </h2>
              <div className="space-y-8">
                {currentContent.tips.map((tip, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className={`w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg border-2 ${tip.color.replace('bg-', 'border-').replace('-50', '-200')}`}>
                        <span className="text-lg font-bold text-gray-700">
                          {tip.number}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {tip.title}
                      </h3>
                      <p className="text-gray-700 mb-4 leading-relaxed">
                        {tip.description}
                      </p>
                      <ul className="space-y-2">
                        {tip.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-start gap-3">
                            <CheckCircle className="h-4 w-4 text-secondary flex-shrink-0 mt-1" />
                            <span className="text-gray-600 leading-relaxed">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Extra Tip */}
          <Card className="mb-8 bg-gradient-to-r from-accent/5 to-primary/5 border border-accent/20 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Shield className="h-5 w-5 text-accent mr-2" />
                {currentContent.extraTip.title}
              </h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                {currentContent.extraTip.description}
              </p>
              <p className="text-accent font-medium">
                {currentContent.extraTip.benefit}
              </p>
            </CardContent>
          </Card>

          {/* Conclusion */}
          <Card className="mb-8 bg-white hover:shadow-lg transition-all duration-300 border border-gray-100">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Target className="h-6 w-6 text-primary mr-3" />
                {currentContent.conclusion.title}
              </h2>
              <p className="text-gray-700 text-lg mb-4 leading-relaxed">
                {currentContent.conclusion.text}
              </p>
            </CardContent>
          </Card>

          {/* Quick Tips */}
          <Card className="mb-8 bg-white hover:shadow-lg transition-all duration-300 border border-gray-100">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Shield className="h-6 w-6 text-primary mr-3" />
                {currentContent.quickTips.title}
              </h2>
              <ul className="space-y-3">
                {currentContent.quickTips.items.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 hover:shadow-xl transition-all duration-300">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {currentContent.ctaTitle}
              </h2>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                {currentContent.ctaText}
              </p>
              <Link href="/contact">
                <Button size="lg" className="mb-4 bg-accent hover:bg-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                  <Users className="mr-2 h-5 w-5" />
                  {language === 'de' ? 'Kostenlose Beratung anfragen' : 'Request Free Consultation'}
                </Button>
              </Link>
              <p className="text-sm text-gray-600">
                {language === 'de' ? 'Einfach, fair und lokal gedacht.' : 'Simple, fair and locally focused.'}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LocalSeoGrundlagenKleineUnternehmen; 