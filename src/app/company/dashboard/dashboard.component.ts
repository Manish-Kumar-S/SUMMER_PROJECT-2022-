import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { API } from 'src/environments/environment';

export interface DashboardData {
  position: number;
  role: string;
  date: string;
  criteria: number;
  registered: number;
  status: string;
}

const ELEMENT_DATA: DashboardData[] = [
  {position: 1, role: 'GenC Elite', date: '11-11-2021', criteria: 8, registered: 506, status: 'Completed'},
  {position: 2, role: 'GenC SDE', date: '12-11-2021', criteria: 7.5, registered: 0, status: 'Upcoming'},
  {position: 3, role: 'GenC Elevate', date: '13-11-2021', criteria: 7, registered: 0, status: 'Upcoming'},
  {position: 4, role: 'GenC', date: '14-11-2021', criteria: 7, registered: 0, status: 'Upcoming'},
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class CompanyDashboardComponent implements OnInit, AfterViewInit {

  displayedColumns: string[];
  dataSource: DashboardData[];
  driveResponse: any[];
  dashData: any[];

  // form = new FormGroup({
  //   drive_name: new FormControl(""),
  //   category: new FormControl(""),
  //   category_id: new FormControl(""),
  //   roles: new FormControl(""),
  //   employment_type: new FormControl(""),
  //   ctc_for_ug: new FormControl(""),
  //   ctc_for_pg: new FormControl(""),
  //   stipend_for_internship_for_ug: new FormControl(""),
  //   stipend_for_internship_for_pg: new FormControl(""),
  //   eligibility_10: new FormControl(""),
  //   eligibility_12: new FormControl(""),
  //   eligibility_graduation: new FormControl(""),
  //   eligibility_in_present: new FormControl(""),
  //   eligible_courses: new FormControl(""),
  //   year_batch_eligible: new FormControl(""),
  //   history_of_arrears: new FormControl(""),
  //   current_arrears: new FormControl(""),
  //   atmost_number_of_arrears: new FormControl(""),
  //   date_of_visiting: new FormControl(""),
  //   ppt_session: new FormControl(""),
  //   number_of_tests: new FormControl(""),
  //   date_time_of_test: new FormControl(""),
  //   duration_of_test: new FormControl(""),
  //   online_test: new FormControl(""),
  //   aptitude_test: new FormControl(""),
  //   coding_test: new FormControl(""),
  //   group_discussion: new FormControl(""),
  //   date_time_of_interview: new FormControl(""),
  //   number_of_interviews: new FormControl(""),
  //   technical_interview1: new FormControl(""),
  //   technical_interview2: new FormControl(""),
  //   technical_interview3: new FormControl(""),
  //   technical_plus_hr_interview: new FormControl(""),
  //   hr_interview: new FormControl(""),
  //   posted_date: new FormControl(""),
  //   registration_deadline: new FormControl(""),
  //   other_information: new FormControl("")
  // })

  isLoading: boolean;

  constructor(private http: HttpClient,private changeDetection: ChangeDetectorRef) {
    this.isLoading = true;
    this.displayedColumns = ['position', 'role', 'date', 'criteria', 'registered', 'status'];
    this.dataSource = ELEMENT_DATA;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

    console.log('sending req');

    const form = new FormData();
    form.append('email', 'company@company.com');
    form.append('password', 'asd');
    form.append('role', '2');
    this.http.post(`${API}/user/authenticate`, form,{observe: 'response'}).subscribe(
      (data) => {
        console.log(data)
        localStorage.setItem('errorJWT', data.headers.get('Tokenstring'))
        console.log(data.headers.get('Tokenstring'));
      },
      (err) => console.log(err)
    );

    this.http
      .get(`${API}/company/drive`)
      .pipe(map((res: any) => res.drives))
      .subscribe((val) =>{
        this.driveResponse = val;
        console.log(val);
        this.isLoading = false;
        this.changeDetection.markForCheck();

        // console.log(this.driveResponse['ctc_for_pg'])
        // this.form.get('ctc_for_pg').setValue(this.driveResponse['ctc_for_pg']);
      });

    // this.http.get(`${API}/company/drive`).subscribe((res) => {
    //   this.driveResponse = res;
    //   console.log(res);
    //   this.isLoading = false;
    //   this.changeDetection.markForCheck();
    //   this.driveResponse.forEach(e => {
    //     console.log(e);
    //     this.dashData.push(e);
    //   });
    // })
  }

}
