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
        if (!lignes || lignes.length == 0) throw Error("Chemin spécifié incorrect.")
        this.nbrSommet = parseInt(lignes[0].split(" ")[0])
        this.nbrArc = parseInt(lignes[0].split(" ")[1])

        for (let i = 1; i < lignes.length; i++) {
            let info = lignes[i].split(" ")

            if (info.length == 0) break;
            this.listeArc.push(new Arc(info[0], info[1], parseInt(info[2])))
            this.listeSommets.push(info[0], info[1])
        }

        if (this.listeArc.length != this.nbrArc) throw Error("Le nomdre d'arc spécifié et le nombre d'arc réel diffèrent.")
        this.listeSommets = [...new Set(this.listeSommets)]
    }

    save(fileName: string): void {
        let output = createWriteStream(`./src/graphe/dag/${fileName}.gr`);
        let text: string = `${this.nbrSommet} ${this.nbrArc}`
        for (const arc of this.listeArc) {
            text += `\n${arc.sommet} ${arc.destination} ${arc.poids}`
        }
        output.write(text);
        output.end();
    }

        // if(!this.listeSommets.includes(racine.toString())) throw new Error("Ce sommet n'appartient pas au graphe, l'algorithme ne peut se dérouler.")
    bellman(racine: number | string, min: boolean, anti: boolean) {

        let virtualListeArc = anti ? this.listeArc.map(arc => new Arc(arc.destination,arc.sommet,arc.poids)) : this.listeArc
        let distance: any = {};
        let predecessor: any = {};

        this.listeSommets.map(v => {
            distance[v] = min ? Infinity : -Infinity;
            predecessor[v] = null;
        });

        distance[racine] = 0;

        for (let i = 1; i < this.listeSommets.length; i++) {
            for (let { sommet, destination, poids } of virtualListeArc) {
                if ((min && distance[sommet] + poids < distance[destination]) ||
                    (!min && distance[sommet] + poids > distance[destination])) {
                    distance[destination] = distance[sommet] + poids;
                    predecessor[destination] = sommet;
                }
            }
        }

        for (let { sommet, destination, poids } of virtualListeArc) {
            if ((min && distance[sommet] + poids < distance[destination]) ||
                (!min && distance[sommet] + poids > distance[destination])) {
                throw "Le graphe contient un circuit négatif";
            }
        }

        return { distance, predecessor };
    }

        // 

    //   To-Do : Anti Arborescence
}