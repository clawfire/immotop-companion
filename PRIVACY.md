# Politique de confidentialité — Immotop Companion

Dernière mise à jour : 2026-08-23

## Résumé

Immotop Companion ne collecte, ne transmet, ne vend et ne partage **aucune donnée**. Tout ce que
l'extension enregistre reste sur votre appareil, dans le stockage local de votre navigateur.

## Données stockées localement

L'extension utilise l'API `chrome.storage.local` pour enregistrer, uniquement sur votre machine :

- la liste des vendeurs/agences que vous avez bloqués sur immotop.lu (identifiant technique du
  logo, nom affiché, date de blocage) ;
- votre préférence de langue d'interface.

Ces données ne quittent jamais votre navigateur : elles ne sont envoyées à aucun serveur, y
compris ceux de l'auteur de l'extension. Aucun compte, aucune inscription, aucun identifiant
personnel n'est requis ou collecté.

## Fonctionnement sur immotop.lu

L'extension s'exécute uniquement sur les pages de résultats de recherche de immotop.lu et
www.immotop.lu, pour y détecter les logos d'agences déjà visibles dans la page et y superposer un
bouton de blocage ainsi qu'un overlay visuel. Elle ne lit, ne modifie et ne transmet aucune autre
information de la page.

## Export / import

La fonction d'export du popup génère un fichier JSON contenant votre liste de vendeurs bloqués et
votre préférence de langue ; ce fichier est enregistré directement sur votre appareil via le
mécanisme de téléchargement du navigateur, sans passer par un serveur tiers. L'import fonctionne
de la même façon, en local.

## Code source

Le code source complet est public et peut être audité librement :
https://github.com/clawfire/immotop-companion

## Contact

Pour toute question relative à cette politique de confidentialité :
[Thibault Milan](https://thibaultmilan.com).
