import React from 'react';
import { Link } from 'wouter';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { useLanguage } from '../../hooks/useLanguage';
import { useSEO } from '../../hooks/useSEO';
import { getPostBySlug } from '../../lib/blogConfig';
import { Star, CheckCircle, AlertTriangle, MessageSquare, Flag, Target, ArrowLeft, TrendingUp, Users, Shield } from 'lucide-react';
import LazyImage from '../../components/LazyImage';

const GoogleBewertungenRichtigManagen: React.FC = () => {
  const { language } = useLanguage();

  // Get the blog post configuration
  const blogPost = getPostBySlug('google-bewertungen-richtig-managen');

  const content = {
    de: {
      title: 'Google-Bewertungen richtig managen: So stärkst du dein lokales Geschäft',
      subtitle: 'Freundlich, professionell und authentisch mit Kundenfeedback umgehen',
      intro: 'Google-Bewertungen sind oft der erste Eindruck, den Kundinnen von deinem Unternehmen bekommen. Sie beeinflussen nicht nur dein Ranking bei Google, sondern auch das Vertrauen potenzieller Kundinnen. Wer Bewertungen ignoriert – verschenkt echte Chancen.',
      introSubtext: 'Hier erfährst du, wie du richtig mit ihnen umgehst – freundlich, professionell und authentisch.',
      
      tips: [
        {
          number: '1',
          title: 'Bewertungen regelmäßig prüfen',
          description: 'Mach es dir zur Gewohnheit, deine Google-Bewertungen mindestens einmal pro Woche zu checken.',
          explanation: 'So bleibst du auf dem Laufenden und kannst zeitnah reagieren – das zeigt Engagement.',
          tip: 'Tipp: Aktiviere Benachrichtigungen, um keine neue Bewertung zu verpassen.',
          icon: CheckCircle,
          color: 'bg-blue-50 border-blue-200',
          iconColor: 'text-blue-600'
        },
        {
          number: '2',
          title: 'Bedanke dich für positives Feedback',
          description: 'Jede positive Bewertung ist wie eine persönliche Empfehlung.',
          explanation: 'Ein einfaches "Vielen Dank für Ihre nette Rückmeldung!" zeigt Wertschätzung – und motiviert andere, ebenfalls zu bewerten.',
          tip: 'Kurz, herzlich und persönlich – das reicht völlig.',
          icon: Star,
          color: 'bg-yellow-50 border-yellow-200',
          iconColor: 'text-yellow-600'
        },
        {
          number: '3',
          title: 'Professionell auf Kritik reagieren',
          description: 'Negative Bewertungen tun weh, ja. Aber sie sind auch eine Chance.',
          explanation: '❌ Nicht reagieren (oder sich streiten) wirft ein schlechtes Licht.\n✅ Zeige stattdessen Verständnis, bleib höflich und biete bei Bedarf eine Lösung an.',
          tip: 'Beispiel: "Es tut uns leid, dass Sie nicht zufrieden waren. Wir würden das gerne mit Ihnen klären – melden Sie sich bitte direkt bei uns."\n\nSo sehen auch andere: Hier wird Kundenzufriedenheit ernst genommen.',
          icon: AlertTriangle,
          color: 'bg-orange-50 border-orange-200',
          iconColor: 'text-orange-600'
        },
        {
          number: '4',
          title: 'Bewertungen aktiv einholen',
          description: 'Viele zufriedene Kund*innen sagen nichts – es sei denn, du bittest sie freundlich darum.',
          explanation: '💬 Nach dem Termin, Kauf oder Besuch:\n"Wenn Sie zufrieden waren, freuen wir uns über eine Bewertung bei Google. Das hilft kleinen Unternehmen wie unserem sehr."',
          tip: 'QR-Code im Laden oder ein kurzer Link per E-Mail machen es noch einfacher.',
          icon: MessageSquare,
          color: 'bg-green-50 border-green-200',
          iconColor: 'text-green-600'
        },
        {
          number: '5',
          title: 'Falsche oder beleidigende Bewertungen melden',
          description: 'Wenn eine Bewertung offensichtlich gegen Googles Richtlinien verstößt (z. B. Beleidigungen, Spam, kein echter Kundenkontakt), kannst du sie melden.',
          explanation: 'Direkt über das 3-Punkte-Menü bei der jeweiligen Bewertung.',
          tip: 'Google prüft den Fall – das dauert meist einige Tage.',
          icon: Flag,
          color: 'bg-red-50 border-red-200',
          iconColor: 'text-red-600'
        }
      ],

      statistics: {
        title: 'Warum Bewertungsmanagement so wichtig ist',
        stats: [
          { value: '93%', label: 'der Verbraucher lesen Online-Bewertungen vor dem Kauf' },
          { value: '84%', label: 'vertrauen Bewertungen wie persönlichen Empfehlungen' },
          { value: '68%', label: 'hinterlassen eher eine Bewertung, wenn sie darum gebeten werden' }
        ]
      },

      conclusion: {
        title: 'Fazit: Bewertungen sind wie digitale Empfehlungen',
        text: 'Google-Bewertungen sind nicht nur "nice to have". Sie entscheiden mit, ob jemand dein Geschäft besucht – oder weiterklickt. Mit einer offenen, professionellen Haltung und ein bisschen Aufmerksamkeit kannst du Vertrauen aufbauen, neue Kund*innen gewinnen und dein lokales Geschäft stärken.'
      },

      quickTips: {
        title: 'Quick-Start Checkliste',
        items: [
          'Bewertungen wöchentlich überprüfen',
          'Auf alle Bewertungen antworten',
          'Bei Terminen freundlich um Bewertungen bitten',
          'QR-Code oder Link für einfache Bewertungsabgabe erstellen',
          'Professionell und höflich auf Kritik reagieren'
        ]
      },

      ctaTitle: 'Möchtest du bei der Pflege deines Google-Profils Unterstützung?',
      ctaText: 'Ich helfe kleinen Unternehmen dabei, professionell sichtbar zu sein – mit Profiloptimierung, Bewertungen-Management und passenden Texten.',
      ctaFooter: ''
    },
    en: {
      title: 'Managing Google Reviews Properly: How to Strengthen Your Local Business',
      subtitle: 'Handle customer feedback in a friendly, professional and authentic way',
      intro: 'Google reviews are often the first impression customers get of your business. They not only influence your Google ranking, but also the trust of potential customers. Those who ignore reviews are missing out on real opportunities.',
      introSubtext: 'Here you\'ll learn how to handle them properly – friendly, professional and authentic.',
      
      tips: [
        {
          number: '1',
          title: 'Check reviews regularly',
          description: 'Make it a habit to check your Google reviews at least once a week.',
          explanation: 'This keeps you informed and allows you to respond promptly – showing engagement.',
          tip: 'Tip: Activate notifications so you don\'t miss any new reviews.',
          icon: CheckCircle,
          color: 'bg-blue-50 border-blue-200',
          iconColor: 'text-blue-600'
        },
        {
          number: '2',
          title: 'Thank customers for positive feedback',
          description: 'Every positive review is like a personal recommendation.',
          explanation: 'A simple "Thank you for your nice feedback!" shows appreciation – and motivates others to review as well.',
          tip: 'Short, heartfelt and personal – that\'s perfectly enough.',
          icon: Star,
          color: 'bg-yellow-50 border-yellow-200',
          iconColor: 'text-yellow-600'
        },
        {
          number: '3',
          title: 'Respond professionally to criticism',
          description: 'Negative reviews hurt, yes. But they\'re also an opportunity.',
          explanation: '❌ Not responding (or arguing) reflects poorly.\n✅ Instead, show understanding, stay polite and offer a solution if needed.',
          tip: 'Example: "We\'re sorry you weren\'t satisfied. We\'d like to clarify this with you – please contact us directly."\n\nThis shows others: Customer satisfaction is taken seriously here.',
          icon: AlertTriangle,
          color: 'bg-orange-50 border-orange-200',
          iconColor: 'text-orange-600'
        },
        {
          number: '4',
          title: 'Actively solicit reviews',
          description: 'Many satisfied customers say nothing – unless you kindly ask them to.',
          explanation: '💬 After an appointment, purchase or visit:\n"If you were satisfied, we\'d appreciate a review on Google. That helps small businesses like ours a lot."',
          tip: 'QR codes in the store or a short link via email make it even easier.',
          icon: MessageSquare,
          color: 'bg-green-50 border-green-200',
          iconColor: 'text-green-600'
        },
        {
          number: '5',
          title: 'Report false or offensive reviews',
          description: 'If a review obviously violates Google\'s guidelines (e.g., insults, spam, no real customer contact), you can report it.',
          explanation: 'Directly via the 3-dot menu of the respective review.',
          tip: 'Google reviews the case – this usually takes a few days.',
          icon: Flag,
          color: 'bg-red-50 border-red-200',
          iconColor: 'text-red-600'
        }
      ],

      statistics: {
        title: 'Why Review Management is So Important',
        stats: [
          { value: '93%', label: 'of consumers read online reviews before purchasing' },
          { value: '84%', label: 'trust reviews like personal recommendations' },
          { value: '68%', label: 'are more likely to leave a review when asked' }
        ]
      },

      conclusion: {
        title: 'Conclusion: Reviews are like digital recommendations',
        text: 'Google reviews aren\'t just "nice to have". They help determine whether someone visits your business – or clicks away. With an open, professional attitude and a little attention, you can build trust, win new customers and strengthen your local business.'
      },

      quickTips: {
        title: 'Quick-Start Checklist',
        items: [
          'Check reviews weekly',
          'Respond to all reviews',
          'Kindly ask for reviews during appointments',
          'Create QR code or link for easy review submission',
          'Respond professionally and politely to criticism'
        ]
      },

      ctaTitle: 'Would you like support managing your Google profile?',
      ctaText: 'I help small businesses become professionally visible – with profile optimization, review management and appropriate texts.',
      ctaFooter: ''
    }
  };

  const currentContent = content[language];

  useSEO({
    page: 'blog' as any,
    customTitle: language === 'de' 
      ? 'Google-Bewertungen richtig managen: So stärkst du dein lokales Geschäft | MapSuche'
      : 'Managing Google Reviews Properly: How to Strengthen Your Local Business | MapSuche',
    customDescription: language === 'de' 
      ? 'Google-Bewertungen sind oft der erste Eindruck, den Kundinnen von deinem Unternehmen bekommen. Erfahre, wie du richtig mit ihnen umgehst – freundlich, professionell und authentisch.'
      : 'Google reviews are often the first impression customers get of your business. Learn how to handle them properly – friendly, professional and authentic.',
    customKeywords: language === 'de'
      ? ['google bewertungen management', 'bewertungen richtig managen', 'negative bewertungen antworten', 'positive bewertungen sammeln', 'google business profile bewertungen', 'kundenfeedback management', 'bewertungen beantworten', 'online reputation management']
      : ['google reviews management', 'managing reviews properly', 'responding to negative reviews', 'collecting positive reviews', 'google business profile reviews', 'customer feedback management', 'review responses', 'online reputation management']
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
              {language === 'de' ? 'Bewertungsmanagement' : 'Review Management'}
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
            src={blogPost?.image || "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?w=800&h=400&fit=crop&auto=format&q=80"}
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
          <div className="space-y-8 mb-12">
            {currentContent.tips.map((tip, index) => {
              const IconComponent = tip.icon;
              return (
                <Card key={index} className="bg-white hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className={`w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg border-2 ${tip.color.replace('bg-', 'border-').replace('-50', '-200')}`}>
                          <span className="text-lg font-bold text-gray-700">
                            {tip.number}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                          {tip.title}
                        </h3>
                        <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                          {tip.description}
                        </p>
                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 mb-4">
                          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                            {tip.explanation}
                          </p>
                        </div>
                        {tip.tip && (
                          <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                              {tip.tip}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

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
                {language === 'de' ? 'Fair, persönlich und lokal gedacht.' : 'Fair, personal and locally focused.'}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GoogleBewertungenRichtigManagen; 