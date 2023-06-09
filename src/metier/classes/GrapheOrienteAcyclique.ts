import { Arc } from "./Arc"
import { GrapheOriente } from "./GrapheOriente";


export class GrapheOrienteAcyclique extends GrapheOriente {
    // Définition de la classe à partir d'un Graphe Orienté
    constructor(filePath?: string) {
        super()
        if (filePath) this.read(filePath);
        // Possibilité de vérifier que le graphe entrer est acyclique cependant l'algorithme de Bellman l'effectue déjà
    }



    bellman(racine: number | string, min: boolean, anti: boolean) {
        if (!this.listeSommets.includes(racine.toString())) throw new Error("Ce sommet n'appartient pas au graphe, l'algorithme renvoie des chemins infinis pour chaque sommet.")
        let virtualListeArc = anti ? this.listeArc.map(arc => new Arc(arc.destination, arc.sommet, arc.poids)) : this.listeArc
        let distance: any = {};
        let predecesseur: any = {};

        this.listeSommets.map(v => {
            distance[v] = min ? Infinity : -Infinity;
            predecesseur[v] = null;
        });

        distance[racine] = 0;

        for (let i = 1; i < this.listeSommets.length; i++) {
            for (let { sommet, destination, poids } of virtualListeArc) {
                const expression = min ? distance[sommet] + poids < distance[destination] : distance[sommet] + poids > distance[destination]
                if (expression) {
                    distance[destination] = distance[sommet] + poids;
                    predecesseur[destination] = sommet;
                }
            }
        }

        for (let { sommet, destination, poids } of virtualListeArc) {
            const expression = min ? distance[sommet] + poids < distance[destination] : distance[sommet] + poids > distance[destination]
            if (expression) throw new Error("Le graphe contient un circuit négatif"); // Cette vérification permets de ne pas avoir à effectuer de Tri Topologique pour le traitement 
            console.log(expression)
        }

        return { distance, predecesseur };
    } // Effectue l'algorithme de Bellman tout en vérifiant que le graphe est acyclique, dans le cas où il l'est, une exception est levée.



}