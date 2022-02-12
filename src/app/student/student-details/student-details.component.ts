import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMapTo } from 'rxjs/operators';
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

  options: any[];
  courseTypes: any[];

  myData$: Observable<Object>;
  event$: BehaviorSubject<any>;

  placeholderLink = `${IMG_URL}/placeholder-profile.png`;

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private studentService: StudentService
  ) {
    this.options = [
      { key: 'Yes', value: true },
      { key: 'No', value: false },
    ];
    this.courseTypes = [
      {
        key: 'Full Time',
        value: 1,
      },
      { key: 'Part Time', value: 2 },
    ];
    this.event$ = new BehaviorSubject(true);
    this.myData$ = this.event$.pipe(switchMapTo(this.getStudent()));
  }

  getStudent() {
    return this.http
      .get(`${API}/student/profile`)
      .pipe(map((res: any) => res.profile));
  }

  altImg() {

    this.photographLink = `${IMG_URL}/placeholder-profile.png`;
  }

  ngOnInit(): void {
    this.getStudent().subscribe((data) => {
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

  filterCourseType(value: number) {
    return this.courseTypes.filter((d) => d.value === value)[0]?.key;
  }

  filterOptions(value: boolean) {
    return this.options.filter((d) => d.value === value)[0].key;
  }

  onEdit() {
    let dialogRef = this.dialog.open(StudentModelComponent, {
      data: {
        student: this.student,
        courses: this.courses,
        options: this.options,
        courseTypes: this.courseTypes,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.http
          .put(`${API}/student/profile`, result)
          .subscribe((data: any) => {
            if (data.response.status === 200) {
              this.event$.next(true);
              this.myData$.subscribe((data: any) => {
                this.student = data;
                this.studentService.currentStudent = data;
                this.student.photograph_link !== 'null'
                  ? (this.photographLink = this.convertImgURL(
                      data.photograph_link
                    ))
                  : (this.photographLink = `${IMG_URL}/user.jpg`);
                this.studentService
                  .getCourses()
                  .subscribe((data) => (this.courses = data));
              });
            }
          });
      }
    });
  }
}

//
