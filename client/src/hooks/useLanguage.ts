import { useState, useEffect } from 'react';
import { translations, type Language, type TranslationKey } from '@/lib/translations';

export function useLanguage() {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Get language from localStorage or browser preference
    const savedLanguage = localStorage.getItem('language') as Language;
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
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
  };

  const t = (key: TranslationKey) => {
    return translations[language][key] || translations.en[key];
  };

  return { language, switchLanguage, t };
}
