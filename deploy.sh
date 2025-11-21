#!/bin/bash

echo "🚀 Déploiement Buffet de la Gare..."

# Pull les changements
echo "📥 Récupération des dernières modifications..."
git pull origin main

# Installer les dépendances
echo "📦 Installation des dépendances..."
npm install --legacy-peer-deps

# Builder le projet
echo "🔨 Build du projet..."
npm run build

# Déployer vers le serveur web
echo "📤 Déploiement vers /var/www/buffet-de-la-gare..."
sudo cp -r dist/* /var/www/buffet-de-la-gare/

# Permissions
echo "🔐 Configuration des permissions..."
sudo chown -R swigs:www-data /var/www/buffet-de-la-gare
sudo chmod -R 775 /var/www/buffet-de-la-gare

echo "✅ Déploiement terminé !"
echo "🌐 Site accessible sur : https://buffet-de-la-gare.swigs.online"
