import { Mairie } from "./Mairies";
export interface RécupérateurDeMairies {
    récupérer(): Promise<Mairie[]>;
    sauvegarder(listeMairies: Mairie[]): Promise<void>;
}
