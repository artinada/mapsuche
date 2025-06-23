import { Link } from "wouter";
import { useLanguage } from "@/hooks/useLanguage";
import { useSEO } from "@/hooks/useSEO";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Building2, Globe, Check, ArrowRight } from "lucide-react";

export default function ServicesPage() {
  const { t } = useLanguage();

  // SEO optimization for services page
  useSEO({ 
    page: 'services',
    customKeywords: [
      'comprehensive digital marketing',
      'local business solutions',
      'seo service packages',
      'professional marketing services',
      'business growth solutions'
    ]
  });

  const services = [
    {
      icon: MapPin,
      title: t('googleMapsTitle'),
      description: t('googleMapsDescription'),
      features: [
        t('businessLocationSetup'),
        t('categoryOptimization'),
        t('localSeoEnhancement')
      ],
      href: "/services/google-maps",
      color: 'bg-primary/10 text-primary',
      buttonColor: 'bg-primary hover:bg-blue-700'
    },
    {
      icon: Building2,
      title: t('businessProfileTitle'),
      description: t('businessProfileDescription'),
      features: [
        t('profileCreationVerification'),
        t('photoOptimization'),
        t('reviewManagement')
      ],
      href: "/services/business-profile",
      color: 'bg-secondary/10 text-secondary',
      buttonColor: 'bg-secondary hover:bg-green-700'
    },
    {
      icon: Globe,
      title: t('websiteTitle'),
      description: t('websiteDescription'),
      features: [
        t('responsiveDesign'),
        t('easyContentManagement'),
        t('seoOptimization')
      ],
      href: "/services/website",
      color: 'bg-accent/10 text-accent',
      buttonColor: 'bg-accent hover:bg-red-700'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-primary to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            {t('ourServices')}
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            {t('servicesSubtitle')}
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card key={index} className="bg-white hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200">
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 rounded-lg flex items-center justify-center mb-6 ${service.color}`}>
                      <IconComponent size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-gray-700">
                          <Check className="h-5 w-5 text-secondary mr-3 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href={service.href}>
                      <Button className={`w-full text-white ${service.buttonColor} shadow-lg hover:shadow-xl transition-all duration-300`}>
                        {t('learnMore')}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Process Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {t('seoSectionTitle')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('seoSectionDescription')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('localSearchServicesTitle')}</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• {t('localSearchService1')}</li>
                <li>• {t('localSearchService2')}</li>
                <li>• {t('localSearchService3')}</li>
                <li>• {t('localSearchService4')}</li>
                <li>• {t('localSearchService5')}</li>
                <li>• {t('localSearchService6')}</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('industriesWeServeTitle')}</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• {t('industry1')}</li>
                <li>• {t('industry2')}</li>
                <li>• {t('industry3')}</li>
                <li>• {t('industry4')}</li>
                <li>• {t('industry5')}</li>
                <li>• {t('industry6')}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">{t('ctaTitle')}</h2>
          <p className="text-blue-100 mb-8 text-lg">
            {t('ctaDescription')}
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-accent hover:bg-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
              {t('freeConsultation')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
} 