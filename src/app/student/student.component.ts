import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { map } from 'rxjs/operators';
import { API } from 'src/environments/environment';
import { AuthService } from '../shared/auth/auth.service';
import { StudentService } from './student.service';
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
})
export class StudentComponent implements OnInit {

  name: string;
  reg_no: string;

  constructor(
    private studentService: StudentService,
    private authSerivce: AuthService,
    private http: HttpClient
  ) {}

  getStudent() {
    return this.http
      .get(`${API}/student/profile`)
      .pipe(map((res: any) => res.profile));
  }

  ngOnInit(): void {

    this.getStudent().subscribe(
      (data) => {
        this.name = data.first_name + ' ' + data.last_name;
        this.reg_no = data.reg_number;
      }
    )

    this.studentService.student = jwtDecode(this.authSerivce.getToken());
  }
}
