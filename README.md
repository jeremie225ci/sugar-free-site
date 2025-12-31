# Sugar Free AI - Site Web & SEO Strategy

## 🎯 Objectif du projet

Ce site web fait partie de la stratégie d'acquisition pour l'application **Sukali** - une app iOS/Android qui aide les utilisateurs à arrêter de consommer du sucre en scannant leurs repas avec l'IA.

**Mission** : Attirer du trafic organique via le SEO, éduquer les visiteurs sur les dangers du sucre, et les convertir en téléchargements de l'app.

---

## 📊 Stack technique

- **Framework** : Next.js 15 (App Router)
- **Styling** : Tailwind CSS
- **Hébergement** : Vercel (déploiement automatique via Git push)
- **Domaine** : https://www.sugar-frees.com

---

## 🗂 Structure du projet

```
├── app/
│   ├── page.tsx           # Page d'accueil
│   ├── blog/
│   │   ├── page.tsx       # Liste des articles
│   │   └── [slug]/page.tsx # Article individuel
│   ├── food/
│   │   ├── page.tsx       # Liste des recettes
│   │   └── [slug]/page.tsx # Recette individuelle
│   ├── sitemap.ts         # Sitemap dynamique
│   └── robots.ts          # Configuration robots.txt
├── data/
│   ├── blog.ts            # Articles de blog (array)
│   ├── recipes.json       # Recettes (84+)
│   └── index.ts           # Helpers pour les données
├── components/
│   ├── AppPromoPopup.tsx  # Popup de téléchargement
│   ├── StickyDownloadBar.tsx # Barre de téléchargement fixe
│   └── ...
└── public/assets/images/  # Images des articles et recettes
```

---

## 🚀 Stratégie SEO actuelle

### Approche "Funnel de contenu"

1. **Attirer** : Cibler des mots-clés à fort volume (ex: "is thai food healthy", "pink salt trick for weight loss")
2. **Éduquer** : Dans chaque article, expliquer que le SUCRE est le vrai problème
3. **Convertir** : CTA vers l'app Sukali + popup de téléchargement

### Mots-clés prioritaires

| Catégorie | Exemples | Volume |
|-----------|----------|--------|
| Weight Loss | "pink salt trick", "coffee method for weight loss" | >1000 |
| Healthy Food | "is chinese food healthy", "is thai food healthy" | >1000 |
| Sugar + Acne | "does sugar cause acne", "foods that cause acne" | <100 |

### Objectif de publication

- **2-5 articles par jour** ciblant des mots-clés weight loss/healthy food
- Chaque article redirige vers le message: "Le vrai problème c'est le SUCRE"

---

## 📝 Comment ajouter un nouvel article

### 1. Ajouter l'entrée dans `data/blog.ts`

```typescript
{
    slug: "mon-nouvel-article",
    title: "Titre SEO optimisé avec mot-clé",
    excerpt: "Description courte (meta description)",
    content: `
Contenu de l'article en markdown...

## Section 1
Texte...

## Section 2
Texte...
    `,
    image: "/assets/images/mon-image.png",
    category: "Weight Loss", // ou "Skin Health", "Recipes", "Lifestyle"
    author: "Sukali Team",
    date: "2024-12-31",
    readTime: 8
}
```

### 2. Ajouter l'image

- Copier l'image dans `/public/assets/images/`
- Format recommandé: PNG ou JPG
- Taille: 1200x630px pour les OG images

### 3. Build et déployer

```bash
npm run build  # Vérifier qu'il n'y a pas d'erreurs
git add -A
git commit -m "feat: add article [titre]"
git push  # Déclenche le déploiement Vercel automatique
```

### 4. Demander l'indexation

- Aller sur Google Search Console
- URL Inspection → Entrer l'URL du nouvel article
- Cliquer "Request Indexing"

---

## 🔧 Corrections SEO effectuées (31 Dec 2024)

### Issues Ahrefs corrigées:

- ✅ H1 multiples → Fixé dans `food/[slug]/page.tsx`
- ✅ Titres trop longs → Raccourcis à <60 caractères
- ✅ Meta descriptions trop longues → Tronquées à 155 caractères
- ✅ Open Graph incomplet → Ajout de og:image dans `layout.tsx`
- ✅ URLs BreadcrumbList incorrectes → sukali.app → sugar-frees.com
- ✅ Pages légales non dans sitemap → Ajoutées

---

## 📈 Suivi des performances

### Google Search Console

- URL: https://search.google.com/search-console
- Vérifier: Couverture, Performances, Sitemaps

### Ahrefs

- Audit du site
- Suivi des mots-clés
- Backlinks

---

## 🎯 Prochaines étapes

1. **Content Blitz** : Publier 100 articles en 30 jours
2. **Reddit/Quora** : Participer aux communautés r/acne, r/sugarfree
3. **YouTube outreach** : Contacter des créateurs skincare/nutrition
4. **Monitorer GSC** : Suivre l'indexation et les performances

---

## 📞 Ressources

- **App Store (iOS)** : https://apps.apple.com/us/app/sukali-umax-no-sugar/id6749379303
- **Play Store (Android)** : https://play.google.com/store/apps/details?id=app.sukali
- **GitHub** : https://github.com/jeremie225ci/sugar-free-site
