import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../shared/auth/auth.service';
import { API, IMG_URL } from 'src/environments/environment';
import { Router } from '@angular/router';

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
  adBlockDetected: boolean;
  logo: string;

  constructor(private http: HttpClient, private router: Router) {
    this.url = `${API}/user`;
    this.logo = `${IMG_URL}/annauniv-logo.png`;
    this.adBlockDetected = false;
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
      role: new FormControl(1),
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
      .subscribe((data) => {
        console.log(data.headers.get('Tokenstring'));
        if(this.loginForm.get('role').value == 1)
          this.router.navigateByUrl('student');
        else if(this.loginForm.get('role').value == 2)
          this.router.navigateByUrl('company');
        else if(this.loginForm.get('role').value == 3)
          this.router.navigateByUrl('admin');
        localStorage.setItem('errorJWT', data.headers.get('Tokenstring'));
      });
  }

  onRegister() {
    const form = new FormData();
    form.append('email', this.registerForm.get('email').value);
    form.append('password', this.registerForm.get('password').value);
    // form.append('role', this.registerForm.get('role').value);
    this.http
      .post(`${this.url}/register`, form, { observe: 'response' })
      .subscribe(
        (data) => {
          console.log(data.headers.get('Tokenstring'));
        },
        (err) => (this.registerError = err.Error)
      );
  }
}
