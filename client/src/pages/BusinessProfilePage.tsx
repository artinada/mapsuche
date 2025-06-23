import { ArrowRight, Check, Star } from 'lucide-react';
import { Link } from 'wouter';
import { useLanguage } from '@/hooks/useLanguage';
import { useSEO } from '@/hooks/useSEO';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function BusinessProfilePage() {
  const { t } = useLanguage();

  // SEO optimization for Business Profile page
  useSEO({ 
    page: 'businessProfile',
    customKeywords: [
      'google my business management',
      'business profile verification',
      'local business reputation',
      'customer review management',
      'business listing services',
      'professional business profile'
    ]
  });

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="bg-secondary/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Star className="h-10 w-10 text-secondary" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {t('businessProfileTitle')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('businessProfileDescription')}
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
                  <span className="text-gray-700">{t('profileCreationVerification')}</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-secondary mr-3" />
                  <span className="text-gray-700">{t('photoOptimization')}</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-secondary mr-3" />
                  <span className="text-gray-700">{t('reviewManagement')}</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-secondary mr-3" />
                  <span className="text-gray-700">Business description optimization</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-secondary mr-3" />
                  <span className="text-gray-700">Service/product listings</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-secondary mr-3" />
                  <span className="text-gray-700">Q&A management</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Benefits */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Your Business Needs This</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Increased Visibility</h3>
                <p className="text-gray-600 mb-4">A complete Google Business Profile makes your business 2.7x more likely to be considered reputable by customers.</p>
                
                <h3 className="font-semibold text-gray-900 mb-3">Customer Trust</h3>
                <p className="text-gray-600">Professional photos and complete information build trust before customers even visit your business.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Direct Customer Communication</h3>
                <p className="text-gray-600 mb-4">Customers can message you directly, call, or get directions with just one click.</p>
                
                <h3 className="font-semibold text-gray-900 mb-3">Insights & Analytics</h3>
                <p className="text-gray-600">Track how customers find and interact with your business online.</p>
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
                <div className="bg-secondary text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0 font-semibold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Profile Setup</h3>
                  <p className="text-gray-600">We create your complete Google Business Profile with all necessary business information and verification.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-secondary text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0 font-semibold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Content Optimization</h3>
                  <p className="text-gray-600">We optimize your business description, add professional photos, and set up your services or products.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-secondary text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0 font-semibold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Ongoing Management</h3>
                  <p className="text-gray-600">We help you manage reviews, update information, and maintain an active, engaging profile.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Build Trust with Customers?</h2>
          <p className="text-gray-600 mb-8">Let's create a professional Google Business Profile that attracts and converts local customers.</p>
          <Link href="/contact">
            <Button size="lg" className="bg-secondary hover:bg-green-700 text-white">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
