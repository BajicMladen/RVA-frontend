import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SMER_URL } from '../app.constants';
import { Smer } from '../models/smer';

@Injectable({
  providedIn: 'root'
})
export class SmerService {

  constructor(private httpClient:HttpClient) { }

  public getAllSmer():Observable<any>{
    return this.httpClient.get(`${SMER_URL}`)
  }

  public addSmer(smer: Smer): Observable<any>{
    smer.id=0;
    return this.httpClient.post(`${SMER_URL}`,smer)
  }

  public updateSmer(smer: Smer): Observable<any>{
    return this.httpClient.put(`${SMER_URL}`,smer)
  }

  public deleteSmer(id:number): Observable<any>{
    return this.httpClient.delete(`${SMER_URL}/${id}`)
  }
}
