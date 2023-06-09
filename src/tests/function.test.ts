import { swap, triTopologique, parcoursProfondeur } from "../metier/util/functions";
import { Graphe } from "../metier/classes/Graphe";
import { Arc } from "../metier/classes/Arc";

test("Inversion de deux valeurs dans un tableau", () => {
    const array = ["a", "b", "c"];
    swap(array, 0, 2);
    expect(array).toEqual(["c", "b", "a"]);
});

test("Tri topologique d'un graphe", () => {
    const graphe = new Graphe();
    graphe.listeArc = [
        new Arc("A", "B", 1),
        new Arc("A", "C", 1),
        new Arc("B", "D", 1),
        new Arc("C", "D", 1),
        new Arc("C", "E", 1),
        new Arc("D", "E", 1),
    ];

    const ordreTri = triTopologique(graphe);

    expect(ordreTri).toEqual(["A", "C", "B", "D", "E"]);
});

test("parcoursProfondeur sans sommet de fin spécifié", () => {
    const listeArc: Arc[] = [
        new Arc("A", "B", 1),
        new Arc("A", "C", 1),
        new Arc("B", "D", 1),
        new Arc("C", "D", 1),
        new Arc("D", "E", 1),
    ];

    const visite: { [sommet: string]: boolean } = {};
    const cheminActuel: string[] = [];

    parcoursProfondeur("A", visite, listeArc, cheminActuel);

    expect(cheminActuel).toEqual(["E", "D", "B", "C", "A"]);
    // On inverse l'ordre du chemin obtenu pour avoir le parcours
});

test("parcoursProfondeur avec sommet de fin spécifié", () => {
    const listeArc: Arc[] = [
        new Arc("A", "B", 1),
        new Arc("A", "C", 1),
        new Arc("B", "D", 1),
        new Arc("C", "D", 1),
        new Arc("D", "E", 1),
    ];

    const visite: { [sommet: string]: boolean } = {};
    const cheminActuel: string[] = [];

    const consoleSpy = jest.spyOn(console, "log");

    parcoursProfondeur("A", visite, listeArc, cheminActuel, "D");

    expect(consoleSpy).toHaveBeenCalledTimes(2);
    expect(consoleSpy.mock.calls[0][0]).toBe("A -> B -> D");
    expect(consoleSpy.mock.calls[1][0]).toBe("A -> C -> D");
});