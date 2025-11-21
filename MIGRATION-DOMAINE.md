# Migration vers buffetdelagarechezclaude.ch

## 📋 Checklist de migration

### 1. Configuration DNS
Configurer les enregistrements DNS chez le registrar du domaine `buffetdelagarechezclaude.ch` :

```
Type: A
Nom: @
Valeur: 192.168.110.73
TTL: 3600

Type: A
Nom: www
Valeur: 192.168.110.73
TTL: 3600
```

### 2. Configuration Nginx sur le serveur

#### a) Créer le fichier de configuration
```bash
ssh swigs@192.168.110.73
sudo nano /etc/nginx/sites-available/buffetdelagarechezclaude.ch
```

#### b) Contenu du fichier Nginx
```nginx
# Redirection HTTP vers HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name buffetdelagarechezclaude.ch www.buffetdelagarechezclaude.ch;
    
    # Redirection temporaire vers HTTPS (après avoir obtenu le certificat SSL)
    return 301 https://$server_name$request_uri;
}

# Configuration HTTPS
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name buffetdelagarechezclaude.ch www.buffetdelagarechezclaude.ch;

    # Certificats SSL (à générer avec certbot)
    ssl_certificate /etc/letsencrypt/live/buffetdelagarechezclaude.ch/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/buffetdelagarechezclaude.ch/privkey.pem;
    
    # Configuration SSL recommandée
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Racine du site
    root /var/www/buffet-de-la-gare;
    index index.html;

    # Gestion des routes React (SPA)
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache des assets statiques
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Sécurité
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

#### c) Activer le site
```bash
sudo ln -s /etc/nginx/sites-available/buffetdelagarechezclaude.ch /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 3. Obtenir le certificat SSL avec Certbot

```bash
sudo certbot --nginx -d buffetdelagarechezclaude.ch -d www.buffetdelagarechezclaude.ch
```

Certbot va :
- Générer les certificats SSL
- Modifier automatiquement la configuration Nginx
- Configurer le renouvellement automatique

### 4. Vérifier le déploiement

```bash
# Tester la résolution DNS
nslookup buffetdelagarechezclaude.ch

# Tester l'accès HTTP
curl -I http://buffetdelagarechezclaude.ch

# Tester l'accès HTTPS
curl -I https://buffetdelagarechezclaude.ch

# Vérifier les logs Nginx
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### 5. Tests post-migration

- [ ] Site accessible via `https://buffetdelagarechezclaude.ch`
- [ ] Site accessible via `https://www.buffetdelagarechezclaude.ch`
- [ ] Redirection HTTP → HTTPS fonctionne
- [ ] Toutes les pages sont accessibles
- [ ] Les images se chargent correctement
- [ ] Le menu dynamique s'affiche
- [ ] Le formulaire de contact fonctionne
- [ ] Le téléchargement PDF fonctionne
- [ ] Le favicon s'affiche
- [ ] Certificat SSL valide (cadenas vert)

### 6. Mise à jour des liens externes (optionnel)

Si vous avez des liens vers l'ancien domaine `buffet-de-la-gare.swigs.online` :
- Google My Business
- Réseaux sociaux (Facebook, Instagram)
- Annuaires en ligne
- Cartes de visite

### 7. Ancien domaine (swigs.online)

Vous pouvez :
- **Option 1** : Garder l'ancien domaine et faire une redirection 301 vers le nouveau
- **Option 2** : Désactiver l'ancien domaine après quelques semaines

#### Option 1 : Redirection 301
Ajouter dans la config Nginx de `buffet-de-la-gare.swigs.online` :
```nginx
server {
    server_name buffet-de-la-gare.swigs.online;
    return 301 https://buffetdelagarechezclaude.ch$request_uri;
}
```

## 🔧 Commandes de déploiement (inchangées)

Le processus de déploiement reste le même :

```bash
ssh swigs@192.168.110.73
cd ~/swigs-apps/buffet-de-la-gare-website
git pull origin main
npm run build
sudo cp -r dist/* /var/www/buffet-de-la-gare/
```

## 📝 Notes importantes

1. **DNS** : La propagation DNS peut prendre de 1 à 48 heures
2. **SSL** : Certbot renouvelle automatiquement les certificats tous les 90 jours
3. **Cache** : Vider le cache du navigateur après la migration (`Cmd+Shift+R`)
4. **API** : L'API reste sur `swigs.online/api` (pas de changement)
5. **Uploads** : Les médias restent sur `swigs.online/uploads` (pas de changement)

## ✅ Avantages du nouveau domaine

- ✅ Nom de domaine professionnel et mémorisable
- ✅ Meilleur référencement SEO
- ✅ Crédibilité accrue
- ✅ Indépendance vis-à-vis de swigs.online
