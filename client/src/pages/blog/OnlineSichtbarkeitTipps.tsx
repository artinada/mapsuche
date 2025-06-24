import React from 'react';
import { Link } from 'wouter';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { useLanguage } from '../../hooks/useLanguage';
import { useSEO } from '../../hooks/useSEO';
import { Search, Star, Globe, Monitor, Users, ExternalLink, CheckCircle, TrendingUp, Target, ArrowLeft } from 'lucide-react';
import LazyImage from '../../components/LazyImage';

const OnlineSichtbarkeitTipps: React.FC = () => {
  const { language } = useLanguage();

  const content = {
    de: {
      title: '5 Tipps für mehr Online-Sichtbarkeit deines lokalen Unternehmens',
      subtitle: 'Einfache Strategien für bessere Auffindbarkeit im Internet',
      intro: 'Du hast ein großartiges lokales Unternehmen – aber zu wenige Menschen wissen davon? Dann wird es Zeit, dass du online besser sichtbar wirst! Die gute Nachricht: Du brauchst dafür weder ein großes Marketingbudget noch viel Technik-Know-how.',
      introSubtext: 'Hier kommen fünf einfache, aber effektive Tipps, wie dein Geschäft im Internet besser gefunden wird:',
      
      tips: [
        {
          number: '1',
          title: 'Verwende Schlüsselwörter in deiner Beschreibung',
          description: 'Schreibe klar und konkret, was du anbietest – und wo.',
          example: 'Statt einfach "Friseursalon Anja", lieber: "Friseur für Damen und Herren in Berlin-Neukölln"',
          explanation: 'Das hilft Google (und Kund*innen!), dein Angebot genau zuzuordnen.',
          icon: Search,
          color: 'bg-blue-50 border-blue-200',
          iconColor: 'text-blue-600'
        },
        {
          number: '2',
          title: 'Bitte aktiv um Bewertungen',
          description: 'Viele Kundinnen würden gerne eine Bewertung hinterlassen – sie müssen nur daran erinnert werden.',
          example: 'Frag nach dem Termin einfach freundlich: "Würden Sie uns auf Google eine kurze Bewertung hinterlassen? Das hilft uns sehr."',
          explanation: 'Positive Rezensionen erhöhen nicht nur dein Ranking, sondern auch das Vertrauen neuer Besucherinnen.',
          icon: Star,
          color: 'bg-yellow-50 border-yellow-200',
          iconColor: 'text-yellow-600'
        },
        {
          number: '3',
          title: 'Trage dich in lokale Verzeichnisse ein',
          description: 'Je mehr Plattformen deinen Firmennamen kennen, desto sichtbarer bist du.',
          example: 'Nutze z.B.: Das Örtliche, Gelbe Seiten, Branchenbuch.de',
          explanation: 'Je vollständiger dein Profil ist, desto besser.',
          icon: Globe,
          color: 'bg-green-50 border-green-200',
          iconColor: 'text-green-600'
        },
        {
          number: '4',
          title: 'Eine einfache Website – oder zumindest eine Infoseite',
          description: 'Du brauchst keine teure Webseite. Schon eine kleine Seite mit grundlegenden Infos reicht.',
          example: 'Wer du bist • Was du anbietest • Wo du zu finden bist • Wie man dich erreicht',
          explanation: 'Eine Seite ist besser als keine Seite.',
          icon: Monitor,
          color: 'bg-purple-50 border-purple-200',
          iconColor: 'text-purple-600'
        },
        {
          number: '5',
          title: 'Sei präsent in sozialen Medien – auch ganz minimal',
          description: 'Ein Facebook- oder Instagram-Profil zeigt, dass dein Unternehmen lebt.',
          example: 'Zeig dein Team, neue Produkte oder einfach dein Lächeln im Laden.',
          explanation: 'Du musst nicht täglich posten – aber ab und zu ein Foto, eine Neuigkeit oder ein Gruß machen den Unterschied.',
          icon: Users,
          color: 'bg-pink-50 border-pink-200',
          iconColor: 'text-pink-600'
        }
      ],

      statistics: {
        title: 'Warum Online-Sichtbarkeit so wichtig ist',
        stats: [
          { value: '92%', label: 'der Verbraucher nutzen Online-Suche für lokale Geschäfte' },
          { value: '76%', label: 'besuchen ein Geschäft innerhalb von 24 Stunden nach der Suche' },
          { value: '88%', label: 'vertrauen Online-Bewertungen wie persönlichen Empfehlungen' }
        ]
      },

      conclusion: {
        title: 'Fazit: Kleine Schritte, große Wirkung',
        text: 'Du musst kein Marketingprofi sein, um online gefunden zu werden. Mit diesen fünf Tipps kannst du heute starten – ganz einfach, ganz ohne Stress.',
        cta: 'Und wenn du noch schneller sichtbar werden willst:'
      },

      quickTips: {
        title: 'Quick-Start Checkliste',
        items: [
          'Google Business Profile vollständig ausfüllen',
          'Aktuelle Fotos hochladen',
          'Öffnungszeiten regelmäßig aktualisieren',
          'Auf Bewertungen antworten',
          'Kontaktdaten überall einheitlich verwenden'
        ]
      },

      ctaTitle: 'Fazit: Kleine Schritte, große Wirkung',
      ctaText: 'Du musst kein Marketingprofi sein, um online gefunden zu werden. Mit diesen fünf Tipps kannst du heute starten – ganz einfach, ganz ohne Stress.',
      ctaFooter: 'Und wenn du noch schneller sichtbar werden willst:'
    },
    en: {
      title: '5 Tips for Better Online Visibility of Your Local Business',
      subtitle: 'Simple strategies for better discoverability on the internet',
      intro: 'You have a great local business – but too few people know about it? Then it\'s time to become more visible online! The good news: You don\'t need a large marketing budget or much technical know-how.',
      introSubtext: 'Here are five simple but effective tips on how your business can be found better on the internet:',
      
      tips: [
        {
          number: '1',
          title: 'Use keywords in your description',
          description: 'Write clearly and specifically what you offer – and where.',
          example: 'Instead of just "Anja\'s Hair Salon", better: "Hair salon for men and women in Berlin-Neukölln"',
          explanation: 'This helps Google (and customers!) to precisely categorize your offer.',
          icon: Search,
          color: 'bg-blue-50 border-blue-200',
          iconColor: 'text-blue-600'
        },
        {
          number: '2',
          title: 'Actively ask for reviews',
          description: 'Many customers would like to leave a review – they just need to be reminded.',
          example: 'After the appointment, simply ask kindly: "Would you leave us a short review on Google? That helps us a lot."',
          explanation: 'Positive reviews not only increase your ranking, but also the trust of new visitors.',
          icon: Star,
          color: 'bg-yellow-50 border-yellow-200',
          iconColor: 'text-yellow-600'
        },
        {
          number: '3',
          title: 'Register in local directories',
          description: 'The more platforms know your company name, the more visible you are.',
          example: 'Use e.g.: Local directories, Yellow Pages, industry-specific platforms',
          explanation: 'The more complete your profile is, the better.',
          icon: Globe,
          color: 'bg-green-50 border-green-200',
          iconColor: 'text-green-600'
        },
        {
          number: '4',
          title: 'A simple website – or at least an info page',
          description: 'You don\'t need an expensive website. A small page with basic information is enough.',
          example: 'Who you are • What you offer • Where to find you • How to reach you',
          explanation: 'One page is better than no page.',
          icon: Monitor,
          color: 'bg-purple-50 border-purple-200',
          iconColor: 'text-purple-600'
        },
        {
          number: '5',
          title: 'Be present on social media – even minimally',
          description: 'A Facebook or Instagram profile shows that your business is alive.',
          example: 'Show your team, new products, or simply your smile in the store.',
          explanation: 'You don\'t have to post daily – but occasionally a photo, news, or greeting makes the difference.',
          icon: Users,
          color: 'bg-pink-50 border-pink-200',
          iconColor: 'text-pink-600'
        }
      ],

      statistics: {
        title: 'Why Online Visibility is So Important',
        stats: [
          { value: '92%', label: 'of consumers use online search for local businesses' },
          { value: '76%', label: 'visit a business within 24 hours of searching' },
          { value: '88%', label: 'trust online reviews like personal recommendations' }
        ]
      },

      conclusion: {
        title: 'Conclusion: Small Steps, Big Impact',
        text: 'You don\'t have to be a marketing professional to be found online. With these five tips, you can start today – simple and stress-free.',
        cta: 'And if you want to become visible even faster:'
      },

      quickTips: {
        title: 'Quick-Start Checklist',
        items: [
          'Complete Google Business Profile fully',
          'Upload current photos',
          'Update opening hours regularly',
          'Respond to reviews',
          'Use consistent contact information everywhere'
        ]
      },

      ctaTitle: 'Conclusion: Small Steps, Big Impact',
      ctaText: 'You don\'t have to be a marketing professional to be found online. With these five tips, you can start today – simple and stress-free.',
      ctaFooter: 'And if you want to become visible even faster:'
    }
  };

  const currentContent = content[language];

  useSEO({
    page: 'blog' as any,
    customTitle: language === 'de' 
      ? '5 Tipps für mehr Online-Sichtbarkeit deines lokalen Unternehmens | MapSuche'
      : '5 Tips for Better Online Visibility of Your Local Business | MapSuche',
    customDescription: language === 'de' 
      ? 'Entdecken Sie 5 einfache Tipps für mehr Online-Sichtbarkeit Ihres lokalen Unternehmens. Praktische Strategien ohne großes Budget oder Technik-Know-how.'
      : 'Discover 5 simple tips for better online visibility of your local business. Practical strategies without large budget or technical know-how.',
    customKeywords: language === 'de'
      ? ['online sichtbarkeit tipps', 'lokales unternehmen marketing', 'google business profile', 'bewertungen sammeln', 'lokale verzeichnisse', 'social media präsenz', 'website für kleine unternehmen', 'local seo tipps', 'digitale präsenz', 'online marketing kleine betriebe']
      : ['online visibility tips', 'local business marketing', 'google business profile', 'collect reviews', 'local directories', 'social media presence', 'website small business', 'local seo tips', 'digital presence', 'online marketing small business']
  });

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
              {language === 'de' ? 'Online-Marketing' : 'Digital Marketing'}
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
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop&auto=format&q=80"
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

          {/* Statistics Section */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="h-6 w-6 text-primary mr-3" />
                {currentContent.statistics.title}
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                {currentContent.statistics.stats.map((stat, index) => (
                  <div key={index} className="text-center p-4 bg-accent/5 rounded-lg">
                    <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                    <p className="text-gray-700 text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tips Section */}
          <div className="space-y-8 mb-12">
            {currentContent.tips.map((tip, index) => {
              const IconComponent = tip.icon;
              return (
                <Card key={index} className={`${tip.color} transition-all duration-300 hover:shadow-lg`}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className={`w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm border-2 ${tip.color.replace('bg-', 'border-').replace('-50', '-200')}`}>
                          <span className="text-lg font-bold text-gray-700">
                            {tip.number}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <IconComponent className={`w-6 h-6 ${tip.iconColor}`} />
                          <h3 className="text-xl font-bold text-gray-900">
                            {tip.title}
                          </h3>
                        </div>
                        <p className="text-gray-700 mb-3 leading-relaxed">
                          {tip.description}
                        </p>
                        <div className="bg-white p-3 rounded-lg border-l-4 border-l-gray-300 mb-3">
                          <p className="text-sm text-gray-600">
                            <strong>{language === 'de' ? 'Beispiel:' : 'Example:'}</strong> {tip.example}
                          </p>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <p className="text-gray-600 text-sm">
                            {tip.explanation}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Conclusion */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Target className="h-6 w-6 text-primary mr-3" />
                {currentContent.conclusion.title}
              </h2>
              <p className="text-gray-700 text-lg mb-4">
                {currentContent.conclusion.text}
              </p>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {currentContent.ctaTitle}
              </h2>
              <p className="text-gray-700 mb-6 text-lg">
                {currentContent.ctaText}
              </p>
              <Button size="lg" className="mb-4">
                <ExternalLink className="mr-2 h-5 w-5" />
                {language === 'de' ? 'Jetzt auf mapsuche.de eintragen' : 'Register on mapsuche.de now'}
              </Button>
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

export default OnlineSichtbarkeitTipps; 