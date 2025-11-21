# 🚀 Instructions de Déploiement Rapide

## 📦 Étape 1 : Push sur GitHub

### 1.1 Créer le repo sur GitHub
1. Aller sur https://github.com/swigsstaking
2. Cliquer sur **"New repository"**
3. Nom : `buffet-de-la-gare-website`
4. Description : "Site vitrine du restaurant Buffet de la Gare - St-Pierre-de-Clages"
5. Visibilité : **Private** (recommandé)
6. **NE PAS** initialiser avec README, .gitignore ou license
7. Cliquer sur **"Create repository"**

### 1.2 Push le code
```bash
cd /Users/corentinflaction/CascadeProjects/swigs-repos/buffet-de-la-gare-website

# Ajouter le remote GitHub
git remote add origin git@github.com:swigsstaking/buffet-de-la-gare-website.git

# Push sur main
git branch -M main
git push -u origin main
```

✅ **Code maintenant sur GitHub !**

---

## 🖥️ Étape 2 : Déploiement sur le Serveur

### 2.1 Connexion au serveur
```bash
ssh swigs@VOTRE_SERVEUR_IP
```

### 2.2 Cloner le repo
```bash
cd ~/swigs-apps
git clone git@github.com:swigsstaking/buffet-de-la-gare-website.git
cd buffet-de-la-gare-website
```

### 2.3 Configuration de l'environnement
```bash
# Copier le fichier d'exemple
cp .env.example .env

# Éditer avec l'URL de production
nano .env
```

Dans `.env`, configurer :
```env
VITE_API_URL=https://api.swigs.online/api
```

Sauvegarder : `Ctrl+X`, puis `Y`, puis `Enter`

### 2.4 Installation et Build
```bash
# Installer les dépendances
npm install --legacy-peer-deps

# Builder le projet
npm run build
```

### 2.5 Configuration Nginx
```bash
# Copier la config Nginx
sudo cp nginx.conf /etc/nginx/sites-available/buffet-de-la-gare.swigs.online

# Créer le lien symbolique
sudo ln -s /etc/nginx/sites-available/buffet-de-la-gare.swigs.online /etc/nginx/sites-enabled/

# Tester la configuration
sudo nginx -t

# Si OK, recharger Nginx
sudo nginx -s reload
```

### 2.6 Déployer les fichiers
```bash
# Créer le dossier web
sudo mkdir -p /var/www/buffet-de-la-gare

# Copier les fichiers buildés
sudo cp -r dist/* /var/www/buffet-de-la-gare/

# Configurer les permissions
sudo chown -R swigs:www-data /var/www/buffet-de-la-gare
sudo chmod -R 775 /var/www/buffet-de-la-gare
```

### 2.7 Configurer SSL avec Certbot
```bash
sudo certbot --nginx -d buffet-de-la-gare.swigs.online
```

Suivre les instructions de Certbot (accepter les conditions, entrer l'email, etc.)

### 2.8 Rendre le script de déploiement exécutable
```bash
chmod +x deploy.sh
```

✅ **Site déployé !**

---

## 🌐 Étape 3 : Vérification

### 3.1 Tester l'accès
```bash
# Depuis le serveur
curl -I https://buffet-de-la-gare.swigs.online

# Ou depuis votre navigateur
# Ouvrir : https://buffet-de-la-gare.swigs.online
```

### 3.2 Vérifier les logs
```bash
# Logs d'accès
sudo tail -f /var/log/nginx/buffet-de-la-gare.access.log

# Logs d'erreur
sudo tail -f /var/log/nginx/buffet-de-la-gare.error.log
```

---

## 📊 Étape 4 : Configuration CMS Admin

### 4.1 Créer le site dans le CMS
1. Aller sur https://admin.speed-l.swigs.online
2. **Sites** → **Nouveau Site**
   - Nom : `Buffet de la Gare – Chez Claude`
   - Slug : `buffet-de-la-gare`
   - Domaine : `buffet-de-la-gare.swigs.online`
   - Description : `Restaurant traditionnel à St-Pierre-de-Clages`
   - Actif : ✅

### 4.2 Configurer le SEO
1. **SEO** → Configurer chaque page :
   - `home`, `presentation`, `carte`, `galerie`, `contact`

### 4.3 Ajouter le contenu de la carte
1. **Contenu** → **Nouveau Contenu**
2. Type : `menu`
3. Ajouter les catégories : `entrees`, `viandes`, `fromages`
4. Pour chaque plat :
   ```json
   {
     "name": "Nom du plat",
     "description": "Description",
     "price": "CHF XX.XX",
     "image": "URL de l'image"
   }
   ```

### 4.4 Générer les données
Cliquer sur **"Mettre à jour la DB"**

---

## 📈 Étape 5 : Configuration Control Center

1. Aller sur https://monitoring.swigs.online
2. **Sites** → **Nouveau Site**
   - Site ID : `buffet-de-la-gare`
   - Nom : `Buffet de la Gare – Chez Claude`
   - Domaine : `buffet-de-la-gare.swigs.online`
3. **Pricing** → Configurer les tarifs

---

## 🔄 Mises à Jour Futures

### Pour mettre à jour le code :
```bash
# Sur le serveur
cd ~/swigs-apps/buffet-de-la-gare-website
./deploy.sh
```

### Pour modifier la carte :
- Aller dans le CMS Admin
- Modifier le contenu
- Les changements sont **instantanés** (pas de redéploiement nécessaire)

---

## ✅ Checklist Finale

- [ ] Code pushé sur GitHub
- [ ] Site déployé sur le serveur
- [ ] Nginx configuré
- [ ] SSL activé
- [ ] Site accessible via HTTPS
- [ ] CMS Admin configuré
- [ ] Contenu de la carte ajouté
- [ ] Control Center configuré
- [ ] Monitoring actif
- [ ] Tests effectués

---

## 🆘 Dépannage

### Le site ne se charge pas
```bash
sudo nginx -t
sudo systemctl status nginx
sudo systemctl restart nginx
```

### Erreur 502 Bad Gateway
Vérifier que le backend CMS fonctionne :
```bash
pm2 list
pm2 logs swigs-cms-backend
```

### Problème de permissions
```bash
sudo chown -R swigs:www-data /var/www/buffet-de-la-gare
sudo chmod -R 775 /var/www/buffet-de-la-gare
```

---

## 📞 Support

Documentation complète : `DEPLOYMENT.md`  
Checklist détaillée : `CHECKLIST_DEPLOYMENT.md`
