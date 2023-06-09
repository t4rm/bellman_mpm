import { GraphePotentielTache } from "../metier/classes/GraphePotentielTache"
import { Arc } from "../metier/classes/Arc"
import { writeFileSync, unlinkSync } from 'fs';

let graphePotentiel = new GraphePotentielTache()

test("Lecture d'un fichier invalide", () => {
    expect(() => graphePotentiel.read("a/b.txt")).toThrow(/b/);
});

test("Lecture d'un fichier vide", () => {
    writeFileSync('./src/tests/vide.txt', '');
    expect(() => graphePotentiel.read("./src/tests/vide.txt")).toThrow(/incorrect/);
    unlinkSync("./src/tests/vide.txt");
});

test("Lecture correcte", () => {
    const testData = '3\na 1 b c\nc 2\nb 2';
    const testDataFilePath = './src/graphe/testData.gr';
    writeFileSync(testDataFilePath, testData);

    const graphe = new GraphePotentielTache();
    
    graphe.read(testDataFilePath);

    expect(graphe.nbrSommet).toBe(3);
    expect(graphe.listeArc.length).toBe(5);
    expect(graphe.listeSommets).toEqual(['a', 'b', 'c', 'fin',"début"]);

    const expectedArcs = [
        new Arc('début', 'a', 0),
        new Arc('a', 'b', 1),
        new Arc('a', 'c', 1),
        new Arc('c', 'fin', 2),
        new Arc('b', 'fin', 2),
    ];

    expect(graphe.listeArc).toEqual(expect.arrayContaining(expectedArcs));
  });