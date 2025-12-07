import { useQuery } from '@tanstack/react-query';
import seoData from '../data/seo.json';

const API_BASE = import.meta.env.VITE_API_URL || 'http://192.168.110.73:3000';
const SITE_SLUG = seoData.site.slug;

export const useSiteInfo = () => {
  // Récupérer les infos depuis l'API
  const { data: apiData, isLoading, isFetched } = useQuery({
    queryKey: ['siteInfo', SITE_SLUG],
    queryFn: async () => {
      const url = `${API_BASE}/api/public/sites/${SITE_SLUG}`;
      console.log('Fetching Site Info:', url);
      
      try {
        const response = await fetch(url);
        if (!response.ok) {
            const text = await response.text();
            console.error('Site Info Fetch Error:', response.status, text);
            throw new Error('Failed to fetch site info');
        }
        const json = await response.json();
        console.log('Site Info Success:', json);
        return json.data;
      } catch (err) {
        console.error('Fetch Exception:', err);
        throw err;
      }
    },
    staleTime: 1000 * 60 * 60, // 1 heure
    cacheTime: 1000 * 60 * 10, // 10 minutes
  });

  // Fusionner les données de l'API avec les données statiques (fallback)
  const siteData = {
    ...seoData.site,
    ...seoData.global,
    ...apiData, // Les données de l'API écrasent les données statiques
    _isLoading: isLoading,
    _isFetched: isFetched,
  };
  
  return siteData;
};
