import { Link } from "wouter";
import { useLanguage } from "@/hooks/useLanguage";
import { useSEO } from "@/hooks/useSEO";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { MapPin, Building2, Globe, Check, ArrowRight, Settings } from "lucide-react";

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
      'business growth solutions',
      'ablauf audit',
      'prozessoptimierung',
      'büroorganisation',
      'dokumentenmanagement'
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
      color: 'text-primary',
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
      color: 'text-secondary',
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
      color: 'text-accent',
      buttonColor: 'bg-accent hover:bg-red-700'
    },
    {
      icon: Settings,
      title: t('ablaufAuditTitle'),
      description: t('ablaufAuditDescription'),
      features: [
        t('betterOverviewTitle'),
        t('secureDocStorageTitle'),
        t('clearTemplatesTitle')
      ],
      href: "/services/ablauf-audit",
      color: 'text-slate-700',
      buttonColor: 'bg-slate-600 hover:bg-slate-700'
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
          <Carousel 
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                    <Card className="bg-white hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200 h-full">
                      <CardContent className="p-8 flex flex-col h-full">
                        <div className="w-16 h-16 flex items-center justify-center mb-6">
                          <IconComponent size={32} className={service.color} />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                          {service.title}
                        </h3>
                        <p className="text-gray-600 mb-6 leading-relaxed flex-grow">
                          {service.description}
                        </p>
                        <ul className="space-y-3 mb-8">
                          {service.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center text-gray-700">
                              <Check className="h-5 w-5 text-secondary mr-3 flex-shrink-0" />
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <Link href={service.href}>
                          <Button className={`w-full text-white ${service.buttonColor} shadow-lg hover:shadow-xl transition-all duration-300 mt-auto`}>
                            {t('learnMore')}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <div className="flex justify-center mt-8 space-x-2">
              <CarouselPrevious className="static" />
              <CarouselNext className="static" />
            </div>
          </Carousel>
        </div>
      </section>



             {/* Service Comparison Section */}
       <section className="py-16 bg-gray-50">
         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-12">
             <h2 className="text-3xl font-bold text-gray-900 mb-6">
               {t('whyChooseServices')}
             </h2>
             <p className="text-lg text-gray-600">
               {t('whyChooseServicesDesc')}
             </p>
           </div>
           
           <div className="grid md:grid-cols-2 gap-8">
             <div>
               <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('whatMakesUsDifferent')}</h3>
               <div className="space-y-4">
                 <div className="flex items-start space-x-3">
                   <Check className="h-5 w-5 text-green-500 mt-1" />
                   <div>
                     <p className="font-semibold text-gray-900">{t('localMarketExpertise')}</p>
                     <p className="text-gray-600">{t('localMarketExpertiseDesc')}</p>
                   </div>
                 </div>
                 <div className="flex items-start space-x-3">
                   <Check className="h-5 w-5 text-green-500 mt-1" />
                   <div>
                     <p className="font-semibold text-gray-900">{t('smallBusinessFocus')}</p>
                     <p className="text-gray-600">{t('smallBusinessFocusDesc')}</p>
                   </div>
                 </div>
                 <div className="flex items-start space-x-3">
                   <Check className="h-5 w-5 text-green-500 mt-1" />
                   <div>
                     <p className="font-semibold text-gray-900">{t('personalService')}</p>
                     <p className="text-gray-600">{t('personalServiceDesc')}</p>
                   </div>
                 </div>
               </div>
             </div>
             <div>
               <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('industriesWeSpecialize')}</h3>
               <div className="grid grid-cols-2 gap-3">
                 <div className="bg-white p-3 rounded-lg text-center">
                   <p className="text-sm font-medium">{t('industry1')}</p>
                 </div>
                 <div className="bg-white p-3 rounded-lg text-center">
                   <p className="text-sm font-medium">{t('industry2')}</p>
                 </div>
                 <div className="bg-white p-3 rounded-lg text-center">
                   <p className="text-sm font-medium">{t('industry3')}</p>
                 </div>
                 <div className="bg-white p-3 rounded-lg text-center">
                   <p className="text-sm font-medium">{t('industry4')}</p>
                 </div>
                 <div className="bg-white p-3 rounded-lg text-center">
                   <p className="text-sm font-medium">{t('industry5')}</p>
                 </div>
                 <div className="bg-white p-3 rounded-lg text-center">
                   <p className="text-sm font-medium">{t('industry6')}</p>
                 </div>
               </div>
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