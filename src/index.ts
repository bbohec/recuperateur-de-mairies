import { APIRécupérateurDeMairies } from "./adapters/APIRécupérateurDeMairies";
import { CSVFileRécupérateurDeMairies } from "./adapters/CSVFileRécupérateurDeMairies";
import { App } from "./core/App";

const app = new App(
    new APIRécupérateurDeMairies("https://etablissements-publics.api.gouv.fr/v3/organismes/mairie"),
    new CSVFileRécupérateurDeMairies()
)
console.log("Exécution.")
console.log("...")
app
    .run()
    .then(()=> console.log("Terminé."))
    .catch((error:Error)=> {throw error})