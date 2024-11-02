import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { StudentDTO } from '../Models/StudentModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) {}

  getAll():Observable<StudentDTO[]>{
    return this.http.get<StudentDTO[]>("http://localhost:8080/students");
  }

  getStudent(name: string):Observable<StudentDTO>{
    return this.http.get<StudentDTO>(`http://localhost:8080/students/${name}`);
  }
}
