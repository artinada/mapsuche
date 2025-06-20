import { ArrowRight, Check, MapPin } from 'lucide-react';
import { Link } from 'wouter';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function GoogleMapsPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="bg-primary/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <MapPin className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {t('googleMapsTitle')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('googleMapsDescription')}
          </p>
        </div>

        {/* Features */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What's Included</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-secondary mr-3" />
                  <span className="text-gray-700">{t('businessLocationSetup')}</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-secondary mr-3" />
                  <span className="text-gray-700">{t('categoryOptimization')}</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-secondary mr-3" />
                  <span className="text-gray-700">{t('localSeoEnhancement')}</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-secondary mr-3" />
                  <span className="text-gray-700">Business hours setup</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-secondary mr-3" />
                  <span className="text-gray-700">Contact information optimization</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-secondary mr-3" />
                  <span className="text-gray-700">Service area configuration</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Process */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Process</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0 font-semibold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Business Analysis</h3>
                  <p className="text-gray-600">We analyze your business location, competitors, and target market to optimize your listing strategy.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0 font-semibold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Listing Creation</h3>
                  <p className="text-gray-600">We create and optimize your Google Maps listing with accurate business information and relevant categories.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0 font-semibold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Verification & Launch</h3>
                  <p className="text-gray-600">We handle the verification process and ensure your business is live and visible to local customers.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Found on Google Maps?</h2>
          <p className="text-gray-600 mb-8">Let's get your business visible to local customers searching for your services.</p>
          <Link href="/contact">
            <Button size="lg" className="bg-primary hover:bg-blue-700 text-white">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
