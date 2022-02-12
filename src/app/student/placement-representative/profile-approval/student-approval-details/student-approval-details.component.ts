import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMapTo } from 'rxjs/operators';
import { CourseModel } from 'src/app/shared/models/student/course.model';
import { StudentModel } from 'src/app/shared/models/student/student.model';
import { StudentModelComponent } from 'src/app/student/student-details/student-model/student-model.component';
import { StudentService } from 'src/app/student/student.service';
import { API, IMG_URL } from 'src/environments/environment';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-approval-details.component.html',
  styleUrls: ['./student-approval-details.component.scss'],
})
export class StudentApprovalDetailsComponent implements OnInit {

  student: StudentModel;
  photographLink: string;

  courseTypes = [
    {
      key: 'Full Time',
      value: 1,
    },
    { key: 'Part Time', value: 2 },
  ];

  options = [
    { key: 'Yes', value: true },
    { key: 'No', value: false },
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {student: StudentModel},
  ) {

    this.student = data.student;
    this.photographLink = this.student.photograph_link;
  }

  ngOnInit(): void {

    console.log(this.student);
  }

  altImg() {

    this.photographLink = `${IMG_URL}/placeholder-profile.png`;
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
}

//
