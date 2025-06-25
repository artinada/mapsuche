import { useEffect } from 'react';
import { Route, Switch } from 'wouter';
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LanguageProvider } from '@/hooks/useLanguage';
import { loadFontsOptimized } from '@/lib/cssLoader';
import { initCSPReporting, hstsUtils, coopUtils, clickjackingUtils } from '@/lib/security';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ScrollToTop } from '@/components/ScrollToTop';

// Pages
import HomePage from '@/pages/HomePage';
import ServicesPage from '@/pages/ServicesPage';
import GoogleMapsPage from '@/pages/GoogleMapsPage';
import BusinessProfilePage from '@/pages/BusinessProfilePage';
import WebsitePage from '@/pages/WebsitePage';
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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
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
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <ScrollToTop />
            <main className="flex-1">
              <Switch>
                <Route path="/" component={HomePage} />
                <Route path="/services" component={ServicesPage} />
                <Route path="/services/google-maps" component={GoogleMapsPage} />
                <Route path="/services/business-profile" component={BusinessProfilePage} />
                <Route path="/services/website" component={WebsitePage} />
                <Route path="/blog" component={BlogPage} />
                
                {/* Blog article routes */}
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
  );
}
