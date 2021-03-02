import { Mairie } from "../ports/Mairies";
import { RécupérateurDeMairies } from "../ports/RécupérateurDeMairies";
import  axios, {AxiosResponse} from 'axios'
export class APIRécupérateurDeMairies implements RécupérateurDeMairies {
    constructor(apiURL:string="https://etablissements-publics.api.gouv.fr/v3/communes/17100/mairie",fakeAPIPayload?:ApiPayload) {
        this.apiURL = apiURL;
        this.fakeAPIPayload = fakeAPIPayload;
    }
    récupérer(): Promise<Mairie[]> {
            if(this.fakeAPIPayload) return this.récupérerMairiesAPartirDuFauxPayload(this.fakeAPIPayload)
            else {
                console.log(`Récupération des mairies par API sur '${this.apiURL}'.`)
                console.log(`...`)
                return axios
                    .get(this.apiURL)
                    .then((response:AxiosResponse<ApiPayload>) => {
                        if (response.status !== 200) throw new Error (`Erreur API ${response.status} - ${response.statusText} - ${response.data}`)
                        else {
                            const mairies = this.apiPayloadToMairies(response.data)
                            console.log(`OK - ${mairies.length} ${(mairies.length === 1 )?"mairie récupérée":"mairies récupérées"}.`)
                            return mairies
                        }
                    })
            }
    }
    sauvegarder(listeDeMairies: Mairie[]): Promise<void> {
        return new Promise<void>((resolve,reject)=> {
            console.warn("Cette API n'est pas éditable. Sauvegarde impossible.")
            resolve()
        })
    }
    private récupérerMairiesAPartirDuFauxPayload(apiPayload:ApiPayload):Promise<Mairie[]>{
        return new Promise<Mairie[]>((resolve,reject) => {
            resolve(this.apiPayloadToMairies(apiPayload))
        })
        
    }
    private apiPayloadToMairies(apiPayload:ApiPayload):Mairie[]{
        if (apiPayload.features){
            const features = apiPayload.features
            const featureList = new Array<Feature>()
            features.forEach((maybeArrayOfFeature: Feature|Feature[]) => {
                if ( Array.isArray(maybeArrayOfFeature)) maybeArrayOfFeature.forEach(realfeature=> featureList.push(realfeature))
                else featureList.push(maybeArrayOfFeature)
            })
            return featureList.map(feature=> {
                const mairie:Mairie = {
                    département:(feature.properties?.codeInsee)?feature.properties.codeInsee.substring(0,2):"inconnu",
                    commune:(feature.properties?.nom)?feature.properties.nom:"inconnu",
                    email:(feature.properties?.email)?feature.properties.email:"inconnu",
                }
                return mairie
            })
        } else return []
        
    }
    private apiURL:string
    private fakeAPIPayload:ApiPayload|undefined
}
const DifferentApiPayload = {
    "type":"FeatureCollection",
    "features":
    [
        [
            {
                "type":"Feature",
                "geometry":{
                    "type":"Point",
                    "coordinates":[2.84698009491,47.8222999573]
                },
                "properties":{
                    "id":"mairie-45210-01",
                    "codeInsee":"45210",
                    "pivotLocal":"mairie",
                    "nom":"Mairie - Montbouy",
                    "adresses":[
                        {
                            "type":"géopostale",
                            "lignes":["Place de l'Église"],
                            "codePostal":"45230",
                            "commune":"Montbouy",
                            "coordonnees":[2.84698009491,47.8222999573]
                        }
                    ],
                    "horaires":[
                        {"du":"mercredi","au":"mercredi","heures":[{"de":"09:00:00","a":"12:00:00"}]},
                        {"du":"jeudi","au":"jeudi","heures":[{"de":"09:00:00","a":"12:30:00"},{"de":"13:30:00","a":"18:30:00"}]},
                        {"du":"vendredi","au":"vendredi","heures":[{"de":"09:00:00","a":"12:30:00"}]},
                        {"du":"lundi","au":"lundi","heures":[{"de":"13:30:00","a":"17:00:00"}]},
                        {"du":"samedi","au":"samedi","heures":[{"de":"09:00:00","a":"12:00:00"}]}
                    ],
                    "email":"montbouy@orange.fr",
                    "telephone":"02 38 97 53 03",
                    "url":"http://www.montbouy.sitew.com",
                    "zonage":{"communes":["45210 Montbouy"]}
                }
            }
        ]
    ]
}
interface ApiPayload{
    type: string;
    features?:Feature[] | Feature[][]
}

interface Feature {
    type: string;
    geometry: {
        type: string;
        coordinates: number[];
    };
    properties?: {
        id: string;
        codeInsee: string|undefined;
        pivotLocal: string;
        nom: string|undefined;
        adresses: {
            type: string;
            lignes: string[];
            codePostal: string;
            commune: string;
            coordonnees: number[];
        }[];
        email:string|undefined;
        telephone:string;
        url:string;
        zonage: {
        
        };
    };
}