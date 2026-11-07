import { useLanguage } from './useLanguage';
import { translateGeo } from '../../../shared/geo-translations';

export function useGeoLanguage() {
  const { language } = useLanguage();
  return { language, locale: language === 'en' ? 'en-GB' : 'de-DE',
    g: (message: string, values?: Record<string, string | number>) => translateGeo(message, language, values),
  };
}
