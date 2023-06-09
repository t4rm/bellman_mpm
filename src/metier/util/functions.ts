import { Graphe } from "../classes/Graphe"
import { Arc } from "../classes/Arc";

export function swap(array: Array<string>, indexA: number, indexB: number): void {
    let c = array[indexA];
    array[indexA] = array[indexB]
    array[indexB] = c;
} // Inverse deux valeurs dans un Tableau

export function triTopologique(graphe: Graphe): string[] {
    const visite: { [sommet: string]: boolean } = {};
    const ordreTri: string[] = [];

    for (const sommet of graphe.listeSommets) {
        if (!visite[sommet]) {
            parcoursProfondeur(sommet, visite, graphe.listeArc, ordreTri);
        }
    }

    return ordreTri.reverse();
} // Effectue un tri Topologique d'un graphe donné

export function parcoursProfondeur(sommet: string, visite: { [sommet: string]: boolean }, listeArc: Arc[], cheminActuel: string[], sommetFin?: string) {
    visite[sommet] = true;

    if (sommetFin) {
        cheminActuel.push(sommet);
        if (sommet === sommetFin) {
            console.log(cheminActuel.join(' -> '));
        } else {
            for (const arc of listeArc) {
                if (arc.sommet === sommet && !visite[arc.destination]) {
                    parcoursProfondeur(arc.destination, visite, listeArc, cheminActuel, sommetFin);
                }
            }
        }

        visite[sommet] = false;
        cheminActuel.pop();
    } else {
        visite[sommet] = true;

        for (const arc of listeArc) {
            if (arc.sommet === sommet && !visite[arc.destination]) {
                parcoursProfondeur(arc.destination, visite, listeArc, cheminActuel);
            }
        }
        cheminActuel.push(sommet);
    }


} // Effectue l'algorithme de Parcours en Profondeur pour récupérer l'ordre topologique ou tous les chemins possible entre deux sommets d'un graphe

