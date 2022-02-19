import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap } from 'rxjs/operators';
import { CourseModel } from 'src/app/shared/models/student/course.model';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-upcoming-companies',
  templateUrl: './upcoming-companies.component.html',
  styleUrls: ['./upcoming-companies.component.scss'],
})
export class UpcomingCompaniesComponent implements OnInit {
  companies: any[];
  courses: CourseModel[];

  driveDetails = false;

  eligible_status(company): boolean {

    return company.eligible_status.eligible_status;
  }

  constructor(
    private router: Router,
    private studentService: StudentService
  ) { }

  ngOnInit(): void {
    this.studentService.getCourses().pipe(

      mergeMap((data) => {

        this.courses = data;
        return this.studentService.getUpcomingCompanies()
      })
  
    ).subscribe((data) => {
        this.companies = data.companies;
        console.log(this.companies);
    });
  }

  filterCourses(course_id: string) {
    return this.courses.filter((d) => d.id === +course_id)[0].code;
  }

  redirect(company: any){
    this.driveDetails = true;
    this.router.navigate([`/student/upcoming-companies/apply-drive`],{queryParams: {id: company.id}});
  }
}
