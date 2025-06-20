import { useLanguage } from '@/hooks/useLanguage';

export function LanguageSwitcher() {
  const { language, switchLanguage } = useLanguage();

  return (
    <div className="flex bg-gray-100 rounded-lg p-1">
      <button
        onClick={() => switchLanguage('en')}
        className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
          language === 'en'
            ? 'bg-white text-primary shadow-sm'
            : 'text-gray-600 hover:text-primary'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => switchLanguage('de')}
        className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
          language === 'de'
            ? 'bg-white text-primary shadow-sm'
            : 'text-gray-600 hover:text-primary'
        }`}
      >
        DE
      </button>
    </div>
  );
}
