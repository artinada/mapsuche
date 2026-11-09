import { useEffect } from 'react';
import { Route, Router, Switch, useLocation } from 'wouter';
import { splitLocale, localizedPath, legacyAliases } from '../../shared/locales.mjs';
import { getPageSeo } from '../../shared/seo';
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LanguageProvider } from '@/hooks/useLanguage';
import { loadFontsOptimized } from '@/lib/cssLoader';
import { initCSPReporting, hstsUtils, coopUtils, clickjackingUtils } from '@/lib/security';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ScrollToTop } from '@/components/ScrollToTop';
import { RouteSEO } from '@/hooks/useSEO';

// Pages
import HomePage from '@/pages/HomePage';
import GeoCheckPage from '@/pages/GeoCheckPage';
import GeoResultsPage from '@/pages/GeoResultsPage';
import GeoDashboardPage from '@/pages/GeoDashboardPage';
import GeoOptimizationPage from '@/pages/GeoOptimizationPage';
import ServicesPage from '@/pages/ServicesPage';
import GoogleMapsPage from '@/pages/GoogleMapsPage';
import BusinessProfilePage from '@/pages/BusinessProfilePage';
import WebsitePage from '@/pages/WebsitePage';
import AblaufAuditPage from '@/pages/AblaufAuditPage';
import ContactPage from '@/pages/ContactPage';
import FAQPage from '@/pages/FAQPage';
import PrivacyPage from '@/pages/PrivacyPage';
import TermsPage from '@/pages/TermsPage';
import ImpressumPage from '@/pages/ImpressumPage';
import NotFound from '@/pages/not-found';

// Blog Pages
import BlogPage from '@/pages/BlogPage';
// Import blog articles directly
import WieFindetManGuteFirmen from '@/pages/blog/WieFindetManGuteFirmen';
import GoogleEintragWichtigkeit from '@/pages/blog/GoogleEintragWichtigkeit';
import TopRestaurantsWittenberg from '@/pages/blog/TopRestaurantsWittenberg';
import HaeufigsteFehlerUnternehmenInternet from '@/pages/blog/HaeufigsteFehlerUnternehmenInternet';
import OnlineSichtbarkeitTipps from '@/pages/blog/OnlineSichtbarkeitTipps';
import MobileFirstLokaleUnternehmen from '@/pages/blog/MobileFirstLokaleUnternehmen';
import GoogleBewertungenRichtigManagen from '@/pages/blog/GoogleBewertungenRichtigManagen';
import LocalSeoGrundlagenKleineUnternehmen from '@/pages/blog/LocalSeoGrundlagenKleineUnternehmen';
import WieWirdMeinUnternehmenBeiChatGPTGefunden from '@/pages/blog/WieWirdMeinUnternehmenBeiChatGPTGefunden';
import WasIstGeo from '@/pages/blog/WasIstGeo';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  const [pathname, navigate] = useLocation();
  const locale = splitLocale(pathname);
  useEffect(() => {
    const target = legacyAliases[locale.pathname] || locale.pathname;
    if (getPageSeo(target, locale.language).found) {
      const canonical = localizedPath(target, locale.language);
      if (canonical !== pathname) navigate(canonical + window.location.search + window.location.hash, { replace: true });
    }
  }, [pathname, navigate, locale.pathname, locale.language]);
  useEffect(() => {
    // Load fonts optimized for performance
    loadFontsOptimized();
    
    // Initialize CSP violation reporting
    initCSPReporting();
    
    // Initialize HSTS monitoring
    hstsUtils.monitorHSTS();
    
    // Initialize COOP monitoring
    coopUtils.monitorCOOP();
    
    // Initialize clickjacking protection monitoring
    clickjackingUtils.monitorClickjacking();
  }, []);

  return (
    <Router base={locale.prefix}>
    <QueryClientProvider client={queryClient}>
      <LanguageProvider language={locale.language}>
        <TooltipProvider>
          <div className="min-h-screen flex flex-col">
            <RouteSEO />
            <Header />
            <ScrollToTop />
            <main className="flex-1">
              <Switch>
                <Route path="/" component={HomePage} />
                <Route path="/geo-check/results" component={GeoResultsPage} />
                <Route path="/geo-check" component={GeoCheckPage} />
                <Route path="/geo/dashboard" component={GeoDashboardPage} />
                <Route path="/geo-optimierung" component={GeoOptimizationPage} />
                <Route path="/services" component={ServicesPage} />
                <Route path="/services/google-maps" component={GoogleMapsPage} />
                <Route path="/services/business-profile" component={BusinessProfilePage} />
                <Route path="/services/website" component={WebsitePage} />
                <Route path="/services/ablauf-audit" component={AblaufAuditPage} />
                <Route path="/blog" component={BlogPage} />
                
                {/* Blog article routes */}
                <Route path="/blog/wie-wird-mein-unternehmen-bei-chatgpt-gefunden" component={WieWirdMeinUnternehmenBeiChatGPTGefunden} />
                <Route path="/blog/was-ist-geo" component={WasIstGeo} />
                <Route path="/blog/wie-findet-man-gute-firmen-in-der-naehe" component={WieFindetManGuteFirmen} />
                <Route path="/blog/warum-ist-ein-google-eintrag-wichtig" component={GoogleEintragWichtigkeit} />
                <Route path="/blog/top-5-restaurants-lutherstadt-wittenberg" component={TopRestaurantsWittenberg} />
                <Route path="/blog/haeufigste-fehler-unternehmen-internet" component={HaeufigsteFehlerUnternehmenInternet} />
                <Route path="/blog/online-sichtbarkeit-tipps-lokale-unternehmen" component={OnlineSichtbarkeitTipps} />
                <Route path="/blog/mobile-first-lokale-unternehmen" component={MobileFirstLokaleUnternehmen} />
                <Route path="/blog/google-bewertungen-richtig-managen" component={GoogleBewertungenRichtigManagen} />
                <Route path="/blog/local-seo-grundlagen-kleine-unternehmen" component={LocalSeoGrundlagenKleineUnternehmen} />
                
                <Route path="/contact" component={ContactPage} />
                <Route path="/faq" component={FAQPage} />
                <Route path="/privacy" component={PrivacyPage} />
                <Route path="/terms" component={TermsPage} />
                <Route path="/impressum" component={ImpressumPage} />
                <Route component={NotFound} />
              </Switch>
            </main>
            <Footer />
            <Toaster />
          </div>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
    </Router>
  );
}
