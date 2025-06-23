import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, type Language, type TranslationKey } from '@/lib/translations';
import { secureStorage } from '@/lib/security';

interface LanguageContextType {
  language: Language;
  switchLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }): JSX.Element {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Get language from secure localStorage or browser preference
    const savedLanguage = secureStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'de')) {
      setLanguage(savedLanguage);
    } else {
      // Detect browser language
      const browserLang = navigator.language.slice(0, 2);
      if (browserLang === 'de') {
        setLanguage('de');
      }
    }
  }, []);

  const switchLanguage = (lang: Language) => {
    setLanguage(lang);
    secureStorage.setItem('language', lang);
    document.documentElement.lang = lang;
  };

  const t = (key: TranslationKey) => {
    return translations[language][key] || translations.en[key];
  };

  return (
    <LanguageContext.Provider value={{ language, switchLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
