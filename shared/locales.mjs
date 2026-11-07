export const languages = ['en', 'de'];
export const defaultLanguage = 'en';
export const legacyAliases = {
  '/maps': '/services/google-maps',
  '/website': '/services/website',
  '/business-profile': '/services/business-profile',
  '/blog/mobile-first-lokale-unternehmen-optimierung': '/blog/mobile-first-lokale-unternehmen',
};

export function splitLocale(value) {
  const path = (value.split(/[?#]/)[0] || '/').replace(/\/+$/, '') || '/';
  const match = path.match(/^\/(en|de)(?=\/|$)/);
  return {
    language: match?.[1] || defaultLanguage,
    prefix: match ? `/${match[1]}` : '',
    pathname: match ? path.slice(match[0].length) || '/' : path,
  };
}

export function localizedPath(value, language = defaultLanguage) {
  const { pathname } = splitLocale(value);
  const suffix = value.match(/[?#].*$/)?.[0] || '';
  return `/${language}${pathname === '/' ? '/' : pathname}${suffix}`;
}
