import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DownloadServiceService {

  private baseUrl = 'http://localhost:3000/api/opendap'; // Cambia la URL base según tu configuración

  constructor(private http: HttpClient) { }

  generarURL(idFilter: number): Observable<any> {
    const url = `${this.baseUrl}/generar-url/${idFilter}`;
    return this.http.get<any>(url);
  }
}
