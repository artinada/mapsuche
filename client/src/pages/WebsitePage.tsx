import { ArrowRight, Check, Globe } from 'lucide-react';
import { Link } from 'wouter';
import { useLanguage } from '@/hooks/useLanguage';
import { useSEO } from '@/hooks/useSEO';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function WebsitePage() {
  const { t } = useLanguage();

  // SEO optimization for Website page
  useSEO({ 
    page: 'website',
    customKeywords: [
      'responsive web design',
      'seo friendly websites',
      'mobile first design',
      'local business websites',
      'conversion optimization',
      'professional web development'
    ]
  });

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-primary to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Globe className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            {t('websiteTitle')}
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            {t('websiteDescription')}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Features */}
          <Card className="mb-12">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('whatsIncluded')}</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Check className="h-5 w-5 text-secondary mr-3" />
                    <span className="text-gray-700">{t('responsiveDesign')}</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-5 w-5 text-secondary mr-3" />
                    <span className="text-gray-700">{t('easyContentManagement')}</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-5 w-5 text-secondary mr-3" />
                    <span className="text-gray-700">{t('seoOptimization')}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Check className="h-5 w-5 text-secondary mr-3" />
                    <span className="text-gray-700">{t('contactFormsLeadCapture')}</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-5 w-5 text-secondary mr-3" />
                    <span className="text-gray-700">{t('socialMediaIntegration')}</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-5 w-5 text-secondary mr-3" />
                    <span className="text-gray-700">{t('googleAnalyticsSetup')}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Website Types */}
          <Card className="mb-12">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('perfectFor')}</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Globe className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{t('serviceBusinesses')}</h3>
                  <p className="text-gray-600 text-sm">{t('serviceBusinessesDesc')}</p>
                </div>
                <div className="text-center">
                  <div className="bg-secondary/10 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Globe className="h-8 w-8 text-secondary" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{t('retailStores')}</h3>
                  <p className="text-gray-600 text-sm">{t('retailStoresDesc')}</p>
                </div>
                <div className="text-center">
                  <div className="bg-accent/10 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Globe className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{t('professionalServices')}</h3>
                  <p className="text-gray-600 text-sm">{t('professionalServicesDesc')}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Process */}
          <Card className="mb-12">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('ourProcess')}</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-accent text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0 font-semibold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{t('discoveryPlanning')}</h3>
                    <p className="text-gray-600">{t('discoveryPlanningDesc')}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-accent text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0 font-semibold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{t('designDevelopment')}</h3>
                    <p className="text-gray-600">{t('designDevelopmentDesc')}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-accent text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0 font-semibold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{t('launchTraining')}</h3>
                    <p className="text-gray-600">{t('launchTrainingDesc')}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">{t('readyProfessionalWebsite')}</h2>
          <p className="text-blue-100 mb-8 text-lg">{t('websiteCtaDesc')}</p>
          <Link href="/contact">
            <Button size="lg" className="bg-accent hover:bg-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
              {t('getStarted')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
