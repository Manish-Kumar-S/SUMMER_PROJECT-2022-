import { Component, OnInit } from '@angular/core';
import { StudentModel } from 'src/app/shared/models/student/student.model';
import { IMG_URL } from 'src/environments/environment';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss'],
})
export class CompanyDetailsComponent implements OnInit {
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
      'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/corporate-company-logo-design-template-2402e0689677112e3b2b6e0f399d7dc3_screen.jpg?ts=1561532453'
    );
  }

  // Converts the drive link to image link
  convertImgURL(url: string) {
    const newUrl = url.split('/');
    // return `https://drive.google.com/uc?export=view&id=${newUrl[5]}`;
    return url;
  }
}
