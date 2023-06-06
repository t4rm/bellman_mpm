import { Graphe } from "./Graphe"

export class GrapheOriente extends Graphe {

    bellman(racine: number | string, min: boolean) {
        let distance: any = {};
        let predecessor: any = {};

        this.listeSommets.map(v => {
            distance[v] = min ? Infinity : -Infinity;
            predecessor[v] = null;
        });

        distance[racine] = 0;

        for (let i = 1; i < this.listeSommets.length; i++) {
            for (let { sommet, destination, poids } of this.listeArc) {
                if ((min && distance[sommet] + poids < distance[destination]) ||
                    (!min && distance[sommet] + poids > distance[destination])) {
                    distance[destination] = distance[sommet] + poids;
                    predecessor[destination] = sommet;
                }
            }
        }

        for (let { sommet, destination, poids } of this.listeArc) {
            if ((min && distance[sommet] + poids < distance[destination]) ||
                (!min && distance[sommet] + poids > distance[destination])) {
                throw "Le graphe contient un circuit négatif";
            }
        }

        console.table({ distance, predecessor });
        return { distance, predecessor };
    }

    //   To-Do : Anti Arborescence
}