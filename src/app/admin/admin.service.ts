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
   * 
   * @param register_no_list List of register numbers of students to be modfied
   * @param is_pr new pr status of the students
   * @desc Modifies the PR status of the students
   */
  changePrStatus(register_no_list: number[], is_pr: boolean) {

    const req = new FormData();

    req.append('register_no_list', register_no_list.toString());
    req.append('is_pr', is_pr ? 'true' : 'false');

    return this.http
        .post<any>(`${API}/pr/assignpr`, req)
        .pipe(

            this.visualFeedbackService.standardApiErrorHandling(),

        );
  }
  changecompanydrivestatus(driveids:number[]){
    const req=new FormData();
    req.append('driveids', driveids.toString());
    console.log("converting : ",driveids.toString(),req)
    return this.http
    .post<any>(`${API}/admin/drivestatus`, req)
    .pipe(
        this.visualFeedbackService.standardApiErrorHandling(),

    );
  }

  /**
   * Request Type: GET
   * @returns List of all Students
   */
  getStudents() {
      
      return this.http
          .get<any>(`${API}/admin/viewstudents`)
          .pipe(
  
              this.visualFeedbackService.standardApiErrorHandling(),
      
              map((res) => res.students)
              
          );
  }

  /**
   * Request Type: GET
   * @desc
   * Approves the given drive
   * */
  approveDrive(driveId: number) {

    return this.http
        .put<any>(`${API}/admin/approvedrive?drive_id=${driveId}`, {})
        .pipe(

            this.visualFeedbackService.standardApiErrorHandling(),
            map((res) => res.report)
            
        );
  }

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
   * @returns Placement Statistics Branch wise
   * */
   getBranchWisePlacementStatistics(query: string) {
    return this.http
        .get<any>(`${API}/admin/branchwiseplacementstatistics?campus=${query}`)
        .pipe(

            this.visualFeedbackService.standardApiErrorHandling(),
    
            map((res) => res.report)
            
        );
  }

  /** 
   * Request Type: GET
   * @returns Placement Statistics Company wise
   * */
   getCompanyWisePlacementStatistics() {
    return this.http
        .get<any>(`${API}/admin/companywiseplacementstatistics`)
        .pipe(

            this.visualFeedbackService.standardApiErrorHandling(),
    
            map((res) => res.report)
            
        );
  }

  getunfinisheddrive(){
    console.log("Calling unfinished drive!")
    return this.http.get<any>(`${API}/admin/unfinisheddrive`).pipe(
        this.visualFeedbackService.standardApiErrorHandling(),
            map((res) => res.companies)
    )
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
