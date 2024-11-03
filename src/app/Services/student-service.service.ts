import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StudentDTO } from '../Models/StudentModel';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private studentSource = new BehaviorSubject<StudentDTO | null>(null);
  currentStudent = this.studentSource.asObservable();
  constructor(private http: HttpClient) {}

  getAll():Observable<StudentDTO[]>{
    return this.http.get<StudentDTO[]>("http://localhost:8080/students");
  }

  getStudent(name: string):Observable<StudentDTO>{
    return this.http.get<StudentDTO>(`http://localhost:8080/students/${name}`);
  }

  setStudent(student: StudentDTO) {
    this.studentSource.next(student);
  }
}
