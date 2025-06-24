import { Link } from 'wouter';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { useSEO } from '@/hooks/useSEO';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import LazyImage from '@/components/LazyImage';
import { getPublishedPosts, getFeaturedPost, type BlogPost } from '@/lib/blogConfig';

export default function BlogPage() {
  const { language } = useLanguage();
  
  const publishedPosts = getPublishedPosts();
  const featuredPost = getFeaturedPost();

  // SEO optimization for blog page
  useSEO({ 
    page: 'blog' as any,
    customTitle: language === 'de' 
      ? 'MapSuche Blog - Local SEO Tipps & Digital Marketing Ratgeber' 
      : 'MapSuche Blog - Local SEO Tips & Digital Marketing Guide',
    customDescription: language === 'de'
      ? 'Entdecken Sie professionelle Tipps für lokales SEO, Google Maps Optimierung und digitales Marketing. Kostenlose Ratgeber für kleine Unternehmen in Deutschland.'
      : 'Discover professional tips for local SEO, Google Maps optimization and digital marketing. Free guides for small businesses in Germany.',
    customKeywords: [
      'local seo blog',
      'digital marketing tips',
      'google maps optimization guide',
      'small business marketing',
      'local search tips',
      'business visibility',
      'seo ratgeber',
      'lokales marketing',
      'google unternehmensprofil',
      'online marketing tipps'
    ]
  });

  // Helper function to get localized content from blog post
  const getLocalizedContent = (post: BlogPost) => ({
    title: post.title[language],
    excerpt: post.excerpt[language],
    category: post.category[language],
    image: post.image,
    date: post.date,
    readTime: post.readTime,
    slug: post.slug
  });

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-primary to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <BookOpen className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            {language === 'de' ? 'MapSuche Blog' : 'MapSuche Blog'}
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            {language === 'de' 
              ? 'Professionelle Tipps und Strategien für lokales SEO, digitales Marketing und Unternehmenswachstum. Bleiben Sie auf dem Laufenden mit den neuesten Trends.'
              : 'Professional tips and strategies for local SEO, digital marketing, and business growth. Stay updated with the latest trends.'
            }
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Article */}
          {featuredPost && (
            <Card className="mb-12 overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <LazyImage
                    src={featuredPost.image}
                    alt={featuredPost.title[language]}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center mb-4">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                      {language === 'de' ? 'Empfohlen' : 'Featured'}
                    </span>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="text-gray-500 text-sm">{featuredPost.category[language]}</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    {featuredPost.title[language]}
                  </h2>
                  <p className="text-gray-600 mb-6">
                    {featuredPost.excerpt[language]}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{new Date(featuredPost.date).toLocaleDateString(language === 'de' ? 'de-DE' : 'en-US')}</span>
                      <Clock className="h-4 w-4 ml-4 mr-2" />
                      <span>{featuredPost.readTime} {language === 'de' ? 'Min' : 'min'}</span>
                    </div>
                    <Link href={`/blog/${featuredPost.slug}`}>
                      <Button className="bg-primary hover:bg-blue-700">
                        {language === 'de' ? 'Weiterlesen' : 'Read More'}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Article Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {publishedPosts.filter(post => !post.featured).map((post) => {
              const localizedPost = getLocalizedContent(post);
              return (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <LazyImage
                    src={localizedPost.image}
                    alt={localizedPost.title}
                    className="w-full h-48 object-cover"
                  />
                  <CardContent className="p-6">
                    <div className="flex items-center mb-3">
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                        {localizedPost.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                      {localizedPost.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {localizedPost.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-500 text-sm">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{new Date(localizedPost.date).toLocaleDateString(language === 'de' ? 'de-DE' : 'en-US')}</span>
                        <Clock className="h-4 w-4 ml-3 mr-1" />
                        <span>{localizedPost.readTime} {language === 'de' ? 'Min' : 'min'}</span>
                      </div>
                      <Link href={`/blog/${localizedPost.slug}`}>
                        <Button variant="ghost" size="sm">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'de' 
              ? 'Bleiben Sie auf dem Laufenden'
              : 'Stay Updated'
            }
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            {language === 'de'
              ? 'Erhalten Sie die neuesten Local SEO Tipps, Marketing-Strategien und Erfolgsgeschichten direkt in Ihr Postfach.'
              : 'Get the latest Local SEO tips, marketing strategies, and success stories delivered straight to your inbox.'
            }
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-accent hover:bg-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
              {language === 'de' ? 'Kostenlose Beratung anfordern' : 'Request Free Consultation'}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
} 