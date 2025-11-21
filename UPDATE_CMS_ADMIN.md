# 🔄 Mise à Jour du CMS Admin

## ✅ Modifications Effectuées

### 1. Backend CMS
- ✅ Ajout du type `menu` au modèle Content
- ✅ Push sur GitHub effectué

### 2. CMS Admin
- ✅ Création de la page **Sites** pour gérer tous les sites
- ✅ Page **Contenu** déjà existante
- ✅ Ajout des liens dans la navigation
- ✅ Push sur GitHub effectué

## 🚀 Déploiement sur le Serveur

### Étape 1 : Mettre à Jour le Backend CMS

```bash
# Connexion au serveur
ssh swigs@VOTRE_SERVEUR

# Aller dans le dossier du backend
cd ~/swigs-apps/swigs-cms-backend

# Pull les changements
git pull origin main

# Redémarrer le service
pm2 restart swigs-cms-backend

# Vérifier que tout fonctionne
pm2 logs swigs-cms-backend --lines 50
```

### Étape 2 : Mettre à Jour le CMS Admin

```bash
# Aller dans le dossier du CMS Admin
cd ~/swigs-apps/swigs-cms-admin

# Pull les changements
git pull origin main

# Installer les dépendances (si nécessaire)
npm install

# Rebuild
npm run build

# Copier vers le dossier web
sudo cp -r dist/* /var/www/admin.speed-l.swigs.online/
```

### Étape 3 : Mettre à Jour le Site Buffet de la Gare

```bash
# Aller dans le dossier du site
cd ~/swigs-apps/buffet-de-la-gare-website

# Pull les changements
git pull origin main

# Rebuild
npm run build

# Copier vers le dossier web
sudo cp -r dist/* /var/www/buffet-de-la-gare/
```

## 🎯 Utilisation du CMS Admin

### Accéder à la Page Sites

1. Allez sur **https://admin.speed-l.swigs.online**
2. Connectez-vous
3. Dans le menu de gauche, cliquez sur **Sites** (icône Globe 🌐)
4. Vous verrez la liste de tous vos sites

### Créer le Site Buffet de la Gare

1. Cliquez sur **"Nouveau site"**
2. Remplissez le formulaire :

```
Nom du site: Buffet de la Gare – Chez Claude
Slug: buffet-de-la-gare
Domaine: buffet-de-la-gare.swigs.online
Description: Restaurant traditionnel à St-Pierre-de-Clages, Valais, Suisse

Contact:
  Email: buffet-de-la-gare@netplus.ch
  Téléphone: 027 306 23 96
  Adresse: Avenue de la Gare 2
  Ville: St-Pierre-de-Clages
  Code postal: 1955
  Pays: Suisse

Réseaux sociaux:
  Facebook: (si disponible)
  Instagram: (si disponible)

Site actif: ✅ Coché
```

3. Cliquez sur **"Enregistrer"**
4. **Notez l'ID du site** (vous en aurez besoin pour le contenu)

### Ajouter le Contenu de la Carte

1. Dans le menu, cliquez sur **Contenu** (icône FileText 📄)
2. Cliquez sur **"Nouveau contenu"**
3. Remplissez :

```
Site: Buffet de la Gare – Chez Claude (sélectionner dans la liste)
Section: menu
Type: menu
Ordre: 0
Actif: ✅ Coché
```

4. Dans le champ **Data**, collez le JSON du menu (voir `CMS_ADMIN_GUIDE.md`)
5. Cliquez sur **"Créer"**

### Configurer le SEO

1. Dans le menu, cliquez sur **SEO** (icône Search 🔍)
2. Pour chaque page (`home`, `presentation`, `carte`, `galerie`, `contact`) :
   - Cliquez sur **"Nouveau SEO"**
   - Sélectionnez le site "Buffet de la Gare"
   - Remplissez les informations (voir `CMS_ADMIN_GUIDE.md`)
   - Sauvegardez

## ✅ Vérification

### 1. Vérifier que le Backend Fonctionne

```bash
# Tester l'API Sites
curl http://localhost:3000/api/sites

# Tester l'API Content
curl http://localhost:3000/api/content
```

### 2. Vérifier le CMS Admin

1. Allez sur https://admin.speed-l.swigs.online
2. Vérifiez que la page **Sites** s'affiche
3. Vérifiez que la page **Contenu** s'affiche
4. Créez un site de test pour vérifier que tout fonctionne

### 3. Vérifier le Site Buffet de la Gare

1. Allez sur https://buffet-de-la-gare.swigs.online
2. Naviguez vers la page **Carte**
3. Vérifiez que le menu s'affiche
4. Ouvrez la console du navigateur (F12) et vérifiez qu'il n'y a pas d'erreurs

## 🔧 Dépannage

### Le CMS Admin ne se met pas à jour

```bash
# Vider le cache du navigateur
# Ou faire un hard refresh : Ctrl+Shift+R (Windows) ou Cmd+Shift+R (Mac)

# Sur le serveur, vérifier les permissions
sudo chown -R swigs:www-data /var/www/admin.speed-l.swigs.online
sudo chmod -R 775 /var/www/admin.speed-l.swigs.online
```

### Le backend ne redémarre pas

```bash
# Vérifier les logs
pm2 logs swigs-cms-backend

# Redémarrer manuellement
pm2 restart swigs-cms-backend

# Si problème, arrêter et redémarrer
pm2 stop swigs-cms-backend
pm2 start swigs-cms-backend
```

### La carte ne se charge pas sur le site

```bash
# Vérifier que le backend CMS fonctionne
curl http://localhost:3000/api/sites?slug=buffet-de-la-gare

# Vérifier les logs du site
# Ouvrir la console du navigateur et regarder les erreurs
```

## 📝 Résumé

Après ces mises à jour, vous pourrez :

✅ **Gérer tous vos sites** depuis la page Sites du CMS Admin  
✅ **Créer/Modifier/Supprimer** des sites facilement  
✅ **Gérer le contenu dynamique** (comme la carte du restaurant)  
✅ **Modifier la carte** sans redéploiement  
✅ **Configurer le SEO** pour chaque page  

Le workflow complet est maintenant fonctionnel ! 🎉
