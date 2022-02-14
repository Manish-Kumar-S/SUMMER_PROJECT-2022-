import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../shared/auth/auth.service';
import { API, IMG_URL } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute){

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

    this.otp.valueChanges.subscribe(
      data => {
        if(data.length == 6){

          const form = new FormData();
          form.append('email', this.email);
          form.append('otp', data);

          console.log(form.has('email'));

          let headers = new HttpHeaders({
            'Tokenstring': this.token,
          })

          this.http.post<any>(`${this.url}/verify`, form, { headers: headers, observe: 'response' })
            .subscribe(
              (data) => {
                this.success = true;
                clearInterval(this.t);
                setTimeout(() => {
                  this.router.navigateByUrl('');
                }, 3000);
              },
              (err) => {
                if(err.error.error_type == 2)
                  this.error2 = true;
                else if(err.error.error_type == 3)
                  this.error3 = true;
                else
                  this.error1 = true;
              }
            );
        }

        this.error1 = false;
        this.error2 = false;
        this.error3 = false;
        this.otp_resend = false;
      }
    )
  }

  regenerateOTP(){

    this.error1 = false;
    this.error2 = false;
    this.error3 = false;

    clearInterval(this.t);

    let headers = new HttpHeaders({
      'Tokenstring': this.token,
    })

    this.http.post<any>(`${this.url}/regenerateOTP?email=${this.email}`,{}, { headers: headers, observe: 'response' })
    .subscribe((data) => {
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

  constructor(private http: HttpClient, private router: Router) {
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
      role: new FormControl(null, Validators.required),
    });
    this.registerForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {}

  onLogin() {
    const form = new FormData();
    form.append('email', this.loginForm.get('email').value);
    form.append('password', this.loginForm.get('password').value);
    form.append('role', this.loginForm.get('role').value);
    this.http
      .post<any>(`${this.url}/authenticate`, form, { observe: 'response' })
      .subscribe(
        (data) => {
          console.log(data.headers.get('Tokenstring'));
          if(this.loginForm.get('role').value == 1)
            this.router.navigateByUrl('student');
          else if(this.loginForm.get('role').value == 2)
            this.router.navigateByUrl('company');
          else if(this.loginForm.get('role').value == 3)
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
    this.http
      .post<any>(`${this.url}/register`, form, { observe: 'response' })
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
