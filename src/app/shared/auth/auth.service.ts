import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { now } from 'moment';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StudentService } from 'src/app/student/student.service';
import { API } from 'src/environments/environment';
import { VisualFeedbackService } from '../visual-feedback/visual-feedback.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router, private studentService: StudentService, private visualFeedbackService: VisualFeedbackService) {}

  /**
   * 
   * @returns the JWT token from local storage
   */
  getToken() {
    return localStorage.getItem('errorJWT');
  }

  /**
   * @returns true(if JWT token exists in the local storage) or false(if JWT token does not exist in the local storage)
   */
  isAuthenticated() {
    //check expiry
    return !!localStorage.getItem('errorJWT');
  }

  /** 
   * Request Type: GET
   * @returns Gets the role of the user and tells whether the JWT token is expired or not
   * */
  getRole() {
    //TODO: 
    return this.http.get(`${API}/user/role`);
  }

  /** 
   * Request Type: GET
   * Logs out the user and removes the JWT token from the local storage 
   * */
  logout() {
    console.log('This is Logout')
    this.http.get(`${API}/user/logout`).pipe(

      catchError((err: HttpErrorResponse) => {

        this.visualFeedbackService.snackBar = err.statusText;
        return of(null);

      })

    ).
    subscribe((data: any) => {
      if (data.response.status === 200) {
        localStorage.removeItem('errorJWT');
        this.router.navigateByUrl('/');
        this.studentService.currentStudent = null;
      }
    });
  }
}
