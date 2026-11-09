import { blogPosts } from '../client/src/lib/blogConfig.ts';
import { splitLocale, localizedPath } from './locales.mjs';
export type SiteLanguage = 'en' | 'de';
export const siteOrigin = 'https://mapsuche.de';

export const pageMetadata = {
  home: {
    en: { title: 'MapSuche | GEO Analytics & Digital Marketing', description: 'Explore GEO checks, Google Maps optimization, business profiles, website development and process audits.' },
    de: { title: 'MapSuche | GEO-Analyse & digitales Marketing', description: 'Informationen zu GEO Checks, Google Maps Optimierung, Unternehmensprofilen, Website-Entwicklung und Ablauf-Audits.' },
  },
  services: {
    en: { title: 'Services | MapSuche', description: 'An overview of GEO checks, Google Maps optimization, business profiles, website development and process audits.' },
    de: { title: 'Leistungen | MapSuche', description: 'Übersicht zu GEO Checks, Google Maps Optimierung, Unternehmensprofilen, Website-Entwicklung und Ablauf-Audits.' },
  },
  googleMaps: {
    en: { title: 'Google Maps Optimization | MapSuche', description: 'Help customers find your business locally. MapSuche helps optimize your Google Business Profile and your online presence.' },
    de: { title: 'Google Maps Optimierung | MapSuche', description: 'Machen Sie Ihr Unternehmen lokal besser auffindbar. MapSuche unterstützt Sie bei der Optimierung Ihres Google Unternehmensprofils und Ihrer Online-Präsenz.' },
  },
  geoCheck: {
    en: { title: 'GEO Check – Check AI Visibility | MapSuche', description: 'How visible is your business in ChatGPT and other AI tools? Use the GEO Check to explore how AI search systems find and mention your brand.' },
    de: { title: 'GEO Check – KI-Sichtbarkeit prüfen | MapSuche', description: 'Wie sichtbar ist Ihr Unternehmen bei ChatGPT & Co.? Entdecken Sie mit dem GEO Check, wie KI-Suchsysteme Ihre Marke finden und erwähnen.' },
  },
  geoOptimization: {
    en: { title: 'GEO Optimization for Businesses | MapSuche', description: 'Improve your business’s visibility in AI search. MapSuche supports you with GEO audits, local content and monitoring.' },
    de: { title: 'GEO-Optimierung für Unternehmen | MapSuche', description: 'Verbessern Sie die Auffindbarkeit Ihres Unternehmens in der KI-Suche. MapSuche unterstützt Sie mit GEO-Audits, lokalen Inhalten und Monitoring.' },
  },
  businessProfile: {
    en: { title: 'Google Business Profiles | MapSuche', description: 'Information about creating and managing Google Business Profiles.' },
    de: { title: 'Google Unternehmensprofile | MapSuche', description: 'Informationen zur Erstellung und Verwaltung von Google Unternehmensprofilen.' },
  },
  website: {
    en: { title: 'Website Development | MapSuche', description: 'Information about website development, page structure and search optimization.' },
    de: { title: 'Website-Entwicklung | MapSuche', description: 'Informationen zu Website-Entwicklung, Seitenstruktur und Suchoptimierung.' },
  },
  ablaufAudit: {
    en: { title: 'Process Audits | MapSuche', description: 'Information about business process reviews and document organization.' },
    de: { title: 'Ablauf-Audits | MapSuche', description: 'Informationen zur Prüfung von Geschäftsabläufen und zur Dokumentenorganisation.' },
  },
  contact: {
    en: { title: 'Contact | MapSuche', description: 'Send an inquiry to MapSuche using the contact form.' },
    de: { title: 'Kontakt | MapSuche', description: 'Eine Anfrage über das Kontaktformular an MapSuche senden.' },
  },
  faq: {
    en: { title: 'Frequently Asked Questions | MapSuche', description: 'Questions and answers about local search and digital marketing.' },
    de: { title: 'Häufige Fragen | MapSuche', description: 'Fragen und Antworten zu lokaler Suche und Digital Marketing.' },
  },
  blog: {
    en: { title: 'Blog | MapSuche', description: 'Articles about local search, business profiles and digital marketing.' },
    de: { title: 'Blog | MapSuche', description: 'Artikel zu lokaler Suche, Unternehmensprofilen und Digital Marketing.' },
  },
};

const extraPages = {
  geoResults: {
    en: { title: 'Private GEO Report | MapSuche', description: 'View your private GEO Check report using its access link.' },
    de: { title: 'Privater GEO-Bericht | MapSuche', description: 'Ihren privaten GEO-Bericht mit dem zugehörigen Zugriffslink öffnen.' },
  },
  geoDashboard: {
    en: { title: 'Saved GEO Reports | MapSuche', description: 'Manage the GEO Check reports saved in this browser.' },
    de: { title: 'Gespeicherte GEO-Berichte | MapSuche', description: 'Die in diesem Browser gespeicherten GEO-Berichte verwalten.' },
  },
  privacy: {
    en: { title: 'Privacy Policy | MapSuche', description: 'Information about data processing and privacy on MapSuche.' },
    de: { title: 'Datenschutzerklärung | MapSuche', description: 'Informationen zur Datenverarbeitung und zum Datenschutz bei MapSuche.' },
  },
  terms: {
    en: { title: 'Terms of Use | MapSuche', description: 'Terms of use for the MapSuche website and services.' },
    de: { title: 'Nutzungsbedingungen | MapSuche', description: 'Nutzungsbedingungen für die Website und Leistungen von MapSuche.' },
  },
  impressum: {
    en: { title: 'Impressum | MapSuche', description: 'The legal notice for the MapSuche website.' },
    de: { title: 'Impressum | MapSuche', description: 'Das Impressum der Website MapSuche.' },
  },
  notFound: {
    en: { title: 'Page Not Found | MapSuche', description: 'The requested page could not be found.' },
    de: { title: 'Seite nicht gefunden | MapSuche', description: 'Die angeforderte Seite wurde nicht gefunden.' },
  },
};

const pages = { ...pageMetadata, ...extraPages };
export const routePages: Record<string, keyof typeof pages> = {
  '/': 'home', '/services': 'services', '/services/google-maps': 'googleMaps',
  '/services/business-profile': 'businessProfile', '/services/website': 'website',
  '/services/ablauf-audit': 'ablaufAudit', '/blog': 'blog', '/contact': 'contact', '/faq': 'faq',
  '/privacy': 'privacy', '/terms': 'terms', '/impressum': 'impressum',
  '/geo-check': 'geoCheck', '/geo-optimierung': 'geoOptimization',
  '/geo-check/results': 'geoResults', '/geo/dashboard': 'geoDashboard',
};

export const privateSeoPaths = ['/geo-check/results', '/geo/dashboard'];
export const normalizePagePath = (value: string) => value.split(/[?#]/)[0].replace(/\/+$/, '') || '/';

// Only services described on their public pages are marked up. Provider details
// are limited to the site's verified brand name and URL.
const services = {
  geoCheck: {
    en: { name: 'GEO Check', serviceType: 'AI search visibility analysis', description: 'A free check of OpenAI API answers with web search for business mentions and website citations.' },
    de: { name: 'GEO Check', serviceType: 'Analyse der KI-Sichtbarkeit', description: 'Kostenloser Check von OpenAI-API-Antworten mit Websuche auf Unternehmensnennungen und Zitate Ihrer Website.' },
  },
  geoOptimization: {
    en: { name: 'GEO Optimization', serviceType: 'Generative Engine Optimization', description: pageMetadata.geoOptimization.en.description },
    de: { name: 'GEO-Optimierung', serviceType: 'Generative Engine Optimization', description: pageMetadata.geoOptimization.de.description },
  },
  googleMaps: {
    en: { name: 'Google Maps Optimization', serviceType: 'Google Maps and Google Business Profile optimization', description: pageMetadata.googleMaps.en.description },
    de: { name: 'Google Maps Optimierung', serviceType: 'Google Maps und Google Unternehmensprofil Optimierung', description: pageMetadata.googleMaps.de.description },
  },
};

export function getPageSeo(value: string, requestedLanguage?: SiteLanguage) {
  const locale = splitLocale(value);
  const language = locale.prefix ? locale.language : requestedLanguage || locale.language;
  const pathname = locale.pathname;
  const article = blogPosts.find(post => post.published && `/blog/${post.slug}` === pathname);
  const page = routePages[pathname];
  const found = Boolean(page || article);
  const metadata = article
    ? { title: `${(article.seoTitle || article.title)[language]} | MapSuche`, description: article.excerpt[language] }
    : pages[page || 'notFound'][language];
  const service = page && page in services ? services[page as keyof typeof services][language] : undefined;
  const canonicalUrl = found ? `${siteOrigin}${localizedPath(pathname, language)}` : undefined;
  const robots = !found ? 'noindex, nofollow' : privateSeoPaths.includes(pathname) ? 'noindex, follow' : 'index, follow';
  const alternates = robots === 'index, follow' ? [
    { language: 'en', href: `${siteOrigin}${localizedPath(pathname, 'en')}` },
    { language: 'de', href: `${siteOrigin}${localizedPath(pathname, 'de')}` },
    { language: 'x-default', href: `${siteOrigin}${localizedPath(pathname, 'en')}` },
  ] : [];
  return {
    ...metadata, language, pathname, found, robots, canonicalUrl, alternates,
    structuredData: found && !privateSeoPaths.includes(pathname) ? {
      '@context': 'https://schema.org', '@type': 'WebPage', '@id': `${canonicalUrl}#webpage`,
      url: canonicalUrl, name: metadata.title, description: metadata.description, inLanguage: language,
      isPartOf: { '@type': 'WebSite', '@id': `${siteOrigin}/#website`, name: 'MapSuche', url: siteOrigin },
      ...(service ? {
        mainEntity: {
          '@type': 'Service', '@id': `${canonicalUrl}#service`, url: canonicalUrl,
          ...service,
          provider: { '@type': 'Organization', '@id': `${siteOrigin}/#organization`, name: 'MapSuche', url: siteOrigin },
        },
      } : {}),
    } : undefined,
  };
}
