import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
export class CompanyDashboardComponent implements OnInit {

  displayedColumns: string[];
  dataSource: DashboardData[];
  url: any;

  constructor(private http: HttpClient) {
    this.url = API;
    this.displayedColumns = ['position', 'role', 'date', 'criteria', 'registered', 'status'];
    this.dataSource = ELEMENT_DATA;

    // const form = new FormData();
    // form.append('email', 'admin@admin.com');
    // form.append('password', 'asd');
    // form.append('role', '3');
    // this.http.post(`${this.url}/admin/registercompany`, form).subscribe(
    //   (data) => console.log(data),
    //   (err) => console.log(err)
    // );
  }

  ngOnInit(): void {
  }

}
