import { readFileSync, createWriteStream } from "fs";

class Graphe {
    private _nbrSommet: number
    private _nbrArc: number
    private _listeArc: Arc[]
    private _listeSommets: number[]

    constructor(filePath?: string) {
        this._listeArc = []
        this._listeSommets = []
        if (filePath) this.read(filePath);
    }

    public get nbrSommet(): number { return this._nbrSommet }
    public get nbrArc(): number { return this._nbrArc }
    public get listeArc(): Array<Arc> { return this._listeArc }
    public get listeSommets(): Array<number> { return this._listeSommets }

    read(filePath: string): void {
        let lignes = readFileSync(filePath, "utf8").split("\n");
        if (!lignes || lignes.length == 0) throw Error("Chemin spécifié incorrect.")
        this._nbrSommet = parseInt(lignes[0].split(" ")[0])
        this._nbrArc = parseInt(lignes[0].split(" ")[1])

        for (let i = 1; i < lignes.length; i++) {
            let info = lignes[i].split(" ").map(function (str) {
                return parseInt(str)
            })

            if (isNaN(info[0])) break;
            this._listeArc.push(new Arc(info[0], info[1], info[2]))
            this._listeSommets.push(info[0])
            this._listeSommets.push(info[1])
        }

        if (this._listeArc.length != this._nbrArc) throw Error("Le nomdre d'arc spécifié et le nombre d'arc réel diffèrent.")
        this._listeSommets = [...new Set(this._listeSommets)]
        // verif que le nombre de sommet = la liste de somemts uniques 
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

}

class GrapheOriente extends Graphe {

    bellman(racine: number, min: boolean) {
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
            throw "Graph contains a negative-weight cycle";
          }
        }
      
        console.table({distance, predecessor});
        return { distance, predecessor };
      }

    //   To-Do : Anti Arborescence
    //   Prise en charge des sommets alphabétiques (int -> string)
}

class Arc {
    private _sommet: number
    private _destination: number
    private _poids: number

    constructor(sommet: number, destination: number, poids: number) {
        this._sommet = sommet
        this._destination = destination
        this._poids = poids
    }

    public get sommet(): number { return this._sommet }
    public get destination(): number { return this._destination }
    public get poids(): number { return this._poids }
}

function main(): void {
    let a = new GrapheOriente("src/graphe/dag/dag_10_1.gr")

    a.bellman(9, false)
}

main()