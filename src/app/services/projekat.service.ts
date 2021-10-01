import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PROJEKAT_URL } from '../app.constants';
import { Projekat } from '../models/projekat';

@Injectable({
  providedIn: 'root'
})
export class ProjekatService {

  constructor(private httpClient:HttpClient) { }

  public getAllProjekti():Observable<any>{
    return this.httpClient.get(`${PROJEKAT_URL}`)
  }

  public addProjekat(projekat: Projekat): Observable<any>{
    projekat.id=0;
    return this.httpClient.post(`${PROJEKAT_URL}`,projekat)
  }

  public updateProjekat(projekat: Projekat): Observable<any>{
    return this.httpClient.put(`${PROJEKAT_URL}`,projekat)
  }

  public deleteProjekat(id:number): Observable<any>{
    return this.httpClient.delete(`${PROJEKAT_URL}/${id}`)
  }
}
