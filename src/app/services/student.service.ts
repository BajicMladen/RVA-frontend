import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { STUDENTI_ZA_GRUPU_URL, STUDENT_URL } from '../app.constants';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private httpClient: HttpClient) { }

  public getStudentiIzGrupe(idGrupe: number): Observable<any>{
    return this.httpClient.get(`${STUDENTI_ZA_GRUPU_URL}/${idGrupe}`)
  }

  public addStudent(student:Student): Observable<any>{
    student.id = 0;
    return this.httpClient.post(`${STUDENT_URL}`,student)
  }

  public updateStudent(student:Student): Observable<any>{
    return this.httpClient.put(`${STUDENT_URL}`,student)
  }

  public deleteStudent(id: number): Observable<any>{
    return this.httpClient.delete(`${STUDENT_URL}/${id}`)
  }
}
