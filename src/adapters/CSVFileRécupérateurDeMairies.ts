import { Mairie } from '../ports/Mairies';
import { RécupérateurDeMairies } from '../ports/RécupérateurDeMairies';
import {createObjectCsvWriter} from "csv-writer"
import csv = require('csv-parser');
import * as fs from 'fs'
import { PropriétésMairies } from '../ports/PropriétésMairies';
import { ObjectCsvWriterParams } from 'csv-writer/src/lib/csv-writer-factory';
export class CSVFileRécupérateurDeMairies implements RécupérateurDeMairies {
    constructor(path:string="mairies.csv"){
        this.csvOption = {path,
            header: [
              {id: PropriétésMairies.département, title: PropriétésMairies.département},
              {id: PropriétésMairies.commune, title: PropriétésMairies.commune},
              {id: PropriétésMairies.email, title: PropriétésMairies.email}
            ]}
    }
    récupérer(): Promise<Mairie[]> {
        return new Promise<Mairie[]>((resolve,reject)=>{
            if(!this.csvOption?.path) reject (new Error("Missing CSV option path."))
            else {
                const mairies:Mairie[] = []
                fs.createReadStream(this.csvOption.path)
                    .pipe(csv())
                    .on('data', (data) => mairies.push(data))
                    .on('end', () => {
                        console.log(`Fichier CSV '${this.csvOption?.path}' récupéré.`)
                        resolve(mairies)
                    });
            }
        })
    }
    sauvegarder(listeMairies: Mairie[]): Promise<void> {
        if (!this.csvOption) throw new Error("Bad CSV Option.")
        const csvWriter = createObjectCsvWriter(this.csvOption);
        return csvWriter
            .writeRecords(listeMairies)
            .then(()=> console.log(`Fichier CSV '${this.csvOption?.path}' sauvegardé.`));
    }
    private csvOption:ObjectCsvWriterParams|undefined
}




