# Immotop Companion

Extension Chrome (Manifest V3) qui permet de masquer, sur les résultats de recherche
[immotop.lu](https://www.immotop.lu), toutes les annonces d'un vendeur professionnel ou d'une
agence en un clic. Construite avec [Vite](https://vitejs.dev), [@crxjs/vite-plugin](https://crxjs.dev)
et [Web Awesome](https://webawesome.com) pour l'UI du popup.

## Fonctionnement

- Sur une page de résultats de recherche, un petit bouton apparaît au survol du logo de chaque
  agence/vendeur professionnel (les annonces de particuliers, sans logo, ne sont pas concernées).
- Un clic sur ce bouton ajoute le vendeur à la liste de blocage. Ses annonces restent visibles sur
  la page mais sont floutées, avec un message indiquant le vendeur bloqué et un bouton "Afficher
  quand même" pour la révéler ponctuellement (un toast avec "Annuler" apparaît aussi en bas de
  l'écran juste après le blocage).
- Le vendeur est identifié par l'image de son logo (unique par vendeur), pas par son nom, ce qui
  évite les faux positifs entre agences aux noms proches.
- Les nouvelles annonces chargées dynamiquement (défilement infini, changement de page) sont
  automatiquement floutées si elles appartiennent à un vendeur déjà bloqué.
- Le popup de l'extension (icône dans la barre d'outils) liste les vendeurs bloqués et permet de :
  - retirer un vendeur de la liste (ses annonces redeviennent visibles),
  - exporter la liste au format JSON,
  - importer une liste JSON précédemment exportée (fusion avec la liste existante).

## Développement

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Charger ensuite le dossier `dist/` dans Chrome via `chrome://extensions` → mode développeur →
"Charger l'extension non empaquetée".

## Structure

- `manifest.json` — manifeste de l'extension (MV3)
- `src/popup/` — popup de l'extension : liste des vendeurs bloqués, export/import (HTML + Web Awesome)
- `src/background/` — service worker (met à jour le badge avec le nombre de vendeurs bloqués)
- `src/content/` — content script injecté sur immotop.lu : détecte les logos d'agences dans les
  résultats de recherche, ajoute le bouton de blocage et masque les annonces bloquées
- `src/shared/storage.js` — accès partagé à `chrome.storage.local` (liste des vendeurs bloqués)
- `public/icons/` — icônes (placeholders à remplacer)
