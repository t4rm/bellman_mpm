import { readFileSync, createWriteStream } from "fs";
import { Graphe } from "./Graphe"
import { GrapheOriente } from "./GrapheOriente"
import { Arc } from "./Arc"
import { swap } from "../util/functions"

export class GraphePotentielTache extends GrapheOriente {

    constructor(filePath?: string) {
        super()
        if (filePath) this.read(filePath);
    }

    read(filePath: string): void {
        let lignes = readFileSync(filePath, "utf8").split("\n");
        if (!lignes || lignes.length == 0) throw Error("Chemin spécifié incorrect.")
        this.nbrSommet = parseInt(lignes[0])

        for (let i = 1; i < lignes.length; i++) {
            let info = lignes[i].split(" ")

            if (info.length == 0) break;

            swap(info, 0, 1)

            if (info.length == 2)
                this.listeArc.push(new Arc(info[1], "fin", parseInt(info[0])))
            else
                for (let j = 2; j < info.length; j++) {
                    this.listeArc.push(new Arc(info[1], info[j] || "fin", parseInt(info[0])))
                    this.listeSommets.push(info[j], info[1])
                }
        }

        this.listeArc = this.listeArc.filter(arc => !isNaN(arc.poids))
        this.listeSommets = [...new Set(this.listeSommets.filter(sommet => sommet !== ""))];


        this.listeSommets.filter(sommet => !this.listeArc.map(arc => arc.destination).includes(sommet) && sommet.length > 0).forEach(sommet => {
            this.listeArc.push(new Arc("début", sommet, 0))
        })

        this.listeSommets.push("début", "fin")
    }



    save(fileName: string): void {
        let output = createWriteStream(`./src/graphe/mpm/${fileName}.mpm`);
        let text: string = `${this.nbrSommet}`

        this.listeArc = this.listeArc.filter(arc => arc.sommet !== "début").map(arc => new Arc(
            arc.sommet,
            arc.destination === "fin" ? "" : arc.destination,
            arc.poids
        ));

        this.listeSommets = this.listeSommets.filter(sommet => !["début", "fin"].includes(sommet))

        for (const sommet of this.listeSommets) {
            let arr2 = this.listeArc.filter(arc => arc.sommet == sommet)
            text += (`\n${arr2[0].sommet} ${arr2[0].poids} ${arr2.map(arc => arc.destination).join(" ")}`)
        }

        output.write(text);
        output.end();
    } // Optimisation possible ?


    print(): void {
        super.print()
        console.log("-------------------")

        let dataMaxArbo = this.bellman("début", false, false)
        let dataMaxAntiArbo = this.bellman("fin", false, true)
        let Dmin = dataMaxArbo.distance["fin"]
        let dataTard = Object.fromEntries(Object.entries(dataMaxAntiArbo.distance).map(([key, value]) => [key, Dmin - (value as number)]))
        let dataMarge = Object.fromEntries(Object.entries(dataTard).map(([key, value]) => [key, (value as number) - dataMaxArbo.distance[key]]))
        let dataMargeSorted = Object.keys(dataMarge).filter(k => dataMarge[k] === 0 && !["début","fin"].includes(k)).sort()

        let mergedData = [
            { valeur: 'Tôt(t)', ...dataMaxArbo.distance },
            { valeur: 'Tard(t)', ...dataTard },
            { valeur: 'm(t)', ...Object.fromEntries(Object.entries(dataMaxArbo.distance).map(([key, value]) =>[key, (this.listeArc.filter(arc => arc.sommet == key)).reduce((min, arc) => {const weight = dataMaxArbo.distance[arc.destination];                return weight < min ? weight : min;}, Number.POSITIVE_INFINITY) - (value as number) - this.listeArc.filter(arc => arc.sommet == key)[0]?.poids||0]))},
            { valeur: 'M(t)', ...dataMarge },
        ]

        console.info(`Durée globale du projet : ${Dmin}`)
        console.table(mergedData, ["valeur", "début",...this.listeSommets.sort().filter(sommet => !["début","fin"].includes(sommet)), "fin"])

        console.info(`Liste des taches critiques : ${dataMargeSorted.join(", ")}`)
        console.info(`Liste des chemins critiques :`)

        // 

    } 
}


// sort by Ordre topologique ?

