import { ArrowLeft, ArrowRight, Clock } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';
import { getPostBySlug } from '@/lib/blogConfig';

const sources = [
  { title: 'Aggarwal et al.: GEO: Generative Engine Optimization (2023/2024)', href: 'https://arxiv.org/abs/2311.09735' },
  { title: 'Google Search Central: Succeeding in AI Search (21 May 2025)', href: 'https://developers.google.com/search/blog/2025/05/succeeding-in-ai-search' },
  { title: 'Google Search Central: AI features and your website', href: 'https://developers.google.com/search/docs/appearance/ai-features' },
  { title: 'OpenAI: Overview of OpenAI Crawlers', href: 'https://developers.openai.com/api/docs/bots' },
  { title: 'Google Search Central: Introduction to structured data markup', href: 'https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data' },
];

const copy = {
  de: {
    back: 'Zurück zum Blog', date: 'August 2025', minutes: 'Min. Lesezeit', source: 'Quelle',
    lead: 'GEO steht für Generative Engine Optimization: die Arbeit daran, dass eigene Inhalte und Unternehmensinformationen in KI-generierten Antworten gefunden, richtig eingeordnet und gegebenenfalls als Quelle genannt werden. Für kleine Unternehmen beginnt das mit klaren, überprüfbaren Informationen über ihr Angebot. Eine garantierte Empfehlung durch eine KI lässt sich damit nicht kaufen oder herstellen.',
    definitionTitle: 'Von der Trefferliste zur zusammengestellten Antwort',
    definition: 'Stellen Sie sich vor, jemand sucht eine Fahrradwerkstatt. Statt nur „Fahrradreparatur Wittenberg“ einzugeben, fragt die Person: „Wo kann ich mein E-Bike in Wittenberg reparieren lassen, und was muss ich vor einer Terminbuchung wissen?“ Eine hilfreiche Antwort müsste mehrere Dinge zusammenbringen: passende Betriebe, deren Leistungen und mögliche Einschränkungen.',
    process: 'Generative Suchsysteme können Informationen aus mehreren gefundenen Quellen zu einer Antwort zusammenführen. GEO beschäftigt sich damit, wie eigene Inhalte darin sichtbar werden. Den Begriff beschreibt unter anderem die Forschungsarbeit „GEO: Generative Engine Optimization“, erstmals 2023 veröffentlicht und 2024 bei der KDD angenommen. Ihre Experimente sind Forschungsergebnisse für bestimmte Testsituationen, kein Erfolgsversprechen für jede Website.',
    naming: 'Das „G“ steht hier für „generativ“. GEO bedeutet in diesem Zusammenhang keine geografische Zielgruppenauswahl. Für ein lokales Geschäft bleiben Ort und Einzugsgebiet trotzdem wichtige Informationen für die Kundenfrage.',
    comparisonTitle: 'GEO und SEO: verwandte Aufgaben, andere Beobachtung',
    comparisonIntro: 'Suchmaschinenoptimierung und GEO überschneiden sich. Bei GEO betrachten Sie zusätzlich, ob und wie eine generierte Antwort Ihre Informationen verwendet.',
    tableCaption: 'Ein praktischer Vergleich von SEO und GEO',
    tableHead: ['Frage', 'SEO', 'GEO'],
    comparison: [
      ['Worauf schauen wir?', 'Auffindbarkeit von Seiten in Suchergebnissen.', 'Darstellung von Informationen und Quellen in KI-Antworten.'],
      ['Was bearbeiten wir?', 'Unter anderem Zugänglichkeit, Seitenstruktur und hilfreiche Inhalte.', 'Dieselben Grundlagen sowie präzise Antworten und überprüfbare Unternehmensangaben.'],
      ['Was messen wir?', 'Zum Beispiel Impressionen, Klicks und Anfragen.', 'Zusätzlich Nennungen und Quellenzitate bei festgehaltenen Testfragen.'],
    ],
    overlap: 'Für Googles eigene KI-Suchfunktionen gelten weiterhin die SEO-Grundlagen; Google nennt keine zusätzlichen Spezialanforderungen. Eine GEO-Maßnahme sollte daher Ihre vorhandene Website verbessern und zur eigentlichen Kundenfrage passen. Diese Google-Hinweise erklären nicht die Auswahlregeln aller anderen KI-Anbieter.',
    exampleTitle: 'Ein Beispiel: Was eine Fahrradwerkstatt verständlich macht',
    exampleNote: 'Fiktives Textbeispiel, keine Angaben zu einem tatsächlichen Unternehmen. Die konkreten Aussagen dürfen Sie nur übernehmen, wenn sie auf Ihren Betrieb zutreffen.',
    beforeLabel: 'Allgemeine Werbeaussage',
    before: 'Wir sind Ihr kompetenter Partner für alle Fragen rund ums Fahrrad. Qualität und Service stehen bei uns an erster Stelle.',
    afterLabel: 'Konkrete Information für die Kundenfrage',
    after: 'Unsere Werkstatt in Wittenberg repariert Fahrräder und übernimmt mechanische Arbeiten an E-Bikes. Für Arbeiten am elektrischen Antrieb fragen Sie bitte vorab nach Ihrem Antriebssystem. Termine vereinbaren Sie über unser Kontaktformular. Vor einer kostenpflichtigen Reparatur stimmen wir den Arbeitsumfang mit Ihnen ab.',
    exampleLesson: 'Die zweite Fassung beantwortet konkrete Fragen zu Angebot, Grenzen und nächstem Schritt. Sie ist auch für Menschen nützlicher. Ergänzen Sie echte Nachweise, wenn vorhanden: beispielsweise eine aktuelle Leistungsübersicht oder dokumentierte Qualifikationen. Ein verständlicher Text allein erzwingt noch keine KI-Nennung.',
    planTitle: 'Ein überschaubarer Start: fünf Schritte für Ihren Betrieb',
    planIntro: 'Beginnen Sie mit einer wichtigen Leistung und einer guten Seite. Sie müssen dafür nicht sofort Ihre gesamte Website umbauen.',
    steps: [
      { title: 'Fünf echte Kundenfragen sammeln', text: 'Fragen Sie nach Angeboten, Einzugsgebiet, Voraussetzungen, Ablauf und Kontakt. Verwenden Sie Formulierungen, die Kunden am Telefon oder in einer E-Mail tatsächlich nutzen.' },
      { title: 'Eine Seite inhaltlich verbessern', text: 'Geben Sie die direkte Antwort früh. Ergänzen Sie sinnvolle Zwischenüberschriften, konkrete Einschränkungen und einen klaren nächsten Schritt. Entfernen Sie unbelegte Superlative und veraltete Angaben.' },
      { title: 'Zugriff und Darstellung prüfen', text: 'Lädt die Seite direkt, ist der Haupttext lesbar und funktioniert sie auf dem Smartphone? Google betont in seinen Hinweisen vom Mai 2025 erreichbare Seiten mit indexierbaren Inhalten.', source: 1 },
      { title: 'Daten und Suchzugriff kontrollieren', text: 'Strukturierte Daten sollen die sichtbaren Inhalte korrekt beschreiben. Für die ChatGPT-Suche ist OAI-SearchBot relevant; die Freigabe ist unabhängig von GPTBot für mögliches Modelltraining. Lassen Sie technische Sperren gezielt prüfen.', source: 3 },
      { title: 'Ausgangslage dokumentieren', text: 'Notieren Sie Testfrage, Sprache, System, Datum, Antwort und Quellen. Verwenden Sie für offene Anbietersuchen zunächst keinen Firmennamen. Wiederholen Sie vergleichbare Tests und prüfen Sie verlinkte Seiten selbst.' },
    ],
    structuredNote: 'JSON-LD kann strukturierte Daten auf einer Seite bereitstellen. Entscheidend ist dabei, dass die Angaben zum sichtbaren Inhalt passen. Ein zusätzliches Markup ist kein Beleg dafür, dass eine KI Ihr Unternehmen empfehlen wird.',
    measurementTitle: 'Welche Ergebnisse sind wirklich interessant?',
    measurementIntro: 'Trennen Sie drei Beobachtungen. Sie beantworten unterschiedliche Fragen:',
    measurements: [
      { title: 'Nennung', text: 'Erscheint Ihr Unternehmensname in der Antwort? Das sagt noch nicht, ob Ihre Website als Quelle diente.' },
      { title: 'Quellenzitat', text: 'Verweist die Antwort auf eine Seite Ihrer Domain? Prüfen Sie, ob der Inhalt die jeweilige Aussage tatsächlich belegt.' },
      { title: 'Geschäftlicher Nutzen', text: 'Kommen passende Besuche, Anfragen oder Buchungen zustande? Fragen Sie neue Kunden auch, wie sie auf Sie aufmerksam wurden. Nicht jede Empfehlung lässt sich technisch zuordnen.' },
    ],
    measurementNote: 'Bewerten Sie kleine Stichproben vorsichtig. Eine einzelne Antwort ist eine Momentaufnahme und kein Marktanteil. Auch zehn selbst gewählte Fragen bilden nicht automatisch das tatsächliche Suchverhalten Ihrer Kunden ab.',
    limitsTitle: 'Was GEO nicht versprechen kann',
    limits: 'Es gibt keinen allgemein garantierten Platz in einer KI-Antwort. Antworten können sich zwischen Systemen, Sprachen und Zeitpunkten unterscheiden und Fehler enthalten. Mehr Texte sind nicht automatisch hilfreicher; erfundene Bewertungen oder Behauptungen lösen keine Informationslücke. Prüfen Sie besonders Angebote, die dauerhafte Top-Platzierungen oder universelle Sichtbarkeitswerte versprechen.',
    takeaway: 'Der sinnvollste erste Schritt ist deshalb sehr konkret: Machen Sie eine wichtige Kundenfrage auf Ihrer Website besser beantwortbar. Prüfen Sie danach, ob die öffentlich sichtbaren Angaben stimmen und wie sie in ausgewählten Suchantworten auftauchen.',
    nextTitle: 'Ihre eigene Website als Ausgangspunkt',
    next: 'Der kostenlose MapSuche GEO Check liefert eine Momentaufnahme von OpenAI-API-Antworten mit Websuche. Sie können Nennungen und Quellen ansehen und daraus Fragen für die weitere Arbeit ableiten. Die Ergebnisse können von der ChatGPT-App abweichen und ersetzen keinen vollständigen Website-Audit.',
    cta: 'Kostenlosen GEO Check starten', related: 'Weiterlesen: Wie wird mein Unternehmen bei ChatGPT gefunden?',
    sourcesTitle: 'Primärquellen und weiterführende Informationen',
    imageAlt: 'Draufsicht auf einen gemeinsamen Arbeitstisch mit Laptops, Notizbüchern und Smartphones.',
  },
  en: {
    back: 'Back to the blog', date: 'August 2025', minutes: 'min read', source: 'Source',
    lead: 'GEO stands for Generative Engine Optimization: working to make your content and business information discoverable, accurately represented and potentially cited in AI-generated answers. For small businesses, it starts with clear, verifiable information about what they offer. It cannot buy or produce a guaranteed AI recommendation.',
    definitionTitle: 'From a list of results to a composed answer',
    definition: 'Imagine someone looking for a bicycle repair shop. Instead of simply typing “bicycle repair Wittenberg”, they ask: “Where can I get my e-bike repaired in Wittenberg, and what should I know before booking?” A useful answer would need to bring together suitable businesses, their services and any relevant limitations.',
    process: 'Generative search systems can combine information from several retrieved sources into an answer. GEO considers how your content appears within that answer. The research paper “GEO: Generative Engine Optimization”, first published in 2023 and accepted at KDD in 2024, describes this approach. Its experiments are findings from specific test conditions, not a promise of results for every website.',
    naming: 'The “G” here means “generative”. GEO in this context does not mean geographic audience targeting. For a local business, location and service area still matter to the customer’s question.',
    comparisonTitle: 'GEO and SEO: related work, a different observation',
    comparisonIntro: 'Search engine optimization and GEO overlap. GEO adds a closer look at whether and how a generated answer uses your information.',
    tableCaption: 'A practical comparison of SEO and GEO',
    tableHead: ['Question', 'SEO', 'GEO'],
    comparison: [
      ['What do we examine?', 'The discoverability of pages in search results.', 'How information and sources appear in AI answers.'],
      ['What do we improve?', 'Accessibility, page structure and useful content, among other things.', 'The same foundations, plus precise answers and verifiable business details.'],
      ['What do we measure?', 'For example, impressions, clicks and inquiries.', 'Also mentions and source citations for recorded test questions.'],
    ],
    overlap: 'SEO fundamentals still apply to Google’s own AI search features; Google specifies no additional special requirements. A GEO activity should therefore improve your existing website and address a real customer question. This Google guidance does not explain the selection rules of every other AI provider.',
    exampleTitle: 'An example: making a bicycle workshop easy to understand',
    exampleNote: 'Fictional copy example, not information about a real business. Only use the specific statements if they are true for your workshop.',
    beforeLabel: 'General promotional copy',
    before: 'We are your expert partner for everything to do with bicycles. Quality and service are our top priorities.',
    afterLabel: 'Specific information for the customer’s question',
    after: 'Our workshop in Wittenberg repairs bicycles and carries out mechanical work on e-bikes. For work on an electric drive, please ask us about your drive system first. Book appointments through our contact form. We agree the scope of work with you before carrying out a paid repair.',
    exampleLesson: 'The second version answers specific questions about services, limitations and the next step. It is more useful to people too. Add real evidence where available, such as a current service list or documented qualifications. Clear writing alone still cannot force an AI mention.',
    planTitle: 'A manageable start: five steps for your business',
    planIntro: 'Start with one important service and one good page. You do not need to rebuild your entire website immediately.',
    steps: [
      { title: 'Collect five real customer questions', text: 'Cover services, service area, requirements, process and contact. Use wording customers actually use on the phone or in an email.' },
      { title: 'Improve one page', text: 'Give the direct answer early. Add useful headings, specific limitations and a clear next step. Remove unsupported superlatives and outdated details.' },
      { title: 'Check access and presentation', text: 'Does the page load directly, is the main text readable, and does it work on a phone? Google’s May 2025 guidance emphasizes accessible pages with indexable content.', source: 1 },
      { title: 'Review data and search access', text: 'Structured data should accurately describe visible content. OAI-SearchBot is relevant to ChatGPT search; allowing it is independent of GPTBot for potential model training. Have technical blocks reviewed specifically.', source: 3 },
      { title: 'Record a baseline', text: 'Note the question, language, system, date, answer and sources. Initially omit your business name from open provider searches. Repeat comparable tests and inspect the linked pages yourself.' },
    ],
    structuredNote: 'JSON-LD can provide structured data on a page. The important point is that the details match the visible content. Extra markup is not evidence that an AI will recommend your business.',
    measurementTitle: 'Which results are actually useful?',
    measurementIntro: 'Separate three observations. Each answers a different question:',
    measurements: [
      { title: 'Mention', text: 'Does your business name appear in the answer? This does not establish whether your website was a source.' },
      { title: 'Source citation', text: 'Does the answer link to a page on your domain? Check whether its content actually supports the associated statement.' },
      { title: 'Business value', text: 'Do relevant visits, inquiries or bookings follow? Ask new customers how they heard about you as well. Not every recommendation can be attributed technically.' },
    ],
    measurementNote: 'Treat small samples cautiously. One answer is a snapshot, not a market-share figure. Even ten questions you selected yourself do not automatically represent your customers’ actual search behavior.',
    limitsTitle: 'What GEO cannot promise',
    limits: 'There is no universally guaranteed position in an AI answer. Answers can differ between systems, languages and dates, and can contain errors. More copy is not automatically more useful; invented reviews or claims do not fill an information gap. Examine offers of permanent top positions or universal visibility scores carefully.',
    takeaway: 'The most useful first step is therefore concrete: make one important customer question easier to answer on your website. Then check whether your public information is accurate and how it appears in selected search answers.',
    nextTitle: 'Use your own website as a starting point',
    next: 'The free MapSuche GEO Check provides a snapshot of OpenAI API answers using web search. Review mentions and sources, and use them to identify questions for further work. Results may differ from the ChatGPT app and do not replace a complete website audit.',
    cta: 'Start the free GEO Check', related: 'Read next: How does my business get found on ChatGPT?',
    sourcesTitle: 'Primary sources and further reading',
    imageAlt: 'Overhead view of a shared worktable with laptops, notebooks and smartphones.',
  },
};

export default function WasIstGeo() {
  const { language } = useLanguage();
  const content = copy[language];
  const post = getPostBySlug('was-ist-geo')!;
  const sourceLink = (index: number) => (
    <a href={sources[index].href} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">
      {content.source}: {sources[index].title}
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
            <time dateTime="2025-08">{content.date}</time>
            <span className="inline-flex items-center gap-1"><Clock className="h-4 w-4" aria-hidden="true" />{post.readTime} {content.minutes}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">{post.title[language]}</h1>
        </header>
        <p className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-8">{content.lead}</p>
        <img src={post.image} alt={content.imageAlt} width="1200" height="600" className="w-full h-auto rounded-2xl mb-10" />
        <div className="space-y-10 text-gray-700 leading-relaxed [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mb-4 [&_p+p]:mt-4">
          <section aria-labelledby="geo-definition">
            <h2 id="geo-definition">{content.definitionTitle}</h2>
            <p>{content.definition}</p>
            <p>{content.process} {sourceLink(0)}</p>
            <p>{content.naming}</p>
          </section>
          <section aria-labelledby="geo-seo-comparison">
            <h2 id="geo-seo-comparison">{content.comparisonTitle}</h2>
            <p className="mb-5">{content.comparisonIntro}</p>
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full text-left text-sm leading-relaxed">
                <caption className="sr-only">{content.tableCaption}</caption>
                <thead className="bg-blue-50 text-gray-900">
                  <tr>{content.tableHead.map(heading => <th key={heading} scope="col" className="p-3 sm:p-4 font-semibold">{heading}</th>)}</tr>
                </thead>
                <tbody>
                  {content.comparison.map(([question, seo, geo]) => (
                    <tr key={question} className="border-t border-gray-200 align-top">
                      <th scope="row" className="p-3 sm:p-4 font-semibold text-gray-900">{question}</th>
                      <td className="p-3 sm:p-4">{seo}</td>
                      <td className="p-3 sm:p-4">{geo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-5">{content.overlap} {sourceLink(2)}</p>
          </section>
          <section aria-labelledby="workshop-example">
            <h2 id="workshop-example">{content.exampleTitle}</h2>
            <p className="text-sm mb-5">{content.exampleNote}</p>
            <div className="grid sm:grid-cols-2 gap-4 mb-5">
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                <h3 className="font-semibold text-gray-900 mb-3">{content.beforeLabel}</h3>
                <blockquote>{content.before}</blockquote>
              </div>
              <div className="rounded-xl border border-teal-200 bg-teal-50 p-5">
                <h3 className="font-semibold text-gray-900 mb-3">{content.afterLabel}</h3>
                <blockquote>{content.after}</blockquote>
              </div>
            </div>
            <p>{content.exampleLesson}</p>
          </section>
          <section aria-labelledby="geo-first-steps">
            <h2 id="geo-first-steps">{content.planTitle}</h2>
            <p className="mb-5">{content.planIntro}</p>
            <ol className="list-decimal pl-6 space-y-5 marker:text-primary marker:font-semibold">
              {content.steps.map(step => (
                <li key={step.title} className="pl-1">
                  <h3 className="font-semibold text-gray-900">{step.title}</h3>
                  <p>{step.text}{typeof step.source === 'number' && <> {sourceLink(step.source)}</>}</p>
                </li>
              ))}
            </ol>
            <p className="mt-6">{content.structuredNote} {sourceLink(4)}</p>
          </section>
          <section aria-labelledby="geo-measurement">
            <h2 id="geo-measurement">{content.measurementTitle}</h2>
            <p className="mb-5">{content.measurementIntro}</p>
            <dl className="space-y-4">
              {content.measurements.map(item => (
                <div key={item.title} className="border-l-4 border-blue-200 pl-4">
                  <dt className="font-semibold text-gray-900">{item.title}</dt>
                  <dd>{item.text}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-5">{content.measurementNote}</p>
          </section>
          <section aria-labelledby="geo-limits" className="rounded-xl border border-amber-200 bg-amber-50 p-5 sm:p-6">
            <h2 id="geo-limits">{content.limitsTitle}</h2>
            <p>{content.limits}</p>
            <p>{content.takeaway}</p>
          </section>
          <section aria-labelledby="geo-next-step" className="rounded-xl border border-blue-100 bg-blue-50 p-5 sm:p-6">
            <h2 id="geo-next-step">{content.nextTitle}</h2>
            <p>{content.next}</p>
            <div className="mt-6 flex flex-col sm:items-start gap-4">
              <Button asChild className="h-auto whitespace-normal py-3 text-center">
                <Link href="/geo-check">{content.cta}<ArrowRight className="ml-2 h-4 w-4 shrink-0" aria-hidden="true" /></Link>
              </Button>
              <Link href="/blog/wie-wird-mein-unternehmen-bei-chatgpt-gefunden" className="text-primary underline underline-offset-4">{content.related}</Link>
            </div>
          </section>
          <section aria-labelledby="geo-sources">
            <h2 id="geo-sources">{content.sourcesTitle}</h2>
            <ul className="list-disc pl-6 space-y-2 break-words">
              {sources.map(source => <li key={source.href}><a href={source.href} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">{source.title}</a></li>)}
            </ul>
          </section>
        </div>
      </div>
    </article>
  );
}
