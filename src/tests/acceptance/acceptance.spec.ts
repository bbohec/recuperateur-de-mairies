import 'mocha';
import {expect} from "chai";
import { FauxRécupérateurDeMairies } from '../../adapters/FauxRécupérateurDeMairies';
import { Mairie } from '../../ports/Mairies';
import { App } from '../../core/App';

/*
Tests d'Acceptation
    Récupérer la liste des mairies de France
      √ Sachant qu'il y a une liste de mairies de France avec les informations suivantes:
        |Département    |Libellé de la commune  | email mairie          |
        |   17          |   Chérac              |    mairie@cherac.fr   |
        |   18          |   OSEF                |    osef@osef.fr       |
      √ Quand l'utilisateur lance le récupérateur de mail de mairies
      √ Alors il y a dans la liste des mairies récupérées les informations suivantes:
        |Département    |Libellé de la commune  | email mairie          |
        |   17          |   Chérac              |    mairie@cherac.fr   |
        |   18          |   OSEF                |    osef@osef.fr       |
        */

describe(`Tests d'Acceptation`,()=>{
    describe(`Récupérer la liste des mairies de France`,()=>{
        const mairiesAttendues:Mairie[]=[
            {département:"17",commune:"Chérac",email:"mairie@cherac.fr"},
            {département:"18",commune:"OSEF",email:"osef@osef.fr"},
        ]
        const sourceFauxRécupérateurDeMairies=new FauxRécupérateurDeMairies(mairiesAttendues)
        const destinationFauxRécupérateurDeMairies=new FauxRécupérateurDeMairies([])
        it(`Sachant qu'il y a une liste de mairies de France avec les informations suivantes:
        |Département    |Libellé de la commune  | email mairie          |
        |   17          |   Chérac              |    mairie@cherac.fr   |
        |   18          |   OSEF                |    osef@osef.fr       |`,()=>{
            return sourceFauxRécupérateurDeMairies
                .récupérer()
                .then(mairies => {expect(mairies).deep.equal(mairiesAttendues)})            
        })
        it(`Quand l'utilisateur lance le récupérateur de mail de mairies`,()=>{
            const app = new App(sourceFauxRécupérateurDeMairies,destinationFauxRécupérateurDeMairies)
            return app.run()          
        })
        it(`Alors il y a dans la liste des mairies récupérées les informations suivantes:
        |Département    |Libellé de la commune  | email mairie          |
        |   17          |   Chérac              |    mairie@cherac.fr   |
        |   18          |   OSEF                |    osef@osef.fr       |`,()=>{
            return destinationFauxRécupérateurDeMairies
                .récupérer()
                .then(mairies => {expect(mairies).deep.equal(mairiesAttendues)})            
        })
    })  
})
