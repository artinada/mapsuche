import { useEffect, useState } from 'react';
import { Link, useLocation, useSearch } from 'wouter';
import { useLanguage } from '@/hooks/useLanguage';
import { languages, localizedPath } from '../../../shared/locales.mjs';

export function LanguageSwitcher() {
  const { language } = useLanguage();
  const [pathname] = useLocation();
  const search = useSearch();
  const [suffix, setSuffix] = useState('');
  useEffect(() => {
    const update = () => setSuffix(window.location.search + window.location.hash);
    update();
    window.addEventListener('hashchange', update);
    return () => window.removeEventListener('hashchange', update);
  }, [pathname, search]);
  return <nav aria-label={language === 'de' ? 'Sprache' : 'Language'} className="flex bg-gray-100 rounded-lg p-1">
    {languages.map(target => <Link key={target} href={`~${localizedPath(pathname, target)}${suffix}`} hrefLang={target} lang={target}
      aria-current={language === target ? 'page' : undefined}
      className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${language === target ? 'bg-white text-primary shadow-sm' : 'text-gray-600 hover:text-primary'}`}>
      {target.toUpperCase()}
    </Link>)}
  </nav>;
}
