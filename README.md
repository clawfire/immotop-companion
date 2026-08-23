# Immotop Companion

Extension Chrome (Manifest V3) qui permet de masquer, sur les résultats de recherche
[immotop.lu](https://www.immotop.lu), toutes les annonces d'un vendeur professionnel ou d'une
agence en un clic. Construite avec [Vite](https://vitejs.dev), [@crxjs/vite-plugin](https://crxjs.dev)
et [Web Awesome](https://webawesome.com) pour l'UI du popup.

> Projet non-officiel, non affilié à immotop.lu.

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
  - importer une liste JSON précédemment exportée (fusion avec la liste existante),
  - changer la langue de l'interface (Français, Deutsch, English, Português, Lëtzebuergesch).
- La langue est auto-détectée à partir du navigateur au premier lancement, mais peut être forcée
  manuellement dans le popup ; le choix est mémorisé et s'applique instantanément à la popup et aux
  éléments injectés sur immotop.lu (bouton de blocage, overlay flouté).

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
- `src/shared/i18n.js` — traductions (FR/DE/EN/PT/LB), détection de la langue du navigateur et
  préférence de langue stockée dans `chrome.storage.local`
- `public/icons/` — icônes (placeholders à remplacer)

## Contribuer

Les bugs, idées et pull requests sont les bienvenus — voir [CONTRIBUTING.md](CONTRIBUTING.md).
Pour signaler un problème ou proposer une fonctionnalité, ouvre une
[issue](https://github.com/clawfire/immotop-companion/issues/new/choose).

## Auteur

Développé par [Thibault Milan](https://thibaultmilan.com).

## Licence

Distribué sous licence [CC BY-NC-SA 4.0](LICENSE) (Attribution - Pas d'utilisation commerciale -
Partage dans les mêmes conditions) — usage et modification libres pour tout ce qui n'est pas
commercial, à condition de créditer l'auteur et de partager les versions modifiées sous la même
licence. Pour un usage commercial, contacte l'auteur.
