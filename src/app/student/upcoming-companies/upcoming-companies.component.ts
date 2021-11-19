import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CourseModel } from 'src/app/shared/models/student/course.model';
import { API } from 'src/environments/environment';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-upcoming-companies',
  templateUrl: './upcoming-companies.component.html',
  styleUrls: ['./upcoming-companies.component.scss'],
})
export class UpcomingCompaniesComponent implements OnInit {
  companies: any[];
  courses: CourseModel[];

  constructor(
    private http: HttpClient,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.studentService.getCourses().subscribe((data) => {
      this.courses = data;
      this.http.get<any>(`${API}/student/drives/upcoming`).subscribe((data) => {
        this.companies = data.companies;
        console.log(this.companies);
      });
    });
  }

  filterCourses(course_id: string) {
    return this.courses.filter((d) => d.id === +course_id)[0].code;
  }
}
