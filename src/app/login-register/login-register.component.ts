import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../shared/auth/auth.service';

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

  constructor(private http: HttpClient, private authService: AuthService) {
    this.url = 'http://localhost:9000/api/v1/user';
    this.adBlockDetected = false;
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
      role: new FormControl(1),
    });
  }

  ngOnInit(): void {
    this.authService.getIP().subscribe(
      (data: any) => {
        this.ip = data.ip;
        this.authService.ip = this.ip;
      },
      (err) => {
        if (err.message !== '') this.adBlockDetected = true;
      }
    );
  }

  onLogin() {
    const form = new FormData();
    form.append('email', this.loginForm.get('email').value);
    form.append('password', this.loginForm.get('password').value);
    form.append('role', this.loginForm.get('role').value);
    this.http.post(`${this.url}/authenticate`, form).subscribe(
      (data) => console.log(data),
      (err) => (this.loginError = err.error)
    );
  }

  onRegister() {
    const form = new FormData();
    form.append('email', this.registerForm.get('email').value);
    form.append('password', this.registerForm.get('password').value);
    form.append('role', this.registerForm.get('role').value);
    this.http.post(`${this.url}/register`, form).subscribe(
      (data) => console.log(data),
      (err) => (this.registerError = err.Error)
    );
  }
}
