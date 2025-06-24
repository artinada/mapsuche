import { Link } from 'wouter';
import { ArrowLeft, AlertTriangle, CheckCircle, Clock, Phone, Camera, MessageCircle, Target, ExternalLink, Shield, Eye, Users } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { useSEO } from '@/hooks/useSEO';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import LazyImage from '@/components/LazyImage';

export default function HaeufigsteFehlerUnternehmenInternet() {
  const { language } = useLanguage();

  // SEO optimization for this specific article
  useSEO({ 
    page: 'blog' as any,
    customTitle: language === 'de' 
      ? 'Die häufigsten Fehler von Unternehmen im Internet | Online-Marketing Tipps - MapSuche' 
      : 'Most Common Business Mistakes Online | Digital Marketing Tips - MapSuche',
    customDescription: language === 'de'
      ? 'Entdecken Sie die 5 häufigsten Online-Fehler von Unternehmen und wie Sie diese vermeiden. Professionelle Tipps für bessere Online-Sichtbarkeit und mehr Kunden.'
      : 'Discover the 5 most common online mistakes businesses make and how to avoid them. Professional tips for better online visibility and more customers.',
    customKeywords: [
      'unternehmen fehler online',
      'online marketing fehler',
      'digitale präsenz fehler',
      'google business profile fehler',
      'online sichtbarkeit probleme',
      'internet auftritt fehler',
      'geschäft online fehler',
      'business mistakes online',
      'digital marketing errors',
      'online presence mistakes',
      'google profile errors',
      'internet visibility problems',
      'business profile optimization',
      'online reputation management'
    ]
  });

  const mistakes = [
    {
      number: 1,
      title: {
        de: 'Kein Beschreibungstext oder "leeres" Profil',
        en: 'No Description Text or "Empty" Profile'
      },
      description: {
        de: 'Ein Online-Profil ohne Beschreibung ist wie ein Schaufenster ohne Ware. Kund*innen wissen nicht, was du anbietest oder warum sie gerade dich wählen sollten. Außerdem bewertet Google solche Profile schlechter.',
        en: 'An online profile without description is like a shop window without goods. Customers don\'t know what you offer or why they should choose you specifically. Google also rates such profiles lower.'
      },
      tip: {
        de: 'Schreibe in 2–3 Sätzen, wer du bist, was du machst und was dich besonders macht.',
        en: 'Write in 2-3 sentences who you are, what you do, and what makes you special.'
      },
      icon: Eye,
      color: 'red'
    },
    {
      number: 2,
      title: {
        de: 'Falsche oder fehlende Öffnungszeiten',
        en: 'Wrong or Missing Opening Hours'
      },
      description: {
        de: 'Wenn jemand vor verschlossener Tür steht, obwohl laut Google geöffnet sein sollte – ist das ein Vertrauensbruch. Solche Kleinigkeiten entscheiden darüber, ob jemand zurückkommt oder nicht.',
        en: 'When someone stands in front of a closed door, even though Google says it should be open – that\'s a breach of trust. Such small things decide whether someone comes back or not.'
      },
      tip: {
        de: 'Aktualisiere deine Öffnungszeiten regelmäßig, besonders an Feiertagen oder in Urlaubszeiten.',
        en: 'Update your opening hours regularly, especially during holidays or vacation times.'
      },
      icon: Clock,
      color: 'orange'
    },
    {
      number: 3,
      title: {
        de: 'Keine Kontaktdaten',
        en: 'No Contact Information'
      },
      description: {
        de: 'Ohne Telefonnummer, E-Mail oder Website hinterlässt du Kund*innen ratlos. Viele geben in so einem Fall auf – und suchen einfach weiter.',
        en: 'Without phone number, email, or website, you leave customers puzzled. Many give up in such cases – and simply search elsewhere.'
      },
      tip: {
        de: 'Stelle sicher, dass man dich mit einem Klick kontaktieren kann – am besten direkt vom Smartphone aus.',
        en: 'Make sure people can contact you with one click – preferably directly from their smartphone.'
      },
      icon: Phone,
      color: 'blue'
    },
    {
      number: 4,
      title: {
        de: 'Keine Bilder',
        en: 'No Pictures'
      },
      description: {
        de: 'Menschen möchten sehen, mit wem sie es zu tun haben. Ein Profil ohne Bilder wirkt unpersönlich und oft auch unseriös.',
        en: 'People want to see who they\'re dealing with. A profile without pictures appears impersonal and often untrustworthy.'
      },
      tip: {
        de: 'Lade mindestens 2–3 gute Fotos hoch – z. B. vom Geschäft, Team oder deiner Arbeit.',
        en: 'Upload at least 2-3 good photos – e.g., of your business, team, or your work.'
      },
      icon: Camera,
      color: 'green'
    },
    {
      number: 5,
      title: {
        de: 'Bewertungen ignorieren',
        en: 'Ignoring Reviews'
      },
      description: {
        de: 'Bewertungen sind heute der wichtigste Vertrauensfaktor im Internet. Wer nicht auf Bewertungen reagiert – vor allem auf negative –, verpasst die Chance, Nähe und Professionalität zu zeigen.',
        en: 'Reviews are today\'s most important trust factor on the internet. Those who don\'t respond to reviews – especially negative ones – miss the chance to show closeness and professionalism.'
      },
      tip: {
        de: 'Bedanke dich für positive Rückmeldungen und gehe höflich auf Kritik ein. Das zeigt, dass dir deine Kund*innen wichtig sind.',
        en: 'Thank for positive feedback and respond politely to criticism. This shows that your customers are important to you.'
      },
      icon: MessageCircle,
      color: 'purple'
    }
  ];

  const content = {
    de: {
      title: 'Die häufigsten Fehler von Unternehmen im Internet (und wie du sie vermeidest)',
      subtitle: 'Diese 5 Online-Fehler kosten täglich potenzielle Kunden',
      intro: 'In der heutigen Zeit ist es für Kund*innen völlig normal, zuerst online nach einem Unternehmen zu suchen. Aber was passiert, wenn sie dein Profil finden – und es leer, veraltet oder unvollständig ist? Viele kleine Unternehmen machen im Netz die gleichen Fehler. Sie wirken auf den ersten Blick vielleicht harmlos, kosten aber täglich potenzielle Kund*innen.',
      
      mistakesTitle: 'Die 5 häufigsten Online-Fehler',
      mistakesSubtitle: 'Diese Probleme begegnen uns immer wieder',
      
      conclusionTitle: 'Fazit: Diese kleinen Fehler kosten echte Kund*innen',
      conclusionText: 'Die gute Nachricht? Du kannst sie alle in wenigen Minuten beheben. Ein vollständiges, aktuelles und gepflegtes Online-Profil wirkt wie eine freundliche Einladung – und bringt Menschen dazu, genau dich zu wählen.',
      
      ctaTitle: 'Willst du gefunden werden?',
      ctaText: 'Dann trage dein Unternehmen noch heute auf mapsuche.de ein – schnell und sichtbar.',
      
      tipLabel: 'Tipp:'
    },
    en: {
      title: 'The Most Common Business Mistakes Online (And How to Avoid Them)',
      subtitle: 'These 5 Online Mistakes Cost Potential Customers Daily',
      intro: 'Today, it\'s completely normal for customers to first search online for a business. But what happens when they find your profile – and it\'s empty, outdated, or incomplete? Many small businesses make the same mistakes online. They might seem harmless at first glance, but they cost potential customers daily.',
      
      mistakesTitle: 'The 5 Most Common Online Mistakes',
      mistakesSubtitle: 'These problems we encounter again and again',
      
      conclusionTitle: 'Conclusion: These Small Mistakes Cost Real Customers',
      conclusionText: 'The good news? You can fix them all in just a few minutes. A complete, current, and well-maintained online profile works like a friendly invitation – and makes people choose exactly you.',
      
      ctaTitle: 'Want to be found?',
      ctaText: 'Then register your business on mapsuche.de today – quick and visible.',
      
      tipLabel: 'Tip:'
    }
  };

  const currentContent = content[language];

  const getColorClasses = (color: string) => {
    const colors = {
      red: 'border-red-200 bg-red-50',
      orange: 'border-orange-200 bg-orange-50',
      blue: 'border-blue-200 bg-blue-50',
      green: 'border-green-200 bg-green-50',
      purple: 'border-purple-200 bg-purple-50'
    };
    return colors[color as keyof typeof colors] || 'border-gray-200 bg-gray-50';
  };

  const getIconColor = (color: string) => {
    const colors = {
      red: 'text-red-500',
      orange: 'text-orange-500',
      blue: 'text-blue-500',
      green: 'text-green-500',
      purple: 'text-purple-500'
    };
    return colors[color as keyof typeof colors] || 'text-gray-500';
  };

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
              {language === 'de' ? '6 Minuten Lesezeit' : '6 min read'}
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

          {/* Warning Card */}
          <Card className="mb-8 border-red-200">
            <CardContent className="p-6">
              <div className="flex items-start">
                <AlertTriangle className="h-6 w-6 text-red-500 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {language === 'de' ? 'Warum diese Fehler so gefährlich sind' : 'Why These Mistakes Are So Dangerous'}
                  </h3>
                  <p className="text-gray-700">
                    {language === 'de' 
                      ? 'Jeder dieser Fehler kann dazu führen, dass potenzielle Kunden zur Konkurrenz wechseln – oft ohne dass Sie es überhaupt merken.'
                      : 'Each of these mistakes can cause potential customers to switch to competitors – often without you even noticing.'
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mistakes Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
              <Target className="h-8 w-8 text-primary mr-3" />
              {currentContent.mistakesTitle}
            </h2>
            <p className="text-gray-600 mb-8">{currentContent.mistakesSubtitle}</p>

            <div className="space-y-8">
              {mistakes.map((mistake) => {
                const IconComponent = mistake.icon;
                return (
                  <Card key={mistake.number} className={`${getColorClasses(mistake.color)} border-l-4`}>
                    <CardContent className="p-6">
                      <div className="flex items-start mb-4">
                        <div className={`rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0 ${
                          mistake.color === 'red' ? 'bg-red-500' :
                          mistake.color === 'orange' ? 'bg-orange-500' :
                          mistake.color === 'blue' ? 'bg-blue-500' :
                          mistake.color === 'green' ? 'bg-green-500' :
                          'bg-purple-500'
                        } text-white font-bold`}>
                          {mistake.number}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center mb-3">
                            <IconComponent className={`h-6 w-6 ${getIconColor(mistake.color)} mr-3`} />
                            <h3 className="text-xl font-bold text-gray-900">
                              {mistake.title[language]}
                            </h3>
                          </div>
                          <p className="text-gray-700 mb-4 leading-relaxed">
                            {mistake.description[language]}
                          </p>
                          <div className="bg-white/70 p-4 rounded-lg">
                            <div className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                              <div>
                                <span className="font-semibold text-gray-900">{currentContent.tipLabel}</span>
                                <p className="text-gray-700 mt-1">{mistake.tip[language]}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Impact Statistics */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Users className="h-6 w-6 text-accent mr-3" />
                {language === 'de' ? 'Die Auswirkungen in Zahlen' : 'The Impact in Numbers'}
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-accent/5 rounded-lg">
                  <div className="text-2xl font-bold text-accent mb-2">73%</div>
                  <p className="text-gray-700 text-sm">
                    {language === 'de' 
                      ? 'der Kunden verlassen Websites mit unvollständigen Informationen'
                      : 'of customers leave websites with incomplete information'
                    }
                  </p>
                </div>
                <div className="text-center p-4 bg-accent/5 rounded-lg">
                  <div className="text-2xl font-bold text-accent mb-2">46%</div>
                  <p className="text-gray-700 text-sm">
                    {language === 'de' 
                      ? 'suchen nicht weiter, wenn Kontaktdaten fehlen'
                      : 'don\'t search further when contact details are missing'
                    }
                  </p>
                </div>
                <div className="text-center p-4 bg-accent/5 rounded-lg">
                  <div className="text-2xl font-bold text-accent mb-2">68%</div>
                  <p className="text-gray-700 text-sm">
                    {language === 'de' 
                      ? 'vertrauen Unternehmen mit aktuellen Bewertungsantworten mehr'
                      : 'trust businesses more that respond to current reviews'
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Conclusion */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Shield className="h-6 w-6 text-primary mr-3" />
                {currentContent.conclusionTitle}
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                {currentContent.conclusionText}
              </p>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {currentContent.ctaTitle}
              </h2>
              <p className="text-gray-700 mb-6 text-lg">
                {currentContent.ctaText}
              </p>
              <Button size="lg" className="mb-4">
                <ExternalLink className="mr-2 h-5 w-5" />
                {language === 'de' ? 'Jetzt kostenlos eintragen' : 'Register for free now'}
              </Button>
              <p className="text-sm text-gray-600 italic">
                {language === 'de' 
                  ? 'Professionell, vollständig und kundenfreundlich – so wie es sein sollte.'
                  : 'Professional, complete and customer-friendly – as it should be.'
                }
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 