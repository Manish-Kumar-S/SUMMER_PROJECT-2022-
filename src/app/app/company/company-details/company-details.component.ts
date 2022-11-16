import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { API, IMG_URL } from 'src/environments/environment';
import { CompanyService } from '../company.service';
import { CompanyDetailsDialog } from './company-model/company-model.component';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss'],
})
export class CompanyDetailsComponent implements OnInit {
  company: any = {};
  photographLink: string;
  constructor(private http: HttpClient, private dialog: MatDialog, private companyService: CompanyService) {}

  ngOnInit(): void {
    this.companyService.getCompany().subscribe(
      (data: any) => {
        if(data.response.status === 200){
          console.log(data);
          this.company = data.profile;
        }
      }
    );
  }

  openDialog() {
    const dialogRef = this.dialog.open(CompanyDetailsDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      // this.router.navigateByUrl('company/dashboard');
    });
  }

  onEdit() {
    this.openDialog();
  }
}
