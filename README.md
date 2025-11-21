# Buffet de la Gare – Chez Claude

Site vitrine moderne et chaleureux pour le restaurant "Buffet de la Gare – Chez Claude", situé à St-Pierre-de-Clages (Valais, Suisse).

## À propos

Restaurant traditionnel proposant une cuisine maison et des spécialités valaisannes dans une ambiance chaleureuse et authentique.

**Adresse :** Avenue de la Gare 2, 1955 St-Pierre-de-Clages  
**Téléphone :** 027 306 23 96  
**Email :** buffet-de-la-gare@netplus.ch

## 🏗️ Architecture SWIGS

Ce site fait partie de l'écosystème SWIGS et est connecté à :
- **CMS Backend** : Gestion centralisée du contenu et SEO
- **Monitoring System** : Surveillance de la performance et des métriques
- **Admin Dashboard** : Interface d'administration

## 🚀 Stack Technique

- **Frontend** : React 19 + Vite
- **Styling** : Tailwind CSS
- **Routing** : React Router DOM
- **SEO** : React Helmet Async
- **Icons** : Lucide React
- **Typographie** : Playfair Display + Lato

## 💻 Développement Local

### Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Ouvrir http://localhost:5173
```

### Build

```bash
# Créer le build de production
npm run build

# Prévisualiser le build
npm run preview
```

## 📄 Pages du Site

1. **Accueil** (`/`) - Hero, présentation, galerie, témoignages
2. **Présentation** (`/presentation`) - Histoire, équipe, valeurs
3. **Notre Carte** (`/carte`) - Menu complet avec catégories
4. **Galerie** (`/galerie`) - Photos du restaurant et des plats
5. **Contact** (`/contact`) - Formulaire, coordonnées, carte

## 🎨 Palette de Couleurs

- **Bordeaux profond** : `#8b1538` (primary-700)
- **Beige clair** : `#f5f1ea` (secondary-100)
- **Beige/Crème doux** : `#d9c5a3` (accent-400)

## 🔄 Contenu Dynamique

Le site est **statique** à l'exception de la **page Carte** et **Événements** qui sont **dynamiques** :
- Le menu et les événements sont gérés via le CMS Admin SWIGS
- Les modifications sont instantanées (pas de redéploiement nécessaire)
- Fallback sur des données par défaut si le CMS n'est pas disponible
- **Slug du site** : `buffet` (dans `src/data/seo.json`)
- **API publique** : `https://swigs.online/api/public/sites/buffet`

## 🌐 Variables d'Environnement

Créer un fichier `.env` pour le développement :

```env
VITE_API_URL=http://localhost:3000/api
```

Créer un fichier `.env.production` pour la production :

```env
VITE_API_URL=https://swigs.online/api
```

**IMPORTANT** : Le site utilise les routes publiques `/api/public/*` qui ne nécessitent pas d'authentification.

## 📞 Contact Restaurant

**Horaires d'ouverture :**
- Mar–Ven : 10:00–14:30 / 18:00–23:00
- Samedi : 11:00–15:00 / 18:00–00:00
- Dimanche–Lundi : Fermé

## 🚀 Déploiement

Voir le guide complet : [DEPLOYMENT.md](./DEPLOYMENT.md)

**Résumé rapide :**

1. Configurer le site dans le CMS Admin
2. Ajouter au Control Center pour le monitoring
3. Déployer sur le serveur avec `./deploy.sh`
4. Configurer Nginx + SSL

## 📝 License

© 2025 Buffet de la Gare – Chez Claude. Tous droits réservés.
