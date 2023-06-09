import { GrapheOrienteAcyclique } from "../metier/classes/GrapheOrienteAcyclique"
import { Arc } from "../metier/classes/Arc"

let grapheOrienteAcyclique = new GrapheOrienteAcyclique("src/graphe/dag/dag_10_1.gr")

test("Algorithme de Bellman sur un sommet inconnu", () => {
    expect(() => grapheOrienteAcyclique.bellman("ABC",true,true)).toThrow(/appartient/)
})
