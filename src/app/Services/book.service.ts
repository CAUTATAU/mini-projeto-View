import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookDTO } from '../Models/BookModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) {}

  getAll():Observable<BookDTO[]>{
    return this.http.get<BookDTO[]>("http://localhost:8080/books");
  }
}
