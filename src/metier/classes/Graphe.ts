import { readFileSync, createWriteStream, writeFileSync } from "fs";
import { Arc } from "./Arc"
import { colors } from "../util/cssColors"

export class Graphe {
    private _nbrSommet: number
    private _nbrArc: number
    private _listeArc: Arc[]
    private _listeSommets: string[]
    private _adjacence: { [sommet: string]: string[] };

    constructor() {
        this._listeArc = [];
        this._listeSommets = [];
        this._adjacence = {};
    }

    public get nbrSommet(): number { return this._nbrSommet }
    public get nbrArc(): number { return this._nbrArc }
    public get listeArc(): Array<Arc> { return this._listeArc }
    public get listeSommets(): Array<string> { return this._listeSommets }
    public get adjacence(): { [sommet: string]: Array<string> } { return this._adjacence }

    // public set listeSommets(array: Array<string>) { this._listeSommets = array }
    public set nbrSommet(value: number) { this._nbrSommet = value }
    public set nbrArc(value: number) { this._nbrArc = value }
    public set listeArc(array: Array<Arc>) { this._listeArc = array }

    public ajouterSommet(sommets: string[]) {
        for (const sommet of sommets) {
            if (!this._listeSommets.includes(sommet)) {
                this._listeSommets.push(sommet);
                this._adjacence[sommet] = [];
            }
        }
    }

    public retirerSommet(sommet: string) {
        if (this._listeSommets.includes(sommet)) {
            this._listeSommets.splice(this._listeSommets.indexOf(sommet), 1)
            this._listeArc = this._listeArc.filter(arc => arc.sommet != sommet && arc.destination != sommet)
        }
    }

    public ajouterArc(arc: Arc) {
        if (!this._listeArc.includes(arc)) {
            this._listeArc.push(arc);

            this.ajouterSommet([arc.sommet, arc.destination])
            this._adjacence[arc.sommet].push(arc.destination)
        }
    }

    public retirerArc(sommet: string, destination: string, poids: number) {
        const index = this._listeArc.findIndex(arc => arc.sommet === sommet && arc.destination === destination && arc.poids === poids);

        if (index !== -1) {
            const arc = this._listeArc[index];
            this._listeArc.splice(index, 1);

            const sommetIndex = this._adjacence[arc.sommet].indexOf(arc.destination);
            if (sommetIndex !== -1) {
                this._adjacence[arc.sommet].splice(sommetIndex, 1);
            }

            // Vérifier si le sommet n'a plus d'arcs adjacents et le supprimer le cas échéant
            if (this._adjacence[arc.sommet].length === 0) {
                delete this._adjacence[arc.sommet];
                const sommetIndex = this._listeSommets.indexOf(arc.sommet);
                if (sommetIndex !== -1) {
                    this._listeSommets.splice(sommetIndex, 1);
                }
            }
        }
    }


    print(): void {
        console.info(`Liste des Sommets : ${this.listeSommets.sort().join(", ")}`)
        console.info(`Liste des Arcs :`)
        console.table(this.listeArc)
    }

    export():void {
        let array1:any = []
        let array2:any = []
    
        
        this.listeSommets.forEach(sommet => {
            array1.push({key: sommet, color: colors[Math.floor(Math.random() * colors.length)]??"blue"})
        })
    
        this.listeArc.forEach(arc => {
            array2.push({from: arc.sommet, to: arc.destination})
        })
              
        console.info(`Votre graphe est visualisable ici : "./src/test/visualizer.html"`)
        // const jsonContent = JSON.stringify({array1, array2});

        let output = createWriteStream(`./src/bonus/exportedData.json`);
        let text: string = `${JSON.stringify({array1,array2})}`
        
        output.write(text);
        output.end();

    }

} //  abstract class