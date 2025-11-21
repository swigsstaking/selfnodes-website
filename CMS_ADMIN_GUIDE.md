# 📝 Guide CMS Admin - Buffet de la Gare

Ce guide explique comment configurer et gérer le contenu du site dans le CMS Admin.

## 🔧 Étape 1 : Créer le Site

1. Allez sur **https://admin.speed-l.swigs.online**
2. Connectez-vous avec vos identifiants
3. Dans le menu, cliquez sur **Sites** → **Nouveau Site**
4. Remplissez le formulaire :

```
Nom: Buffet de la Gare – Chez Claude
Slug: buffet-de-la-gare
Domaine: buffet-de-la-gare.swigs.online
Description: Restaurant traditionnel à St-Pierre-de-Clages, Valais, Suisse
Actif: ✅ Coché
```

5. Cliquez sur **Créer**
6. **Notez l'ID du site** qui apparaît (vous en aurez besoin)

---

## 📄 Étape 2 : Configurer le SEO

1. Allez dans **SEO** → **Nouveau SEO**
2. Sélectionnez le site "Buffet de la Gare"
3. Créez une entrée pour chaque page :

### Page d'accueil (home)
```
Page: home
Titre: Buffet de la Gare – Chez Claude | Restaurant St-Pierre-de-Clages
Description: Restaurant traditionnel au cœur du Valais. Cuisine authentique, ambiance chaleureuse et produits du terroir.
Mots-clés: restaurant valais, buffet de la gare, st-pierre-de-clages, cuisine traditionnelle
```

### Présentation (presentation)
```
Page: presentation
Titre: Notre Histoire | Buffet de la Gare
Description: Découvrez l'histoire et les valeurs du Buffet de la Gare, restaurant familial depuis plusieurs générations.
Mots-clés: histoire restaurant, valeurs, authenticité, famille
```

### Carte (carte)
```
Page: carte
Titre: Notre Carte | Buffet de la Gare
Description: Découvrez notre carte : entrées, plats traditionnels valaisans, viandes, poissons, fromages et desserts maison.
Mots-clés: carte restaurant, menu, raclette, fondue, spécialités valaisannes
```

### Galerie (galerie)
```
Page: galerie
Titre: Galerie Photos | Buffet de la Gare
Description: Découvrez en images notre restaurant, nos plats et notre ambiance chaleureuse.
Mots-clés: photos restaurant, galerie, ambiance, plats
```

### Contact (contact)
```
Page: contact
Titre: Contact & Horaires | Buffet de la Gare
Description: Contactez-nous pour réserver ou obtenir des informations. Horaires, adresse et formulaire de contact.
Mots-clés: contact, réservation, horaires, adresse, téléphone
```

---

## 🍽️ Étape 3 : Créer le Contenu de la Carte (IMPORTANT)

C'est la partie dynamique du site qui permet de modifier la carte sans redéploiement.

1. Allez dans **Contenu** → **Nouveau Contenu**
2. Remplissez :

```
Site: Buffet de la Gare – Chez Claude
Section: menu
Type: menu
Ordre: 0
Actif: ✅ Coché
```

3. Dans le champ **Data** (JSON), collez cette structure :

```json
{
  "entrees": [
    {
      "name": "Salade Verte",
      "description": "Salade fraîche de saison avec vinaigrette maison",
      "price": "CHF 8.50",
      "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400"
    },
    {
      "name": "Salade Valaisanne",
      "description": "Salade mixte, fromage du pays, noix et viande séchée",
      "price": "CHF 16.00",
      "image": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400"
    },
    {
      "name": "Assiette Végétarienne",
      "description": "Légumes de saison grillés, quinoa et sauce aux herbes",
      "price": "CHF 22.00",
      "image": "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400"
    },
    {
      "name": "Soupe du Jour",
      "description": "Préparée quotidiennement avec des produits frais",
      "price": "CHF 9.00",
      "image": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400"
    }
  ],
  "viandes": [
    {
      "name": "Entrecôte de Bœuf",
      "description": "Entrecôte grillée (250g), frites maison et légumes",
      "price": "CHF 38.00",
      "image": "https://images.unsplash.com/photo-1558030006-450675393462?w=400"
    },
    {
      "name": "Filet de Perche",
      "description": "Filets de perche meunière, pommes nature et salade",
      "price": "CHF 32.00",
      "image": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400"
    },
    {
      "name": "Côtelettes d'Agneau",
      "description": "Côtelettes d'agneau du Valais, gratin dauphinois",
      "price": "CHF 36.00",
      "image": "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400"
    },
    {
      "name": "Plat du Jour",
      "description": "Notre suggestion du chef, change quotidiennement",
      "price": "CHF 24.00",
      "image": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400"
    },
    {
      "name": "Raclette Valaisanne",
      "description": "Fromage à raclette AOP, pommes en robe des champs",
      "price": "CHF 28.00",
      "image": "https://images.unsplash.com/photo-1619740455993-9e4e0b5e9f0f?w=400"
    },
    {
      "name": "Fondue Moitié-Moitié",
      "description": "Fondue traditionnelle vaudoise et fribourgeoise",
      "price": "CHF 26.00",
      "image": "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400"
    }
  ],
  "fromages": [
    {
      "name": "Assiette de Fromages",
      "description": "Sélection de fromages suisses et valaisans",
      "price": "CHF 14.00",
      "image": "https://images.unsplash.com/photo-1452195100486-9cc805987862?w=400"
    },
    {
      "name": "Tarte aux Pommes Maison",
      "description": "Tarte fine aux pommes, crème fouettée",
      "price": "CHF 9.00",
      "image": "https://images.unsplash.com/photo-1535920527002-b35e96722eb9?w=400"
    },
    {
      "name": "Mousse au Chocolat",
      "description": "Mousse au chocolat noir, chantilly",
      "price": "CHF 8.50",
      "image": "https://images.unsplash.com/photo-1541599468348-e96984315921?w=400"
    },
    {
      "name": "Coupe de Glaces",
      "description": "Trois boules au choix, chantilly et sauce",
      "price": "CHF 10.00",
      "image": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400"
    },
    {
      "name": "Crème Brûlée",
      "description": "Crème brûlée vanille, biscuit maison",
      "price": "CHF 9.50",
      "image": "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=400"
    }
  ]
}
```

4. Cliquez sur **Créer**

---

## ✏️ Comment Modifier la Carte

### Ajouter un nouveau plat

1. Allez dans **Contenu** → Trouvez le contenu "menu" du site
2. Cliquez sur **Modifier**
3. Dans le JSON, ajoutez un nouveau plat dans la catégorie appropriée :

```json
{
  "name": "Nom du plat",
  "description": "Description du plat",
  "price": "CHF XX.XX",
  "image": "URL_de_l_image"
}
```

4. Sauvegardez
5. **Les changements sont instantanés** sur le site !

### Modifier un plat existant

1. Trouvez le plat dans le JSON
2. Modifiez le nom, la description, le prix ou l'image
3. Sauvegardez
4. Rafraîchissez le site pour voir les changements

### Supprimer un plat

1. Supprimez l'objet JSON du plat
2. Sauvegardez

---

## 🖼️ Images

Pour les images, vous pouvez utiliser :
- **Unsplash** : https://unsplash.com (images gratuites)
- **Vos propres images** : uploadez-les sur un service d'hébergement
- **Format recommandé** : JPG ou PNG, optimisées pour le web

---

## 🔄 Mettre à Jour le Site

### Modifications de la carte
✅ **Aucun redéploiement nécessaire**
- Les changements dans le CMS Admin sont instantanés
- Il suffit de rafraîchir la page du site

### Modifications du code
❌ **Redéploiement nécessaire**
- Si vous modifiez le design, les pages statiques, etc.
- Utilisez le script `deploy.sh` sur le serveur

---

## 📊 Structure des Données

Le menu est organisé en 3 catégories :

1. **entrees** : Entrées & Végétarien
2. **viandes** : Viandes & Poissons
3. **fromages** : Fromages & Desserts

Chaque plat contient :
- `name` : Nom du plat
- `description` : Description courte
- `price` : Prix au format "CHF XX.XX"
- `image` : URL de l'image (400px de largeur recommandé)

---

## ✅ Checklist de Configuration

- [ ] Site créé dans le CMS Admin
- [ ] SEO configuré pour toutes les pages
- [ ] Contenu menu créé avec les 3 catégories
- [ ] Au moins 3-4 plats par catégorie
- [ ] Images de qualité pour chaque plat
- [ ] Prix à jour
- [ ] Test sur le site en production

---

## 🆘 Dépannage

### La carte ne se charge pas
- Vérifiez que le contenu de type "menu" existe
- Vérifiez que le site est actif
- Vérifiez que le JSON est valide (pas d'erreur de syntaxe)

### Les changements n'apparaissent pas
- Rafraîchissez la page (Ctrl+F5 ou Cmd+Shift+R)
- Vérifiez que vous avez bien sauvegardé dans le CMS
- Vérifiez les logs du backend CMS

### Erreur JSON
- Utilisez un validateur JSON : https://jsonlint.com
- Vérifiez les virgules, guillemets et accolades
- Chaque plat doit être séparé par une virgule (sauf le dernier)

---

## 📞 Support

Pour toute question, consultez la documentation complète dans `DEPLOYMENT.md`
