# SAE 2.02

Un projet réalisé par : MECHKENE Tarek et BAKHTAR Yacine.

## Installation

Utilisez [npm](https://www.npmjs.com/) pour installer les dépendances du projet.

```bash
npm i
```

## Description

Ce projet peut inclure de nouvelles classes correspondant à de nouveaux types de graphes aisément et comporte actuellement ces types de graphes :
- Graphe*
- Graphe Orienté*
- Graphe Orienté Acyclique*
- Graphe Potentiel Tache

"*" signifie Pondéré ou non.

En plus d'effectuer les algorithmes demandées dans le [sujet](https://cdn.discordapp.com/attachments/1022419294010753096/1116762354105995314/sujet_doo.pdf), le programme contient aussi une légère application Web dans le dossier ***"src/bonus"*** permettant d'afficher un Graphe (sans le poids de ses arcs) tel que sur cet [exemple **vidéo**](https://cdn.discordapp.com/attachments/1022419294010753096/1116770354887655534/demonstrationWeb.mp4), ou cette simple [image](https://media.discordapp.net/attachments/1022419294010753096/1116770599340089404/image.png?width=1609&height=905).

## Utilisation 
Des exemples d'utilisations figurent dans le fichier ***"src/metier/main.ts"*** et voici comment les lancer :
```typescript
npm run main
```
## UML
Les diagrammes UML sont diponibles dans le dossier ***"uml"*** sous format PDF et PNG (pour pouvoir zoomer) et Mermaid (Live Editor).

## Test Unitaire

Des tests unitaires figurent dans ce projet afin de s'assurer du bon fonctionnement de notre programme :
```bash
npm run tests
```

*Comme ceci a été fais en bonus, nous nous permettons d'ajouter les tests unitaires restants ultérieurement, le coverage actuel est suffisant mais peut être amélioré.*
