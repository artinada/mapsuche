import { ArrowLeft, ArrowRight, Clock } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';
import { getPostBySlug } from '@/lib/blogConfig';

const sources = [
  { title: 'OpenAI: Web search in ChatGPT', href: 'https://learn.chatgpt.com/docs/web-search' },
  { title: 'OpenAI: Overview of OpenAI Crawlers', href: 'https://developers.openai.com/api/docs/bots' },
  { title: 'Google: SEO Starter Guide', href: 'https://developers.google.com/search/docs/fundamentals/seo-starter-guide' },
  { title: 'Google: Business Profile', href: 'https://support.google.com/business/answer/3039617?hl=en' },
  { title: 'Google: LocalBusiness structured data', href: 'https://developers.google.com/search/docs/appearance/structured-data/local-business' },
  { title: 'Google: AI features and your website', href: 'https://developers.google.com/search/docs/appearance/ai-features' },
  { title: 'OpenAI API: Web search', href: 'https://developers.openai.com/api/docs/guides/tools-web-search' },
];

const copy = {
  de: {
    back: 'Zurück zum Blog', minutes: 'Min. Lesezeit',
    answer: 'Ihr Unternehmen kann bei ChatGPT gefunden werden, wenn öffentlich zugängliche Quellen verständlich erklären, was Sie anbieten und wo Sie tätig sind. Beginnen Sie mit einer erreichbaren Website, konkreten Leistungsbeschreibungen und aktuellen Unternehmensangaben. Für die Websuche sollte Ihre Website den Suchcrawler von OpenAI zulassen. Eine Empfehlung lässt sich dadurch jedoch nicht garantieren.',
    searchTitle: 'Wie funktioniert KI-Suche – und woher kommen die Quellen?',
    search: 'ChatGPT kann Antworten mit einer Websuche ergänzen. Wird diese genutzt, erscheinen Suchergebnisse und Quellenverweise im Chat. Nicht jede Antwort ist deshalb eine aktuelle Recherche über Ihr Unternehmen. Prüfen Sie zuerst, ob die Antwort tatsächlich Webquellen enthält.',
    sources: 'Mögliche öffentlich zugängliche Quellen sind Ihre eigene Website, Branchenverzeichnisse, Unternehmensprofile oder redaktionelle Berichte. Welche davon in einer konkreten Antwort verwendet wurden, erkennen Sie an den Quellenlinks. Öffnen Sie diese: Eine Nennung Ihres Namens ist etwas anderes als ein Zitat Ihrer Website. Auch ein Quellenlink belegt für sich allein keine Empfehlung oder Qualitätsprüfung.',
    crawlerTitle: 'Suchcrawler und KI-Training sind getrennte Einstellungen',
    crawler: 'OpenAI verwendet OAI-SearchBot für seine Suchfunktionen. Lassen Sie dessen Zugriff in robots.txt und gegebenenfalls in Ihrer Firewall zu, wenn Ihre Inhalte dafür verfügbar sein sollen. GPTBot betrifft dagegen mögliches Modelltraining. Laut OpenAI können Sie die Suche erlauben und den Trainingscrawler unabhängig davon ausschließen.',
    checklistTitle: 'Praktische Checkliste für kleine Unternehmen',
    checklistIntro: 'Diese Schritte sind ein sinnvoller Ausgangspunkt für Ihren öffentlichen Auftritt. Sie sind keine von OpenAI bestätigte Liste von Rankingfaktoren.',
    checklist: [
      { title: 'Website erreichbar machen', text: 'Wichtige Seiten sollten direkt mit HTTP 200 laden, intern verlinkt und ohne Anmeldung lesbar sein. Prüfen Sie unbeabsichtigtes noindex sowie Crawler-Sperren. Beschreiben Sie Leistungen auch als Text, nicht nur auf Bildern.', source: 2 },
      { title: 'Kundenfragen konkret beantworten', text: 'Was bieten Sie an, für wen und in welchem Einzugsgebiet? Wie läuft eine Anfrage oder Buchung ab? Schreiben Sie dazu hilfreiche Seiten mit echten Details statt vieler austauschbarer Ortsseiten.', source: 2 },
      { title: 'Unternehmensprofile aktuell halten', text: 'Prüfen Sie Firmennamen, Website, Kontaktmöglichkeiten, Öffnungszeiten und tatsächliche Standorte beziehungsweise Einzugsgebiete. Korrigieren Sie veraltete Angaben auch in Ihrem Google Unternehmensprofil.', source: 3 },
      { title: 'Strukturierte Daten wahrheitsgemäß ergänzen', text: 'Passende LocalBusiness-Daten können Google Geschäftsinformationen vermitteln. Verwenden Sie nur Angaben, die auch sichtbar auf Ihrer Website stehen. Erfinden Sie keine Bewertungen, Adressen oder Auszeichnungen.', source: 4 },
      { title: 'Öffentliche Erwähnungen überprüfen', text: 'Suchen Sie nach Ihrem Unternehmen in relevanten Verzeichnissen oder lokalen Berichten. Bitten Sie bei falschen Angaben um Korrektur und verlinken Sie belegbare Referenzen. Kaufen Sie keine erfundenen Bewertungen.' },
      { title: 'Ergebnisse nachvollziehbar testen', text: 'Notieren Sie Frage, Sprache, Datum, Antwort und Quellen. Testen Sie mehrere typische Kundenfragen. Eine Suche mit Ihrem Firmennamen prüft gezieltes Auffinden; eine offene Anbietersuche prüft, ob Sie ohne Namensvorgabe genannt werden.' },
    ],
    googleNote: 'Google empfiehlt für seine eigenen KI-Suchfunktionen die üblichen SEO-Grundlagen; eine besondere KI-Datei oder ein spezielles Schema ist dafür nicht nötig. Das ist eine Aussage über Google, keine Beschreibung des ChatGPT-Rankings. Ein gepflegtes Google-Profil garantiert ebenfalls keine Nennung bei ChatGPT.',
    queriesTitle: 'Welche Fragen könnten Ihre Kunden stellen?',
    queriesIntro: 'Kombinieren Sie eine Leistung mit einem Ort und einem tatsächlichen Bedarf. Zum Beispiel:',
    queries: [
      'Welche Steuerberater in Lutherstadt Wittenberg betreuen kleine Unternehmen?',
      'Welcher Friseur in Wittenberg bietet Online-Terminbuchung an?',
      'Welche Restaurants in Lutherstadt Wittenberg haben vegetarische Gerichte?',
      'Welche Agenturen unterstützen kleine Geschäfte bei ihrem Google Unternehmensprofil?',
    ],
    queriesNote: 'Passen Sie die Beispiele an Ihre Branche an. Prüfen Sie anschließend, ob genannte Anbieter und verlinkte Seiten wirklich zur Frage passen und die behaupteten Leistungen anbieten.',
    limitsTitle: 'Die Grenzen: keine Garantie für Empfehlungen',
    limits: 'Auch eine gut gepflegte, zugängliche Website muss nicht in einer bestimmten Antwort auftauchen. Fragen, Sprache, Zeitpunkt und Gesprächskontext können zu anderen Ergebnissen führen. KI-Antworten können veraltete oder falsche Angaben enthalten. Eine fehlende Nennung in einem Test beweist daher nicht, dass Ihr Unternehmen grundsätzlich unsichtbar ist. Umgekehrt bestätigt eine Nennung weder Ihre Qualität noch eine dauerhafte Platzierung.',
    checkTitle: 'Wie erscheint Ihr Unternehmen in einem GEO Check?',
    check: 'Mit dem kostenlosen MapSuche GEO Check können Sie Ihre Website und Ihre Unternehmensangaben eingeben. Drei lokale Suchfragen werden über die OpenAI API mit Websuche gestellt; Firmenname und Domain werden in diesen Suchfragen nicht vorgegeben. Der Bericht zeigt Antworten, Quellen sowie erkannte Namensnennungen und Website-Zitate. Die anschließende Analyse gibt Hinweise für weitere Prüfungen.',
    checkLimits: 'Das Ergebnis ist eine Momentaufnahme über die API und kann von Antworten in der ChatGPT-App abweichen. Der Check ist kein vollständiger technischer Website-Audit und keine Garantie für künftige Empfehlungen. Berichte sind über ihren Zugriffslink abrufbar und laufen nach 30 Tagen ab. Bitte prüfen Sie KI-Hinweise anhand der Originalquellen.',
    cta: 'Kostenlosen GEO Check starten', more: 'Mehr über GEO-Optimierung',
    sourcesTitle: 'Primärquellen zum Nachlesen',
    sourceLabel: 'Quelle', imageAlt: 'Laptop, Notizblock und Kaffee auf einem hölzernen Schreibtisch.',
  },
  en: {
    back: 'Back to the blog', minutes: 'min read',
    answer: 'Your business can be found on ChatGPT when publicly accessible sources clearly explain what you offer and where you operate. Start with an accessible website, specific service descriptions and current business details. For web search, allow OpenAI’s search crawler to access your site. These steps cannot guarantee a recommendation.',
    searchTitle: 'How does AI search work, and where do sources come from?',
    search: 'ChatGPT can supplement answers with web search. When it does, search results and citations appear in the chat. An answer is therefore not necessarily fresh research about your business. First check whether it actually includes web sources.',
    sources: 'Possible public sources include your own website, business directories, company profiles or editorial coverage. The source links show which pages were used in a particular answer. Open them: a mention of your business name differs from a citation of your website. A source link alone does not establish a recommendation or a quality assessment.',
    crawlerTitle: 'Search crawling and AI training have separate controls',
    crawler: 'OpenAI uses OAI-SearchBot for its search features. Allow access in robots.txt and, where applicable, your firewall if you want your content available for search. GPTBot concerns potential model training instead. OpenAI says you can allow search while independently opting out of the training crawler.',
    checklistTitle: 'A practical checklist for small businesses',
    checklistIntro: 'These steps are a useful starting point for your public online presence. They are not a list of ranking factors confirmed by OpenAI.',
    checklist: [
      { title: 'Make your website accessible', text: 'Important pages should load directly with HTTP 200, have internal links and be readable without signing in. Check for accidental noindex directives and crawler blocks. Describe services in text as well as images.', source: 2 },
      { title: 'Answer real customer questions', text: 'What do you offer, who is it for, and which area do you serve? How does an inquiry or booking work? Create useful pages with real details rather than many interchangeable location pages.', source: 2 },
      { title: 'Keep business profiles current', text: 'Check your business name, website, contact options, opening hours and actual locations or service areas. Correct outdated information in your Google Business Profile too.', source: 3 },
      { title: 'Add accurate structured data', text: 'Appropriate LocalBusiness data can communicate business details to Google. Include only facts also visible on your website. Do not invent ratings, addresses or awards.', source: 4 },
      { title: 'Review public mentions', text: 'Look for your business in relevant directories or local coverage. Request corrections to inaccurate entries and link to verifiable references. Do not buy fabricated reviews.' },
      { title: 'Make your tests reproducible', text: 'Record the question, language, date, answer and sources. Try several typical customer questions. A search containing your business name tests direct lookup; an open provider search tests whether you appear without a name prompt.' },
    ],
    googleNote: 'Google recommends standard SEO fundamentals for its own AI search features; no special AI file or schema is required for those features. This describes Google, not ChatGPT’s ranking. A well-maintained Google profile does not guarantee a ChatGPT mention either.',
    queriesTitle: 'What might your customers ask?',
    queriesIntro: 'Combine a service with a location and a real customer need. For example:',
    queries: [
      'Which tax advisers in Lutherstadt Wittenberg work with small businesses?',
      'Which hairdressers in Wittenberg offer online appointment booking?',
      'Which restaurants in Lutherstadt Wittenberg serve vegetarian dishes?',
      'Which agencies help small shops manage their Google Business Profile?',
    ],
    queriesNote: 'Adapt these examples to your sector. Then check whether the named providers and linked pages actually match the question and offer the services claimed.',
    limitsTitle: 'The limits: recommendations are not guaranteed',
    limits: 'Even a well-maintained, accessible website may not appear in a particular answer. Questions, language, timing and conversation context can produce different results. AI answers can contain outdated or incorrect information. Absence from one test does not prove that your business is invisible everywhere. Equally, a mention does not confirm your quality or secure a lasting position.',
    checkTitle: 'How does your business appear in a GEO Check?',
    check: 'Enter your website and business details in the free MapSuche GEO Check. It sends three local discovery questions through the OpenAI API with web search, without including your business name or domain in those questions. The report displays answers, sources, detected business-name mentions and website citations. A subsequent analysis suggests areas to investigate.',
    checkLimits: 'The result is an API snapshot and may differ from answers in the ChatGPT app. It is not a complete technical website audit or a guarantee of future recommendations. Reports can be accessed through their access link and expire after 30 days. Verify AI suggestions against the original sources.',
    cta: 'Start the free GEO Check', more: 'Learn about GEO optimization',
    sourcesTitle: 'Primary sources for further reading',
    sourceLabel: 'Source', imageAlt: 'Laptop, notepad and coffee on a wooden desk.',
  },
};

export default function WieWirdMeinUnternehmenBeiChatGPTGefunden() {
  const { language } = useLanguage();
  const content = copy[language];
  const post = getPostBySlug('wie-wird-mein-unternehmen-bei-chatgpt-gefunden')!;
  const sourceLink = (index: number) => (
    <a href={sources[index].href} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">
      {content.sourceLabel}: {sources[index].title}
    </a>
  );

  return (
    <article className="py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button variant="outline" asChild className="mb-8">
          <Link href="/blog"><ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />{content.back}</Link>
        </Button>
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600 mb-4">
            <span className="text-primary font-semibold">{post.category[language]}</span>
            <time dateTime={post.date}>{new Intl.DateTimeFormat(language === 'de' ? 'de-DE' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${post.date}T12:00:00Z`))}</time>
            <span className="inline-flex items-center gap-1"><Clock className="h-4 w-4" aria-hidden="true" />{post.readTime} {content.minutes}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight break-words">{post.title[language]}</h1>
        </header>
        <p className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-8">{content.answer}</p>
        <img src={post.image} alt={content.imageAlt} width="1200" height="600" className="w-full h-auto rounded-2xl mb-10" />
        <div className="space-y-10 text-gray-700 leading-relaxed [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mb-4 [&_p+p]:mt-4">
          <section aria-labelledby="ai-search">
            <h2 id="ai-search">{content.searchTitle}</h2>
            <p>{content.search} {sourceLink(0)}</p>
            <p>{content.sources}</p>
          </section>
          <section aria-labelledby="search-crawlers">
            <h2 id="search-crawlers">{content.crawlerTitle}</h2>
            <p>{content.crawler} {sourceLink(1)}</p>
          </section>
          <section aria-labelledby="business-checklist">
            <h2 id="business-checklist">{content.checklistTitle}</h2>
            <p className="mb-5">{content.checklistIntro}</p>
            <ol className="list-decimal pl-6 space-y-5 marker:text-primary marker:font-semibold">
              {content.checklist.map(item => (
                <li key={item.title} className="pl-1">
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  <p>{item.text}{typeof item.source === 'number' && <> {sourceLink(item.source)}</>}</p>
                </li>
              ))}
            </ol>
            <p className="mt-6">{content.googleNote} {sourceLink(5)}</p>
          </section>
          <section aria-labelledby="example-questions">
            <h2 id="example-questions">{content.queriesTitle}</h2>
            <p className="mb-4">{content.queriesIntro}</p>
            <ul className="space-y-3 list-disc pl-6">
              {content.queries.map(query => <li key={query}><q>{query}</q></li>)}
            </ul>
            <p className="mt-4">{content.queriesNote}</p>
          </section>
          <section aria-labelledby="recommendation-limits" className="rounded-xl border border-amber-200 bg-amber-50 p-5 sm:p-6">
            <h2 id="recommendation-limits">{content.limitsTitle}</h2>
            <p>{content.limits}</p>
          </section>
          <section aria-labelledby="mapsuche-check" className="rounded-xl border border-blue-100 bg-blue-50 p-5 sm:p-6">
            <h2 id="mapsuche-check">{content.checkTitle}</h2>
            <p>{content.check}</p>
            <p>{content.checkLimits} {sourceLink(6)}</p>
            <div className="mt-6 flex flex-col sm:items-start gap-4">
              <Button asChild className="h-auto whitespace-normal py-3 text-center">
                <Link href="/geo-check">{content.cta}<ArrowRight className="ml-2 h-4 w-4 shrink-0" aria-hidden="true" /></Link>
              </Button>
              <Link href="/geo-optimierung" className="text-primary underline underline-offset-4">{content.more}</Link>
            </div>
          </section>
          <section aria-labelledby="primary-sources">
            <h2 id="primary-sources">{content.sourcesTitle}</h2>
            <ul className="list-disc pl-6 space-y-2 break-words">
              {sources.map(source => <li key={source.href}><a href={source.href} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">{source.title}</a></li>)}
            </ul>
          </section>
        </div>
      </div>
    </article>
  );
}
