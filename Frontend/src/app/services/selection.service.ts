import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Radiometer } from '../models/radiometer.model';
import { Satellite } from '../models/satellite.model';

@Injectable({
  providedIn: 'root'
})
export class SelectionService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getAllRadiometers(): Observable<Radiometer[]> {
    return this.http.get<Radiometer[]>(`${this.apiUrl}/radiometers`);
  }

  getAllSatellitesByRadiometerId(radiometerId: number): Observable<Satellite[]> {
    return this.http.get<Satellite[]>(`${this.apiUrl}/satellites/${radiometerId}`);
  }

  getRadiometerById(radiometerId: number): Observable<Radiometer> {
    return this.http.get<Radiometer>(`${this.apiUrl}/radiometers/${radiometerId}`);
  }
}
