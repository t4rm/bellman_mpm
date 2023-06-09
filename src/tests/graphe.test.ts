import { Graphe } from "../metier/classes/Graphe"
import { Arc } from "../metier/classes/Arc"
import fs from 'fs';

let graphe: Graphe;

beforeEach(() => {
    graphe = new Graphe();
});

test("Setter de la liste d'arcs de la classe Graphe", () => {
    const graphe = new Graphe();

    const listeArc = [
        new Arc("A", "B", 3),
        new Arc("B", "C", 2),
        new Arc("C", "D", 1),
    ];

    graphe.listeArc = listeArc;

    expect(graphe.listeArc).toEqual(listeArc);
});

test("Setter listeSommet", () => {
    const graphe = new Graphe();
    const array = ["A", "B", "C"];

    graphe.listeSommet = array;

    expect(graphe.listeSommets).toEqual(array);
});


test("Ajout d'un arc vide à la classe Graphe", () => {
    expect(() => graphe.ajouterArc(new Arc("", "", 0))).toThrow(/sommet/);
});

test("Ajout de sommets dont un sommet vide à la classe Graphe", () => {
    graphe.ajouterSommet(["a", "b", "", "c"]);
    expect(graphe.listeSommets).toEqual(["a", "b", "c"]);
});

test("Retrait d'un sommet de la classe Graphe", () => {
    graphe.ajouterSommet(["a", "b", "c", "d"]);
    graphe.retirerSommet("b");
    expect(graphe.listeSommets).toEqual(["a", "c", "d"]);
    expect(graphe.listeArc).toEqual([]);
});

test("Ajout d'un arc à la classe Graphe", () => {
    graphe.ajouterArc(new Arc("A", "B", 5));

    expect(graphe.listeSommets).toEqual(["A", "B"]);
    expect(graphe.adjacence).toEqual({ A: ["B"], B: [] });
});

test("Retrait d'un arc de la classe Graphe", () => {
    graphe.ajouterArc(new Arc("A", "B", 5));
    graphe.ajouterArc(new Arc("A", "C", 3));
    graphe.retirerArc("A", "B", 5);

    expect(graphe.listeArc).toEqual([new Arc("A", "C", 3)]);
    expect(graphe.listeSommets).toEqual(["A", "B", "C"]);
    expect(graphe.adjacence).toEqual({ A: ["C"], B: [], C: [] });
});

test('Affichage d\'un graphe', () => {
    graphe.listeArc = [new Arc('A', 'B', 1), new Arc('B', 'C', 1)];

    const consoleInfoSpy = jest.spyOn(console, 'info');

    graphe.print();

    expect(consoleInfoSpy).toHaveBeenCalledTimes(2);
    expect(consoleInfoSpy).toHaveBeenNthCalledWith(1, 'Liste des Sommets : A, B, C');
    expect(consoleInfoSpy).toHaveBeenNthCalledWith(2, 'Liste des Arcs :');
    // On ne peut "espionner" console.table.
  });

test('Méthode export', async () => {
    graphe.listeArc = [
      new Arc('A', 'B', 1),
      new Arc('B', 'C', 1),
    ];
  
    const exportPromise = new Promise<void>((resolve) => {
        graphe.export("testData");
        resolve();
      });
    
      await exportPromise;

    const fileContent = await fs.promises.readFile('./src/bonus/testData.json', 'utf-8');
    const parsedContent = JSON.parse(fileContent);

    expect(parsedContent).toEqual({
      array1: expect.any(Array),
      array2: expect.any(Array),
    });
    expect(parsedContent.array1.length).toBe(3);
    expect(parsedContent.array2.length).toBe(2);
}); // ATTENTION ! Modifie les données dans testData.json

