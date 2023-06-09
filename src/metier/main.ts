import { Arc } from "./classes/Arc"
import { Graphe } from "./classes/Graphe"
import { GrapheOrienteAcyclique } from "./classes/GrapheOrienteAcyclique"
import { GraphePotentielTache } from "./classes/GraphePotentielTache"
import { GrapheOriente } from "./classes/GrapheOriente"


function main(): void {

    // Exemple d'utilisation du programme pour manipuler un graphe quelconque que l'on va créer de toutes pièces:
    let graphe = new Graphe
    graphe.ajouterSommet(["d","z","a"])
    graphe.ajouterArc(new Arc("a","z",26))

    graphe.print()
    // Ce graphe a 3 sommets et un arc de A à Z avec pour poids 26, le sommet D est donc isolé.

    // Exemple d'utilisation du programme pour manipuler un graphe orienté que l'on va créer de toutes pièces:

    let grapheOriente = new GrapheOriente()

    // Ces méthodes sont utilisables pour tous types de graphes :

    grapheOriente.ajouterArc(new Arc("a", "b", 1))
    grapheOriente.ajouterArc(new Arc("a", "d", 3))
    grapheOriente.ajouterArc(new Arc("d", "a", 3))
    grapheOriente.ajouterArc(new Arc("b", "a", 7)) // L'ajout de ces arcs va aussi ajouter les sommets correspondant et mettre à jour la liste d'adjacence

    grapheOriente.retirerArc("d", "a", 3) // Le retrait de cet arc va aussi mettre à jour la liste d'adjacence en conséquence

    grapheOriente.print()

    // Exemple d'utilisation du programme pour réaliser le Bellman d'un graphe orienté acyclique (DAG) :

    let grapheOrienteAcyclique = new GrapheOrienteAcyclique("src/graphe/dag/dag_10_1.gr")

    grapheOrienteAcyclique.print()
    console.table(grapheOrienteAcyclique.bellman("9", true, false))


    // Exemple d'utilisation du programme pour réaliser le MPM d'un graphe :

    let graphePotentielTache = new GraphePotentielTache("src/graphe/mpm/graphe_cours.mpm")

    graphePotentielTache.print() // Affiche les résultats du MPM du graphe
    graphePotentielTache.export() // Exporte le graphe pour l'utiliser sur l'application Web Bonus (bonus)

}

main()