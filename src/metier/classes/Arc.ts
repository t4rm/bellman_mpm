export class Arc {
    private _sommet: string
    private _destination: string
    private _poids: number

    constructor(sommet: string, destination: string, poids: number) {
        this._sommet = sommet
        this._destination = destination
        this._poids = poids
    }

    public get sommet(): string { return this._sommet }
    public get destination(): string { return this._destination }
    public get poids(): number { return this._poids }

    public set sommet(v: string) { this._sommet = v }
    public set destination(v: string) { this._destination = v }
    public set poids(v: number) { this._poids = v }
}