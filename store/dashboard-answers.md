# Chrome Web Store Developer Dashboard — réponses à préparer

Aide-mémoire pour remplir le Developer Dashboard lors de la soumission. À copier-coller aux
endroits correspondants.

## Privacy practices

**Description de l'objectif unique (single purpose) :**

> Immotop Companion permet aux utilisateurs de masquer, sur les résultats de recherche
> d'immotop.lu, toutes les annonces d'un vendeur professionnel ou d'une agence qu'ils choisissent
> de bloquer, avec un panneau permettant de consulter et retirer les vendeurs bloqués. Une
> fonctionnalité optionnelle et désactivée par défaut permet, pour un utilisateur connecté à son
> compte immotop.lu, de synchroniser ce masquage avec le bouton natif du site (donc avec l'app
> mobile) et d'aider à le défaire depuis la page des annonces masquées du compte.

**Justification de la permission `storage` :**

> Utilisée pour enregistrer localement, dans le navigateur, la liste des vendeurs bloqués par
> l'utilisateur, ses préférences (langue, activation de la synchro smartphone), l'état de
> connexion à immotop.lu détecté localement (pour ne proposer la synchro que si l'utilisateur est
> connecté), ainsi que la liste temporaire des vendeurs à restaurer manuellement côté immotop.lu.
> Aucune donnée ne quitte l'appareil.

**Justification de l'accès à l'hôte** (`immotop.lu` / `www.immotop.lu`, déclaré via
`content_scripts` plutôt que `host_permissions`) :

> Le content script s'exécute uniquement sur les pages d'immotop.lu, pour y détecter les logos
> d'agences déjà affichés sur les résultats de recherche et y superposer un bouton de blocage
> ainsi qu'un overlay de floutage. Lorsque l'utilisateur active volontairement la synchro
> smartphone (optionnelle, désactivée par défaut), il clique aussi, pour son compte, le bouton
> natif « masquer »/« rétablir » déjà présent sur ces mêmes pages immotop.lu — sans naviguer ni
> transmettre de données ailleurs. Il ne lit, ne modifie et ne transmet aucune autre donnée de la
> page.

**Utilisez-vous du code distant (remote code) ?**

> Non. L'ensemble du code JavaScript et CSS est empaqueté dans l'extension au moment du build
> (bundle Vite). Aucun script n'est chargé ou exécuté depuis un serveur distant à l'exécution.

Versions anglaises équivalentes (si le Dashboard est en anglais) :

- Single purpose: *"Immotop Companion lets users hide, on immotop.lu search results, all
  listings from a professional seller or agency they choose to block, with a management panel to
  review and remove blocked sellers. An optional, off-by-default feature lets a user who is
  signed in to their immotop.lu account sync this hiding with the site's own native button (so it
  also applies to the mobile app), and helps undo it from the account's hidden-listings page."*
- `storage` justification: *"Used to save the user's blocked-seller list, their preferences
  (language, smartphone sync toggle), the immotop.lu login state detected locally (so sync is
  only offered while signed in), and a short-lived list of sellers to restore manually on
  immotop.lu. No data leaves the device."*
- Host permission justification: *"The content script only runs on immotop.lu pages, to detect
  agency logos already shown on search results and overlay a block button / blur mask. When the
  user opts into the optional, off-by-default smartphone sync, it also clicks the site's own
  native 'hide'/'restore' button on the user's behalf, on those same immotop.lu pages — no
  navigation or data transmission elsewhere. It does not read, modify, or transmit any other page
  data."*
- Remote code: *"No. All JavaScript/CSS is bundled into the extension at build time (Vite
  bundle). No script is loaded or executed from a remote server at runtime."*

**Data usage**

Aucune des catégories de données personnelles/sensibles listées par le formulaire n'est
collectée (pas de données de navigation transmises, pas d'identifiants, pas de localisation, pas
de données financières ou de santé, pas de contenu utilisateur transmis à un tiers). Tout est
stocké localement via `chrome.storage.local` et ne quitte jamais l'appareil. L'extension ne lit
ni ne stocke d'identifiants de connexion : elle détecte seulement, via la présence/absence d'un
élément du DOM déjà public sur la page, si un compte immotop.lu est connecté ou non.

**Privacy policy URL**

`https://github.com/clawfire/immotop-companion/blob/main/PRIVACY.md`

(Si le Dashboard exige une page web classique plutôt qu'un fichier Markdown GitHub, activer
GitHub Pages sur le dépôt et republier `PRIVACY.md` en `.html`, ou coller le contenu sur une page
dédiée.)

## Reviewer test instructions

À coller dans le champ "Notes for the reviewer" / "Test instructions" du formulaire de
soumission. Limite observée : 500 caractères. En anglais, comme attendu par l'équipe de review
Google.

> No login required for core features. Open
> https://www.immotop.lu/search-list/?idContratto=2&idCategoria=1&criterio=rilevanza&__lang=en
> and wait for listings. Hover an agency logo to reveal a round button; click to blur that
> seller's listings (overlay + Undo toast). Click Show anyway to reveal one. Open the popup:
> Listings tab lists/removes blocked sellers, export/import; Settings tab has language and an
> optional Smartphone Sync toggle, disabled with an explanation unless signed in to immotop.lu.

(500 caractères)

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
