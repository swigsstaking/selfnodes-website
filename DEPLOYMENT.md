# 🚀 Guide de Déploiement - Buffet de la Gare

Ce guide détaille le processus de déploiement du site sur l'infrastructure SWIGS.

## 📋 Prérequis

- Accès SSH au serveur SWIGS
- Accès au CMS Admin : https://admin.speed-l.swigs.online
- Accès au Control Center : https://monitoring.swigs.online
- Repo GitHub configuré

## 🔧 Étape 1 : Configuration CMS Admin

### 1.1 Créer le Site

1. Se connecter à https://admin.speed-l.swigs.online
2. Aller dans **Sites** → **Nouveau Site**
3. Remplir les informations :
   - **Nom** : Buffet de la Gare – Chez Claude
   - **Slug** : `buffet-de-la-gare`
   - **Domaine** : `buffet-de-la-gare.swigs.online`
   - **Description** : Restaurant traditionnel à St-Pierre-de-Clages
   - **Logo** : Upload du logo
   - **Actif** : ✅

### 1.2 Configurer le SEO

1. Aller dans **SEO** → **Nouveau SEO**
2. Sélectionner le site "Buffet de la Gare"
3. Configurer chaque page :
   - `home` - Page d'accueil
   - `presentation` - Présentation du restaurant
   - `carte` - Notre carte
   - `galerie` - Galerie photos
   - `contact` - Contact

### 1.3 Ajouter le Contenu de la Carte

1. Aller dans **Contenu** → **Nouveau Contenu**
2. Sélectionner le site "Buffet de la Gare"
3. Type : `menu`
4. Ajouter les catégories et plats :

```json
{
  "entrees": [
    {
      "name": "Salade Verte",
      "description": "Salade fraîche de saison avec vinaigrette maison",
      "price": "CHF 8.50",
      "image": "url_image"
    }
  ],
  "viandes": [...],
  "fromages": [...]
}
```

### 1.4 Générer les Données SEO

Cliquer sur **"Mettre à jour la DB"** pour générer le fichier `seo.json`.

## 📊 Étape 2 : Configuration Control Center

### 2.1 Ajouter le Site au Monitoring

1. Se connecter à https://monitoring.swigs.online
2. Aller dans **Sites** → **Nouveau Site**
3. Remplir :
   - **Site ID** : `buffet-de-la-gare`
   - **Nom** : Buffet de la Gare – Chez Claude
   - **Domaine** : `buffet-de-la-gare.swigs.online`
   - **Serveur** : Sélectionner le serveur SWIGS

### 2.2 Configurer le Pricing

1. Aller dans **Sites** → **Pricing**
2. Configurer :
   - **Prix mensuel** : Prix facturé au client
   - **Coûts serveur** : Part des coûts
   - **Bande passante** : Coût par GB
   - **Stockage** : Coût par GB

## 🖥️ Étape 3 : Déploiement Serveur

### 3.1 Connexion au Serveur

```bash
ssh swigs@serveur-ip
```

### 3.2 Cloner le Repo

```bash
cd ~/swigs-apps
git clone git@github.com:swigsstaking/buffet-de-la-gare-website.git
cd buffet-de-la-gare-website
```

### 3.3 Configuration Environnement

```bash
# Créer le fichier .env
cp .env.example .env
nano .env
```

Configurer :
```env
VITE_API_URL=https://api.swigs.online/api
```

### 3.4 Installation et Build

```bash
npm install --legacy-peer-deps
npm run build
```

### 3.5 Configuration Nginx

```bash
# Copier la config Nginx
sudo cp nginx.conf /etc/nginx/sites-available/buffet-de-la-gare.swigs.online

# Activer le site
sudo ln -s /etc/nginx/sites-available/buffet-de-la-gare.swigs.online /etc/nginx/sites-enabled/

# Tester la configuration
sudo nginx -t

# Recharger Nginx
sudo nginx -s reload
```

### 3.6 Créer le Dossier Web

```bash
sudo mkdir -p /var/www/buffet-de-la-gare
sudo cp -r dist/* /var/www/buffet-de-la-gare/
sudo chown -R swigs:www-data /var/www/buffet-de-la-gare
sudo chmod -R 775 /var/www/buffet-de-la-gare
```

### 3.7 Configurer SSL

```bash
sudo certbot --nginx -d buffet-de-la-gare.swigs.online
```

## 🔄 Étape 4 : Mises à Jour

Pour déployer une mise à jour :

```bash
cd ~/swigs-apps/buffet-de-la-gare-website
./deploy.sh
```

Ou manuellement :

```bash
git pull origin main
npm install --legacy-peer-deps
npm run build
sudo cp -r dist/* /var/www/buffet-de-la-gare/
```

## ✅ Étape 5 : Vérification

### 5.1 Tester le Site

```bash
# Vérifier que le site est accessible
curl -I https://buffet-de-la-gare.swigs.online

# Vérifier les logs
sudo tail -f /var/log/nginx/buffet-de-la-gare.access.log
sudo tail -f /var/log/nginx/buffet-de-la-gare.error.log
```

### 5.2 Vérifier le CMS

1. Tester que la carte se charge depuis le CMS
2. Modifier un plat dans l'admin et vérifier qu'il apparaît sur le site

### 5.3 Vérifier le Monitoring

1. Aller sur le Control Center
2. Vérifier que les métriques remontent :
   - Uptime
   - PageSpeed
   - Trafic

## 🔐 Sécurité

- ✅ SSL/TLS configuré avec Certbot
- ✅ Headers de sécurité Nginx
- ✅ Permissions fichiers correctes
- ✅ Logs activés

## 📝 Notes

- Le site est **statique** sauf la page **Carte** qui est **dynamique**
- La carte est gérée via le CMS Admin
- Les modifications de la carte sont instantanées (pas de redéploiement nécessaire)
- Le SEO est géré via le fichier `seo.json` généré par le backend

## 🆘 Dépannage

### Le site ne se charge pas

```bash
# Vérifier Nginx
sudo nginx -t
sudo systemctl status nginx

# Vérifier les permissions
ls -la /var/www/buffet-de-la-gare
```

### La carte ne se charge pas

```bash
# Vérifier que le backend CMS fonctionne
curl http://localhost:3000/api/health

# Vérifier les logs
pm2 logs swigs-cms-backend
```

### SSL ne fonctionne pas

```bash
# Renouveler le certificat
sudo certbot renew
sudo nginx -s reload
```

## 📞 Support

En cas de problème, consulter :
- Documentation SWIGS : `~/CascadeProjects/swigs-repos/swigs-infrastructure/docs/`
- Logs serveur : `/var/log/nginx/`
- Logs PM2 : `pm2 logs`
