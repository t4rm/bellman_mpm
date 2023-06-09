import { Graphe } from "../metier/classes/Graphe"
import { Arc } from "../metier/classes/Arc"

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