import { GraphePotentielTache } from "../metier/classes/GraphePotentielTache"
import { Arc } from "../metier/classes/Arc"

test("Lecture d'un fichier de graphe potentiel tache", () => {
    const filePath = "./src/graphe/mpm/graphe_test.mpm";
    const graphePotentielTache = new GraphePotentielTache();
    graphePotentielTache.read(filePath);

    // Vérifier les propriétés du graphe après la lecture
    expect(graphePotentielTache.nbrSommet).toBe(4);

    const expectedArcs = [
        new Arc("A", "B", 2),
        new Arc("A", "C", 2),
        new Arc("B", "fin", 3),
        new Arc("début", "A", 0),
        new Arc("C", "fin", 2)
    ];

    console.log(graphePotentielTache.listeArc)
    expect(graphePotentielTache.listeArc.sort()).toBe(expect.arrayContaining(expectedArcs.sort()));
});

