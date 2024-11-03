import { EnrollDTO } from './../Models/enrollModel';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EnrollService {

  constructor(private http: HttpClient) {}

  enroll(data: EnrollDTO):Observable<any>{
    return this.http.post<any>("http://localhost:8080/enroll",data);
  }
}
