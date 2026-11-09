import { Link } from 'wouter';
import { useLanguage } from '@/hooks/useLanguage';

interface TermsSection {
  id: string;
  title: string;
  paragraphs: string[];
  links?: { href: string; label: string }[];
}

interface TermsContent {
  title: string;
  lastUpdated: string;
  intro: string;
  sections: TermsSection[];
}

const termsContent: Record<'en' | 'de', TermsContent> = {
  en: {
    title: 'Terms of Use',
    lastUpdated: 'Last updated: November 9, 2026',
    intro: 'These terms describe the use of the MapSuche website and Free GEO Check. Separate agreements apply to commissioned services. Mandatory statutory rights and individually agreed terms remain unaffected.',
    sections: [
      {
        id: 'services',
        title: 'Our services',
        paragraphs: [
          'MapSuche offers GEO checks and Generative Engine Optimization (GEO), Google Maps optimization, Google Business Profile support, website development and process audits for local businesses.',
          'The Free GEO Check and any separately commissioned optimization or consulting services are distinct offers. Running a free check does not place a paid order or start a subscription.',
        ],
      },
      {
        id: 'geo-scope',
        title: 'What the Free GEO Check does',
        paragraphs: [
          'The check attempts three local discovery questions through the OpenAI API with web search. It saves the returned answers and citations, checks for mentions of your business and citations of your domain, and attempts an automated analysis with recommendations. Some requests or the analysis may fail, leaving a partial or unsuccessful report.',
          'The report is a snapshot of those API requests at the time of the check. It does not measure all AI systems or the ChatGPT application, verify other providers, or perform a technical audit of your website. Mention and citation percentages relate only to successful answers in that check.',
        ],
      },
      {
        id: 'ai-limitations',
        title: 'AI results and their limitations',
        paragraphs: [
          'AI answers, extracted providers, citations and recommendations can be incomplete, inaccurate or outdated. Repeating a check can produce different results. An apparent mention may refer to a different business, and a citation does not establish that the linked information is correct.',
          'Review the original answers and sources and independently verify information before using or publishing it or making business decisions. Named providers are not verified recommendations or endorsements by MapSuche.',
          'A check or optimization service does not guarantee inclusion in AI answers, search rankings, traffic, leads or revenue. These limitations describe the service scope and do not remove statutory rights or exclude liability where the law does not permit it.',
        ],
      },
      {
        id: 'free-use',
        title: 'Free use, limits and availability',
        paragraphs: [
          'The Free GEO Check is free of charge to visitors and does not require a paid service agreement. Currently, up to three checks can be admitted per public IP address per UTC day, subject to overall daily capacity. People sharing an internet connection may share that allowance. Failed checks can also count toward the limit.',
          'Availability depends on our systems and external providers. Checks may be delayed, interrupted or unavailable, and continuous availability is not promised. Please do not bypass usage limits, automate abusive submissions, interfere with the service or attempt to access another person’s report without permission.',
        ],
      },
      {
        id: 'inputs',
        title: 'Information you submit',
        paragraphs: [
          'Provide accurate business information that you are entitled to share and have processed for the check. Do not submit passwords, API keys, confidential information or unnecessary personal data, including personal information about customers or employees.',
          'You retain any rights you hold in your submitted information. You permit MapSuche to process that information as needed to provide the requested check, subject to the Privacy Policy and applicable data protection law.',
        ],
      },
      {
        id: 'reports',
        title: 'Saved reports and private access links',
        paragraphs: [
          'Reports remain available for up to 30 days from creation unless deleted earlier. The report shows its expiry date. After processing has ended, you can delete a report through the GEO dashboard using its access key.',
          'The complete report link contains a private access token. Anyone holding that link or token can read the report and, once processing has ended, delete it. Keep it private and share it only when you intend to grant that access.',
          'The browser stores report access references. Clearing browser storage or losing the complete link can mean losing access; the dashboard is not an account-based recovery service. Downloaded or shared copies are outside the server’s expiry and deletion process. Availability ending does not mean immediate deletion from every backup; retention details are described in the Privacy Policy.',
        ],
        links: [{ href: '/geo/dashboard', label: 'Open saved GEO reports' }],
      },
      {
        id: 'privacy',
        title: 'Data processing and external providers',
        paragraphs: [
          'Running the check involves sending the business name, website domain, location and service to OpenAI for search requests and analysis. The check form asks for consent to this processing before submission. Acceptance of these terms does not replace any consent required under data protection law.',
          'The Privacy Policy explains GEO data processing, provider involvement, report storage, browser access references and usage-limit data. External sources linked from reports are third-party content; check their information and applicable terms independently.',
        ],
        links: [{ href: '/privacy', label: 'Read the Privacy Policy' }],
      },
      {
        id: 'content-rights',
        title: 'Website content, reports and third-party rights',
        paragraphs: [
          'Rights in MapSuche’s own website content remain with MapSuche or the relevant rights holders. You may download your report and use it to review your business’s online presence, subject to applicable law and third-party rights.',
          'AI-generated text is not guaranteed to be original, exclusive or protected by copyright. Linked articles, source excerpts, business names, trademarks and other third-party material remain subject to the rights of their respective owners. Access to a report does not grant ownership of that material or permission to republish it without any required authorization.',
        ],
      },
      {
        id: 'paid-services',
        title: 'Paid services, cancellations and refunds',
        paragraphs: [
          'Paid optimization, website development, consulting and other commissioned services require a separate agreement covering scope, price and payment terms. A free check does not create an obligation to purchase them.',
          'Cancellations and refunds depend on that agreement and applicable law. Any statutory withdrawal rights, refund rights and remedies for defective performance remain unaffected.',
        ],
      },
      {
        id: 'liability',
        title: 'Liability and statutory rights',
        paragraphs: [
          'MapSuche’s liability is governed by applicable law. Nothing in these terms excludes or limits liability where this is not permitted, including liability for intent or gross negligence or for injury to life, body or health.',
          'The descriptions of AI limitations, provider availability and the scope of the free check do not override mandatory legal protections or rights under a separate service agreement.',
        ],
      },
      {
        id: 'restrictions',
        title: 'Service restrictions',
        paragraphs: [
          'We may take proportionate measures to restrict access where needed to address misuse, security risks, legal requirements or technical failures. The free offer or its limits may change or be discontinued for future use, subject to applicable law.',
          'These provisions do not give MapSuche an unrestricted right to change or terminate separately agreed paid services. Rights and obligations under those agreements and mandatory law remain unaffected.',
        ],
      },
      {
        id: 'law-and-changes',
        title: 'Applicable law and updates',
        paragraphs: [
          'German law applies. Where you act as a consumer, this choice does not deprive you of mandatory protections under the law of your habitual residence where those protections apply. Statutory rules on jurisdiction remain unaffected.',
          'Revised terms will be published with an updated date. They apply to future use or agreements only as legally permitted. Publishing revised text does not by itself amend an existing paid agreement; any consent required for an amendment must be obtained.',
        ],
      },
      {
        id: 'contact',
        title: 'Questions and contact',
        paragraphs: ['For questions about these terms, GEO report access or commissioned services, contact MapSuche through the contact form.'],
        links: [{ href: '/contact', label: 'Contact MapSuche' }, { href: '/impressum', label: 'Legal notice' }],
      },
    ],
  },
  de: {
    title: 'Nutzungsbedingungen',
    lastUpdated: 'Stand: 9. November 2026',
    intro: 'Diese Bedingungen beschreiben die Nutzung der MapSuche-Website und des kostenlosen GEO Checks. Für beauftragte Leistungen gelten gesonderte Vereinbarungen. Zwingende gesetzliche Rechte und individuell getroffene Vereinbarungen bleiben unberührt.',
    sections: [
      {
        id: 'services',
        title: 'Unsere Leistungen',
        paragraphs: [
          'MapSuche bietet GEO Checks und Generative Engine Optimization (GEO), Google Maps Optimierung, Unterstützung bei Google Unternehmensprofilen, Website-Entwicklung und Ablauf-Audits für lokale Unternehmen an.',
          'Der kostenlose GEO Check und gesondert beauftragte Optimierungs- oder Beratungsleistungen sind unterschiedliche Angebote. Mit dem Start eines kostenlosen Checks erteilen Sie keinen kostenpflichtigen Auftrag und schließen kein Abonnement ab.',
        ],
      },
      {
        id: 'geo-scope',
        title: 'Was der kostenlose GEO Check leistet',
        paragraphs: [
          'Der Check versucht, drei lokale Suchfragen über die OpenAI-API mit Websuche zu beantworten. Er speichert die erhaltenen Antworten und Quellenzitate, prüft Nennungen Ihres Unternehmens und Quellenverweise auf Ihre Domain und versucht eine automatische Auswertung mit Empfehlungen. Einzelne Anfragen oder die Auswertung können fehlschlagen; ein Bericht kann deshalb unvollständig oder ohne erfolgreiche Ergebnisse bleiben.',
          'Der Bericht ist eine Momentaufnahme dieser API-Anfragen zum Zeitpunkt der Prüfung. Er misst weder sämtliche KI-Systeme noch die ChatGPT-Anwendung, verifiziert keine anderen Anbieter und führt keine technische Prüfung Ihrer Website durch. Prozentwerte für Nennungen und Quellenverweise beziehen sich nur auf die erfolgreichen Antworten des jeweiligen Checks.',
        ],
      },
      {
        id: 'ai-limitations',
        title: 'KI-Ergebnisse und ihre Grenzen',
        paragraphs: [
          'KI-Antworten, automatisch erkannte Anbieter, Quellenzitate und Empfehlungen können unvollständig, falsch oder veraltet sein. Eine Wiederholung kann andere Ergebnisse liefern. Eine vermeintliche Nennung kann ein anderes Unternehmen betreffen; ein Quellenverweis bestätigt nicht die Richtigkeit des verlinkten Inhalts.',
          'Prüfen Sie die ursprünglichen Antworten und Quellen und überprüfen Sie Angaben eigenständig, bevor Sie diese verwenden, veröffentlichen oder darauf geschäftliche Entscheidungen stützen. Genannte Anbieter sind keine verifizierten Empfehlungen oder Befürwortungen durch MapSuche.',
          'Ein Check oder eine Optimierungsleistung garantiert keine Aufnahme in KI-Antworten, Suchplatzierungen, Besucherzahlen, Anfragen oder Umsätze. Diese Hinweise beschreiben den Leistungsumfang; sie beseitigen keine gesetzlichen Rechte und schließen keine Haftung aus, soweit dies gesetzlich unzulässig ist.',
        ],
      },
      {
        id: 'free-use',
        title: 'Kostenlose Nutzung, Grenzen und Verfügbarkeit',
        paragraphs: [
          'Der GEO Check ist für Besucher kostenlos und setzt keinen Vertrag über kostenpflichtige Leistungen voraus. Derzeit können je öffentlicher IP-Adresse und UTC-Tag bis zu drei Checks angenommen werden; zusätzlich gilt eine tägliche Gesamtkapazitätsgrenze. Personen mit gemeinsamem Internetanschluss können sich dieses Kontingent teilen. Auch fehlgeschlagene Checks können auf das Limit angerechnet werden.',
          'Die Verfügbarkeit hängt von unseren Systemen und externen Anbietern ab. Checks können verzögert, unterbrochen oder nicht verfügbar sein; eine durchgehende Verfügbarkeit wird nicht zugesagt. Umgehen Sie keine Nutzungslimits, versenden Sie keine missbräuchlichen automatisierten Anfragen, stören Sie den Dienst nicht und greifen Sie nicht ohne Erlaubnis auf fremde Berichte zu.',
        ],
      },
      {
        id: 'inputs',
        title: 'Von Ihnen übermittelte Angaben',
        paragraphs: [
          'Übermitteln Sie zutreffende Unternehmensangaben, zu deren Weitergabe und Verarbeitung für den Check Sie berechtigt sind. Geben Sie keine Passwörter, API-Schlüssel, vertraulichen Informationen oder unnötigen personenbezogenen Daten ein, insbesondere keine persönlichen Angaben über Kunden oder Beschäftigte.',
          'Ihre bestehenden Rechte an den übermittelten Angaben bleiben bei Ihnen. Sie gestatten MapSuche die Verarbeitung dieser Angaben, soweit dies für den angefragten Check erforderlich ist, unter Beachtung der Datenschutzerklärung und des geltenden Datenschutzrechts.',
        ],
      },
      {
        id: 'reports',
        title: 'Gespeicherte Berichte und private Zugriffslinks',
        paragraphs: [
          'Berichte bleiben ab ihrer Erstellung bis zu 30 Tage abrufbar, sofern sie nicht vorher gelöscht werden. Das Ablaufdatum wird im Bericht angezeigt. Nach Ende der Verarbeitung können Sie einen Bericht im GEO-Dashboard mit dem zugehörigen Zugriffsschlüssel löschen.',
          'Der vollständige Berichtslink enthält einen privaten Zugriffsschlüssel. Wer diesen Link oder Schlüssel besitzt, kann den Bericht lesen und nach Ende der Verarbeitung löschen. Bewahren Sie ihn vertraulich auf und teilen Sie ihn nur, wenn Sie diesen Zugriff bewusst gewähren möchten.',
          'Der Browser speichert Zugriffsverweise auf Berichte. Durch das Löschen des Browserspeichers oder den Verlust des vollständigen Links können Sie den Zugriff verlieren; das Dashboard bietet keine kontobasierte Wiederherstellung. Heruntergeladene oder geteilte Kopien unterliegen nicht dem Ablauf- und Löschvorgang auf dem Server. Das Ende der Abrufbarkeit bedeutet nicht die sofortige Löschung aus sämtlichen Sicherungen; Einzelheiten zur Aufbewahrung finden Sie in der Datenschutzerklärung.',
        ],
        links: [{ href: '/geo/dashboard', label: 'Gespeicherte GEO-Berichte öffnen' }],
      },
      {
        id: 'privacy',
        title: 'Datenverarbeitung und externe Anbieter',
        paragraphs: [
          'Für den Check werden Unternehmensname, Website-Domain, Standort und Leistung für Suchanfragen und zur Auswertung an OpenAI übermittelt. Das Formular bittet vor dem Absenden um Ihre Einwilligung in diese Verarbeitung. Die Zustimmung zu diesen Nutzungsbedingungen ersetzt keine datenschutzrechtlich erforderliche Einwilligung.',
          'Die Datenschutzerklärung erläutert die GEO-Datenverarbeitung, die Beteiligung externer Anbieter, die Berichtsspeicherung, die Zugriffsverweise im Browser und die Daten zur Durchsetzung von Nutzungslimits. Externe Quellen in Berichten sind Inhalte Dritter; prüfen Sie deren Angaben und Nutzungsbedingungen eigenständig.',
        ],
        links: [{ href: '/privacy', label: 'Datenschutzerklärung lesen' }],
      },
      {
        id: 'content-rights',
        title: 'Website-Inhalte, Berichte und Rechte Dritter',
        paragraphs: [
          'Die Rechte an eigenen Website-Inhalten von MapSuche verbleiben bei MapSuche oder den jeweiligen Rechteinhabern. Sie können Ihren Bericht herunterladen und zur Prüfung des Online-Auftritts Ihres Unternehmens verwenden, soweit geltendes Recht und Rechte Dritter beachtet werden.',
          'Für KI-generierte Texte wird weder Originalität noch Exklusivität oder urheberrechtlicher Schutz zugesichert. Verlinkte Artikel, Quellenauszüge, Unternehmensnamen, Marken und andere Inhalte Dritter unterliegen den Rechten ihrer jeweiligen Inhaber. Der Berichtszugriff überträgt weder das Eigentum an diesen Inhalten noch eine gegebenenfalls erforderliche Erlaubnis zur Weiterveröffentlichung.',
        ],
      },
      {
        id: 'paid-services',
        title: 'Kostenpflichtige Leistungen, Stornierung und Erstattung',
        paragraphs: [
          'Kostenpflichtige Optimierung, Website-Entwicklung, Beratung und andere beauftragte Leistungen bedürfen einer gesonderten Vereinbarung über Umfang, Preis und Zahlungsbedingungen. Ein kostenloser Check verpflichtet nicht zum Erwerb solcher Leistungen.',
          'Stornierungen und Erstattungen richten sich nach dieser Vereinbarung und dem geltenden Recht. Etwaige gesetzliche Widerrufs- und Erstattungsrechte sowie Rechte bei mangelhafter Leistung bleiben unberührt.',
        ],
      },
      {
        id: 'liability',
        title: 'Haftung und gesetzliche Rechte',
        paragraphs: [
          'Die Haftung von MapSuche richtet sich nach dem geltenden Recht. Diese Bedingungen schließen keine Haftung aus und beschränken sie nicht, soweit dies unzulässig ist, insbesondere bei Vorsatz oder grober Fahrlässigkeit sowie bei Verletzung von Leben, Körper oder Gesundheit.',
          'Die Hinweise zu KI-Grenzen, Anbieter-Verfügbarkeit und Umfang des kostenlosen Checks setzen weder zwingende gesetzliche Schutzvorschriften noch Rechte aus einer gesonderten Leistungsvereinbarung außer Kraft.',
        ],
      },
      {
        id: 'restrictions',
        title: 'Beschränkungen des Dienstes',
        paragraphs: [
          'Wir können verhältnismäßige Maßnahmen zur Zugriffsbeschränkung ergreifen, soweit dies wegen Missbrauchs, Sicherheitsrisiken, rechtlicher Anforderungen oder technischer Störungen erforderlich ist. Das kostenlose Angebot oder seine Grenzen können für die künftige Nutzung unter Beachtung des geltenden Rechts geändert oder eingestellt werden.',
          'Diese Regelungen geben MapSuche kein uneingeschränktes Recht, gesondert vereinbarte kostenpflichtige Leistungen zu ändern oder zu beenden. Rechte und Pflichten aus diesen Vereinbarungen und zwingendem Recht bleiben unberührt.',
        ],
      },
      {
        id: 'law-and-changes',
        title: 'Anwendbares Recht und Aktualisierungen',
        paragraphs: [
          'Es gilt deutsches Recht. Wenn Sie als Verbraucher handeln, entzieht Ihnen diese Rechtswahl nicht den zwingenden Schutz des Rechts Ihres gewöhnlichen Aufenthalts, soweit dieser anwendbar ist. Gesetzliche Zuständigkeitsregelungen bleiben unberührt.',
          'Überarbeitete Bedingungen werden mit einem aktualisierten Datum veröffentlicht. Sie gelten für künftige Nutzungen oder Vereinbarungen nur, soweit dies rechtlich zulässig ist. Die Veröffentlichung allein ändert keinen bestehenden kostenpflichtigen Vertrag; eine für Änderungen erforderliche Zustimmung muss eingeholt werden.',
        ],
      },
      {
        id: 'contact',
        title: 'Fragen und Kontakt',
        paragraphs: ['Bei Fragen zu diesen Bedingungen, zum Zugriff auf GEO-Berichte oder zu beauftragten Leistungen erreichen Sie MapSuche über das Kontaktformular.'],
        links: [{ href: '/contact', label: 'MapSuche kontaktieren' }, { href: '/impressum', label: 'Impressum' }],
      },
    ],
  },
};

export default function TermsPage() {
  const { language } = useLanguage();
  const content = termsContent[language];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl break-words font-bold text-gray-900 mb-4 text-center">{content.title}</h1>
        <p className="text-gray-600 text-center mb-12">{content.lastUpdated}</p>
        <div className="prose prose-lg max-w-none break-words">
          <p className="text-lg text-gray-700 mb-8">{content.intro}</p>
          {content.sections.map(section => (
            <section key={section.id} aria-labelledby={section.id} className="mb-8">
              <h2 id={section.id} className="text-2xl font-semibold text-gray-900 mb-4">{section.title}</h2>
              {section.paragraphs.map(paragraph => <p key={paragraph} className="text-gray-700 mb-4">{paragraph}</p>)}
              {section.links && (
                <ul className="flex flex-wrap gap-x-6 gap-y-2 list-none p-0">
                  {section.links.map(link => <li key={link.href}><Link href={link.href} className="text-primary underline">{link.label}</Link></li>)}
                </ul>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
