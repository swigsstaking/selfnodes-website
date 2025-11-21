import { useState, useEffect } from 'react';
import { getMenuContent } from '../services/api';
import { useSiteInfo } from './useSiteInfo';

// Menu par défaut (fallback si le CMS n'est pas disponible)
const defaultMenu = {
  entrees: [
    {
      name: 'Mesclun de saison, vinaigrette du Chef',
      description: '',
      price: '7.-',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400'
    },
    {
      name: 'Crème de courge chips de lard croustillantes',
      description: '',
      price: '11.-',
      image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400'
    },
    {
      name: 'Terrine de campagne maison, chutney de figues',
      description: '',
      price: '18.-',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400'
    },
    {
      name: 'Escargots de Bourgogne et son beurre persillé',
      description: '6 pces / 12 pces',
      price: '12.- / 24.-',
      image: 'https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=400'
    },
    {
      name: 'Salade gourmande de chèvre chaud et miel du Valais',
      description: '',
      price: '16.-',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400'
    }
  ],
  tartes: [
    {
      name: 'Caviar d\'aubergine, tomates, chèvre, miel, roquettes',
      description: '',
      price: '28.-',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400'
    },
    {
      name: 'Caviar d\'aubergine, tomates, saumon fumé, crème acidulée, roquettes',
      description: '',
      price: '29.-',
      image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400'
    },
    {
      name: 'Caviar d\'aubergine, tomates, mozzarella, jambon cru',
      description: '',
      price: '28.-',
      image: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400'
    }
  ],
  incontournables: [
    {
      name: 'Smash burger',
      description: 'Bœuf CH / raclette du Valais/oignons confits/tomate/lard',
      price: '29.-',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400'
    },
    {
      name: 'Steak tartare du chef coupé au couteau',
      description: '',
      price: '36.-',
      image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=400'
    },
    {
      name: 'Boudin noir aux pommes rôties',
      description: '',
      price: '29.-',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400'
    },
    {
      name: 'Côte de cochon de la Ferme en Croix et son jus corsé au romarin',
      description: '',
      price: '34.-',
      image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400'
    },
    {
      name: 'Filet de truite arc-en-ciel de Bremgarten, beurre citronné et ses légumes croquants',
      description: '',
      price: '32.-',
      image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400'
    },
    {
      name: 'Boîte chaude Suisse',
      description: 'Vacherin coulant/pommes de terre/charcuterie artisanale',
      price: '34.50',
      image: 'https://images.unsplash.com/photo-1619740455993-9e4e0b5e9f0f?w=400'
    }
  ],
  formules: [
    {
      name: 'Plat à choix servi avec son bol de salade et dessert du jour',
      description: '',
      price: '11.-',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400'
    },
    {
      name: 'Onglet de bœuf à l\'échalote confite',
      description: '',
      price: '24.-',
      image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=400'
    },
    {
      name: 'Poulet fermier rôti de la Gruyère crème et morilles',
      description: '',
      price: '24.-',
      image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400'
    },
    {
      name: 'Marmite du pêcheur, poisson du jour et son bouillon parfumé',
      description: '',
      price: '24.-',
      image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400'
    },
    {
      name: 'Joue de bœuf braisée en cocotte façon Bourguignonne',
      description: '',
      price: '24.-',
      image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400'
    }
  ],
  desserts: [
    {
      name: 'Tiramisu spéculoos mangue',
      description: '',
      price: '12.-',
      image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400'
    },
    {
      name: 'Crème brûlée à la vanille',
      description: '',
      price: '11.-',
      image: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=400'
    },
    {
      name: 'Mousse chocolat noir',
      description: '',
      price: '11.-',
      image: 'https://images.unsplash.com/photo-1541599468348-e96984315921?w=400'
    }
  ]
};

export const useMenu = () => {
  const [menu, setMenu] = useState(defaultMenu);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const siteInfo = useSiteInfo();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);
        // Essayer de récupérer le menu depuis le CMS
        const data = await getMenuContent(siteInfo.slug);
        if (data) {
          // data contient directement l'objet menu avec entrees, viandes, fromages
          setMenu(data);
        }
      } catch (err) {
        console.warn('Using default menu - CMS not available:', err.message);
        // En cas d'erreur, on garde le menu par défaut
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (siteInfo.slug) {
      fetchMenu();
    } else {
      setLoading(false);
    }
  }, [siteInfo.slug]);

  return { menu, loading, error };
};
