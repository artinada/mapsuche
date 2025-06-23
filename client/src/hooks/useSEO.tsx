import { useEffect } from 'react';
import { useLanguage } from './useLanguage';
import { updatePageSEO, generatePageKeywords, type SEOConfig } from '@/lib/utils';

type PageType = 'home' | 'services' | 'googleMaps' | 'businessProfile' | 'website' | 'contact' | 'faq';

interface UseSEOProps {
  page: PageType;
  customTitle?: string;
  customDescription?: string;
  customKeywords?: string[];
  structuredData?: object;
}

export const useSEO = ({ 
  page, 
  customTitle, 
  customDescription, 
  customKeywords = [],
  structuredData 
}: UseSEOProps) => {
  const { t, language } = useLanguage();

  useEffect(() => {
    const seoMeta = t(`seoMeta.${page}` as any);
    
    if (!seoMeta || typeof seoMeta !== 'object') {
      console.warn(`SEO meta data not found for page: ${page}`);
      return;
    }

    const { title, description, keywords } = seoMeta as any;
    
    // Generate comprehensive keywords
    const baseKeywords = keywords ? keywords.split(', ') : [];
    const pageKeywords = generatePageKeywords(
      baseKeywords,
      customKeywords,
      language as 'en' | 'de'
    );

    // Prepare SEO configuration
    const seoConfig: SEOConfig = {
      title: customTitle || title || 'MapSuche - Local Business Digital Marketing',
      description: customDescription || description || 'Professional digital marketing services for local businesses',
      keywords: pageKeywords,
      canonicalUrl: `https://mapsuche.de${getPageUrl(page)}`,
      structuredData: structuredData || getDefaultStructuredData(page, language as 'en' | 'de')
    };

    // Update page SEO
    updatePageSEO(seoConfig);
  }, [page, customTitle, customDescription, customKeywords, structuredData, t, language]);
};

const getPageUrl = (page: PageType): string => {
  const urls = {
    home: '/',
    services: '/services',
    googleMaps: '/services/google-maps',
    businessProfile: '/services/business-profile',
    website: '/services/website',
    contact: '/contact',
    faq: '/faq'
  };
  return urls[page] || '/';
};

const getDefaultStructuredData = (page: PageType, language: 'en' | 'de'): object => {
  const baseData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "MapSuche",
    "url": "https://mapsuche.de",
    "logo": "https://mapsuche.de/favicon.svg",
    "image": "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=630&q=80&fm=webp&fit=crop&crop=center",
    "telephone": "+49-123-456789",
    "email": "info@mapsuche.de",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "DE",
      "addressRegion": "Germany"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 51.1657,
      "longitude": 10.4515
    },
    "areaServed": "Germany",
    "priceRange": "€€",
    "openingHours": "Mo-Fr 09:00-18:00"
  };

  // Page-specific structured data
  switch (page) {
    case 'home':
      return {
        ...baseData,
        "description": language === 'de' 
          ? "Professionelle Digital Marketing Agentur für lokale Unternehmen in Deutschland"
          : "Professional digital marketing agency for local businesses in Germany",
        "serviceType": "Digital Marketing",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": language === 'de' ? "Digital Marketing Services" : "Digital Marketing Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": language === 'de' ? "Google Maps Optimierung" : "Google Maps Optimization"
              }
            },
            {
              "@type": "Offer", 
              "itemOffered": {
                "@type": "Service",
                "name": language === 'de' ? "Google Unternehmensprofil Setup" : "Google Business Profile Setup"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service", 
                "name": language === 'de' ? "Website Entwicklung" : "Website Development"
              }
            }
          ]
        }
      };

    case 'services':
      return {
        ...baseData,
        "@type": "ProfessionalService",
        "serviceType": "Digital Marketing Services",
        "description": language === 'de'
          ? "Umfassende lokale SEO und Digital Marketing Services für kleine Unternehmen"
          : "Comprehensive local SEO and digital marketing services for small businesses"
      };

    case 'googleMaps':
      return {
        ...baseData,
        "@type": "ProfessionalService",
        "serviceType": "Google Maps Optimization",
        "description": language === 'de'
          ? "Professionelle Google Maps Optimierung für bessere lokale Sichtbarkeit"
          : "Professional Google Maps optimization for better local visibility"
      };

    case 'businessProfile':
      return {
        ...baseData,
        "@type": "ProfessionalService", 
        "serviceType": "Google Business Profile Management",
        "description": language === 'de'
          ? "Google Unternehmensprofil Erstellung und Optimierung Services"
          : "Google Business Profile creation and optimization services"
      };

    case 'website':
      return {
        ...baseData,
        "@type": "WebDesignCompany",
        "serviceType": "Website Development",
        "description": language === 'de'
          ? "Maßgeschneiderte SEO-optimierte Websites für lokale Unternehmen"
          : "Custom SEO-optimized websites for local businesses"
      };

    case 'contact':
      return {
        ...baseData,
        "@type": "ContactPage",
        "description": language === 'de'
          ? "Kontaktieren Sie MapSuche für eine kostenlose SEO Beratung"
          : "Contact MapSuche for a free SEO consultation"
      };

    case 'faq':
      return {
        ...baseData,
        "@type": "FAQPage",
        "description": language === 'de'
          ? "Häufige Fragen zu lokaler SEO und Digital Marketing"
          : "Frequently asked questions about local SEO and digital marketing"
      };

    default:
      return baseData;
  }
}; 