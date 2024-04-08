import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Radiometer } from '../models/radiometer.model';
import { Satellite } from '../models/satellite.model';
import { ProductModel } from '../models/product.model';
@Injectable({
  providedIn: 'root'
})
export class SelectionService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}
  //Obtiene un listado de todos los radiómetros
  getAllRadiometers(): Observable<Radiometer[]> {
    return this.http.get<Radiometer[]>(`${this.apiUrl}/radiometers`);
  }
  //Obtiene un listado de todos los satelites de un radiometro
  getAllSatellitesByRadiometerId(radiometerId: number): Observable<Satellite[]> {
    return this.http.get<Satellite[]>(`${this.apiUrl}/satellites/${radiometerId}`);
  }
  //Obtiene un radiometro por ID
  getRadiometerById(radiometerId: number): Observable<Radiometer> {
    return this.http.get<Radiometer>(`${this.apiUrl}/radiometers/${radiometerId}`);
  }

  //Crea un product
  createProduct(sessionId: string, radiometerId: number, satelliteId: number): Observable<ProductModel> {
    const body = { session_id: sessionId, radiometer_id: radiometerId, satellite_id: satelliteId };
    return this.http.post<ProductModel>(`${this.apiUrl}//products/`, body);
  }
}
