import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { API, IMG_URL } from 'src/environments/environment';
import { Router } from '@angular/router';

import { Roles } from '../shared/models/shared.resources';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
})
export class AdminLoginComponent implements OnInit {
  private url: string;
  loginForm: FormGroup;
  ip: string;
  loginError: string;
  logo: string;

  constructor(private http: HttpClient, private router: Router) {
    this.url = `${API}/user`;
    this.logo = `${IMG_URL}/annauniv-logo.png`;
    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {}

  onLogin() {
    const role=Roles.ADMIN;
    const form = new FormData();
    form.append('email', this.loginForm.get('email').value);
    form.append('password', this.loginForm.get('password').value);
    form.append('role', role.toString());
    this.http
      .post<any>(`${this.url}/authenticate`, form, { observe: 'response' })
      .subscribe((data) => {
        console.log(data.headers.get('Tokenstring'));
        this.router.navigateByUrl('admin');
        localStorage.setItem('errorJWT', data.headers.get('Tokenstring'));
      });
  }
}
