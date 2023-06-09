import { Arc } from "../metier/classes/Arc"

let arc = new Arc("sommet", "destination", 5);

// Test du sommet
test("Setter de la classe Arc.sommet avec une valeur vide", () => {
    expect(() => arc.sommet = "").toThrow(/vide/)
});

test("Setter de la classe Arc.sommet avec une valeur non vide", () => {
    arc.sommet = "nouveauSommet";
    expect(arc.sommet).toBe("nouveauSommet");
});

// Test de la destination
test("Setter de la classe Arc.destination avec une valeur vide", () => {
    expect(() => arc.destination = "").toThrow(/vide/)
});

test("Setter de la classe Arc.destination avec une valeur non vide", () => {
    arc.destination = "nouvelleDestination";
    expect(arc.destination).toBe("nouvelleDestination");
});

// Test du poids
test("Setter de la classe Arc.poids avec une valeur négative", () => {
    expect(() => arc.poids = -1).toThrow(/positif/)
});

test("Setter de la classe Arc.poids avec une valeur positive", () => {
    arc.poids = 10;
    expect(arc.poids).toBe(10);
});
