import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// SEO Utilities for dynamic meta tag management
export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
  structuredData?: object;
}

export const updatePageSEO = (config: SEOConfig) => {
  // Update document title
  document.title = config.title;
  
  // Update or create meta description
  updateMetaTag('description', config.description);
  
  // Update or create meta keywords
  if (config.keywords) {
    updateMetaTag('keywords', config.keywords);
  }
  
  // Update Open Graph tags
  updateMetaProperty('og:title', config.ogTitle || config.title);
  updateMetaProperty('og:description', config.ogDescription || config.description);
  
  if (config.ogImage) {
    updateMetaProperty('og:image', config.ogImage);
  }
  
  // Update canonical URL
  if (config.canonicalUrl) {
    updateCanonicalUrl(config.canonicalUrl);
  }
  
  // Add structured data
  if (config.structuredData) {
    updateStructuredData(config.structuredData);
  }
};

const updateMetaTag = (name: string, content: string) => {
  let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
  if (!meta) {
    meta = document.createElement('meta');
    meta.name = name;
    document.head.appendChild(meta);
  }
  meta.content = content;
};

const updateMetaProperty = (property: string, content: string) => {
  let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('property', property);
    document.head.appendChild(meta);
  }
  meta.content = content;
};

const updateCanonicalUrl = (url: string) => {
  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = url;
};

const updateStructuredData = (data: object) => {
  // Remove existing structured data for this page
  const existingScript = document.querySelector('script[data-page-schema]');
  if (existingScript) {
    existingScript.remove();
  }
  
  // Add new structured data
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-page-schema', 'true');
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
};

// Primary Keywords for MapSuche
export const PRIMARY_KEYWORDS = {
  en: [
    'local business marketing',
    'google maps optimization',
    'google business profile',
    'local seo germany',
    'small business digital marketing',
    'google my business setup',
    'local search optimization',
    'business listing optimization',
    'local seo services',
    'google maps listing',
    'digital marketing agency germany',
    'local business website',
    'google business profile management',
    'local search marketing',
    'small business seo'
  ],
  de: [
    'lokales marketing',
    'google maps optimierung',
    'google unternehmensprofil',
    'lokale seo deutschland',
    'digital marketing kleine unternehmen',
    'google my business einrichtung',
    'lokale suchoptimierung',
    'unternehmenseintrag optimierung',
    'lokale seo dienstleistungen',
    'google maps eintrag',
    'digital marketing agentur deutschland',
    'lokale unternehmenswebsite',
    'google unternehmensprofil verwaltung',
    'lokales suchmarketing',
    'kleine unternehmen seo'
  ]
};

// Location-based keywords for German market
export const LOCATION_KEYWORDS = [
  'deutschland',
  'germany',
  'berlin',
  'münchen',
  'hamburg',
  'köln',
  'frankfurt',
  'stuttgart',
  'düsseldorf',
  'dortmund',
  'essen',
  'leipzig',
  'bremen',
  'dresden',
  'hannover',
  'nürnberg'
];

// Industry-specific keywords
export const INDUSTRY_KEYWORDS = {
  en: [
    'restaurants',
    'cafes',
    'retail stores',
    'medical practices',
    'dental offices',
    'law firms',
    'accounting firms',
    'real estate agents',
    'home improvement contractors',
    'beauty salons',
    'fitness centers',
    'auto repair shops',
    'veterinary clinics',
    'insurance agencies',
    'consulting services'
  ],
  de: [
    'restaurants',
    'cafés',
    'einzelhandel',
    'arztpraxen',
    'zahnarztpraxen',
    'anwaltskanzleien',
    'steuerberater',
    'immobilienmakler',
    'handwerksbetriebe',
    'friseursalons',
    'fitnessstudios',
    'autowerkstätten',
    'tierarztpraxen',
    'versicherungsagenturen',
    'beratungsdienstleistungen'
  ]
};

export const generatePageKeywords = (
  baseKeywords: string[],
  pageSpecificKeywords: string[],
  language: 'en' | 'de' = 'en'
): string => {
  const primaryKeywords = PRIMARY_KEYWORDS[language];
  const industryKeywords = INDUSTRY_KEYWORDS[language];
  
  const allKeywords = [
    ...baseKeywords,
    ...pageSpecificKeywords,
    ...primaryKeywords.slice(0, 8), // Top 8 primary keywords
    ...industryKeywords.slice(0, 5), // Top 5 industry keywords
    ...LOCATION_KEYWORDS.slice(0, 6) // Top 6 location keywords
  ];
  
  // Remove duplicates and join
  return [...new Set(allKeywords)].join(', ');
};
