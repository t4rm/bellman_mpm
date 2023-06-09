import { GrapheOriente } from "../metier/classes/GrapheOriente"
import { Arc } from "../metier/classes/Arc"
import { readFileSync, unlinkSync } from "fs";

let grapheOriente: GrapheOriente;

beforeEach(() => {
    grapheOriente = new GrapheOriente();
});


test("Lecture d'un fichier de graphe orienté valide", () => {
    const filePath = "./src/graphe/dag/dag_10_0.gr";
    grapheOriente.read(filePath);

    expect(grapheOriente.nbrSommet).toBe(3);
    expect(grapheOriente.nbrArc).toBe(3);
    expect(grapheOriente.listeArc).toEqual([
        new Arc("a", "b", 1),
        new Arc("b", "c", 2),
        new Arc("c", "a", 1),
    ]);
})

test("Lecture d'un fichier de graphe orienté invalide (nombre d'arcs incorrect)", () => {
    expect(() => grapheOriente.read("a/b.txt")).toThrow(/b/);
});

test("Enregistrement du graphe orienté dans un fichier", () => {
    const grapheOriente = new GrapheOriente();
    grapheOriente.nbrSommet = 4;
    grapheOriente.nbrArc = 5;
    grapheOriente.listeArc = [
      new Arc("A", "B", 2),
      new Arc("B", "C", 3),
      new Arc("C", "D", 1),
      new Arc("D", "A", 4),
      new Arc("A", "C", 2),
    ];
    const fileName = "graph";
    grapheOriente.save(fileName);

    // Vérifier si le fichier a été créé avec le contenu attendu
    const filePath = `./src/graphe/export/${fileName}.gro`;
    const fileContent = readFileSync(filePath, "utf8");

    const expectedContent = `4 5\nA B 2\nB C 3\nC D 1\nD A 4\nA C 2`;
    expect(fileContent).toEqual(expectedContent);

    // Nettoyer le fichier après le test
    unlinkSync(filePath);
  });