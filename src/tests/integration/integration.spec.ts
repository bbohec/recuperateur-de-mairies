import 'mocha';
import {expect} from "chai";
import { FauxRécupérateurDeMairies } from '../../adapters/FauxRécupérateurDeMairies';
import { Mairie } from '../../ports/Mairies';
import { RécupérateurDeMairies } from '../../ports/RécupérateurDeMairies';
import { CSVFileRécupérateurDeMairies } from '../../adapters/CSVFileRécupérateurDeMairies';
import { APIRécupérateurDeMairies } from '../../adapters/APIRécupérateurDeMairies';
const fakeAPIPayload = {"type":"FeatureCollection","features":[{"type":"Feature","geometry":{"type":"Point","coordinates":[-0.438645005226,45.7041015625]},"properties":{"id":"mairie-17100-01","codeInsee":"17100","pivotLocal":"mairie","nom":"Mairie - Chérac","adresses":[{"type":"géopostale","lignes":["Place de la Mairie"],"codePostal":"17610","commune":"Chérac","coordonnees":[-0.438645005226,45.7041015625]}],"horaires":[{"du":"samedi","au":"samedi","heures":[{"de":"09:00:00","a":"12:00:00"}]},{"du":"lundi","au":"lundi","heures":[{"de":"09:00:00","a":"12:30:00"}]},{"du":"vendredi","au":"vendredi","heures":[{"de":"13:15:00","a":"17:45:00"}]},{"du":"jeudi","au":"jeudi","heures":[{"de":"09:00:00","a":"12:30:00"},{"de":"13:15:00","a":"17:30:00"}]},{"du":"mardi","au":"mardi","heures":[{"de":"09:00:00","a":"12:30:00"},{"de":"13:15:00","a":"17:30:00"}]}],"email":"mairie@cherac.fr","telephone":"05 46 96 44 02","url":"http://www.cherac.fr","zonage":{"communes":["17100 Chérac"]}}}]}
const adapters:{type:string,récupérateurDeMairies:RécupérateurDeMairies,listeMairiesAttendues:Mairie[]}[] = [
    {
        type:"Fake",
        récupérateurDeMairies:new FauxRécupérateurDeMairies([]),
        listeMairiesAttendues:[{département:"17",commune:"Mairie - Chérac",email:"mairie@cherac.fr"},{département:"18",commune:"OSEF",email:"osef@osef.fr"}]
    },
    {
        type:"CSV",
        récupérateurDeMairies:new CSVFileRécupérateurDeMairies(),
        listeMairiesAttendues:[{département:"17",commune:"Mairie - Chérac",email:"mairie@cherac.fr"},{département:"18",commune:"OSEF",email:"osef@osef.fr"}]
    },
    {
        type:"API with fake API Payload",
        récupérateurDeMairies:new APIRécupérateurDeMairies("",fakeAPIPayload),
        listeMairiesAttendues:[{département:"17",commune:"Mairie - Chérac",email:"mairie@cherac.fr"}]
    },
    {
        type:"API with default Test URL",
        récupérateurDeMairies:new APIRécupérateurDeMairies(),
        listeMairiesAttendues:[{département:"17",commune:"Mairie - Chérac",email:"mairie@cherac.fr"}]
    },
    {
        type:"API with Test URL",
        récupérateurDeMairies:new APIRécupérateurDeMairies("https://etablissements-publics.api.gouv.fr/v3/communes/60057/mairie"),
        listeMairiesAttendues:[{département:"60",commune:"Mairie - Beauvais",email:"contact@beauvais.fr"}]
    }
]

describe(`Tests d'Intégration`,()=>{
    adapters.forEach(adapter => {
        it(`${adapter.type} - Sauvegarder puis récupérer les Mairies`,()=>{
            return adapter.récupérateurDeMairies
                .sauvegarder(adapter.listeMairiesAttendues)
                .then(()=> adapter.récupérateurDeMairies.récupérer())
                .then(mairies=> {
                    mairies.forEach((mairie,index) => {
                        expect(mairie).deep.equal(adapter.listeMairiesAttendues[index])
                    })
                })
                .catch((error:Error) => {
                    expect(error.message).to.be.undefined;
                })
            
        })
    })
    
})


