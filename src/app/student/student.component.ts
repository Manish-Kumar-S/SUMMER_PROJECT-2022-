import { Component, OnInit } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { AuthService } from '../shared/auth/auth.service';
import { StudentService } from './student.service';
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
})
export class StudentComponent implements OnInit {
  constructor(
    private studentService: StudentService,
    private authSerivce: AuthService
  ) {}

  ngOnInit(): void {
    this.studentService.student = jwtDecode(this.authSerivce.getToken());
  }
}
