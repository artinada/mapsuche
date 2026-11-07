import { createContext, useContext, useEffect, type ReactNode } from 'react';
import { translations, type Language, type TranslationKey } from '@/lib/translations';

interface LanguageContextType {
  language: Language;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Explicit language URLs take precedence over browser settings and saved preferences.
export function LanguageProvider({ children, language }: { children: ReactNode; language: Language }) {
  useEffect(() => { document.documentElement.lang = language; }, [language]);
  const t = (key: TranslationKey) => {
    const value = translations[language][key] || translations.en[key];
    return typeof value === 'string' ? value : '';
  };
  return <LanguageContext.Provider value={{ language, t }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
}
