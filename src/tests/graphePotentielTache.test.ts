import { GraphePotentielTache } from "../metier/classes/GraphePotentielTache"
import { Arc } from "../metier/classes/Arc"
import { writeFileSync, unlinkSync, readFileSync } from 'fs';

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
    expect(graphe.listeSommets).toEqual(['a', 'b', 'c', 'fin', "début"]);

    const expectedArcs = [
        new Arc('début', 'a', 0),
        new Arc('a', 'b', 1),
        new Arc('a', 'c', 1),
        new Arc('c', 'fin', 2),
        new Arc('b', 'fin', 2),
    ];

    expect(graphe.listeArc).toEqual(expect.arrayContaining(expectedArcs));
});

test("Sauvegarde correcte d'un graphe MPM", () => {
    const graphe = new GraphePotentielTache();
    graphe.listeArc = [
        new Arc('a', 'b', 1),
        new Arc('a', 'c', 1),
        new Arc('b', 'fin', 1),
        new Arc('c', 'fin', 2),
        new Arc('début', 'a', 0)
    ]
    graphe.nbrSommet = 3

    const fileName = 'testGraph';

    graphe.save(fileName);

    const savedFilePath = `./src/graphe/export/${fileName}.mpm`;
    const savedFileContent = readFileSync(savedFilePath, 'utf8').trim();

    const expectedFileContent = `3\na 1 b c\nb 1 \nc 2`;

    expect(savedFileContent).toBe(expectedFileContent);
    unlinkSync(savedFilePath);
});

test("Affichage correct des résultats MPM", () => {
    const graphe = new GraphePotentielTache("./src/graphe/mpm/graphe_10_1.mpm");

    const logSpy = jest.spyOn(console, "log");
    const infoSpy = jest.spyOn(console, "info");

    graphe.print();

    expect(infoSpy).toHaveBeenCalledTimes(5);

    logSpy.mockRestore();
    infoSpy.mockRestore();
}); // On peut tester les résultats obtenus mais ici nous vérifions seulement que le programme se déroule comme convenu pour un fichier correct