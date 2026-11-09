export interface BlogPost {
  id: number;
  slug: string;
  title: {
    de: string;
    en: string;
  };
  seoTitle?: { de: string; en: string };
  excerpt: {
    de: string;
    en: string;
  };
  image: string;
  date: string;
  readTime: number;
  category: {
    de: string;
    en: string;
  };
  keywords: string[];
  published: boolean;
  featured?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: 9,
    slug: 'wie-wird-mein-unternehmen-bei-chatgpt-gefunden',
    title: {
      de: 'Wie wird mein Unternehmen bei ChatGPT gefunden?',
      en: 'How Does My Business Get Found on ChatGPT?'
    },
    excerpt: {
      de: 'Wie ChatGPT Unternehmen findet: Quellen, Website-Checkliste, typische Suchfragen und Grenzen der KI-Suche. Mit kostenlosem MapSuche GEO Check.',
      en: 'How ChatGPT finds businesses: sources, a website checklist, example searches and the limits of AI recommendations. Includes a free MapSuche GEO Check.'
    },
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=600&fit=crop&auto=format&q=80',
    date: '2026-11-09',
    readTime: 6,
    category: { de: 'GEO & KI-Suche', en: 'GEO & AI Search' },
    keywords: ['ChatGPT Unternehmen finden', 'KI-Suche', 'GEO Check', 'AI search', 'local business visibility'],
    published: true,
    featured: true
  },
  {
    id: 10,
    slug: 'was-ist-geo',
    title: {
      de: 'Was ist GEO?',
      en: 'What Is GEO?'
    },
    excerpt: {
      de: 'GEO verständlich erklärt: Wie Inhalte in KI-Antworten sichtbar werden, was SEO damit zu tun hat und womit kleine Unternehmen anfangen können.',
      en: 'GEO explained: how content can appear in AI answers, how it relates to SEO and where small businesses can start. With a practical example.'
    },
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=600&fit=crop&auto=format&q=80',
    date: '2025-08-01',
    readTime: 7,
    category: { de: 'GEO & KI-Suche', en: 'GEO & AI Search' },
    keywords: ['Was ist GEO', 'Generative Engine Optimization', 'GEO vs SEO', 'KI-Suche', 'AI search optimization'],
    published: true,
    featured: false
  },
  {
    id: 1,
    slug: 'wie-findet-man-gute-firmen-in-der-naehe',
    title: {
      de: 'Wie findet man gute Firmen in der Nähe?',
      en: 'How to Find Good Companies Nearby?'
    },
    excerpt: {
      de: 'Lokale Unternehmen finden: Google Maps, Bewertungen und Empfehlungen vergleichen und Kontaktdaten vor einer Anfrage prüfen.',
      en: 'Find local businesses using Google Maps, reviews and recommendations, and check their contact details before making an inquiry.'
    },
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop&auto=format&q=80',
    date: '2024-03-15',
    readTime: 7,
    category: {
      de: 'Geschäftstipps',
      en: 'Business Tips'
    },
    keywords: [
      'gute firmen finden',
      'lokale unternehmen suchen',
      'vertrauenswürdige geschäfte',
      'google maps suche',
      'unternehmen bewertungen',
      'lokale empfehlungen',
      'firmen in der nähe',
      'online sichtbarkeit',
      'digitale präsenz',
      'google business profile',
      'mapsuche eintrag',
      'local business search',
      'find good companies',
      'trustworthy businesses',
      'online visibility',
      'digital presence',
      'local seo'
    ],
    published: true,
    featured: false
  },
  {
    id: 2,
    slug: 'warum-ist-ein-google-eintrag-wichtig',
    title: {
      de: 'Warum ist ein Google-Eintrag wichtig?',
      en: 'Why is a Google Entry Important?'
    },
    excerpt: {
      de: 'Erfahren Sie, wie ein Google Unternehmensprofil lokale Einträge, Öffnungszeiten, Fotos und Kundenbewertungen an einem Ort bündelt.',
      en: 'Learn how a Google Business Profile brings together local listings, opening hours, photos and customer reviews.'
    },
    image: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=400&h=250&fit=crop',
    date: '2024-02-20',
    readTime: 7,
    category: {
      de: 'Google Business',
      en: 'Google Business'
    },
    keywords: [
      'google business profile wichtigkeit',
      'google eintrag bedeutung',
      'lokale sichtbarkeit',
      'google maps eintrag',
      'unternehmensprofil google'
    ],
    published: true
  },
  {
    id: 3,
    slug: 'top-5-restaurants-lutherstadt-wittenberg',
    seoTitle: { de: 'Restaurants in Lutherstadt Wittenberg', en: 'Restaurants in Lutherstadt Wittenberg' },
    title: {
      de: 'Top 5 Restaurants in Lutherstadt Wittenberg laut mapsuche.de',
      en: 'Top 5 Restaurants in Lutherstadt Wittenberg according to mapsuche.de'
    },
    excerpt: {
      de: 'Restaurantübersicht für Lutherstadt Wittenberg. Prüfen Sie aktuelle Öffnungszeiten, Speisekarten und Kontaktdaten direkt beim jeweiligen Anbieter.',
      en: 'A restaurant overview for Lutherstadt Wittenberg. Check current opening hours, menus and contact details directly with each business.'
    },
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=400&fit=crop&auto=format&q=80',
    date: '2024-06-12',
    readTime: 6,
    category: {
      de: 'Lokale Empfehlungen',
      en: 'Local Recommendations'
    },
    keywords: [
      'restaurants wittenberg',
      'beste restaurants lutherstadt wittenberg',
      'gastronomie wittenberg',
      'essen gehen wittenberg',
      'restaurant empfehlungen',
      'brauhaus wittenberg',
      'kartoffelhaus wittenberg',
      'alte canzley',
      'trattoria toscana',
      'wittenburger',
      'dining wittenberg',
      'local restaurants',
      'german cuisine wittenberg'
    ],
    published: true,
    featured: false
  },
  {
    id: 4,
    slug: 'haeufigste-fehler-unternehmen-internet',
    seoTitle: { de: 'Häufige Online-Fehler von Unternehmen', en: 'Common Business Mistakes Online' },
    title: {
      de: 'Die häufigsten Fehler von Unternehmen im Internet (und wie du sie vermeidest)',
      en: 'The Most Common Business Mistakes Online (And How to Avoid Them)'
    },
    excerpt: {
      de: 'Fünf mögliche Schwachstellen im Online-Auftritt: Unternehmensprofil, Kontaktdaten, Öffnungszeiten, Fotos und der Umgang mit Bewertungen.',
      en: 'Review five common website and business-profile issues, including contact details, opening hours, photos and responses to customer reviews.'
    },
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop&auto=format&q=80',
    date: '2024-08-05',
    readTime: 6,
    category: {
      de: 'Online-Marketing',
      en: 'Digital Marketing'
    },
    keywords: [
      'unternehmen fehler online',
      'online marketing fehler',
      'digitale präsenz fehler',
      'google business profile fehler',
      'online sichtbarkeit probleme',
      'internet auftritt fehler',
      'geschäft online fehler',
      'bewertungen ignorieren',
      'kontaktdaten fehlen',
      'öffnungszeiten falsch',
      'business mistakes online',
      'digital marketing errors',
      'online presence mistakes',
      'google profile errors',
      'internet visibility problems',
      'business profile optimization',
      'online reputation management',
      'missing contact information',
      'wrong opening hours'
    ],
    published: true,
    featured: false
  },
  {
    id: 5,
    slug: 'local-seo-grundlagen-kleine-unternehmen',
    title: {
      de: 'Local SEO: Grundlagen für kleine Unternehmen',
      en: 'Local SEO: Basics for Small Businesses'
    },
    excerpt: {
      de: 'Grundlagen lokaler Suchoptimierung für kleine Unternehmen: Unternehmensprofil, Standortangaben, Website-Inhalte und lokale Verzeichnisse.',
      en: 'Local SEO basics for small businesses: business profiles, location details, website content and local directories.'
    },
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop&auto=format&q=80',
    date: '2024-10-15',
    readTime: 8,
    category: {
      de: 'SEO Grundlagen',
      en: 'SEO Basics'
    },
    keywords: [
      'local seo grundlagen',
      'lokale seo tipps',
      'kleine unternehmen seo',
      'google unternehmensprofil',
      'local search optimization',
      'business visibility',
      'lokale sichtbarkeit',
      'standortbezogene keywords',
      'mobile first local seo',
      'nap daten konsistenz',
      'lokale verzeichnisse',
      'google business profile',
      'location based keywords',
      'local business marketing',
      'seo für kleine betriebe',
      'local ranking faktoren',
      'proximity marketing',
      'geo targeting'
    ],
    published: true
  },
  {
    id: 6,
    slug: 'google-bewertungen-richtig-managen',
    seoTitle: { de: 'Google-Bewertungen richtig managen', en: 'Managing Google Reviews' },
    title: {
      de: 'Google-Bewertungen richtig managen: So stärkst du dein lokales Geschäft',
      en: 'Managing Google Reviews Properly: How to Strengthen Your Local Business'
    },
    excerpt: {
      de: 'Google-Bewertungen sachlich beantworten, Rückmeldungen einordnen und Kundinnen und Kunden auf eine faire Möglichkeit zur Bewertung hinweisen.',
      en: 'Respond to Google reviews, assess customer feedback and invite customers to share their experience fairly.'
    },
    image: 'https://images.unsplash.com/photo-1556745757-8d76bdb6984b?w=800&h=400&fit=crop&auto=format&q=80',
    date: '2024-12-19',
    readTime: 8,
    category: {
      de: 'Bewertungsmanagement',
      en: 'Review Management'
    },
    keywords: [
      'google bewertungen management',
      'bewertungen richtig managen',
      'negative bewertungen antworten',
      'positive bewertungen sammeln',
      'google business profile bewertungen',
      'kundenfeedback management',
      'bewertungen beantworten',
      'online reputation management',
      'review management',
      'customer feedback',
      'google reviews',
      'business reviews',
      'reputation management',
      'customer satisfaction',
      'local business reviews',
      'review responses',
      'negative review handling',
      'review solicitation',
      'online reviews',
      'business reputation'
    ],
    published: true
  },
  {
    id: 7,
    slug: 'mobile-first-lokale-unternehmen',
    seoTitle: { de: 'Mobile Websites für lokale Unternehmen', en: 'Mobile Websites for Local Businesses' },
    title: {
      de: 'Mobile-First: Warum lokale Unternehmen mobile Optimierung brauchen',
      en: 'Mobile-First: Why Local Businesses Need Mobile Optimization'
    },
    excerpt: {
      de: 'Mobile Websites für lokale Unternehmen: lesbare Inhalte, passende Navigation, schnelle Seiten und einfach erreichbare Kontaktmöglichkeiten.',
      en: 'Mobile website basics for local businesses: readable content, usable navigation, page speed and easy access to contact details.'
    },
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop',
    date: '2024-09-14',
    readTime: 6,
    category: {
      de: 'Mobile Marketing',
      en: 'Mobile Marketing'
    },
    keywords: [
      'mobile first design',
      'mobile optimization',
      'lokale mobile suche',
      'responsive design'
    ],
    published: true
  },
  {
    id: 8,
    slug: 'online-sichtbarkeit-tipps-lokale-unternehmen',
    seoTitle: { de: '5 Tipps für lokale Online-Sichtbarkeit', en: '5 Tips for Local Online Visibility' },
    title: {
      de: '5 Tipps für mehr Online-Sichtbarkeit deines lokalen Unternehmens',
      en: '5 Tips for Better Online Visibility of Your Local Business'
    },
    excerpt: {
      de: 'Fünf Ansätze für Ihren lokalen Online-Auftritt: Unternehmensprofil, Bewertungen, Verzeichnisse, soziale Medien und Website-Inhalte.',
      en: 'Five ways to review your local online presence: business profiles, reviews, directories, social media and website content.'
    },
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop&auto=format&q=80',
    date: '2024-11-08',
    readTime: 8,
    category: {
      de: 'Online-Marketing',
      en: 'Digital Marketing'
    },
    keywords: [
      'online sichtbarkeit tipps',
      'lokales unternehmen marketing',
      'google business profile',
      'bewertungen sammeln',
      'lokale verzeichnisse',
      'social media präsenz',
      'website für kleine unternehmen',
      'local seo tipps',
      'digitale präsenz',
      'online marketing kleine betriebe',
      'schlüsselwörter verwenden',
      'social media marketing',
      'lokale seo strategien',
      'online visibility tips',
      'local business marketing',
      'collect reviews',
      'local directories',
      'social media presence',
      'website small business',
      'local seo tips',
      'digital presence',
      'online marketing small business',
      'keyword optimization',
      'small business online presence',
      'local search optimization'
    ],
    published: true,
    featured: false
  },
];

// Helper functions
export const getPublishedPosts = (): BlogPost[] => {
  return blogPosts.filter(post => post.published);
};

export const getFeaturedPost = (): BlogPost | undefined => {
  return blogPosts.find(post => post.published && post.featured);
};

export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

export const getPostById = (id: number): BlogPost | undefined => {
  return blogPosts.find(post => post.id === id);
};
