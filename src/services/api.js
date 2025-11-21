import axios from 'axios';

// URL du backend CMS - à configurer selon l'environnement
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Instance axios configurée
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Récupère les informations du site
 */
export const getSiteInfo = async (slug) => {
  try {
    const response = await api.get(`/public/sites/${slug}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching site info:', error);
    throw error;
  }
};

/**
 * Récupère le contenu de la carte du restaurant
 */
export const getMenuContent = async (slug) => {
  try {
    // D'abord récupérer l'ID du site via le slug
    const siteResponse = await api.get(`/public/sites/${slug}`);
    if (!siteResponse.data || !siteResponse.data.data) {
      throw new Error('Site not found');
    }
    
    const siteId = siteResponse.data.data._id;
    
    // Ensuite récupérer le contenu de type menu pour ce site
    const contentResponse = await api.get(`/public/content?siteId=${siteId}&type=menu`);
    
    // Extraire et formater les données du menu
    if (contentResponse.data && contentResponse.data.data && contentResponse.data.data.length > 0) {
      return contentResponse.data.data[0].data; // Retourne directement l'objet menu
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching menu content:', error);
    throw error;
  }
};

/**
 * Récupère les événements du restaurant
 */
export const getEventsContent = async (slug) => {
  try {
    // D'abord récupérer l'ID du site via le slug
    const siteResponse = await api.get(`/public/sites/${slug}`);
    if (!siteResponse.data || !siteResponse.data.data) {
      throw new Error('Site not found');
    }
    
    const siteId = siteResponse.data.data._id;
    
    // Ensuite récupérer le contenu de section events pour ce site
    const contentResponse = await api.get(`/public/content?siteId=${siteId}&section=events`);
    
    // Extraire et formater les données des événements
    if (contentResponse.data && contentResponse.data.data && contentResponse.data.data.length > 0) {
      // Les événements sont stockés individuellement, pas dans un tableau
      return contentResponse.data.data.map(item => item.data);
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching events content:', error);
    throw error;
  }
};

/**
 * Envoie un message via le formulaire de contact
 */
export const sendContactMessage = async (data) => {
  try {
    const response = await api.post('/contact', data);
    return response.data;
  } catch (error) {
    console.error('Error sending contact message:', error);
    throw error;
  }
};

export default api;
