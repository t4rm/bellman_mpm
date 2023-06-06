import { GrapheOriente } from "./classes/GrapheOriente"

function main(): void {
    let a = new GrapheOriente("src/graphe/dag/dag_10_0.gr")

    a.print()
    a.bellman("a", true)
}

main()