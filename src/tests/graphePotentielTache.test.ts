import { GraphePotentielTache } from "../metier/classes/GraphePotentielTache"
import { Arc } from "../metier/classes/Arc"

let graphePotentielTache = new GraphePotentielTache()

test("Lecture d'un graphe MPM à partir d'un fichier inconnu", () => {
    expect(() => graphePotentielTache.read("dssa")).toThrow(/dssa/)
})
