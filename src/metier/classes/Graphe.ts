import { readFileSync, createWriteStream, writeFileSync } from "fs";
import { Arc } from "./Arc"
import { colors } from "../util/cssColors"
import { triTopologique } from "../util/functions";

// La classe Graphe aurait pu être une classe abstraite cependant nous la gérons autrement. En effet, les méthodes d'ajouts et de retraits d'arc sont les mêmes pour tous les graphes et tous les graphes fonctionnent de cette manière, si le graphe est pondéré alors une pondération nulle peut être mise en place.
export class Graphe {
    // Définition de la classe, son constructeur et ses getters/setters
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

    public set nbrSommet(value: number) { this._nbrSommet = value }
    public set nbrArc(value: number) { this._nbrArc = value }
    public set listeArc(array: Array<Arc>) {
        this._listeArc = []
        array.forEach(arc => {
            this.ajouterArc(arc)
        })
    }
    public set listeSommet(array: string[]) {
        this._listeSommets = []
        this.ajouterSommet(array)
    }


    public ajouterSommet(sommets: string[]) {
        sommets = sommets.filter(sommet => sommet != "")
        for (const sommet of sommets) {
            if (!this._listeSommets.includes(sommet)) {
                this._listeSommets.push(sommet);
                this._adjacence[sommet] = [];
            }
        }
    } // Ajoute un sommet au graphe tout en vérifiant qu'il n'y est pas déjà présent

    public retirerSommet(sommet: string) {
        if (this._listeSommets.includes(sommet)) {
            0
            this._listeSommets.splice(this._listeSommets.indexOf(sommet), 1)
            this._listeArc = this._listeArc.filter(arc => arc.sommet != sommet && arc.destination != sommet)
        }
    } // Retire un sommet tout en vérifiant qu'il y figure

    public ajouterArc(arc: Arc) {
        if (arc.sommet.length === 0) throw new Error("INVALIDE | Un arc doit avoir un sommet. ")

        if (!this._listeArc.some(
            (a) =>
                a.sommet === arc.sommet &&
                a.destination === arc.destination &&
                a.poids === arc.poids
        )) {
            this._listeArc.push(arc);
            this.ajouterSommet([arc.sommet, arc.destination])
            this._adjacence[arc.sommet].push(arc.destination)
        }
    } // Ajoute un arc et ses sommets au graphe

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
    } // Retire un arc et l'adjacence des sommets concernés


    print(): void {
        console.info(`Liste des Sommets : ${triTopologique(this).join(", ")}`)

        console.info(`Liste des Arcs :`)
        console.table(this.listeArc)
    } // Affiche les informations basiques d'un graphe de manière textuel

    export(fileName?:string): void {
        let array1: any = []
        let array2: any = []

        this.listeSommets.forEach(sommet => {
            array1.push({ key: sommet, color: colors[Math.floor(Math.random() * colors.length)] ?? "blue" })
        })

        this.listeArc.forEach(arc => {
            array2.push({ from: arc.sommet, to: arc.destination })
        })

        console.info(`Votre graphe a été exporté dans le dossier "./src/bonus/", veuillez-vous rendre sur "./src/bonus/visualizer.html" pour lire ce fichier.`)

        const filePath = `./src/bonus/${fileName??"exportedData"}.json`;
        const text: string = JSON.stringify({ array1, array2 });
        try {
            writeFileSync(filePath, text);
        } catch (error) {
            console.error(`Une erreur s'est produite lors de l'écriture du fichier : ${error}`);
        }

    } // Exporte un graphe dans un fichier JSON qui sera utilisable dans une seconde partie pour afficher le graphe sur une légère application web développée pour répondre à ce besoin. Cela permets de mieux visualiser un graphe afin de comprendre ses algorithmes. Cela a été réalisé en bonus. Tutoriel vidéo : https://cdn.discordapp.com/attachments/1022419294010753096/1116770354887655534/demonstrationWeb.mp4

} 