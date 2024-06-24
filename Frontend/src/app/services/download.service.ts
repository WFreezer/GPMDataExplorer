import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  private baseUrl = 'http://localhost:3000/api'; // Cambia la URL base según tu configuración

  constructor(private http: HttpClient) { }

  generarURL(idFilter: number): Observable<any> {
    const url = `${this.baseUrl}/opendap/generar-url/${idFilter}`;
    return this.http.get<any>(url);
  }

  importCSV(idFilter: number, day: string): Observable<any> {
    const url = `${this.baseUrl}/csv/import`;
    const body = {id_filter: idFilter,day: day};
    return this.http.post<any>(url, body);
  }
}
