import { Component, OnInit } from '@angular/core';
import { StudentModel } from 'src/app/shared/models/student/student.model';
import { IMG_URL } from 'src/environments/environment';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss'],
})
export class StudentDetailsComponent implements OnInit {
  student: any = {};
  photographLink: string;
  constructor() {
    this.photographLink = `${IMG_URL}/user.jpg`;
    this.student.firstName = 'Jitiendran';
    this.student.lastName = 'KS';
    this.student.email = 'jitiendranjiji2000@gmail.com';
    this.student.regNo = 2018503527;
    this.student.phone = 12345;
  }

  ngOnInit(): void {
    this.photographLink = this.convertImgURL(
      'https://drive.google.com/file/d/1JMi0jByGXjdA_K1qlO3BtMHeYA9EBOZf/view?usp=sharing'
    );
  }

  // Converts the drive link to image link
  convertImgURL(url: string) {
    const newUrl = url.split('/');
    return `https://drive.google.com/uc?export=view&id=${newUrl[5]}`;
  }
}
