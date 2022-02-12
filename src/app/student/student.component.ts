import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { map } from 'rxjs/operators';
import { API } from 'src/environments/environment';
import { AuthService } from '../shared/auth/auth.service';
import { StudentModel } from '../shared/models/student/student.model';
import { StudentService } from './student.service';
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
})
export class StudentComponent implements OnInit {

  name: string;
  reg_no: number;
  isPlacementRep: boolean;

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

    // this.getStudent().subscribe(
    //   (data) => {
    //     this.name = data.first_name + ' ' + data.last_name;
    //     this.reg_no = data.reg_number;
    //   }
    // )

    this.studentService.studentToken = jwtDecode(this.authSerivce.getToken());
    this.getStudent().subscribe((student: StudentModel) => {
      this.studentService.currentStudent = student;
    });

    this.studentService.currentStudentChange$.subscribe(data => {

      this.name = data?.first_name + ' ' + data?.last_name;
      this.reg_no = data?.reg_number;
      this.isPlacementRep = data?.is_placement_representative;
    });

    console.log(this.studentService.studentToken);
  }
}
