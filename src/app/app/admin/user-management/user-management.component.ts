import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CompanyService } from 'src/app/company/company.service';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { StudentModel } from 'src/app/shared/models/student/student.model';
import { VisualFeedbackService } from 'src/app/shared/visual-feedback/visual-feedback.service';
import { StudentService } from 'src/app/student/student.service';
import { AdminService } from '../admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { API, IMG_URL } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, filter, mergeMap, tap } from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
import { of } from 'rxjs';


@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class OTPComponent {
  private url: string;
  logo: string;
  otp: FormControl;
  email: string;
  token: string;
  success: boolean;
  countdown: string;
  error1: boolean;
  error2: boolean;
  error3: boolean;
  otp_resend: boolean;

  constructor(private dialog: MatDialog, private authService: AuthService, private http: HttpClient, private router: Router, private route: ActivatedRoute){

    localStorage.removeItem('errorJWT');

    this.success = false;
    this.error1 = false;
    this.error2 = false;
    this.error3 = false;
    this.otp_resend = false;
    this.timer(5);

    this.logo = `${IMG_URL}/annauniv-logo.png`;
    this.otp = new FormControl(null, Validators.required);
    this.url = `${API}/user`;

    

    this.route.queryParams.subscribe((params) => {this.email = params['email'];this.token = params['token'];})

    console.log(this.email);

    this.otp.valueChanges.pipe(

      filter(data => {

        if(data.length !== 6) {

          this.error1 = false;
          this.error2 = false;
          this.error3 = false;
          this.otp_resend = false;
        }

        return data.length === 6;
      }),

      mergeMap((data) => {

        console.log("verifying");
        const form = new FormData();
        form.append('email', this.email);
        form.append('otp', data);

        console.log(form.has('email'));

        let headers = new HttpHeaders({
          'Tokenstring': this.token,
        })

        return this.authService.verifyOtp(form, headers);

      }),

      catchError((err) => {

        if(err.error.error_type == 2)
          this.error2 = true;
        else if(err.error.error_type == 3)
          this.error3 = true;
        else
          this.error1 = true;
        
        return of(null);

      }),

      filter(v => !!v),

      tap(() => {

        console.log("success");
        this.success = true;
        clearInterval(this.t);
        setTimeout(() => {
          this.router.navigateByUrl('');
        
        }, 3000);
      })

    ).subscribe();
    this.dialog.closeAll();
  }

  regenerateOTP(){

    this.error1 = false;
    this.error2 = false;
    this.error3 = false;

    clearInterval(this.t);

    let headers = new HttpHeaders({
      'Tokenstring': this.token,
    })

    
    this.authService.regenerateOtp(this.email, headers).subscribe((data) => {
      // console.log('new otp');
      this.otp_resend = true;
      this.timer(5);
    })
  }

  t:any;

  timer(minute) {
    // let minute = 1;
    let seconds: number = minute * 60;
    let textSec: any = "0";
    let statSec: number = 60;

    const prefix = minute < 10 ? "0" : "";

    this.t = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;

      if (statSec < 10) {
        textSec = "0" + statSec;
      } else textSec = statSec;

      this.countdown = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;

      if (seconds == 0) {
        console.log("finished");
        clearInterval(this.t);
      }
    }, 1000);
  }
}



@Component({
    selector: 'dialog-register-admin-dialog',
    templateUrl: './register-admin-dialog.html',
    styleUrls: ['./register-admin-dialog.scss'],
})
export class RegisterAdminDialog {
  private url: string;
  roles: any[];
  loginForm: FormGroup;
  registerForm: FormGroup;
  ip: string;
  loginError: string;
  registerError: string;
  logo: string;

  constructor(private dialog: MatDialog,private _snackBar: MatSnackBar, private router: Router, private authService: AuthService, private route: ActivatedRoute){
    this.url = `${API}/user`;

    //console.log(this.url);
    this.logo = `${IMG_URL}/annauniv-logo.png`;
    this.roles = [
      { id: 3, name: 'Admin' }
    ];
    this.registerForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }
  openSnackBar(message: string) {
    this._snackBar.open(message);
  }
  onRegister() {
    const form = new FormData();
    form.append('email', this.registerForm.get('email').value);
    form.append('password', this.registerForm.get('password').value);
    let role:number;
    role = 3;
    console.log(role);
    form.append('role', role.toString());
    this.authService.registerUser(form)
      .subscribe(
        (data) => {
          console.log(data.headers.get('Tokenstring'));
          let tokenString = data.headers.get('Tokenstring');
          this.router.navigate(['otp'], {queryParams: {email: this.registerForm.get('email').value, token: tokenString}, skipLocationChange: true});
           this.dialog.closeAll();
        },
        (err) => {this.registerError = err.error.response.message['message'];
        this._snackBar.open(this.registerError);
      }
      );
    
     
  }

}

@Component({
  selector: 'dialog-register-company-dialog',
  templateUrl: './register-company-dialog.html',
  styleUrls: ['./register-company-dialog.scss'],
})
export class RegisterCompanyDialog {
  private url: string;
  roles: any[];
  loginForm: FormGroup;
  registerForm: FormGroup;
  ip: string;
  loginError: string;
  registerError: string;
  logo: string;

  constructor(private dialog: MatDialog, private router: Router, private authService: AuthService, private route: ActivatedRoute){
    this.url = `${API}/user`;

    //console.log(this.url);
    this.logo = `${IMG_URL}/annauniv-logo.png`;
    this.roles = [
      { id: 2, name: 'Company' }
    ];
    this.registerForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  onRegister() {
    const form = new FormData();
    form.append('email', this.registerForm.get('email').value);
    form.append('password', this.registerForm.get('password').value);
    let role:number;
    role = 2;
    console.log(role);
    form.append('role', role.toString());
    this.authService.registerUser(form)
      .subscribe(
        (data) => {
          console.log(data.headers.get('Tokenstring'));
          let tokenString = data.headers.get('Tokenstring');
          this.router.navigate(['otp'], {queryParams: {email: this.registerForm.get('email').value, token: tokenString}, skipLocationChange: true});
        },
        (err) => (this.registerError = err.error.response.message['message'])
      );
      this.dialog.closeAll();
  }
  
}

@Component({
    selector: 'app-admin-user-management',
    templateUrl: './user-management.component.html',
    styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

    studentList: StudentModel[];

    constructor(private dialog: MatDialog, private adminService: AdminService, private vis: VisualFeedbackService) {
    }

    ngOnInit(): void {

        this.setDatasource();
    }

    setDatasource() {

        this.adminService.getStudents()
            .subscribe(
                (data) => {
                    this.studentList = (data as StudentModel[]).sort((a, b) => a.reg_number - b.reg_number);
                    console.log(this.studentList);
                }
            );
    }

    changePr(reg: number) {

        const student = this.studentList.find(s => s.reg_number === reg);

        this.studentList = null;

        this.adminService.changePrStatus([reg], !student.is_placement_representative).subscribe(() => {

            this.vis.snackBar('Placement representative status changed successfully');
            this.setDatasource();
        })   
    }

    btnText(reg: number) {

        if(!reg) return;

        const student = this.studentList.find(s => s.reg_number === reg);

        if(!student) return null;

        return !student.is_placement_representative ? "Assign PR" : "Remove PR";
    }

    openDialog(n: number) {
        if(n == 3){
          const dialogRef = this.dialog.open(RegisterAdminDialog);

          dialogRef.afterClosed().subscribe(result => {
              console.log(`Dialog result: ${result}`);
              // this.router.navigateByUrl('company/dashboard');
          });
        }
        else if(n == 2){
          const dialogRef = this.dialog.open(RegisterCompanyDialog);

          dialogRef.afterClosed().subscribe(result => {
              console.log(`Dialog result: ${result}`);
              // this.router.navigateByUrl('company/dashboard');
          });
        }
        
    }

    
}