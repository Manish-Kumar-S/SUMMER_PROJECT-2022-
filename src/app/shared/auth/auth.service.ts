import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

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
