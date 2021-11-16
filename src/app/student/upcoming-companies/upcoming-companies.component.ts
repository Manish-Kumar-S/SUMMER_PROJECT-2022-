import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { API } from 'src/environments/environment';

@Component({
  selector: 'app-upcoming-companies',
  templateUrl: './upcoming-companies.component.html',
  styleUrls: ['./upcoming-companies.component.scss'],
})
export class UpcomingCompaniesComponent implements OnInit {
  companies: any[];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<any>(`${API}/student/drives/upcoming`)
      .subscribe((data) => console.log(data));
  }
}
