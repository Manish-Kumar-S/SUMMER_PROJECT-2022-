import { Component, OnInit } from '@angular/core';
import { NavInput } from '../nav/nav.component';
import { CompanyService } from './company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  navInput: NavInput = {

    title: 'CUIC | COMPANY',

    name: '',

    routes: [
      {
        path: './dashboard',
        icon: 'fa-tachometer-alt',
        name: 'Home',

        show: true,
      },

      {
        path: './campus-drive',
        icon: 'fa-user-edit',
        name: 'Create Campus Drive',

        show: true,
      },

      {
        path: './company-details',
        icon: 'fa-user',
        name: 'Company Details',

        show: true,
      },
    ]
  }

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {

    this.companyService.getCompany().subscribe(data => this.navInput.name = data.profile.name)
  }

}
