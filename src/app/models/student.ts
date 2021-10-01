import { Grupa } from "./grupa";
import { Projekat } from "./projekat";

export class Student{
    id : number;
    brojIndeksa: string;
    ime: string;
    prezime: string;
    grupa:Grupa;
    projekat:Projekat
}