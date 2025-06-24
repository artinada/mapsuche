export interface BlogPost {
  id: number;
  slug: string;
  title: {
    de: string;
    en: string;
  };
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
    id: 1,
    slug: 'wie-findet-man-gute-firmen-in-der-naehe',
    title: {
      de: 'Wie findet man gute Firmen in der Nähe?',
      en: 'How to Find Good Companies Nearby?'
    },
    excerpt: {
      de: 'Online-Sichtbarkeit ist für kleine Unternehmen heute eine Notwendigkeit. Erfahren Sie, wie moderne Kunden suchen und warum digitale Präsenz entscheidend für den Geschäftserfolg ist.',
      en: 'Online visibility is a necessity for small businesses today. Learn how modern customers search and why digital presence is crucial for business success.'
    },
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop&auto=format&q=80',
    date: '2024-01-15',
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
    featured: true
  },
  {
    id: 2,
    slug: 'warum-ist-ein-google-eintrag-wichtig',
    title: {
      de: 'Warum ist ein Google-Eintrag wichtig?',
      en: 'Why is a Google Entry Important?'
    },
    excerpt: {
      de: 'Ein Google Business Profile ist heute unverzichtbar für lokale Unternehmen. Erfahren Sie, warum Sichtbarkeit bei Google über Erfolg oder Misserfolg entscheidet.',
      en: 'A Google Business Profile is essential for local businesses today. Learn why visibility on Google determines success or failure.'
    },
    image: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=400&h=250&fit=crop',
    date: '2024-01-10',
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
    title: {
      de: 'Top 5 Restaurants in Lutherstadt Wittenberg laut mapsuche.de',
      en: 'Top 5 Restaurants in Lutherstadt Wittenberg according to mapsuche.de'
    },
    excerpt: {
      de: 'Entdecken Sie die besten Restaurants in der Lutherstadt mit echten Adressen, Kontaktdaten und authentischen Bewertungen unserer Experten.',
      en: 'Discover the best restaurants in Luther\'s city with real addresses, contact details and authentic reviews from our experts.'
    },
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=400&fit=crop&auto=format&q=80',
    date: '2024-01-15',
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
    title: {
      de: 'Die häufigsten Fehler von Unternehmen im Internet (und wie du sie vermeidest)',
      en: 'The Most Common Business Mistakes Online (And How to Avoid Them)'
    },
    excerpt: {
      de: 'Diese 5 Online-Fehler kosten täglich potenzielle Kunden. Entdecken Sie die häufigsten Probleme von Unternehmen im Internet und wie Sie diese einfach vermeiden können.',
      en: 'These 5 online mistakes cost potential customers daily. Discover the most common problems businesses face online and how to easily avoid them.'
    },
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop&auto=format&q=80',
    date: '2024-01-20',
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
      de: 'Local SEO Grundlagen für kleine Unternehmen',
      en: 'Local SEO Basics for Small Businesses'
    },
    excerpt: {
      de: 'Die wichtigsten Local SEO Strategien, die jedes kleine Unternehmen kennen sollte. Praktische Tipps für bessere lokale Sichtbarkeit.',
      en: 'Essential Local SEO strategies every small business should know. Practical tips for better local visibility.'
    },
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
    date: '2024-01-01',
    readTime: 10,
    category: {
      de: 'SEO Grundlagen',
      en: 'SEO Basics'
    },
    keywords: [
      'local seo grundlagen',
      'lokale seo tipps',
      'kleine unternehmen seo',
      'local search optimization',
      'business visibility'
    ],
    published: false // Not yet implemented
  },
  {
    id: 6,
    slug: 'google-bewertungen-richtig-managen',
    title: {
      de: 'Google Bewertungen richtig managen: Der komplette Leitfaden',
      en: 'Managing Google Reviews Properly: The Complete Guide'
    },
    excerpt: {
      de: 'Lernen Sie, wie Sie Google Bewertungen professionell verwalten, auf negative Reviews reagieren und mehr positive Bewertungen erhalten.',
      en: 'Learn how to professionally manage Google reviews, respond to negative reviews, and get more positive ratings.'
    },
    image: 'https://images.unsplash.com/photo-1556745757-8d76bdb6984b?w=400&h=250&fit=crop',
    date: '2023-12-28',
    readTime: 12,
    category: {
      de: 'Bewertungsmanagement',
      en: 'Review Management'
    },
    keywords: [
      'google bewertungen management',
      'negative bewertungen antworten',
      'review management',
      'customer feedback'
    ],
    published: false // Not yet implemented
  },
  {
    id: 7,
    slug: 'mobile-first-lokale-unternehmen',
    title: {
      de: 'Mobile-First: Warum lokale Unternehmen mobile Optimierung brauchen',
      en: 'Mobile-First: Why Local Businesses Need Mobile Optimization'
    },
    excerpt: {
      de: 'Über 60% der lokalen Suchanfragen kommen von mobilen Geräten. Erfahren Sie, wie Sie Ihr Unternehmen für mobile Nutzer optimieren.',
      en: 'Over 60% of local searches come from mobile devices. Learn how to optimize your business for mobile users.'
    },
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop',
    date: '2023-12-25',
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
    published: false // Not yet implemented
  },
  {
    id: 8,
    slug: 'online-sichtbarkeit-tipps-lokale-unternehmen',
    title: {
      de: '5 Tipps für mehr Online-Sichtbarkeit deines lokalen Unternehmens',
      en: '5 Tips for Better Online Visibility of Your Local Business'
    },
    excerpt: {
      de: 'Entdecken Sie 5 einfache, aber effektive Strategien für bessere Online-Sichtbarkeit Ihres lokalen Unternehmens. Praktische Tipps ohne großes Budget oder Technik-Know-how.',
      en: 'Discover 5 simple but effective strategies for better online visibility of your local business. Practical tips without large budget or technical know-how.'
    },
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop&auto=format&q=80',
    date: '2024-01-25',
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
  {
    id: 9,
    slug: 'mobile-first-lokale-unternehmen-optimierung',
    title: {
      de: 'Mobile-First: Warum lokale Unternehmen mobile Optimierung brauchen',
      en: 'Mobile-First: Why Local Businesses Need Mobile Optimization'
    },
    excerpt: {
      de: '70% der lokalen Suchen kommen von mobilen Geräten. Entdecken Sie, warum mobile Optimierung für lokale Unternehmen entscheidend ist und wie Sie mobil besser gefunden werden.',
      en: '70% of local searches come from mobile devices. Discover why mobile optimization is crucial for local businesses and how to be found better on mobile.'
    },
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop&auto=format&q=80',
    date: '2024-01-26',
    readTime: 7,
    category: {
      de: 'Mobile Marketing',
      en: 'Mobile Marketing'
    },
    keywords: [
      'mobile optimierung',
      'lokale unternehmen mobile',
      'smartphone suche lokal',
      'mobile first strategie',
      'google maps mobile',
      'responsive design kleine unternehmen',
      'mobile seo tipps',
      'lokale suche smartphone',
      'mobile website optimierung',
      'mapsuche mobile',
      'mobile optimization',
      'local business mobile',
      'smartphone local search',
      'mobile first strategy',
      'google maps mobile',
      'responsive design small business',
      'mobile seo tips',
      'local search smartphone',
      'mobile website optimization'
    ],
    published: true,
    featured: false
  }
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

export const generateSitemapEntries = (): string => {
  const publishedPosts = getPublishedPosts();
  return publishedPosts.map(post => `
  <url>
    <loc>https://mapsuche.de/blog/${post.slug}</loc>
    <lastmod>${post.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('');
};