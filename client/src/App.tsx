import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import HomePage from "@/pages/HomePage";
import GoogleMapsPage from "@/pages/GoogleMapsPage";
import BusinessProfilePage from "@/pages/BusinessProfilePage";
import WebsitePage from "@/pages/WebsitePage";
import ContactPage from "@/pages/ContactPage";
import ImpressumPage from "@/pages/ImpressumPage";
import PrivacyPage from "@/pages/PrivacyPage";
import TermsPage from "@/pages/TermsPage";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/services" component={HomePage} />
          <Route path="/services/google-maps" component={GoogleMapsPage} />
          <Route path="/services/business-profile" component={BusinessProfilePage} />
          <Route path="/services/website" component={WebsitePage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/impressum" component={ImpressumPage} />
          <Route path="/privacy" component={PrivacyPage} />
          <Route path="/terms" component={TermsPage} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
