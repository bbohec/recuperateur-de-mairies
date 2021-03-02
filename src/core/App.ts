import { RécupérateurDeMairies } from "../ports/RécupérateurDeMairies";
export class App {
    constructor(sourceRécupérateurDeMairies: RécupérateurDeMairies, destinationRécupérateurDeMairies: RécupérateurDeMairies) {
        this.destinationRécupérateurDeMairies = destinationRécupérateurDeMairies;
        this.sourceRécupérateurDeMairies = sourceRécupérateurDeMairies;
    }
    run(): Promise<void> {
        return this.sourceRécupérateurDeMairies.récupérer()
            .then(mairies => this.destinationRécupérateurDeMairies.sauvegarder(mairies))
    }
    private destinationRécupérateurDeMairies: RécupérateurDeMairies;
    private sourceRécupérateurDeMairies: RécupérateurDeMairies;
}
