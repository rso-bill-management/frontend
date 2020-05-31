import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { GlobalConstants } from './common/global-constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient: HttpClient, private router: Router) {}

  registerUser(user: { username: string; password: string }): Observable<any> {
    return this.httpClient.post<any>(GlobalConstants.apiURLRegister, user);
  }

  loginUser(user: { username: string; password: string }): Observable<any> {
    return this.httpClient.post<any>(GlobalConstants.apiURLLogin, user);
  }

  loggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logoutUser() {
    localStorage.removeItem('token');
    this.router.navigate(['/events']);
  }

  getToken(): string {
    return localStorage.getItem('token');
  }
}
