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
export class StudentService {

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
  // Student
  ////////////

  /** 
   * Request Type: GET
   * @returns All the courses done by the student 
   * */
  getCourses() {
    return this.http
      .get<any>(`${API}/get/courses`)
      .pipe(

        catchError((err: HttpErrorResponse) => {

          this.visualFeedbackService.snackBar = err.statusText;
          return of(null);

        }),
        
        map((res) => res.courses)
        
      );
  }

  /** 
   * Request Type: GET
   * @returns Basic Information of a student 
   * */
  getStudent() {
    return this.http
      .get(`${API}/student/profile`)
      .pipe(

        catchError((err: HttpErrorResponse) => {

          this.visualFeedbackService.snackBar = err.statusText;
          return of(null);

        }),
      
        map((res: any) => res?.profile)
      
      );
  }

  /** 
   * Request Type: POST
   * @param driveId The unique ID of the drive to be applied
   * @returns Apply to the drive
   * */
   applyDrive(driveId: number) {

    return this.http.post<any>(`${API}/student/drives/apply?drive_id=${driveId}`, {}).pipe(

      catchError((err: HttpErrorResponse) => {

        this.visualFeedbackService.snackBar = err.statusText;
        return of(null);

      })

    );
  }

  /////////////
  // Company
  /////////////

  /** 
   * Request Type: GET
   * @returns All the company drives applied by the student 
   * */
  getAppliedCompanies() {

    return this.http
      .get(`${API}/student/drives/applied`).pipe(

        catchError((err: HttpErrorResponse) => {

          this.visualFeedbackService.snackBar = err.statusText;
          return of(null);

        })

      );
  }

  /** 
   * Request Type: GET
   * @returns All the upcoming companies except the once already applied by the student 
   * */
  getUpcomingCompanies() {

    return this.http.get(`${API}/student/drives/upcoming`).pipe(

        catchError((err: HttpErrorResponse) => {

          this.visualFeedbackService.snackBar = err.statusText;
          return of(null);

        })

      );
  }

  ////////////////////////////
  // Placement Representative
  ////////////////////////////

  /** 
   * Request Type: GET
   * @access Only Placement Representatives
   * @returns All the students that have registered for any one company
   * */
  getRegisteredStudents() {

    return this.http.get(`${API}/pr/studentsregistered`).pipe(

      catchError((err: HttpErrorResponse) => {

        this.visualFeedbackService.snackBar = err.statusText;
        return of(null);

      })

    );  
  }

  /** 
   * Request Type: GET
   * @access Only Placement Representatives
   * @returns All the students that are waiting for their profiles to get approved
   * */
  getStudentApprovalList() {

    return this.http.get(`${API}/pr/studentlist`).pipe(

      catchError((err: HttpErrorResponse) => {

        this.visualFeedbackService.snackBar = err.statusText;
        return of(null);

      })

    );
  }

}
