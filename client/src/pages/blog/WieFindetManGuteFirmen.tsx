import { Link } from 'wouter';
import { ArrowLeft, MapPin, Star, Search, Shield, Clock, CheckCircle, AlertTriangle, X, Lightbulb, TrendingUp, Target, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { useSEO } from '@/hooks/useSEO';
import { getPostBySlug } from '@/lib/blogConfig';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import LazyImage from '@/components/LazyImage';

export default function WieFindetManGuteFirmen() {
  const { language } = useLanguage();

  // Get the blog post configuration
  const blogPost = getPostBySlug('wie-findet-man-gute-firmen-in-der-naehe');

  // SEO optimization for this specific article
  useSEO({ 
    page: 'blog' as any,
    customTitle: language === 'de' 
      ? 'Wie findet man gute Firmen in der Nähe? | Lokale Unternehmen finden - MapSuche' 
      : 'How to Find Good Local Businesses Near You? | Local Business Guide - MapSuche',
    customDescription: language === 'de'
      ? 'Entdecken Sie die besten Strategien und Tools, um vertrauenswürdige lokale Unternehmen in Ihrer Nähe zu finden. Google Maps, Bewertungen, Empfehlungen und mehr.'
      : 'Discover the best strategies and tools to find trustworthy local businesses near you. Google Maps, reviews, recommendations and more.',
    customKeywords: [
      'gute firmen finden',
      'lokale unternehmen suchen',
      'vertrauenswürdige geschäfte',
      'google maps suche',
      'unternehmen bewertungen',
      'lokale empfehlungen',
      'firmen in der nähe',
      'local business search',
      'find good companies',
      'trustworthy businesses'
    ]
  });

  const content = {
    de: {
      title: 'Wie findet man gute Firmen in der Nähe?',
      subtitle: 'Online-Sichtbarkeit: Warum kleine Unternehmen heute digital präsent sein müssen',
      intro: 'In einer Welt, in der fast alles digital geschieht, ist die Online-Sichtbarkeit für kleine Unternehmen heute kein Luxus mehr – sie ist eine Notwendigkeit. Ob Friseursalon, Café oder Steuerberater: Wer nicht im Internet gefunden wird, existiert für viele potenzielle Kund*innen schlichtweg nicht.',
      
      modernSearchTitle: 'Wie moderne Kund*innen suchen',
      modernSearchText: 'Die meisten Menschen in Deutschland nutzen heute Google oder Google Maps, um nach Dienstleistungen und Produkten in ihrer Nähe zu suchen. Ein kurzer Blick auf das Smartphone reicht, um:',
      modernSearchPoints: [
        'Öffnungszeiten zu prüfen',
        'den Standort auf der Karte zu sehen',
        'Bewertungen zu lesen',
        'und gleich anzurufen oder zu buchen'
      ],
      modernSearchConclusion: 'Tatsächlich zeigt eine Umfrage von Statista, dass rund 80 % der Konsument*innen ihre Kaufentscheidungen von der Online-Präsenz eines Unternehmens abhängig machen. Das bedeutet: Wer online sichtbar ist, hat einen klaren Wettbewerbsvorteil.',
      
      consequencesTitle: 'Was passiert, wenn ein Unternehmen online nicht präsent ist?',
      consequences: [
        'Du wirst von Neukund*innen einfach nicht gefunden.',
        'Kund*innen, die dich schon kennen, finden keine Infos – und wenden sich vielleicht ab.',
        'Es gibt keine Möglichkeit, Vertrauen durch Bewertungen oder Bilder aufzubauen.',
        'Die Konkurrenz erscheint moderner und professioneller.'
      ],
      consequencesConclusion: 'Kurz gesagt: Du verlierst Umsatz, obwohl dein Angebot vielleicht genau das Richtige ist.',
      
      solutionTitle: 'Die einfache Lösung: Online-Präsenz aufbauen – Schritt für Schritt',
      solutionIntro: 'Die gute Nachricht: Es ist gar nicht so schwer, dein Unternehmen sichtbar zu machen. Es braucht keine große Webseite oder teure Agentur. Zwei einfache Schritte reichen aus, um online sichtbar zu sein:',
      
      step1Title: '1. Google Unternehmensprofil erstellen (früher: Google My Business)',
      step1Text: 'Damit erscheinst du automatisch bei Google und Google Maps. Du kannst Öffnungszeiten eintragen, Fotos hochladen und Bewertungen sammeln.',
      
      step2Title: '2. Eintrag auf mapsuche.de anlegen',
      step2Text: 'Auf mapsuche.de kannst du dein Unternehmen eintragen und wirst damit Teil eines schnell wachsenden, lokalen Firmenverzeichnisses in Deutschland. Kund*innen finden dich nach Branche, Standort und Sprache – ideal für lokale Sichtbarkeit.',
      
      statisticsTitle: 'Ein kurzer Blick auf die Zahlen:',
      statistics: [
        '97 % der Konsument*innen suchen online nach lokalen Geschäften',
        '88 % vertrauen Online-Bewertungen so sehr wie persönlichen Empfehlungen',
        'Unternehmen mit vollständigem Online-Profil erhalten bis zu 70 % mehr Anfragen'
      ],
      
      conclusionTitle: 'Fazit: Sichtbarkeit schafft Vertrauen',
      conclusionText: 'Gerade für kleine Unternehmen kann eine gute Online-Präsenz den Unterschied machen – zwischen Stillstand und Wachstum. Sie bringt neue Kund*innen, erhöht deine Glaubwürdigkeit und hilft dir, dich gegen große Ketten zu behaupten.',
      
      ctaTitle: 'Jetzt handeln!',
      ctaSubtitle: 'Möchten Sie, dass Kundinnen Ihr Unternehmen finden?',
      ctaText: 'Dann tragen Sie sich noch heute auf mapsuche.de ein – schnell und einfach.',
      ctaFooter: 'Weil gute Arbeit auch gefunden werden darf.'
    },
    en: {
      title: 'How to Find Good Companies Nearby?',
      subtitle: 'Online Visibility: Why Small Businesses Must Be Digital Today',
      intro: 'In a world where almost everything happens digitally, online visibility for small businesses is no longer a luxury – it\'s a necessity. Whether it\'s a hair salon, café, or tax advisor: those who can\'t be found online simply don\'t exist for many potential customers.',
      
      modernSearchTitle: 'How Modern Customers Search',
      modernSearchText: 'Most people in Germany today use Google or Google Maps to search for services and products near them. A quick look at their smartphone is enough to:',
      modernSearchPoints: [
        'Check opening hours',
        'See the location on the map',
        'Read reviews',
        'And immediately call or book'
      ],
      modernSearchConclusion: 'In fact, a Statista survey shows that around 80% of consumers base their purchasing decisions on a company\'s online presence. This means: those who are visible online have a clear competitive advantage.',
      
      consequencesTitle: 'What happens when a business isn\'t present online?',
      consequences: [
        'You simply won\'t be found by new customers.',
        'Customers who already know you can\'t find information – and might turn away.',
        'There\'s no way to build trust through reviews or images.',
        'The competition appears more modern and professional.'
      ],
      consequencesConclusion: 'In short: You lose revenue, even though your offering might be exactly right.',
      
      solutionTitle: 'The Simple Solution: Building Online Presence – Step by Step',
      solutionIntro: 'The good news: It\'s not that hard to make your business visible. You don\'t need a big website or expensive agency. Two simple steps are enough to be visible online:',
      
      step1Title: '1. Create Google Business Profile (formerly: Google My Business)',
      step1Text: 'This makes you automatically appear on Google and Google Maps. You can enter opening hours, upload photos, and collect reviews.',
      
      step2Title: '2. Create entry on mapsuche.de',
      step2Text: 'On mapsuche.de you can list your business and become part of a rapidly growing, local business directory in Germany. Customers find you by industry, location, and language – ideal for local visibility.',
      
      statisticsTitle: 'A Quick Look at the Numbers:',
      statistics: [
        '97% of consumers search online for local businesses',
        '88% trust online reviews as much as personal recommendations',
        'Companies with complete online profiles receive up to 70% more inquiries'
      ],
      
      conclusionTitle: 'Conclusion: Visibility Creates Trust',
      conclusionText: 'Especially for small businesses, a good online presence can make the difference – between stagnation and growth. It brings new customers, increases your credibility, and helps you compete against large chains.',
      
      ctaTitle: 'Act Now!',
      ctaSubtitle: 'Do you want customers to find your business?',
      ctaText: 'Then register on mapsuche.de today – quick and easy.',
      ctaFooter: 'Because good work deserves to be found.'
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
              {language === 'de' ? 'Geschäftstipps' : 'Business Tips'}
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
            src={blogPost?.image || "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop&auto=format&q=80"}
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

          {/* Modern Search Behavior */}
          <Card className="mb-8 bg-white hover:shadow-lg transition-all duration-300 border border-gray-100">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Search className="h-6 w-6 text-primary mr-3" />
                {currentContent.modernSearchTitle}
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                {currentContent.modernSearchText}
              </p>
              <ul className="space-y-3 mb-6">
                {currentContent.modernSearchPoints.map((point, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-secondary mr-3 flex-shrink-0" />
                    <span className="text-gray-700 leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
              <div className="bg-primary/5 p-6 rounded-lg border border-primary/10">
                <p className="text-gray-700 font-medium leading-relaxed">
                  {currentContent.modernSearchConclusion}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Consequences */}
          <Card className="mb-8 bg-white hover:shadow-lg transition-all duration-300 border border-red-200 hover:border-red-300">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <AlertTriangle className="h-6 w-6 text-red-500 mr-3" />
                {currentContent.consequencesTitle}
              </h2>
              <ul className="space-y-4 mb-6">
                {currentContent.consequences.map((consequence, index) => (
                  <li key={index} className="flex items-start">
                    <X className="h-5 w-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 leading-relaxed">{consequence}</span>
                  </li>
                ))}
              </ul>
              <div className="bg-red-50 p-6 rounded-lg border border-red-100">
                <p className="text-gray-700 font-medium leading-relaxed">
                  {currentContent.consequencesConclusion}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Solution */}
          <Card className="mb-8 bg-white hover:shadow-lg transition-all duration-300 border border-green-200 hover:border-green-300">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Lightbulb className="h-6 w-6 text-green-500 mr-3" />
                {currentContent.solutionTitle}
              </h2>
              <p className="text-gray-700 mb-8 leading-relaxed text-lg">
                {currentContent.solutionIntro}
              </p>
              
              {/* Step 1 */}
              <div className="mb-6 p-6 bg-blue-50 rounded-lg border border-blue-100">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                  <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3 shadow-lg">1</div>
                  {currentContent.step1Title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {currentContent.step1Text}
                </p>
              </div>

              {/* Step 2 */}
              <div className="p-6 bg-green-50 rounded-lg border border-green-100">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                  <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3 shadow-lg">2</div>
                  {currentContent.step2Title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {currentContent.step2Text}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <Card className="mb-8 bg-white hover:shadow-lg transition-all duration-300 border border-gray-100">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <TrendingUp className="h-6 w-6 text-accent mr-3" />
                {currentContent.statisticsTitle}
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {currentContent.statistics.map((stat, index) => (
                  <div key={index} className="text-center p-6 bg-accent/5 rounded-lg border border-accent/10">
                    <p className="text-gray-700 font-medium leading-relaxed">{stat}</p>
                  </div>
                ))}
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
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {currentContent.ctaTitle}
              </h2>
              <p className="text-xl text-gray-700 mb-4">
                {currentContent.ctaSubtitle}
              </p>
              <p className="text-gray-700 mb-6 leading-relaxed">
                {currentContent.ctaText}
              </p>
              <Button size="lg" className="mb-4 bg-accent hover:bg-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                <ExternalLink className="mr-2 h-5 w-5" />
                {language === 'de' ? 'Jetzt auf mapsuche.de eintragen' : 'Register on mapsuche.de now'}
              </Button>
              <p className="text-sm text-gray-600 italic">
                {currentContent.ctaFooter}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 