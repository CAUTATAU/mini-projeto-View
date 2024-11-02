import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SubjectDTO } from '../Models/SubjectModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) {}

  getAll():Observable<SubjectDTO[]>{
    return this.http.get<SubjectDTO[]>("http://localhost:8080/subjects");
  }
}
