import React from 'react';
import { Link } from 'wouter';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { useLanguage } from '../../hooks/useLanguage';
import { getPostBySlug } from '../../lib/blogConfig';
import { TrendingUp, Users, AlertTriangle, CheckCircle, Lightbulb, Zap, Target, ArrowLeft, ExternalLink } from 'lucide-react';
import LazyImage from '../../components/LazyImage';

const MobileFirstLokaleUnternehmen: React.FC = () => {
  const { language } = useLanguage();

  // Get the blog post configuration
  const blogPost = getPostBySlug('mobile-first-lokale-unternehmen');

  const content = {
    de: {
      title: 'Mobile-First: Warum lokale Unternehmen mobile Optimierung brauchen',
      subtitle: 'Immer mehr Menschen suchen lokale Dienstleistungen direkt auf dem Smartphone – beim Spazieren, im Zug oder kurz vor Ladenschluss. Für kleine Unternehmen bedeutet das: Wer nicht mobil optimiert ist, wird oft gar nicht erst gefunden.',
      section1: {
        title: 'Kund*innen sind unterwegs – und suchen auch so',
        content: 'Ob Café, Friseur oder Zahnarzt: Die meisten Suchen nach lokalen Unternehmen finden von unterwegs statt – nicht am Laptop, sondern über Google Maps oder das Smartphone.',
        stat1: 'Über 70% der lokalen Suchen kommen von mobilen Geräten.',
        stat2: 'Rund 50% der Nutzer*innen, die lokal suchen, besuchen das Geschäft innerhalb von 24 Stunden.'
      },
      section2: {
        title: 'Was passiert ohne mobile Optimierung?',
        intro: 'Wenn deine Website auf dem Handy:',
        points: [
          'zu langsam lädt,',
          'unübersichtlich wirkt,',
          'Buttons zu klein sind oder',
          'Texte schwer zu lesen —'
        ],
        conclusion: '… dann brechen viele den Besuch einfach ab. Und gehen zur Konkurrenz.',
        warning: 'Ein nicht mobiltaugliches Profil = verpasste Chancen.'
      },
      section3: {
        title: 'Was bedeutet "mobile optimiert"?',
        points: [
          'Die Seite lädt schnell (weniger als 3 Sekunden)',
          'Texte sind gut lesbar – ohne Zoomen',
          'Navigation ist einfach per Daumen bedienbar',
          'Kontakt-Buttons (Anrufen, Route) funktionieren sofort',
          'Inhalte passen sich automatisch der Bildschirmgröße an'
        ],
        note: 'Auch ein Google-Unternehmensprofil oder ein Eintrag auf mapsuche.de, der mobil gut aussieht, ist bereits ein Pluspunkt!'
      },
      section4: {
        title: 'Gute Nachricht: Du brauchst keinen großen Onlineshop',
        intro: 'Schon eine einfache, übersichtliche Infoseite, die auf dem Smartphone gut aussieht, kann:',
        points: [
          'Vertrauen schaffen,',
          'die wichtigsten Infos schnell vermitteln und',
          'neue Kund*innen zu dir führen.'
        ],
        conclusion: 'Wichtig ist nicht "viel" – sondern "leicht erreichbar und klar"!'
      },
      conclusionTitle: 'Fazit: Wer mobil denkt, wird lokal gefunden',
      conclusionText: 'Mobile Optimierung ist kein Trend – sie ist längst Standard. Besonders für lokale Unternehmen, die neue Kund*innen direkt in der Umgebung ansprechen wollen.',
      
      ctaTitle: 'Sorge dafür, dass dein Unternehmen auch mobil einen guten ersten Eindruck macht.',
      ctaText: 'Noch kein mobiler Auftritt? Dann starte mit einem Eintrag auf mapsuche.de – sichtbar und lokal',
      ctaFooter: '📍 Lokal. Einfach. Auffindbar.'
    },
    en: {
      title: 'Mobile-First: Why Local Businesses Need Mobile Optimization',
      subtitle: 'More and more people search for local services directly on their smartphones – while walking, on the train, or just before closing time. For small businesses, this means: Those who are not mobile-optimized often won\'t be found at all.',
      section1: {
        title: 'Customers are on the go – and search that way too',
        content: 'Whether café, hairdresser, or dentist: Most searches for local businesses happen on the go – not on laptops, but via Google Maps or smartphones.',
        stat1: 'Over 70% of local searches come from mobile devices.',
        stat2: 'Around 50% of users who search locally visit the business within 24 hours.'
      },
      section2: {
        title: 'What happens without mobile optimization?',
        intro: 'If your website on mobile:',
        points: [
          'loads too slowly,',
          'looks confusing,',
          'has buttons that are too small, or',
          'text that\'s hard to read —'
        ],
        conclusion: '… then many users simply abandon their visit. And go to the competition.',
        warning: 'A non-mobile-friendly profile = missed opportunities.'
      },
      section3: {
        title: 'What does "mobile optimized" mean?',
        points: [
          'The page loads quickly (less than 3 seconds)',
          'Text is easily readable – without zooming',
          'Navigation is simple with thumb operation',
          'Contact buttons (Call, Directions) work immediately',
          'Content automatically adapts to screen size'
        ],
        note: 'Even a Google Business Profile or an entry on mapsuche.de that looks good on mobile is already a plus!'
      },
      section4: {
        title: 'Good news: You don\'t need a large online shop',
        intro: 'Even a simple, clear info page that looks good on smartphones can:',
        points: [
          'Build trust,',
          'quickly convey the most important information, and',
          'lead new customers to you.'
        ],
        conclusion: 'What matters is not "much" – but "easily accessible and clear"!'
      },
      conclusionTitle: 'Conclusion: Think mobile, be found locally',
      conclusionText: 'Mobile optimization is not a trend – it\'s already standard. Especially for local businesses that want to reach new customers directly in their area.',
      
      ctaTitle: 'Make sure your business makes a good first impression on mobile too.',
      ctaText: 'No mobile presence yet? Then start with an entry on mapsuche.de – visible and local',
      ctaFooter: '📍 Local. Simple. Discoverable.'
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
              Mobile Marketing
            </span>
            <span className="mx-2 text-gray-400">•</span>
            <span className="text-gray-500 text-sm">
              {language === 'de' ? '7 Minuten Lesezeit' : '7 min read'}
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
            src={blogPost?.image || "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop&auto=format&q=80"}
            alt={currentContent.title}
            className="w-full h-64 md:h-80 object-cover rounded-lg"
          />
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          {/* Statistics Section */}
          <Card className="mb-8 bg-white hover:shadow-lg transition-all duration-300 border border-gray-100">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <TrendingUp className="h-6 w-6 text-primary mr-3" />
                {language === 'de' ? 'Mobile Suche in Zahlen' : 'Mobile Search in Numbers'}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-center p-6 bg-primary/5 rounded-lg border border-primary/10">
                  <div className="text-4xl font-bold text-primary mb-2">70%</div>
                  <p className="text-gray-700 font-medium leading-relaxed">{currentContent.section1.stat1}</p>
                </div>
                <div className="text-center p-6 bg-secondary/5 rounded-lg border border-secondary/10">
                  <div className="text-4xl font-bold text-secondary mb-2">50%</div>
                  <p className="text-gray-700 font-medium leading-relaxed">{currentContent.section1.stat2}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 1: Customer Behavior */}
          <Card className="mb-8 bg-white hover:shadow-lg transition-all duration-300 border border-gray-100">
            <CardContent className="p-8">
              <div className="flex items-start mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4 flex-shrink-0">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {currentContent.section1.title}
                  </h2>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {currentContent.section1.content}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 2: Problems without mobile optimization */}
          <Card className="mb-8 bg-white hover:shadow-lg transition-all duration-300 border border-gray-100">
            <CardContent className="p-8">
              <div className="flex items-start mb-6">
                <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mr-4 flex-shrink-0">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {currentContent.section2.title}
                  </h2>
                  <p className="text-gray-700 mb-6 leading-relaxed">{currentContent.section2.intro}</p>
                  <ul className="space-y-3 mb-6">
                    {currentContent.section2.points.map((point, index) => (
                      <li key={index} className="flex items-start text-gray-700">
                        <CheckCircle className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-gray-700 mb-6 leading-relaxed">{currentContent.section2.conclusion}</p>
                  <div className="bg-red-50 border border-red-100 rounded-lg p-6">
                    <div className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                      <p className="text-red-800 font-medium leading-relaxed">{currentContent.section2.warning}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 3: What mobile optimized means */}
          <Card className="mb-8 bg-white hover:shadow-lg transition-all duration-300 border border-gray-100">
            <CardContent className="p-8">
              <div className="flex items-start mb-6">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mr-4 flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-secondary" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    {currentContent.section3.title}
                  </h2>
                  <div className="space-y-4 mb-6">
                    {currentContent.section3.points.map((point, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-secondary mt-1 flex-shrink-0" />
                        <p className="text-gray-700 leading-relaxed">{point}</p>
                      </div>
                    ))}
                  </div>
                  <div className="bg-secondary/5 border border-secondary/10 rounded-lg p-6">
                    <div className="flex items-start gap-3">
                      <Lightbulb className="h-5 w-5 text-secondary mt-1 flex-shrink-0" />
                      <p className="text-gray-700 leading-relaxed">{currentContent.section3.note}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 4: Good news */}
          <Card className="mb-8 bg-white hover:shadow-lg transition-all duration-300 border border-gray-100">
            <CardContent className="p-8">
              <div className="flex items-start mb-6">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mr-4 flex-shrink-0">
                  <Zap className="h-6 w-6 text-accent" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {currentContent.section4.title}
                  </h2>
                  <p className="text-gray-700 mb-6 leading-relaxed">{currentContent.section4.intro}</p>
                  <ul className="space-y-3 mb-6">
                    {currentContent.section4.points.map((point, index) => (
                      <li key={index} className="flex items-start text-gray-700">
                        <CheckCircle className="h-5 w-5 text-secondary mr-3 mt-0.5 flex-shrink-0" />
                        <span className="leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="bg-accent/5 border border-accent/10 rounded-lg p-6">
                    <p className="text-gray-700 font-medium leading-relaxed">{currentContent.section4.conclusion}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Conclusion */}
          <Card className="mb-8 bg-white hover:shadow-lg transition-all duration-300 border border-gray-100">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Target className="h-6 w-6 text-primary mr-3" />
                {currentContent.conclusionTitle}
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                {currentContent.conclusionText}
              </p>
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
                  <ExternalLink className="mr-2 h-5 w-5" />
                  {language === 'de' ? 'Kostenlose Beratung anfragen' : 'Request Free Consultation'}
                </Button>
              </Link>
              <p className="text-sm text-gray-600">
                {currentContent.ctaFooter}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MobileFirstLokaleUnternehmen; 