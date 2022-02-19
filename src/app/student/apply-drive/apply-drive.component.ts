import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseModel } from 'src/app/shared/models/student/course.model';
import { StudentService } from '../student.service';
import { StudentModel } from '../../shared/models/student/student.model';
import { mergeMap, take } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';

@Component({
  selector: 'app-apply-drive',
  templateUrl: './apply-drive.component.html',
  styleUrls: ['./apply-drive.component.scss'],
})
export class ApplyDriveComponent implements OnInit {

  company: any;
  student: StudentModel;
  courses: CourseModel[];
  driveId: number;
  applySpinner: boolean = false;
  applySuccess: boolean = false;
  applyError: boolean = false;

  getIneligibleMessage(): string {

    if(!this.placed_status) return "Already Placed";

    if(this.pendingApproval) return "Incomplete Profile";

    return "You are Ineligible for this Job Profile";
  }

  get pendingApproval(): boolean {

    return !this.company.eligible_status.profile_status;
  }

  get passing_out_year(): boolean {

    return this.company.eligible_status.year_batch_eligible;
  }

  get course_percentage(): boolean {

    return this.company.eligible_status.eligibility_in_present;
  }

  get current_arrears(): boolean {

    return this.company.eligible_status.current_arrears;
  }

  get history_of_arrears(): boolean {

    return this.company.eligible_status.history_of_arrears;
  }

  get eligibility_12(): boolean {

    return this.company.eligible_status.eligibility_12;
  }

  get eligibility_10(): boolean {

    return this.company.eligible_status.eligibility_10;
  }

  get placed_status(): boolean {

    return this.company.eligible_status.placed_status;
  }

  get eligible_courses(): boolean {

    return this.company.eligible_status.eligible_courses;
  }

  //OVERALL ELIGIBILITY
  get eligible_status(): boolean {

    return this.company.eligible_status.eligible_status;
  }

  get eligibleCoursesArrayUG(): string {

    return this.company.eligible_courses.filter((c) => c.programme === "UG").map((c) => c.code).toString();
  }

  get eligibleCoursesArrayPG(): string {

    return this.company.eligible_courses.filter((c) => c.programme === "PG").map((c) => c.code).toString();
  }

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {

    this.studentService.getCourses().pipe(

      mergeMap((data) => {

        this.student = this.studentService.currentStudent;
        this.courses = data;
        return forkJoin({
          params: this.route.queryParams.pipe(take(1)),
          companies: this.studentService.getUpcomingCompanies(),
        });
      }),

      mergeMap((v) => {

        const data = v.companies;
        const params = v.params;

        data.companies.forEach((c:any) => {
          if (c.id === +params.id) {
            this.driveId = c.id;
            this.company = c;
          }
        });

        return of(null);
      })

    ).subscribe();
  }

  filterCourses(course_id: string) {
    return this.courses.filter((d) => d.id === +course_id)[0].code;
  }

  applyDrive() {

    this.applySpinner = true;

    this.studentService.applyDrive(this.driveId).subscribe((data) => {
      if(data.response.status == 200) {
        console.log(data);
        this.applySpinner = false;
        this.applySuccess = true;
      }else {
        this.applySpinner = false;
        this.applyError = true;
      }
    });
  }
  
}
