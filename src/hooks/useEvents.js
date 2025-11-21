import { useState, useEffect } from 'react';
import { getEventsContent } from '../services/api';
import { useSiteInfo } from './useSiteInfo';

export const useEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const siteInfo = useSiteInfo();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const data = await getEventsContent(siteInfo.slug);
        if (data && Array.isArray(data)) {
          // Filtrer les événements futurs et les trier par date
          const now = new Date();
          const futureEvents = data
            .filter(event => {
              if (!event.date) return true;
              const eventDate = new Date(event.date);
              return eventDate >= now;
            })
            .sort((a, b) => {
              if (!a.date || !b.date) return 0;
              return new Date(a.date) - new Date(b.date);
            });
          setEvents(futureEvents);
        } else {
          setEvents([]);
        }
      } catch (err) {
        console.warn('Using default events - CMS not available:', err.message);
        setError(err);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    if (siteInfo.slug) {
      fetchEvents();
    } else {
      setLoading(false);
    }
  }, [siteInfo.slug]);

  return { events, loading, error };
};
