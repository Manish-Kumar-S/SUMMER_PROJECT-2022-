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
  logo: string;

  constructor(private http: HttpClient, private router: Router) {
    this.url = `${API}/user`;
    this.logo = `${IMG_URL}/annauniv-logo.png`;
    this.roles = [
      { id: 1, name: 'Student' },
      { id: 2, name: 'Company' },
      { id: 3, name: 'Admin' },
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
    const role = this.loginForm.get('role').value;
    const form = new FormData();
    form.append('email', this.loginForm.get('email').value);
    form.append('password', this.loginForm.get('password').value);
    form.append('role', this.loginForm.get('role').value);
    this.http
      .post<any>(`${this.url}/authenticate`, form, { observe: 'response' })
      .subscribe((data: any) => {
        if (data.status === 200) {
          console.log(data.headers.get('Tokenstring'));
          localStorage.setItem('errorJWT', data.headers.get('Tokenstring'));
          if (role === 1) this.router.navigateByUrl('student');
          else if (role === 2) this.router.navigateByUrl('company');
        }
      });
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
        },
        (err) => (this.registerError = err.Error)
      );
  }
}
