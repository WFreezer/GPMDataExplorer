import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Radiometer } from '../models/radiometer.model';

@Injectable({
  providedIn: 'root'
})
export class RadiometerService {
  private apiUrl = 'http://localhost:3000/api/radiometers'; // Ajusta la URL según tu configuración

  constructor(private http: HttpClient) {}

  getAllRadiometers(): Observable<Radiometer[]> {
    return this.http.get<Radiometer[]>(this.apiUrl);
  }
}
