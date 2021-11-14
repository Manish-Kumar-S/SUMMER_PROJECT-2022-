import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { CourseModel } from 'src/app/shared/models/student/course.model';
import { StudentModel } from 'src/app/shared/models/student/student.model';
import { API, IMG_URL } from 'src/environments/environment';
import { StudentService } from '../student.service';
import { StudentModelComponent } from './student-model/student-model.component';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss'],
})
export class StudentDetailsComponent implements OnInit {
  student: StudentModel;
  photographLink: string;
  courses: CourseModel[];

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.http
      .get(`${API}/student/profile`)
      .pipe(map((res: any) => res.profile))
      .subscribe((data) => {
        console.log(data);
        this.student = data;
        this.student.photograph_link !== 'null'
          ? (this.photographLink = this.convertImgURL(data.photograph_link))
          : (this.photographLink = `${IMG_URL}/user.jpg`);
        this.studentService
          .getCourses()
          .subscribe((data) => (this.courses = data));
      });
  }

  // Converts the drive link to image link
  convertImgURL(url: string) {
    const newUrl = url.split('/');
    return `https://drive.google.com/uc?export=view&id=${newUrl[5]}`;
  }

  onEdit() {
    let dialogRef = this.dialog.open(StudentModelComponent, {
      data: {
        student: this.student,
        courses: this.courses,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.http
          .put(`${API}/student/profile`, result)
          .subscribe((data) => console.log(data));
      }
    });
  }
}
