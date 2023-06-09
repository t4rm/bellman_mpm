export class Arc {
    private _sommet: string;
    private _destination: string;
    private _poids: number;

    constructor(sommet: string, destination: string, poids: number) {
        this._sommet = sommet;
        this._destination = destination;
        this._poids = poids;
    }

    public get sommet(): string {
        return this._sommet;
    }

    public set sommet(v: string) {
        if (v === "") throw new Error("Le sommet ne peut pas être vide.");
        this._sommet = v;
    }

    public get destination(): string {
        return this._destination;
    }

    public set destination(v: string) {
        if (v === "") throw new Error("La destination ne peut pas être vide.");
        this._destination = v;
    }

    public get poids(): number {
        return this._poids;
    }

    public set poids(v: number) {
        if (v < 0) throw new Error("Le poids doit être positif.");
        this._poids = v;
    }
}
