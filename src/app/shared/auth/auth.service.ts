import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/student/student.service';
import { API } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router, private studentService: StudentService) {}

  getToken() {
    return localStorage.getItem('errorJWT');
  }

  isAuthenticated() {
    return !!localStorage.getItem('errorJWT');
  }

  logout() {
    console.log('This is Logout')
    this.http.get(`${API}/user/logout`).subscribe((data: any) => {
      if (data.response.status === 200) {
        localStorage.removeItem('errorJWT');
        this.router.navigateByUrl('/');
        this.studentService.currentStudent = null;
      }
    });
  }
}
