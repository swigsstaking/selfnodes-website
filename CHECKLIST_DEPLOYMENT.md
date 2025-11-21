# ✅ Checklist de Déploiement - Buffet de la Gare

## 📋 Phase 1 : Configuration CMS Admin

- [ ] Se connecter à https://admin.speed-l.swigs.online
- [ ] Créer le site dans **Sites** → **Nouveau Site**
  - [ ] Nom : "Buffet de la Gare – Chez Claude"
  - [ ] Slug : `buffet-de-la-gare`
  - [ ] Domaine : `buffet-de-la-gare.swigs.online`
  - [ ] Description : "Restaurant traditionnel à St-Pierre-de-Clages"
  - [ ] Upload du logo
  - [ ] Activer le site ✅
- [ ] Configurer le SEO pour chaque page :
  - [ ] `home` - Page d'accueil
  - [ ] `presentation` - Présentation
  - [ ] `carte` - Notre carte
  - [ ] `galerie` - Galerie photos
  - [ ] `contact` - Contact
- [ ] Ajouter le contenu de la carte dans **Contenu** → **Nouveau Contenu**
  - [ ] Type : `menu`
  - [ ] Catégories : `entrees`, `viandes`, `fromages`
  - [ ] Ajouter tous les plats avec images, descriptions et prix
- [ ] Cliquer sur **"Mettre à jour la DB"** pour générer `seo.json`

## 📊 Phase 2 : Configuration Control Center

- [ ] Se connecter à https://monitoring.swigs.online
- [ ] Créer le site dans **Sites** → **Nouveau Site**
  - [ ] Site ID : `buffet-de-la-gare`
  - [ ] Nom : "Buffet de la Gare – Chez Claude"
  - [ ] Domaine : `buffet-de-la-gare.swigs.online`
  - [ ] Sélectionner le serveur
- [ ] Configurer le pricing dans **Sites** → **Pricing**
  - [ ] Prix mensuel client
  - [ ] Coûts serveur
  - [ ] Bande passante
  - [ ] Stockage

## 🖥️ Phase 3 : Préparation GitHub

- [ ] Créer le repo sur GitHub : `buffet-de-la-gare-website`
- [ ] Initialiser Git localement :
  ```bash
  git init
  git add .
  git commit -m "Initial commit: Buffet de la Gare website"
  git branch -M main
  git remote add origin git@github.com:swigsstaking/buffet-de-la-gare-website.git
  git push -u origin main
  ```

## 🚀 Phase 4 : Déploiement Serveur

- [ ] SSH sur le serveur : `ssh swigs@serveur-ip`
- [ ] Cloner le repo :
  ```bash
  cd ~/swigs-apps
  git clone git@github.com:swigsstaking/buffet-de-la-gare-website.git
  cd buffet-de-la-gare-website
  ```
- [ ] Configurer l'environnement :
  ```bash
  cp .env.example .env
  nano .env
  # Configurer VITE_API_URL=https://api.swigs.online/api
  ```
- [ ] Installer et builder :
  ```bash
  npm install --legacy-peer-deps
  npm run build
  ```
- [ ] Configurer Nginx :
  ```bash
  sudo cp nginx.conf /etc/nginx/sites-available/buffet-de-la-gare.swigs.online
  sudo ln -s /etc/nginx/sites-available/buffet-de-la-gare.swigs.online /etc/nginx/sites-enabled/
  sudo nginx -t
  sudo nginx -s reload
  ```
- [ ] Créer le dossier web et déployer :
  ```bash
  sudo mkdir -p /var/www/buffet-de-la-gare
  sudo cp -r dist/* /var/www/buffet-de-la-gare/
  sudo chown -R swigs:www-data /var/www/buffet-de-la-gare
  sudo chmod -R 775 /var/www/buffet-de-la-gare
  ```
- [ ] Configurer SSL :
  ```bash
  sudo certbot --nginx -d buffet-de-la-gare.swigs.online
  ```
- [ ] Rendre le script de déploiement exécutable :
  ```bash
  chmod +x deploy.sh
  ```

## ✅ Phase 5 : Vérifications

- [ ] Tester l'accès au site : https://buffet-de-la-gare.swigs.online
- [ ] Vérifier toutes les pages :
  - [ ] Accueil
  - [ ] Présentation
  - [ ] Carte (vérifier que les données viennent du CMS)
  - [ ] Galerie
  - [ ] Contact
- [ ] Vérifier le responsive (mobile, tablette, desktop)
- [ ] Tester le formulaire de contact
- [ ] Vérifier les logs Nginx :
  ```bash
  sudo tail -f /var/log/nginx/buffet-de-la-gare.access.log
  sudo tail -f /var/log/nginx/buffet-de-la-gare.error.log
  ```
- [ ] Vérifier le monitoring dans le Control Center :
  - [ ] Uptime
  - [ ] PageSpeed
  - [ ] Métriques serveur

## 🔄 Phase 6 : Tests de Mise à Jour

- [ ] Modifier un plat dans le CMS Admin
- [ ] Vérifier que le changement apparaît sur le site (sans redéploiement)
- [ ] Tester une mise à jour du code :
  ```bash
  # Faire une modification locale
  git add .
  git commit -m "test: Mise à jour"
  git push origin main
  
  # Sur le serveur
  cd ~/swigs-apps/buffet-de-la-gare-website
  ./deploy.sh
  ```

## 📝 Documentation

- [ ] Mettre à jour la documentation si nécessaire
- [ ] Informer le client des accès et du fonctionnement
- [ ] Documenter les credentials (si applicable)

## 🎉 Finalisation

- [ ] Site en ligne et fonctionnel
- [ ] CMS configuré et opérationnel
- [ ] Monitoring actif
- [ ] Client informé
- [ ] Documentation complète

---

**Date de déploiement :** _______________  
**Déployé par :** _______________  
**Statut :** ⬜ En cours | ⬜ Terminé | ⬜ En production
