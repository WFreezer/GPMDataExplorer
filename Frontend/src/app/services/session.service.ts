// session.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private apiUrl = 'http://localhost:3000/api';
  private username: string = '';

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  setUsername(username: string) {
    this.username = username;
  }

  getUsername(): string {
    return this.username;
  }

  setSessionId(sessionId: string) {
    this.cookieService.set('sessionId', sessionId, 2 * 60 * 60);
  }

  getSessionId(): string | undefined {
    const sessionId = this.cookieService.get('sessionId');
    return sessionId;
  }

  createSession(username: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/sessions`, { username });
  }
}