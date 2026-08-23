# Chrome Web Store Developer Dashboard — réponses à préparer

Aide-mémoire pour remplir le Developer Dashboard lors de la soumission. À copier-coller aux
endroits correspondants.

## Privacy practices

**Single purpose description :**

> Immotop Companion lets users hide, on immotop.lu search results, all listings from a
> professional seller or agency they choose to block, with a management panel to review and
> remove blocked sellers.

**Permission justifications**

- `storage` : *"Used to save the user's blocked-seller list and language preference locally in
  the browser, so their choices persist between sessions. No data leaves the device."*
- Host access to `immotop.lu` / `www.immotop.lu` (déclaré via `content_scripts`, pas via
  `host_permissions`) : *"The content script only runs on immotop.lu search-results pages to
  detect agency logos already shown on the page and overlay a block button / blur mask. It does
  not read, modify, or transmit any other page data."*

**Are you using remote code?**

Non — tout le code JavaScript/CSS est empaqueté dans l'extension (bundle Vite), aucun script n'est
chargé depuis un serveur distant à l'exécution.

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
