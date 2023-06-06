import { readFileSync, createWriteStream } from "fs";
import { Arc } from "./Arc"

export class Graphe {
    private _nbrSommet: number
    private _nbrArc: number
    private _listeArc: Arc[]
    private _listeSommets: string[]

    constructor(filePath?: string) {
        this._listeArc = []
        this._listeSommets = []
        if (filePath) this.read(filePath);
    }

    public get nbrSommet(): number { return this._nbrSommet }
    public get nbrArc(): number { return this._nbrArc }
    public get listeArc(): Array<Arc> { return this._listeArc }
    public get listeSommets(): Array<string> { return this._listeSommets }

    read(filePath: string): void {
        let lignes = readFileSync(filePath, "utf8").split("\n");
        if (!lignes || lignes.length == 0) throw Error("Chemin spécifié incorrect.")
        this._nbrSommet = parseInt(lignes[0].split(" ")[0])
        this._nbrArc = parseInt(lignes[0].split(" ")[1])

        for (let i = 1; i < lignes.length; i++) {
            let info = lignes[i].split(" ")

            if (info.length == 0) break;
            this._listeArc.push(new Arc(info[0], info[1], parseInt(info[2])))
            this._listeSommets.push(info[0])
            this._listeSommets.push(info[1])
        }

        if (this._listeArc.length != this._nbrArc) throw Error("Le nomdre d'arc spécifié et le nombre d'arc réel diffèrent.")
        this._listeSommets = [...new Set(this._listeSommets)]
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

    print(): void {
        console.info(`Liste des Sommets :`)
        console.log(this.listeSommets)
        console.info(`Liste des Arcs :`)
        console.table(this.listeArc)
    }

}