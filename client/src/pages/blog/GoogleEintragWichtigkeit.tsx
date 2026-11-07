import { Link } from 'wouter';
import { ArrowLeft, MapPin, Star, CheckCircle, Globe, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { getPostBySlug } from '@/lib/blogConfig';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import LazyImage from '@/components/LazyImage';

export default function GoogleEintragWichtigkeit() {
  const { language } = useLanguage();

  // Get the blog post configuration
  const blogPost = getPostBySlug('warum-ist-ein-google-eintrag-wichtig');

  const content = {
    de: {
      title: 'Warum ist ein Google-Eintrag wichtig?',
      subtitle: 'Die entscheidende Bedeutung von Google Business Profile für lokale Unternehmen',
      intro: 'In der heutigen digitalen Landschaft ist ein Google Business Profile nicht nur ein nettes Extra - es ist ein absolutes Muss für jedes lokale Unternehmen.',
      
      section1Title: 'Maximale lokale Sichtbarkeit',
      section1Content: 'Mit über 8 Milliarden Suchanfragen täglich ist Google der erste Anlaufpunkt für potenzielle Kunden. Ein optimiertes Google Business Profile sorgt dafür, dass Ihr Unternehmen in den lokalen Suchergebnissen prominent erscheint.',
      
      section2Title: 'Vertrauen und Glaubwürdigkeit aufbauen',
      section2Content: 'Kundenbewertungen und detaillierte Unternehmensinformationen schaffen Vertrauen. Unternehmen mit vollständigen Google Business Profilen wirken professioneller und vertrauenswürdiger.',
      
      section3Title: 'Kostenlose Online-Präsenz',
      section3Content: 'Ein Google Business Profile ist völlig kostenlos und bietet Ihnen eine professionelle Online-Präsenz ohne zusätzliche Kosten für Website-Entwicklung oder Hosting.',
      
      benefits: [
        'Erscheinen Sie in lokalen Suchergebnissen und Google Maps',
        'Zeigen Sie wichtige Informationen wie Öffnungszeiten und Kontaktdaten',
        'Sammeln Sie Kundenbewertungen und bauen Sie Vertrauen auf',
        'Teilen Sie Fotos und Updates über Ihr Unternehmen',
        'Interagieren Sie direkt mit Kunden über Nachrichten',
        'Erhalten Sie wertvolle Insights über Ihre Kunden'
      ],
      
      conclusion: 'Ein Google Business Profile ist heute unverzichtbar für den Erfolg lokaler Unternehmen. Es bietet kostenlose Sichtbarkeit, baut Vertrauen auf und ermöglicht direkte Kundeninteraktion.'
    },
    en: {
      title: 'Why is a Google Business Entry Important?',
      subtitle: 'The crucial importance of Google Business Profile for local businesses',
      intro: 'In today\'s digital landscape, a Google Business Profile isn\'t just a nice extra - it\'s an absolute must for every local business.',
      
      section1Title: 'Maximum Local Visibility',
      section1Content: 'With over 8 billion daily searches, Google is the first stop for potential customers. An optimized Google Business Profile ensures your business appears prominently in local search results.',
      
      section2Title: 'Build Trust and Credibility',
      section2Content: 'Customer reviews and detailed business information create trust. Businesses with complete Google Business Profiles appear more professional and trustworthy.',
      
      section3Title: 'Free Online Presence',
      section3Content: 'A Google Business Profile is completely free and provides you with a professional online presence without additional costs for website development or hosting.',
      
      benefits: [
        'Appear in local search results and Google Maps',
        'Display important information like opening hours and contact details',
        'Collect customer reviews and build trust',
        'Share photos and updates about your business',
        'Interact directly with customers via messages',
        'Get valuable insights about your customers'
      ],
      
      conclusion: 'A Google Business Profile is now indispensable for the success of local businesses. It offers free visibility, builds trust, and enables direct customer interaction.'
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
            <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm font-medium">
              Google Business
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
            src={blogPost?.image || "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=800&h=400&fit=crop"}
            alt={currentContent.title}
            className="w-full h-64 md:h-80 object-cover rounded-lg"
          />
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            {currentContent.intro}
          </p>

          <Card className="mb-8 bg-white hover:shadow-lg transition-all duration-300 border border-gray-100">
            <CardContent className="p-8">
              <div className="flex items-start mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4 flex-shrink-0">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {currentContent.section1Title}
                  </h2>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {currentContent.section1Content}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8 bg-white hover:shadow-lg transition-all duration-300 border border-gray-100">
            <CardContent className="p-8">
              <div className="flex items-start mb-6">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mr-4 flex-shrink-0">
                  <Star className="h-6 w-6 text-secondary" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {currentContent.section2Title}
                  </h2>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {currentContent.section2Content}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8 bg-white hover:shadow-lg transition-all duration-300 border border-gray-100">
            <CardContent className="p-8">
              <div className="flex items-start mb-6">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mr-4 flex-shrink-0">
                  <Globe className="h-6 w-6 text-accent" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {currentContent.section3Title}
                  </h2>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {currentContent.section3Content}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8 bg-white hover:shadow-lg transition-all duration-300 border border-gray-100">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <CheckCircle className="h-6 w-6 text-secondary mr-3" />
                {language === 'de' ? 'Wichtige Vorteile:' : 'Key Benefits:'}
              </h3>
              <ul className="space-y-4">
                {currentContent.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-secondary mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-8 bg-white hover:shadow-lg transition-all duration-300 border border-gray-100">
            <CardContent className="p-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                {currentContent.conclusion}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 hover:shadow-xl transition-all duration-300">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {language === 'de' ? 'Ihr Google Business Profile optimieren?' : 'Optimize Your Google Business Profile?'}
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {language === 'de' 
                ? 'Wir helfen Ihnen dabei, Ihr Google Business Profile zu erstellen und zu optimieren. Maximieren Sie Ihre lokale Sichtbarkeit und gewinnen Sie mehr Kunden!'
                : 'We help you create and optimize your Google Business Profile. Maximize your local visibility and win more customers!'
              }
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-secondary hover:bg-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                <ExternalLink className="mr-2 h-5 w-5" />
                {language === 'de' ? 'Jetzt optimieren lassen' : 'Get Optimized Now'}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
