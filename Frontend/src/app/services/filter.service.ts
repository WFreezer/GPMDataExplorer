import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Filter } from '../models/filter.model';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  
  private startDate: Date | null = null;
  private endDate: Date | null = null;
  private rectangleCoordinates: number[] = [];

  private apiUrl = 'http://localhost:3000/api/filter';

  constructor(private http: HttpClient) { }

  setStartDate(date: Date): void {
    this.startDate = date;
  }

  getStartDate(): Date | null {
    return this.startDate;
  }

  setEndDate(date: Date): void {
    this.endDate = date;
  }

  getEndDate(): Date | null {
    return this.endDate;
  }
  //Guarda las coordenadas. LLamado en map.component
  setRectangleCoordinates(coordinates: number[]): void {
    this.rectangleCoordinates = coordinates;
  }

  //recoge las coordenadas almacenadas al dibujar el area map.component
  getRectangleCoordinates(): number[] {
    return this.rectangleCoordinates;
  }

   // Método para obtener las variables de filtro
   getVariables(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/variables`);
  }

  // Método para obtener las capas de filtro
  getLayers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/layers`);
  }

  createFilter(filter: Filter): Observable<any> {
    return this.http.post<any>(this.apiUrl, filter);
  }

  // Método para obtener un filtro por su ID
  getFilterById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Método para obtener un filtro por el ID del producto
  getFilterByProductId(productId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/product/${productId}`);
  }

  // Método para obtener las fechas disponibles para un producto específico
  getAvailableDatesForProduct(productId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/product/${productId}/available-dates`);
  }
}
