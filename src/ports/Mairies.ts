import { PropriétésMairies } from "./PropriétésMairies";
export interface Mairie {
    [PropriétésMairies.email]: string;
    [PropriétésMairies.commune]: string;
    [PropriétésMairies.département]: string;
}
