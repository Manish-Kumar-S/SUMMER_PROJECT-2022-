import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { catchError } from "rxjs/operators";
import { API } from "src/environments/environment";
import { VisualFeedbackService } from "../shared/visual-feedback/visual-feedback.service";

@Injectable({
    providedIn: 'root'
})
export class CompanyService {

    constructor(private http: HttpClient, private visualFeedbackService: VisualFeedbackService) { }

    /** 
   * Request Type: GET
   * @returns Details of the company 
   * */
    getCompany() {

        return this.http.get(`${API}/company/profile`).pipe(

            catchError((err: HttpErrorResponse) => {

                this.visualFeedbackService.snackBar = err.statusText;
                return of(null);
      
            })

        );
    }
}