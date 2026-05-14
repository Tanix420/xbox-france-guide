# XboxGuide.fr - Meilleures Manettes Xbox

Site d'affiliation Amazon focalisé sur le marché français.

## Déploiement

Ce site est déployé sur GitHub Pages : https://tanix420.github.io/xbox-france-guide

## SEO

- Sitemap XML : `/sitemap.xml`
- Robots.txt : `/robots.txt`
- Schema FAQ intégré

## Pour soumettre à Google Search Console

1. Allez sur https://search.google.com/search-console
2. Ajoutez une propriété (URL prefix)
3. Vérifiez la propriété (recommandé: enregistrement DNS TXT ou fichier HTML)
4. Soumettez le fichier `sitemap.xml` dans l'onglet "Sitemap"

## Structure

```
├── index.html      # Page principale
├── style.css       # Styles CSS
├── app.js          # Logique JS (affichage produits)
├── data/
│   └── products.json  # Données produits Amazon
├── sitemap.xml     # Plan du site pour moteurs de recherche
└── robots.txt      # Instructions pour bots
```