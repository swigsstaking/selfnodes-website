# SelfNodes

Site vitrine SelfNodes - Service de validation pour blockchains Ethereum, Gnosis et Lukso.

## URLs

- **Production** : https://selfnodes.com
- **API Backend** : https://swigs.online/api
- **Slug** : `selfnodes`

## 🏗️ Architecture SWIGS

Ce site fait partie de l'écosystème SWIGS et est connecté à :
- **CMS Backend** : Gestion centralisée du contenu et SEO
- **Monitoring System** : Surveillance de la performance et des métriques
- **Admin Dashboard** : Interface d'administration

## 🚀 Stack Technique

- **Frontend** : React 18 + Vite
- **Styling** : Tailwind CSS
- **Routing** : React Router DOM
- **SEO** : React Helmet Async
- **Icons** : Lucide React

## 💻 Développement Local

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Ouvrir http://localhost:5173
```

## Build

```bash
npm run build
```

## 🚀 Déploiement

```bash
# 1. SSH sur le serveur
ssh swigs@192.168.110.73

# 2. Pull les changements
cd ~/swigs-apps/selfnodes-website
git pull origin main

# 3. Build
npm install
npm run build

# 4. Copier vers le dossier web
sudo cp -r dist/* /var/www/selfnodes/
```

## 📂 Chemins Serveur

| Élément | Chemin |
|---------|--------|
| **Source** | `~/swigs-apps/selfnodes-website` |
| **Build** | `/var/www/selfnodes/` |

## 🌐 Variables d'Environnement

```env
# .env.production
VITE_API_URL=https://swigs.online/api
```

## 📝 License

© 2025 SelfNodes. Tous droits réservés.
