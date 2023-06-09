import { readFileSync, createWriteStream } from "fs";
import { Graphe } from "./Graphe"
import { Arc } from "./Arc"


export class GrapheOriente extends Graphe {
// Définition de la classe
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
    } // Lis un fichier de graphe orienté (peu importe l'extension) et l'applique au graphe

    save(fileName: string): void {
        let output = createWriteStream(`./src/graphe/export/${fileName}.gro`);
        let text: string = `${this.nbrSommet} ${this.nbrArc}`
        for (const arc of this.listeArc) {
            text += `\n${arc.sommet} ${arc.destination} ${arc.poids}`
        }
        output.write(text);
        output.end();
    } // Enregistre le graphe orienté dans un fichier .gro


}