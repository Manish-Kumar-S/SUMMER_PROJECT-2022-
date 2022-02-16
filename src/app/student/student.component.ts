import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../shared/auth/auth.service';
import { StudentModel } from '../shared/models/student/student.model';
import { VisualFeedbackService } from '../shared/visual-feedback/visual-feedback.service';
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

  first_login = new BehaviorSubject<boolean>(false);

  constructor(
    private studentService: StudentService,
    private authSerivce: AuthService,
    private router: Router,
    private visualFeedbackService: VisualFeedbackService,
  ) { }

  ngOnInit(): void {

    console.log("student");

    this.studentService.studentToken = jwtDecode(this.authSerivce.getToken());
    
    this.studentService.getStudent().pipe(

      map((res: any) => {

        this.first_login.next(res?.first_login);

        return res?.profile
      }),

    ).subscribe((student: StudentModel) => {
      
      this.studentService.currentStudent = student;
    });

    this.studentService.currentStudentChange$.subscribe(data => {

      this.name = data?.first_name + ' ' + data?.last_name;
      this.reg_no = data?.reg_number;
      this.isPlacementRep = data?.is_placement_representative;
    });

    this.first_login.subscribe((data) => {

      console.log(data);  
      if(data) {

        this.router.navigateByUrl('student/personal-details');
        this.visualFeedbackService.snackBar("Complete your profile to proceed!", 5000);
      }
    })
  }

}
