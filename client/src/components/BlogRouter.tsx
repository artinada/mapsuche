import { lazy, Suspense } from 'react';
import { Route } from 'wouter';
import { getPublishedPosts } from '@/lib/blogConfig';

// Lazy load blog components
const WieFindetManGuteFirmen = lazy(() => import('@/pages/blog/WieFindetManGuteFirmen'));
const GoogleEintragWichtigkeit = lazy(() => import('@/pages/blog/GoogleEintragWichtigkeit'));
const TopRestaurantsWittenberg = lazy(() => import('@/pages/blog/TopRestaurantsWittenberg'));
const HaeufigsteFehlerUnternehmenInternet = lazy(() => import('@/pages/blog/HaeufigsteFehlerUnternehmenInternet'));
const OnlineSichtbarkeitTipps = lazy(() => import('@/pages/blog/OnlineSichtbarkeitTipps'));
const MobileFirstLokaleUnternehmen = lazy(() => import('@/pages/blog/MobileFirstLokaleUnternehmen'));

// Component mapping - add new articles here when implemented
const componentMapping: Record<string, React.ComponentType> = {
  'wie-findet-man-gute-firmen-in-der-naehe': WieFindetManGuteFirmen,
  'warum-ist-ein-google-eintrag-wichtig': GoogleEintragWichtigkeit,
  'top-5-restaurants-lutherstadt-wittenberg': TopRestaurantsWittenberg,
  'haeufigste-fehler-unternehmen-internet': HaeufigsteFehlerUnternehmenInternet,
  'online-sichtbarkeit-tipps-lokale-unternehmen': OnlineSichtbarkeitTipps,
  'mobile-first-lokale-unternehmen-optimierung': MobileFirstLokaleUnternehmen,
  // Add new articles here:
  // 'local-seo-grundlagen-kleine-unternehmen': LocalSEOGrundlagen,
  // 'google-bewertungen-richtig-managen': GoogleBewertungenManagement,
  // 'mobile-first-lokale-unternehmen': MobileFirstLokaleBusiness,
};

// Loading component
const BlogLoading = () => (
  <div className="min-h-screen py-20">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
        <div className="h-12 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-6 bg-gray-200 rounded w-1/2 mb-8"></div>
        <div className="h-64 bg-gray-200 rounded mb-8"></div>
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    </div>
  </div>
);

export const BlogRouter = () => {
  const publishedPosts = getPublishedPosts();

  return (
    <>
      {publishedPosts.map((post) => {
        const Component = componentMapping[post.slug];
        
        if (!Component) {
          // Article is published but component not yet implemented
          return (
            <Route key={post.id} path={`/blog/${post.slug}`}>
              <div className="min-h-screen py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Coming Soon
                  </h1>
                  <p className="text-gray-600 mb-8">
                    This article is currently being prepared. Please check back soon!
                  </p>
                  <a 
                    href="/blog" 
                    className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Back to Blog
                  </a>
                </div>
              </div>
            </Route>
          );
        }

        return (
          <Route key={post.id} path={`/blog/${post.slug}`}>
            <Suspense fallback={<BlogLoading />}>
              <Component />
            </Suspense>
          </Route>
        );
      })}
    </>
  );
}; 