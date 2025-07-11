import { Link } from 'wouter';
import { MapPin, Globe, Star, ArrowRight, Check, Users, Clock, DollarSign, Settings } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { useSEO } from '@/hooks/useSEO';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import LazyImage from '@/components/LazyImage';

export default function HomePage() {
  const { t } = useLanguage();

  // SEO optimization for homepage
  useSEO({ 
    page: 'home',
    customKeywords: [
      'local business growth',
      'small business marketing',
      'google visibility',
      'digital presence',
      'online marketing germany',
      'ablauf audit',
      'geschäftsprozesse',
      'büroorganisation'
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
      color: 'text-primary',
      buttonColor: 'bg-primary hover:bg-blue-700',
      href: '/services/google-maps'
    },
    {
      icon: Star,
      title: t('businessProfileTitle'),
      description: t('businessProfileDescription'),
      features: [
        t('profileCreationVerification'),
        t('photoOptimization'),
        t('reviewManagement')
      ],
      color: 'text-secondary',
      buttonColor: 'bg-secondary hover:bg-green-700',
      href: '/services/business-profile'
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
      color: 'text-accent',
      buttonColor: 'bg-accent hover:bg-red-700',
      href: '/services/website'
    },
    {
      icon: Settings,
      title: t('ablaufAuditTitle'),
      description: t('ablaufAuditSubtitle'),
      features: [
        t('betterOverviewTitle'),
        t('secureDocStorageTitle'),
        t('clearTemplatesTitle')
      ],
      color: 'text-slate-700',
      buttonColor: 'bg-slate-600 hover:bg-slate-700',
      href: '/services/ablauf-audit'
    }
  ];

  const whyChooseFeatures = [
    {
      icon: Users,
      title: t('localExpertise'),
      description: t('localExpertiseDesc'),
      color: 'bg-primary/10 text-primary'
    },
    {
      icon: Clock,
      title: t('quickResults'),
      description: t('quickResultsDesc'),
      color: 'bg-secondary/10 text-secondary'
    },
    {
      icon: DollarSign,
      title: t('affordableSolutions'),
      description: t('affordableSolutionsDesc'),
      color: 'bg-accent/10 text-accent'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                {t('heroTitle')}
              </h2>
              <p className="text-xl mb-8 text-blue-100">
                {t('heroSubtitle')}
              </p>
              <Link href="/contact">
                <Button size="lg" className="bg-accent hover:bg-red-700 text-white shadow-lg">
                  {t('getStartedToday')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="lg:flex justify-center">
              <LazyImage
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop"
                alt="Small business owner working on laptop in cozy cafe setting"
                className="rounded-xl shadow-2xl w-full max-w-md"
                width={400}
                height={300}
                priority={true}
                quality={80}
                sizes="(max-width: 768px) 100vw, 400px"
                placeholder="blur"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t('ourServices')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('servicesSubtitle')}
            </p>
          </div>

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
                    <Card className="bg-gray-50 hover:shadow-lg transition-shadow border border-gray-100 h-full">
                      <CardContent className="p-8 flex flex-col h-full">
                        <div className="w-16 h-16 flex items-center justify-center mb-6">
                          <IconComponent size={32} className={service.color} />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                          {service.title}
                        </h3>
                        <p className="text-gray-600 mb-6 flex-grow">
                          {service.description}
                        </p>
                        <ul className="space-y-2 mb-8">
                          {service.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center text-gray-700">
                              <Check className="h-5 w-5 text-secondary mr-3 flex-shrink-0" />
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <Link href={service.href}>
                          <Button className={`w-full text-white ${service.buttonColor} mt-auto`}>
                            {t('learnMore')}
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

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <LazyImage
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop"
                alt="Small business owners collaborating over coffee in casual meeting"
                className="rounded-xl shadow-lg w-full"
                width={600}
                height={400}
                quality={75}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                placeholder="blur"
              />
            </div>
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                {t('whyChooseTitle')}
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                {t('whyChooseSubtitle')}
              </p>
              
              <div className="space-y-6">
                {whyChooseFeatures.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <div key={index} className="flex items-start">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 ${feature.color}`}>
                        <IconComponent size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Preview Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {t('faqTitle')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('faqSubtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-gray-50 border-l-4 border-l-primary hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {t('faqQuestion1')}
                </h3>
                <p className="text-gray-600 mb-4">
                  {t('faqAnswer1')}
                </p>
                <div className="text-sm text-primary font-medium">
                  {t('faqCheckmark1')}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-50 border-l-4 border-l-secondary hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {t('faqQuestion2')}
                </h3>
                <p className="text-gray-600 mb-4">
                  {t('faqAnswer2')}
                </p>
                <div className="text-sm text-secondary font-medium">
                  {t('faqCheckmark2')}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-50 border-l-4 border-l-accent hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {t('faqQuestion3')}
                </h3>
                <p className="text-gray-600 mb-4">
                  {t('faqAnswer3')}
                </p>
                <div className="text-sm text-accent font-medium">
                  {t('faqCheckmark3')}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-50 border-l-4 border-l-slate-600 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {t('faqQuestion4')}
                </h3>
                <p className="text-gray-600 mb-4">
                  {t('faqAnswer4')}
                </p>
                <div className="text-sm text-slate-600 font-medium">
                  {t('faqCheckmark4')}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Link href="/faq">
              <Button variant="outline" className="mr-4">
                {t('viewAllFaqs')}
              </Button>
            </Link>
            <Link href="/contact">
              <Button className="bg-primary hover:bg-blue-700">
                {t('getFreeConsultation')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How We Help Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {t('howWeHelpTitle')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('howWeHelpSubtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{t('howWeHelpStep1Title')}</h3>
              <p className="text-gray-600">{t('howWeHelpStep1Desc')}</p>
            </div>
            <div className="text-center">
              <div className="bg-secondary text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{t('howWeHelpStep2Title')}</h3>
              <p className="text-gray-600">{t('howWeHelpStep2Desc')}</p>
            </div>
            <div className="text-center">
              <div className="bg-accent text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{t('howWeHelpStep3Title')}</h3>
              <p className="text-gray-600">{t('howWeHelpStep3Desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-primary to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">{t('ctaTitle')}</h2>
          <p className="text-blue-100 mb-8 text-lg">{t('ctaDescription')}</p>
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
