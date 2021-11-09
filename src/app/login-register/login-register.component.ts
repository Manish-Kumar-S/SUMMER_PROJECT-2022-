import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:9000/api/v1/user';
    this.roles = [
      { id: 1, name: 'Student' },
      { id: 2, name: 'Staffs' },
      { id: 3, name: 'Admin' },
    ];
    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      role: new FormControl(1),
    });
    this.registerForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      role: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {}

  onLogin() {
    this.http
      .post(`${this.url}/authenticate`, this.loginForm.value)
      .subscribe((data) => console.log(data));
  }

  onRegister() {
    console.log(this.registerForm.value);
    this.http
      .post(`${this.url}/register`, this.registerForm.value)
      .subscribe((data) => console.log(data));
  }
}
