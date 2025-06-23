import { useLanguage } from '@/hooks/useLanguage';

export default function TermsPage() {
  const { language } = useLanguage();

  const content = {
    en: {
      title: "Terms of Use",
      lastUpdated: "Last updated: December 2024",
      intro: "These Terms of Use govern your use of the MapSuche website and services. By accessing or using our services, you agree to be bound by these terms.",
      services: "Our Services",
      servicesText: "MapSuche provides digital marketing services including Google Maps listing optimization, Google Business Profile setup, and professional website development for local businesses.",
      userResponsibilities: "User Responsibilities",
      userResponsibilitiesText: "You agree to provide accurate information when using our services, comply with all applicable laws, and not use our services for any unlawful purposes.",
      intellectualProperty: "Intellectual Property",
      intellectualPropertyText: "All content on this website, including text, graphics, logos, and software, is the property of MapSuche or its licensors and is protected by copyright and other intellectual property laws.",
      paymentTerms: "Payment Terms",
      paymentTermsText: "Payment terms for our services will be specified in individual service agreements. All fees are non-refundable unless otherwise stated in writing.",
      limitation: "Limitation of Liability",
      limitationText: "MapSuche shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our services.",
      termination: "Termination",
      terminationText: "We may terminate or suspend your access to our services at any time, with or without cause, with or without notice.",
      governing: "Governing Law",
      governingText: "These terms are governed by German law. Any disputes will be resolved in the courts of Germany.",
      changes: "Changes to Terms",
      changesText: "We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on this website.",
      contact: "Contact Information",
              contactText: "If you have questions about these Terms of Use, contact us at legal@mapsuche.de.",
    },
    de: {
      title: "Nutzungsbedingungen",
      lastUpdated: "Zuletzt aktualisiert: Dezember 2024",
      intro: "Diese Nutzungsbedingungen regeln Ihre Nutzung der MapSuche-Website und -Dienste. Durch den Zugriff auf oder die Nutzung unserer Dienste stimmen Sie zu, an diese Bedingungen gebunden zu sein.",
      services: "Unsere Dienstleistungen",
      servicesText: "MapSuche bietet Digital-Marketing-Dienstleistungen einschließlich Google Maps-Optimierung, Google Business Profile-Setup und professionelle Website-Entwicklung für lokale Unternehmen.",
      userResponsibilities: "Nutzerpflichten",
      userResponsibilitiesText: "Sie verpflichten sich, bei der Nutzung unserer Dienste korrekte Informationen anzugeben, alle geltenden Gesetze einzuhalten und unsere Dienste nicht für rechtswidrige Zwecke zu nutzen.",
      intellectualProperty: "Geistiges Eigentum",
      intellectualPropertyText: "Alle Inhalte dieser Website, einschließlich Text, Grafiken, Logos und Software, sind Eigentum von MapSuche oder seiner Lizenzgeber und durch Urheberrecht und andere Gesetze zum Schutz geistigen Eigentums geschützt.",
      paymentTerms: "Zahlungsbedingungen",
      paymentTermsText: "Zahlungsbedingungen für unsere Dienstleistungen werden in individuellen Servicevereinbarungen festgelegt. Alle Gebühren sind nicht erstattungsfähig, sofern nicht anderweitig schriftlich vereinbart.",
      limitation: "Haftungsbeschränkung",
      limitationText: "MapSuche haftet nicht für indirekte, zufällige, besondere oder Folgeschäden, die sich aus der Nutzung unserer Dienste ergeben.",
      termination: "Kündigung",
      terminationText: "Wir können Ihren Zugang zu unseren Diensten jederzeit mit oder ohne Grund, mit oder ohne Vorankündigung beenden oder aussetzen.",
      governing: "Anwendbares Recht",
      governingText: "Diese Bedingungen unterliegen deutschem Recht. Streitigkeiten werden vor deutschen Gerichten beigelegt.",
      changes: "Änderungen der Bedingungen",
      changesText: "Wir behalten uns das Recht vor, diese Bedingungen jederzeit zu ändern. Änderungen werden sofort nach Veröffentlichung auf dieser Website wirksam.",
      contact: "Kontaktinformationen",
              contactText: "Bei Fragen zu diesen Nutzungsbedingungen kontaktieren Sie uns unter legal@mapsuche.de.",
    }
  };

  const currentContent = content[language];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">
          {currentContent.title}
        </h1>
        <p className="text-gray-600 text-center mb-12">{currentContent.lastUpdated}</p>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-8">{currentContent.intro}</p>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {currentContent.services}
            </h2>
            <p className="text-gray-700">{currentContent.servicesText}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {currentContent.userResponsibilities}
            </h2>
            <p className="text-gray-700">{currentContent.userResponsibilitiesText}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {currentContent.intellectualProperty}
            </h2>
            <p className="text-gray-700">{currentContent.intellectualPropertyText}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {currentContent.paymentTerms}
            </h2>
            <p className="text-gray-700">{currentContent.paymentTermsText}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {currentContent.limitation}
            </h2>
            <p className="text-gray-700">{currentContent.limitationText}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {currentContent.termination}
            </h2>
            <p className="text-gray-700">{currentContent.terminationText}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {currentContent.governing}
            </h2>
            <p className="text-gray-700">{currentContent.governingText}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {currentContent.changes}
            </h2>
            <p className="text-gray-700">{currentContent.changesText}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {currentContent.contact}
            </h2>
            <p className="text-gray-700">{currentContent.contactText}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
