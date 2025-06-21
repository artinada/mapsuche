import { useLanguage } from '@/hooks/useLanguage';

export default function PrivacyPage() {
  const { t, language } = useLanguage();

  const content = {
    en: {
      title: "Privacy Policy",
      lastUpdated: "Last updated: December 2024",
      intro: "At MapSuche, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website and services.",
      dataCollection: "Data Collection",
      dataCollectionText: "We collect information you provide directly to us, such as when you fill out our contact form, request our services, or communicate with us. This may include your name, email address, phone number, business information, and any messages you send us.",
      dataUse: "How We Use Your Data",
      dataUseText: "We use the information we collect to provide and improve our services, respond to your inquiries, send you information about our services, and comply with legal obligations.",
      dataSharing: "Data Sharing",
      dataSharingText: "We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy or as required by law.",
      dataSecurity: "Data Security",
      dataSecurityText: "We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.",
      yourRights: "Your Rights",
      yourRightsText: "You have the right to access, update, or delete your personal information. You may also object to certain uses of your data. Contact us to exercise these rights.",
      cookies: "Local Storage",
      cookiesText: "We use local storage to remember your language preference (English/German) to enhance your browsing experience. No tracking or analytics cookies are used. You can clear this data through your browser settings.",
      contact: "Contact Us",
      contactText: "If you have any questions about this Privacy Policy, please contact us at privacy@mapsuche.com.",
    },
    de: {
      title: "Datenschutzerklärung",
      lastUpdated: "Zuletzt aktualisiert: Dezember 2024",
      intro: "Bei MapSuche nehmen wir Ihre Privatsphäre ernst. Diese Datenschutzerklärung erklärt, wie wir Ihre persönlichen Daten sammeln, verwenden und schützen, wenn Sie unsere Website und Dienstleistungen nutzen.",
      dataCollection: "Datenerhebung",
      dataCollectionText: "Wir sammeln Informationen, die Sie uns direkt zur Verfügung stellen, z.B. wenn Sie unser Kontaktformular ausfüllen, unsere Dienstleistungen anfordern oder mit uns kommunizieren. Dies kann Ihren Namen, E-Mail-Adresse, Telefonnummer, Geschäftsinformationen und alle Nachrichten, die Sie uns senden, umfassen.",
      dataUse: "Wie wir Ihre Daten verwenden",
      dataUseText: "Wir verwenden die gesammelten Informationen, um unsere Dienstleistungen bereitzustellen und zu verbessern, auf Ihre Anfragen zu antworten, Ihnen Informationen über unsere Dienstleistungen zu senden und rechtlichen Verpflichtungen nachzukommen.",
      dataSharing: "Datenweitergabe",
      dataSharingText: "Wir verkaufen, handeln oder übertragen Ihre persönlichen Daten nicht ohne Ihre Zustimmung an Dritte, außer wie in dieser Richtlinie beschrieben oder gesetzlich vorgeschrieben.",
      dataSecurity: "Datensicherheit",
      dataSecurityText: "Wir implementieren angemessene Sicherheitsmaßnahmen, um Ihre persönlichen Daten vor unbefugtem Zugriff, Änderung, Offenlegung oder Zerstörung zu schützen.",
      yourRights: "Ihre Rechte",
      yourRightsText: "Sie haben das Recht, auf Ihre persönlichen Daten zuzugreifen, sie zu aktualisieren oder zu löschen. Sie können auch gegen bestimmte Verwendungen Ihrer Daten Einspruch erheben. Kontaktieren Sie uns, um diese Rechte auszuüben.",
      cookies: "Lokale Speicherung",
      cookiesText: "Wir verwenden lokale Speicherung, um Ihre Sprachpräferenz (Deutsch/Englisch) zu speichern und Ihr Browsing-Erlebnis zu verbessern. Es werden keine Tracking- oder Analytics-Cookies verwendet. Sie können diese Daten über Ihre Browser-Einstellungen löschen.",
      contact: "Kontakt",
      contactText: "Wenn Sie Fragen zu dieser Datenschutzerklärung haben, kontaktieren Sie uns bitte unter privacy@mapsuche.com.",
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
              {currentContent.dataCollection}
            </h2>
            <p className="text-gray-700">{currentContent.dataCollectionText}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {currentContent.dataUse}
            </h2>
            <p className="text-gray-700">{currentContent.dataUseText}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {currentContent.dataSharing}
            </h2>
            <p className="text-gray-700">{currentContent.dataSharingText}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {currentContent.dataSecurity}
            </h2>
            <p className="text-gray-700">{currentContent.dataSecurityText}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {currentContent.yourRights}
            </h2>
            <p className="text-gray-700">{currentContent.yourRightsText}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {currentContent.cookies}
            </h2>
            <p className="text-gray-700">{currentContent.cookiesText}</p>
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
