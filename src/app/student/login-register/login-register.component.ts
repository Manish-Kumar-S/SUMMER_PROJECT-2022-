import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss'],
})
export class LoginRegisterComponent implements OnInit {
  constructor(private http: HttpClient) {}

  private url = 'localhost:9000/api/v1/user';
  roles = [
    { id: 1, name: 'Student' },
    { id: 2, name: 'Staffs' },
    { id: 3, name: 'Admin' },
  ];

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });

  registerForm: FormGroup = new FormGroup({
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    role: new FormControl(null, Validators.required),
  });

  ngOnInit(): void {}

  onLogin() {
    this.http
      .post(`${this.url}/authenticate`, {
        ...this.loginForm.value,
        role: 1,
      })
      .subscribe((data) => console.log(data));
  }

  onRegister() {
    this.http
      .post(`${this.url}/register`, this.registerForm.value)
      .subscribe((data) => console.log(data));
  }
}
