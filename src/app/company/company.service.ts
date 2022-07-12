import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { API } from "src/environments/environment";
import { VisualFeedbackService } from "../shared/visual-feedback/visual-feedback.service";

@Injectable({
    providedIn: 'root'
})
export class CompanyService {

    constructor(private http: HttpClient, private visualFeedbackService: VisualFeedbackService) { }

    //////////////////
    // COMPANY
    /////////////////

    /**
     * Request Type: GET
     * @returns All the drives
     */
    getAllDrives() {

        return this.http.get(`${API}/get/alldrives`).pipe(

            this.visualFeedbackService.standardApiErrorHandling(),

        );
    }

    /** 
   * Request Type: GET
   * @returns Details of the company 
   * */
    getCompany() {

        return this.http.get(`${API}/company/profile`).pipe(

            this.visualFeedbackService.standardApiErrorHandling(),

        );
    }

     /** 
   * Request Type: PUT
   * @returns Updates the company details
   * */
      updateCompanyDetails(req: FormData) {

        return this.http.put(`${API}/company/profile`, req).pipe(

            this.visualFeedbackService.standardApiErrorHandling(),

        );
    }

    /** 
     * Request Type: GET
     * @returns All the students applied to this company
     */
    getAppliedStudents() {

        return this.http.get(`${API}/company/studentapplied`).pipe(

            this.visualFeedbackService.standardApiErrorHandling(),

        );
    }

    //////////////////
    // DRIVE
    /////////////////

    getDriveFromDriveID(driveID: number) {

        return this.http.get(`${API}/company/drive?drive_id=${driveID}`).pipe(

            this.visualFeedbackService.standardApiErrorHandling(),

        );
    }

    /** 
     * Request Type: GET
     * @returns All the drives for this company
     */
    getCompanyDrives() {

        return this.http.get(`${API}/company/drives`).pipe(

            this.visualFeedbackService.standardApiErrorHandling(),

        );
    }

    /** 
     * Request Type: POST
     * @param req the drive details
     * @returns Uploads the drive details to the database
     * */
    uploadDrive(req: FormData) {

        return this.http.post(`${API}/company/drive`, req).pipe(

            this.visualFeedbackService.standardApiErrorHandling(),

        );
    }

    /**
     * Request Type: PUT
     * @param driveID the id of the drive to be updated
     * @param req the updated drive details 
     * @returns updates the drive details
     */
     updateDrive(driveID: number, req: FormData) {

        return this.http.put(`${API}/company/drive?drive_id=${driveID}`, req).pipe(

            this.visualFeedbackService.standardApiErrorHandling(),

        );
    }

    /** 
     * Request Type: GET
     * @returns Courses accepted by a drive
     **/
    getCourses() {
    return this.http
        .get(`${API}/get/courses`).pipe(

            this.visualFeedbackService.standardApiErrorHandling(),

        );
    }
}