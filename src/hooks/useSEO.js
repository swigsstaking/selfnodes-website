import { useQuery } from '@tanstack/react-query';
import seoData from '../data/seo.json';

const API_BASE = import.meta.env.VITE_API_URL || 'http://192.168.110.73:3000';
const SITE_SLUG = seoData.site.slug;

export const useSEO = (page = 'home') => {
  // Récupérer le SEO depuis l'API
  const { data: apiSEO } = useQuery({
    queryKey: ['seo', SITE_SLUG, page],
    queryFn: async () => {
      try {
        // D'abord récupérer le siteId
        const siteResponse = await fetch(`${API_BASE}/api/public/sites/${SITE_SLUG}`);
        if (!siteResponse.ok) throw new Error('Site not found');
        const siteData = await siteResponse.json();
        const siteId = siteData.data._id;
        
        // Ensuite récupérer le SEO pour cette page
        const seoResponse = await fetch(`${API_BASE}/api/public/seo?siteId=${siteId}&page=${page}`);
        if (!seoResponse.ok) return null;
        const seoData = await seoResponse.json();
        return seoData.data;
      } catch (err) {
        console.error('SEO fetch error:', err);
        return null;
      }
    },
    staleTime: 1000 * 60 * 60, // 1 heure
  });

  // Fallback sur les données statiques si l'API ne retourne rien
  const staticSEO = seoData.pages[page] || seoData.pages.home;
  
  if (apiSEO) {
    return {
      title: apiSEO.title || staticSEO.title,
      description: apiSEO.description || staticSEO.description,
      keywords: apiSEO.keywords || staticSEO.keywords,
      ogTitle: apiSEO.ogTitle || apiSEO.title || staticSEO.ogTitle,
      ogDescription: apiSEO.ogDescription || apiSEO.description || staticSEO.ogDescription,
      ogImage: apiSEO.ogImage || staticSEO.ogImage,
      canonical: apiSEO.canonical || staticSEO.canonical,
    };
  }
  
  return staticSEO;
};
