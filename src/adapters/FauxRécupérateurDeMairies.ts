import { Mairie } from "../ports/Mairies";
import { RécupérateurDeMairies } from "../ports/RécupérateurDeMairies";
export class FauxRécupérateurDeMairies implements RécupérateurDeMairies {
    constructor(listeMairiesRécupérées: Mairie[]) {
        this.listeMairiesRécupérées = listeMairiesRécupérées;
    }
    récupérer(): Promise<Mairie[]> {
        return new Promise<Mairie[]>((resolve,reject)=> {
            resolve(this.listeMairiesRécupérées)
        })
    }
    sauvegarder(listeDeMairies: Mairie[]): Promise<void> {
        return new Promise<void>((resolve,reject)=> {
            this.listeMairiesRécupérées = listeDeMairies;
            resolve()
        })
    }
    private listeMairiesRécupérées: Mairie[];
}