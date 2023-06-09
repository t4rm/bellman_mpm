import { GrapheOriente } from "../metier/classes/GrapheOriente"
import { Arc } from "../metier/classes/Arc"

let grapheOriente = new GrapheOriente()

test("Lecture d'un graphe orienté à partir d'un fichier inconnu", () => {
    expect(() => grapheOriente.read("aa")).toThrow(/aa/)
})
