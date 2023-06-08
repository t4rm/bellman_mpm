import { Arc } from "./Arc"

export class Graphe {
    private _nbrSommet: number
    private _nbrArc: number
    private _listeArc: Arc[]
    private _listeSommets: string[]

    constructor() {
        this._listeArc = []
        this._listeSommets = []
    }

    public get nbrSommet(): number { return this._nbrSommet }
    public get nbrArc(): number { return this._nbrArc }
    public get listeArc(): Array<Arc> { return this._listeArc }
    public get listeSommets(): Array<string> { return this._listeSommets }
    
    public set listeSommets(array: Array<string>) {this._listeSommets = array}
    public set nbrSommet(value: number) {this._nbrSommet = value}
    public set nbrArc(value: number) {this._nbrArc = value}
    public set listeArc(array: Array<Arc>) {this._listeArc = array}
    

    print(): void {
        console.info(`Liste des Sommets :`)
        console.log(this.listeSommets)
        console.info(`Liste des Arcs :`)
        console.table(this.listeArc)
    }

    // Créer méthode add/remove Arc
    // Idem avec Points

    // mettre des checkers dedans d'1 pierre 2 coups

    // liste d'adjacence
}