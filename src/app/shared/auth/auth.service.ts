import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { API } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return localStorage.getItem('errorJWT');
  }

  isAuthenticated() {
    return !!localStorage.getItem('errorJWT');
  }

  logout() {
    this.http.get(`${API}/user/logout`).subscribe((data: any) => {
      if (data.response.status === 200) {
        localStorage.removeItem('errorJWT');
        this.router.navigateByUrl('/');
      }
    });
  }
}
