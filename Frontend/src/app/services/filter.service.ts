import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private apiUrl = 'http://localhost:3000/api/filter';

  constructor(private http: HttpClient) { }

   // Método para obtener las variables de filtro
   getVariables(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/variables`);
  }

  // Método para obtener las capas de filtro
  getLayers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/layers`);
  }

  // Método para crear un nuevo filtro
  createFilter(filterData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, filterData);
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
