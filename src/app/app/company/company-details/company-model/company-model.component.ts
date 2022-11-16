import { trigger, transition, style, animate } from '@angular/animations';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { API } from 'src/environments/environment';
import { CompanyService } from '../../company.service';

@Component({
  selector: 'dialog-company-details-dialog',
  templateUrl: './company-model.component.html',
  styleUrls: ['./company-model.component.scss'],
})
export class CompanyDetailsDialog implements OnInit {

  updateLoading: boolean;
  successMsg: boolean;
  isTabView: boolean = false;
  isMobileView: boolean = false;

  form = new FormGroup({
    name: new FormControl(''),
    ambassador_name: new FormControl(''),
    designation: new FormControl(''),
    // email: new FormControl(''),
    phone: new FormControl(''),
    details_of_office: new FormControl(''),
    address: new FormControl(''),
    
    head_office_address: new FormControl(''),
    branch_office_address: new FormControl(''),
    annual_turnover: new FormControl('')
  });

  constructor(private http: HttpClient,public breakpointObserver: BreakpointObserver, private companyService: CompanyService) {
    this.updateLoading = true;
    this.successMsg = false;
  }

  ngOnInit(): void {

    //Breakpoint Observer for Screen Size
    this.breakpointObserver.observe(['(min-width: 1000px)','(min-width: 620px)']).subscribe(
      (state: BreakpointState) => {
        if(state.breakpoints['(min-width: 1000px)']){
          console.log('Desktop View');
          this.isTabView = false;
          this.isMobileView = false;
        }
        else if(state.breakpoints['(min-width: 620px)']){
          console.log('Tab View');
          this.isTabView = true;
          this.isMobileView = false;
        }
        else{
          this.isMobileView = true;
          this.isTabView = false;
          console.log('Mobile View');
        }
      }
    );

    this.companyService.getCompany().subscribe(
      (data: any) => {
        if(data.response.status === 200){
          console.log(data);
          this.form.get('name').setValue(data.profile['name']);
          this.form.get('ambassador_name').setValue(data.profile['ambassador_name']);
          this.form.get('phone').setValue(data.profile['phone']);
          this.form.get('designation').setValue(data.profile['designation']);
          this.form.get('details_of_office').setValue(data.profile['details_of_office']);
          //this.form.get('address').setValue(data.profile['address']);

          this.form.get('head_office_address').setValue(data.profile['head_office_address']);
          this.form.get('branch_office_address').setValue(data.profile['branch_office_address']);

          this.form.get('annual_turnover').setValue(data.profile['annual_turnover']);


          this.updateLoading = false;
        }
      }
    );
  }

  OnSubmit(): void {

    this.updateLoading = true;
    this.successMsg = false;

    const req = new FormData();

    req.append('name', this.form.get('name').value);

    req.append('head_office_address', this.form.get('head_office_address').value);
    req.append('branch_office_address', this.form.get('branch_office_address').value);
    
    req.append('ambassador_name', this.form.get('ambassador_name').value);
    req.append('phone', this.form.get('phone').value);
    req.append('designation', this.form.get('designation').value);
    req.append('details_of_office', this.form.get('details_of_office').value);
    //req.append('address', this.form.get('address').value);

    
    req.append('annual_turnover', this.form.get('annual_turnover').value);

    this.companyService.updateCompanyDetails(req).subscribe(
      (data: any) => {
        if(data.response.status === 200){
          this.updateLoading = false;
          this.successMsg = true;
          setTimeout(() => {
            location.reload();
          }, 1500);
        }
      })
  }

}
