import { GraphePotentielTache } from "../metier/classes/GraphePotentielTache"
import { Arc } from "../metier/classes/Arc"

let graphePotentiel = new GraphePotentielTache()

test("Lecture d'un fichier invalide", () => {
    expect(() => graphePotentiel.read("a/b.txt")).toThrow(/b/);
});