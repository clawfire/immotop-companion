# Chrome Web Store Developer Dashboard — réponses à préparer

Aide-mémoire pour remplir le Developer Dashboard lors de la soumission. À copier-coller aux
endroits correspondants.

## Privacy practices

**Description de l'objectif unique (single purpose) :**

> Immotop Companion permet aux utilisateurs de masquer, sur les résultats de recherche
> d'immotop.lu, toutes les annonces d'un vendeur professionnel ou d'une agence qu'ils choisissent
> de bloquer, avec un panneau permettant de consulter et retirer les vendeurs bloqués.

**Justification de la permission `storage` :**

> Utilisée pour enregistrer localement, dans le navigateur, la liste des vendeurs bloqués par
> l'utilisateur ainsi que sa préférence de langue, afin que ces choix soient conservés d'une
> session à l'autre. Aucune donnée ne quitte l'appareil.

**Justification de l'accès à l'hôte** (`immotop.lu` / `www.immotop.lu`, déclaré via
`content_scripts` plutôt que `host_permissions`) :

> Le content script s'exécute uniquement sur les pages de résultats de recherche d'immotop.lu,
> pour y détecter les logos d'agences déjà affichés sur la page et y superposer un bouton de
> blocage ainsi qu'un overlay de floutage. Il ne lit, ne modifie et ne transmet aucune autre
> donnée de la page.

**Utilisez-vous du code distant (remote code) ?**

> Non. L'ensemble du code JavaScript et CSS est empaqueté dans l'extension au moment du build
> (bundle Vite). Aucun script n'est chargé ou exécuté depuis un serveur distant à l'exécution.

Versions anglaises équivalentes (si le Dashboard est en anglais) :

- Single purpose: *"Immotop Companion lets users hide, on immotop.lu search results, all
  listings from a professional seller or agency they choose to block, with a management panel to
  review and remove blocked sellers."*
- `storage` justification: *"Used to save the user's blocked-seller list and language preference
  locally in the browser, so their choices persist between sessions. No data leaves the device."*
- Host permission justification: *"The content script only runs on immotop.lu search-results
  pages to detect agency logos already shown on the page and overlay a block button / blur mask.
  It does not read, modify, or transmit any other page data."*
- Remote code: *"No. All JavaScript/CSS is bundled into the extension at build time (Vite
  bundle). No script is loaded or executed from a remote server at runtime."*

**Data usage**

Aucune des catégories de données personnelles/sensibles listées par le formulaire n'est
collectée (pas de données de navigation transmises, pas d'identifiants, pas de localisation, pas
de données financières ou de santé, pas de contenu utilisateur transmis à un tiers). Tout est
stocké localement via `chrome.storage.local` et ne quitte jamais l'appareil.

**Privacy policy URL**

`https://github.com/clawfire/immotop-companion/blob/main/PRIVACY.md`

(Si le Dashboard exige une page web classique plutôt qu'un fichier Markdown GitHub, activer
GitHub Pages sur le dépôt et republier `PRIVACY.md` en `.html`, ou coller le contenu sur une page
dédiée.)

## Store listing

- **Catégorie :** Productivité (Productivity)
- **Type de rémunération :** Gratuit (Free), pas de paiement intégré
- **Fiches multilingues :** voir `listing-fr.md`, `listing-en.md`,
  `listing-other-languages.md`
- **Icône du store (128×128) :** `public/icons/icon128.png` (générée depuis `design/icon.svg`)
- **Captures d'écran (1280×800 ou 640×400, au moins une requise) :** à produire séparément —
  suggestion : une capture des résultats de recherche immotop.lu avec une annonce floutée et le
  bouton de blocage visible, une capture du popup avec quelques vendeurs bloqués.

## Distribution

- **Visibility:** Public
- **Régions :** toutes, ou a minima Luxembourg/France/Belgique/Allemagne/Portugal vu les langues
  supportées.
