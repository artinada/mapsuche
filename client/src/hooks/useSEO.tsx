import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useLanguage } from './useLanguage';
import { updatePageSEO } from '@/lib/utils';
import { getPageSeo } from '../../../shared/seo';

// One route-level owner prevents missing or competing page metadata.
export function useSEO() {
  const { language } = useLanguage();
  const [location] = useLocation();
  useEffect(() => {
    updatePageSEO(getPageSeo(location, language));
  }, [location, language]);
}

export function RouteSEO() {
  useSEO();
  return null;
}
