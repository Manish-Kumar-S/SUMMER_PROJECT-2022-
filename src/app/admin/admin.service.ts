import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { API } from 'src/environments/environment';
import { StudentModel } from '../shared/models/student/student.model';
import { VisualFeedbackService } from '../shared/visual-feedback/visual-feedback.service';
@Injectable({
  providedIn: 'root',
})
export class AdminService {

  studentToken: {email: string, exp: number};
  currentStudentChange$ = new BehaviorSubject<StudentModel>(null);
  
  constructor(private http: HttpClient, private visualFeedbackService: VisualFeedbackService) {}

  get currentStudent(): StudentModel {

    return this.currentStudentChange$.value;
  }

  set currentStudent(v: StudentModel) {

    this.currentStudentChange$.next(v);
  }

  ////////////
  // Admin
  ////////////

  /** 
   * Request Type: GET
   * @returns List of all Companies
   * */
   getCompanies() {
    return this.http
        .get<any>(`${API}/get/companies`)
        .pipe(

            this.visualFeedbackService.standardApiErrorHandling(),
    
            map((res) => res.companies)
            
        );
  }

  /** 
   * Request Type: GET
   * @returns List of all Company Drives
   * */
   getDrives() {
    return this.http
        .get<any>(`${API}/get/alldrives`)
        .pipe(

            this.visualFeedbackService.standardApiErrorHandling(),
    
            map((res) => res.companies)
            
        );
  }

  /** 
   * Request Type: GET
   * @returns All the courses done by the student 
   * */
//   getCourses() {
//     return this.http
//       .get<any>(`${API}/get/courses`)
//       .pipe(

//         this.visualFeedbackService.standardApiErrorHandling(),

//         map((res) => res.courses)
        
//       );
//   }

//   /**
//    * Request Type: PUT
//    * @param form updated student details
//    * @returns 
//    */
//   updateStudent(form: FormData) {

//     return this.http.put(`${API}/student/profile`, form).pipe(

//       this.visualFeedbackService.standardApiErrorHandling(),

//     );
//   }

}
