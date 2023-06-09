import { Arc } from "./classes/Arc"
import { Graphe } from "./classes/Graphe"
import { GrapheOriente } from "./classes/GrapheOriente"
import { GraphePotentielTache } from "./classes/GraphePotentielTache"


function main(): void {
    // let a = new GrapheOriente("src/graphe/dag/dag_10_1.gr")

    // a.print()
    // console.table(a.bellman("9", true, false))

    let b = new GraphePotentielTache("src/graphe/mpm/graphe_cours.mpm")

    b.export()

    // b.print()


    //https://js.cytoscape.org/#core/export
    // b.ajouterArc(new Arc("a","b",1))
    // b.ajouterArc(new Arc("a","d",3)) graphe abstract class cqui est générique ou non
    // b.ajouterArc(new Arc("b","c",3)) graphe dirigé acyclique
    // b.ajouterArc(new Arc("b","d",4)) graphe mpm (dag avec 2 sommets particuliers)
    // b.ajouterArc(new Arc("d","e",1)) 
    // b.ajouterArc(new Arc("e","c",2))
    // b.ajouterArc(new Arc("e","f",1))


    // console.log(b.adjacence)
    // b.print()


    // // tester tritopo
    // console.log(triTopologique(b))
}

main()