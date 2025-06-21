import { useLanguage } from '@/hooks/useLanguage';

export default function ImpressumPage() {
  const { t, language } = useLanguage();

  const content = {
    en: {
      title: "Impressum",
      companyInfo: "Company Information",
      company: "MapSuche Digital Marketing",
      address: "Goetheweg 21\n06888 Lutherstadt Wittenberg\nOT Seegrehna\nGermany",
      contact: "Contact Information",
      phone: "Phone: +49 (157) 877 06 06 5",
              email: "Email: info@mapsuche.de",
      legal: "Legal Information",
      businessReg: "Business Registration: HRB 12345",
      court: "Registration Court: Local Business Court",
      responsible: "Responsible for Content",
      responsiblePerson: "Nadia Kamenski\nManaging Director\nMapSuche Digital Marketing",
      disclaimer: "Disclaimer",
      disclaimerText: "Despite careful content control, we assume no liability for the content of external links. The operators of the linked pages are solely responsible for their content.",
    },
    de: {
      title: "Impressum",
      companyInfo: "Angaben zum Unternehmen",
      company: "MapSuche Digital Marketing",
      address: "Goetheweg 21\n06888 Lutherstadt Wittenberg\nOT Seegrehna\nDeutschland",
      contact: "Kontaktinformationen",
      phone: "Telefon: +49 (157) 877 06 06 5",
              email: "E-Mail: info@mapsuche.de",
      legal: "Rechtliche Angaben",
      businessReg: "Handelsregisternummer: HRB 12345",
      court: "Registergericht: Amtsgericht vor Ort",
      responsible: "Verantwortlich für den Inhalt",
      responsiblePerson: "Nadia Kamenski\nGeschäftsführerin\nMapSuche Digital Marketing",
      disclaimer: "Haftungsausschluss",
      disclaimerText: "Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.",
    }
  };

  const currentContent = content[language];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-12 text-center">
          {currentContent.title}
        </h1>

        <div className="prose prose-lg max-w-none">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {currentContent.companyInfo}
            </h2>
            <p className="text-gray-700 mb-2 font-semibold">{currentContent.company}</p>
            <p className="text-gray-700 whitespace-pre-line">{currentContent.address}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {currentContent.contact}
            </h2>
            <p className="text-gray-700 mb-2">{currentContent.phone}</p>
            <p className="text-gray-700">{currentContent.email}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {currentContent.legal}
            </h2>
            <p className="text-gray-700 mb-2">{currentContent.businessReg}</p>
            <p className="text-gray-700">{currentContent.court}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {currentContent.responsible}
            </h2>
            <p className="text-gray-700 whitespace-pre-line">{currentContent.responsiblePerson}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {currentContent.disclaimer}
            </h2>
            <p className="text-gray-700">{currentContent.disclaimerText}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
