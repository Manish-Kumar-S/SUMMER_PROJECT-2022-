import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  ip: string;
  constructor(private http: HttpClient, private router: Router) {}
  getIP() {
    return this.http.get('http://api.ipify.org/?format=json', {
      headers: { Ignore: 'true' }, // Setting a flag to be ignored in interceptor
    });
  }

  getToken() {
    return localStorage.getItem('errorJWT');
  }

  isAuthenticated() {
    return !!localStorage.getItem('errorJWT');
  }

  logout() {
    localStorage.removeItem('errorJWT');
    this.router.navigateByUrl('/');
  }
}
