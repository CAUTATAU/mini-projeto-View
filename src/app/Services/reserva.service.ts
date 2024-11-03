import { reservaDTO } from '../Models/reservaModel';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  constructor(private http: HttpClient) {}

  reserve(data: reservaDTO):Observable<any>{
    return this.http.post<any>("http://localhost:8080/reserva",data);
  }

  cancelReserve(data: reservaDTO):Observable<any>{
    return this.http.post<any>("http://localhost:8080/reserva/cancel",data);
  }
}
