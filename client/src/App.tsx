import { useEffect } from 'react';
import { Route, Switch } from 'wouter';
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LanguageProvider } from '@/hooks/useLanguage';
import { loadFontsOptimized, loadCSSDeferred } from '@/lib/cssLoader';
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
    
    // Load non-critical CSS after initial render
    loadCSSDeferred('/src/styles/deferred.css');
    
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
