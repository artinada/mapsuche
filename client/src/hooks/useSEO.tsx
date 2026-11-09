import { useEffect, useMemo } from 'react';
import { useLocation } from 'wouter';
import { useLanguage } from './useLanguage';
import { updatePageSEO } from '@/lib/utils';
import { getPageSeo } from '../../../shared/seo';

// One route-level owner prevents missing or competing page metadata.
// The shared catalog covers geoCheck, geoOptimization and Google Maps in DE/EN,
// including the Service JSON-LD also written into the prerendered HTML.
export function useSEO() {
  const { language } = useLanguage();
  const [location] = useLocation();
  const seo = useMemo(() => getPageSeo(location, language), [location, language]);
  useEffect(() => {
    updatePageSEO(seo);
  }, [seo]);
  return seo;
}

export function RouteSEO() {
  useSEO();
  return null;
}
