import { Link } from 'wouter';
import { MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <MapPin className="h-8 w-8 text-primary mr-3" />
              <h3 className="text-2xl font-bold">MapSuche</h3>
            </div>
            <p className="text-gray-300 mb-6">
              {t('footerDescription')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">{t('services')}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/services/google-maps" className="text-gray-300 hover:text-white transition-colors">
                  {t('googleMapsListing')}
                </Link>
              </li>
              <li>
                <Link href="/services/business-profile" className="text-gray-300 hover:text-white transition-colors">
                  {t('businessProfileSetup')}
                </Link>
              </li>
              <li>
                <Link href="/services/website" className="text-gray-300 hover:text-white transition-colors">
                  {t('websiteDevelopment')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">{t('legal')}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">
                  {t('privacyPolicy')}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-white transition-colors">
                  {t('termsOfUse')}
                </Link>
              </li>
              <li>
                <Link href="/impressum" className="text-gray-300 hover:text-white transition-colors">
                  {t('impressum')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">{t('allRightsReserved')}</p>
        </div>
      </div>
    </footer>
  );
}
