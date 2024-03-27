import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private apiUrl = 'http://localhost:3000/api'; // Ajusta la URL según tu configuración
  private username: string = '';
  constructor(private http: HttpClient) {}

  setUsername(username: string) {
    this.username = username;
  }

  getUsername(): string {
    return this.username;
  }
  
  createSession(username: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/sessions`, { username });
  }

  
  
  
}
