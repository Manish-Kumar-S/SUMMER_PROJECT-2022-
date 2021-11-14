import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy } from '@angular/compiler/src/compiler_facade_interface';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  driveResponse: any;
  dashData: any[];

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

    this.http.get(`${API}/company/drive`).subscribe((res) => {
      this.driveResponse = res;
      console.log(res);
      this.isLoading = false;
      this.changeDetection.markForCheck();
      this.driveResponse.forEach(e => {
        console.log(e);
        this.dashData.push(e);
      });
    })
  }

}
