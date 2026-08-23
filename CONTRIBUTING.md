# Contribuer à Immotop Companion

Merci de l'intérêt porté à ce projet ! Les contributions sont les bienvenues, qu'il s'agisse de
rapports de bugs, de suggestions ou de pull requests.

## Signaler un bug ou proposer une idée

Ouvre une [issue](https://github.com/clawfire/immotop-companion/issues/new/choose) en utilisant le
modèle le plus adapté (bug ou fonctionnalité). Plus le contexte est précis (étapes de
reproduction, capture d'écran, URL immotop.lu concernée), plus il sera facile d'agir dessus.

## Proposer une modification (pull request)

1. Fork le dépôt et crée une branche depuis `main` : `git checkout -b ma-fonctionnalite`.
2. Installe les dépendances : `npm install`.
3. Développe en local avec `npm run dev`, ou build avec `npm run build` puis charge le dossier
   `dist/` dans Chrome (`chrome://extensions` → mode développeur → "Charger l'extension non
   empaquetée").
4. Vérifie que l'extension fonctionne toujours sur une page de résultats
   [immotop.lu](https://www.immotop.lu) avant de proposer ta modification (blocage/déblocage d'un
   vendeur, export/import, changement de langue).
5. Fais des commits clairs et atomiques.
6. Ouvre une pull request en décrivant le changement et la façon dont tu l'as testé.

## Structure du projet

Voir la section [Structure](README.md#structure) du README pour un aperçu des fichiers.

## Ajouter une langue ou corriger une traduction

Les traductions vivent dans [`src/shared/i18n.js`](src/shared/i18n.js). Chaque langue est un objet
avec les mêmes clés — merci de garder toutes les langues synchronisées (même clés partout) et de
tester le rendu dans le popup et sur une page immotop.lu avant de proposer un changement.

## Style de code

- Pas de dépendance ajoutée sans raison sérieuse.
- Le content script injecté sur immotop.lu doit rester léger (pas de web components ni de requêtes
  réseau externes) pour éviter tout conflit avec la CSP du site.
- Le popup utilise [Web Awesome](https://webawesome.com) pour les composants d'interface.

## Code de conduite

Sois respectueux·se et constructif·ve. Les échanges doivent rester courtois, que ce soit dans les
issues, les pull requests ou les revues de code.
