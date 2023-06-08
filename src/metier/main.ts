import { GrapheOriente } from "./classes/GrapheOriente"
import { GraphePotentielTache } from "./classes/GraphePotentielTache"

function main(): void {
    // let a = new GrapheOriente("src/graphe/dag/dag_10_0.gr")

    // a.print()
    // a.bellman("a", true)


    let b = new GraphePotentielTache("src/graphe/mpm/ee.mpm")

    b.print()
}

main()