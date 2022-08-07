import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../shared/auth/auth.service';
import { API, IMG_URL } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, filter, mergeMap, tap } from 'rxjs/operators';
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

  constructor(private authService: AuthService, private http: HttpClient, private router: Router, private route: ActivatedRoute){

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

    // this.otp.valueChanges.subscribe(
    //   data => {
    //     if(data.length == 6){

    //       const form = new FormData();
    //       form.append('email', this.email);
    //       form.append('otp', data);

    //       console.log(form.has('email'));

    //       let headers = new HttpHeaders({
    //         'Tokenstring': this.token,
    //       })
          
    //       this.authService.verifyOtp(form, headers).subscribe(
    //         () => {
    //           this.success = true;
    //           clearInterval(this.t);
    //           setTimeout(() => {
    //             this.router.navigateByUrl('');
    //           }, 3000);
    //         },
    //         (err) => {
    //           if(err.error.error_type == 2)
    //             this.error2 = true;
    //           else if(err.error.error_type == 3)
    //             this.error3 = true;
    //           else
    //             this.error1 = true;
    //         }
    //       );
    //     } else {

    //       this.error1 = false;
    //       this.error2 = false;
    //       this.error3 = false;
    //       this.otp_resend = false;
    //     }

    //   }
    // )
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
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss'],
})
export class LoginRegisterComponent implements OnInit {
  private url: string;
  roles: any[];
  loginForm: FormGroup;
  registerForm: FormGroup;
  ip: string;
  loginError: string;
  registerError: string;
  logo: string;

  constructor(private router: Router, private authService: AuthService, private route: ActivatedRoute) {
    this.url = `${API}/user`;
    this.logo = `${IMG_URL}/annauniv-logo.png`;
    this.roles = [
      { id: 1, name: 'Student' },
      { id: 2, name: 'Company' },
      // { id: 3, name: 'Admin' },
    ];
    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
    this.registerForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {}

  get isStudent(): boolean {
    return Array.from(this.route.snapshot.url)[0].path.toString() === 'student';
  }

  get isCompany(): boolean {
    return Array.from(this.route.snapshot.url)[0].path.toString() === 'company';
  }

  get isAdmin(): boolean {
    return Array.from(this.route.snapshot.url)[0].path.toString() === 'admin';
  }

  onLogin() {
    const url = Array.from(this.route.snapshot.url);
    let role = 1;

    switch(url[0].path.toString()) {

      case 'student': {
        role = 1;
        break;
      }

      case 'company': {
        role = 2;
        break;
      }

      case 'admin': {
        role = 3;
        break;
      }
    }


    const form = new FormData();
    form.append('email', this.loginForm.get('email').value);
    form.append('password', this.loginForm.get('password').value);
    form.append('role', role.toString());
    
      this.authService.authenticateUser(form).subscribe(
        (data) => {
          console.log(data.headers.get('Tokenstring'));
          if(role == 1)
            this.router.navigateByUrl('student');
          else if(role == 2)
            this.router.navigateByUrl('company');
          else if(role == 3)
            this.router.navigateByUrl('admin');
          localStorage.setItem('errorJWT', data.headers.get('Tokenstring'));
        },
        (err) => {
          console.log(err);

          ///////////////////////////////
          // Error Handling 'error_type'
          // 1 = Internal Server Error
          // 2 = Role dosn't match
          // 3 = Incorrect Credentials
          // 4 = Unverifed Email
          // 5 = Unregistered user
          ///////////////////////////////
;
          let tokenString = err.headers.get('Tokenstring');

          if(err.error.error_type === 4)
            this.router.navigate(['otp'], {queryParams: {email: this.loginForm.get('email').value, token: tokenString}, skipLocationChange: true});

          else {
            this.loginError = err.error.response.message['message'];
          }
        }
      );
  }

  onRegister() {
    const form = new FormData();
    form.append('email', this.registerForm.get('email').value);
    form.append('password', this.registerForm.get('password').value);
    let role:number;
    if(this.router.url == "/login/student")
    {
      role = 1;
    }
    if(this.router.url == "/login/company")
    {
      role = 2;
    }
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
  }
}
