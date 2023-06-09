import { GrapheOrienteAcyclique } from "../metier/classes/GrapheOrienteAcyclique"
import { Arc } from "../metier/classes/Arc"

test("Bellman avec un graphe acyclique (minimum)", () => {
    const graphe = new GrapheOrienteAcyclique();
    graphe.nbrSommet = 4;
    graphe.nbrArc = 4;
    graphe.listeArc = [
        new Arc("A", "B", 2),
        new Arc("B", "C", 3),
        new Arc("C", "D", 1),
        new Arc("A", "C", 4),
    ];

    const result = graphe.bellman("A", true, false);

    const expectedDistance = { A: 0, B: 2, C: 4, D: 5 };
    const expectedPredecesseur = { A: null, B: "A", C: "A", D: "C" };
    expect(result.distance).toEqual(expectedDistance);
    expect(result.predecesseur).toEqual(expectedPredecesseur);
});

test("Bellman avec un graphe acyclique (maximum)", () => {
    const graphe = new GrapheOrienteAcyclique();
    graphe.nbrSommet = 4;
    graphe.nbrArc = 4;
    graphe.listeArc = [
        new Arc("A", "B", 2),
        new Arc("B", "C", 3),
        new Arc("C", "D", 1),
        new Arc("A", "C", 4),
    ];

    const result = graphe.bellman("A", false, false);

    const expectedDistance = { A: 0, B: 2, C: 5, D: 6 };
    const expectedPredecesseur = { A: null, B: "A", C: "B", D: "C" };
    expect(result.distance).toEqual(expectedDistance);
    expect(result.predecesseur).toEqual(expectedPredecesseur);
});

test("Bellman avec un graphe contenant un circuit négatif", () => {
    const graphe = new GrapheOrienteAcyclique();
    graphe.nbrSommet = 3;
    graphe.nbrArc = 3;
    graphe.listeArc = [
        new Arc("A", "B", -1),
        new Arc("B", "A", -1)
    ];

    expect(() => graphe.bellman("A", true, false)).toThrow(/négatif/);
});

test("Bellman avec un sommet inexistant dans le graphe", () => {
    const graphe = new GrapheOrienteAcyclique();
    graphe.nbrSommet = 2;
    graphe.nbrArc = 1;
    graphe.listeArc = [new Arc("A", "B", 1)];

    expect(() => graphe.bellman("C", true, false)).toThrow(
        "Ce sommet n'appartient pas au graphe, l'algorithme renvoie des chemins infinis pour chaque sommet."
    );
});
