import { Link } from "wouter";
import { useLanguage } from "@/hooks/useLanguage";
import { useSEO } from "@/hooks/useSEO";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, FileText, Calendar, Shield, Users, Target, Clock, Settings } from "lucide-react";

export default function AblaufAuditPage() {
  const { t } = useLanguage();

  // SEO optimization for Ablauf-Audit page
  useSEO({ 
    page: 'ablaufAudit',
    customKeywords: [
      'ablauf audit',
      'prozessoptimierung',
      'dokumentenorganisation',
      'dsgvo konforme ablage',
      'terminverwaltung',
      'geschäftsprozesse',
      'büroorganisation'
    ]
  });

  const benefits = [
    {
      icon: Calendar,
      title: t('betterOverviewTitle'),
      description: t('betterOverviewDesc')
    },
    {
      icon: Shield,
      title: t('secureDocStorageTitle'),
      description: t('secureDocStorageDesc')
    },
    {
      icon: FileText,
      title: t('clearTemplatesTitle'),
      description: t('clearTemplatesDesc')
    }
  ];

  const features = [
    t('individualProcessAnalysis'),
    t('discreteAdvising'),
    t('tailoredSolutions'),
    t('practicalImplementation'),
    t('sustainableImprovement'),
    t('continuousSupport')
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-primary to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Settings className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            {t('ablaufAuditTitle')}
          </h1>
          <p className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
            {t('ablaufAuditSubtitle')}
          </p>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {t('knowThisSituation')}
              </h2>
              <div className="space-y-4 text-gray-700">
                <div className="flex items-start space-x-3">
                  <Target className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <p>{t('searchImportantFile')}</p>
                </div>
                <div className="flex items-start space-x-3">
                  <Target className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <p>{t('customerMissingLink')}</p>
                </div>
                <div className="flex items-start space-x-3">
                  <Target className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <p>{t('paperChaosDesk')}</p>
                </div>
                <div className="flex items-start space-x-3">
                  <Target className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <p>{t('forgottenAppointments')}</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-8">
              <div className="text-center">
                <Clock className="h-16 w-16 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {t('timeIsMoney')}
                </h3>
                <p className="text-gray-600">
                  {t('timeIsMoneyDesc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {t('professionalStructuralSupport')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('professionalStructuralSupportDesc')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <Card key={index} className="bg-white hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {t('whatToExpect')}
              </h2>
              <p className="text-gray-600 mb-8">
                {t('whatToExpectDesc')}
              </p>
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <Check className="h-5 w-5 text-secondary mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/5 to-blue-50 rounded-lg p-8">
              <div className="text-center">
                <Users className="h-16 w-16 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {t('discreteUnderstandable')}
                </h3>
                <p className="text-gray-600 mb-6">
                  {t('discreteUnderstandableDesc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Motto & CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">
              {t('ablaufAuditMotto')}
            </h2>
          </div>
          <p className="text-blue-100 mb-8 text-lg">
            {t('contactForStructuralHelp')}
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-accent hover:bg-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
              {t('contactNow')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
} 