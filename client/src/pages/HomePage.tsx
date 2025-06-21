import { Link } from 'wouter';
import { MapPin, Globe, Star, ArrowRight, Check, Users, Clock, DollarSign } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function HomePage() {
  const { t } = useLanguage();

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
      color: 'bg-primary/10 text-primary',
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
      color: 'bg-secondary/10 text-secondary',
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
      color: 'bg-accent/10 text-accent',
      buttonColor: 'bg-accent hover:bg-red-700',
      href: '/services/website'
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
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
                alt="Local business growth concept"
                className="rounded-xl shadow-2xl w-full max-w-md"
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

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card key={index} className="bg-gray-50 hover:shadow-lg transition-shadow border border-gray-100">
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 rounded-lg flex items-center justify-center mb-6 ${service.color}`}>
                      <IconComponent size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {service.description}
                    </p>
                    <ul className="space-y-2 mb-8">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-gray-700">
                          <Check className="h-5 w-5 text-secondary mr-3" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href={service.href}>
                      <Button className={`w-full text-white ${service.buttonColor}`}>
                        {t('learnMore')}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
                alt="Small business team collaboration"
                className="rounded-xl shadow-lg w-full"
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

      {/* SEO Content Section */}
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

      {/* CTA */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('ctaTitle')}</h2>
          <p className="text-gray-600 mb-8">{t('ctaDescription')}</p>
          <Link href="/contact">
            <Button size="lg" className="bg-primary hover:bg-blue-700 text-white">
              {t('freeConsultation')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
