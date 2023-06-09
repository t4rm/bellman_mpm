import { readFileSync, createWriteStream } from "fs";
import { Graphe } from "./Graphe"
import { Arc } from "./Arc"


export class GrapheOriente extends Graphe {

    constructor(filePath?: string) {
        super()
        if (filePath) this.read(filePath);
    }

    read(filePath: string): void {
        let lignes = readFileSync(filePath, "utf8").split("\n");
        if (!lignes || lignes.length == 0) throw new Error("Chemin spécifié incorrect.")
        this.nbrSommet = parseInt(lignes[0].split(" ")[0])
        this.nbrArc = parseInt(lignes[0].split(" ")[1])

        for (let i = 1; i < lignes.length; i++) {
            let info = lignes[i].split(" ")

            if (info.length == 0) break;
            this.ajouterArc(new Arc(info[0], info[1], parseInt(info[2])))
        }

        if (this.listeArc.length != this.nbrArc) throw Error("Le nomdre d'arc spécifié et le nombre d'arc réel diffèrent.")
    }

    save(fileName: string): void {
        let output = createWriteStream(`./src/graphe/export/${fileName}.gr`);
        let text: string = `${this.nbrSommet} ${this.nbrArc}`
        for (const arc of this.listeArc) {
            text += `\n${arc.sommet} ${arc.destination} ${arc.poids}`
        }
        output.write(text);
        output.end();
    }

    // if(!this.listeSommets.includes(racine.toString())) throw new Error("Ce sommet n'appartient pas au graphe, l'algorithme ne peut se dérouler.")
    bellman(racine: number | string, min: boolean, anti: boolean) {
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
        }

        return { distance, predecesseur };
    }



}