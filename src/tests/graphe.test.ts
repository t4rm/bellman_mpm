import { Graphe } from "../metier/classes/Graphe"
import { Arc } from "../metier/classes/Arc"

let graphe = new Graphe()

test("Ajout d'un arc vide à la classe Graphe", () => {
    expect(() => graphe.ajouterArc(new Arc("","",0))).toThrow(/sommet/)
})

test("Ajout de sommets dont un sommet vide à la classe Graphe", () => {
    graphe.ajouterSommet(["a","b","","c"])
    expect(graphe.listeSommets).toEqual(["a","b","c"])
})


