import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';
import { CompanyService } from 'src/app/company/company.service';
import { AdminService } from '../admin.service';


@Component({
    selector: 'app-admin-modify-drive',
    templateUrl: './modify-drive.component.html',
    styleUrls: ['./modify-drive.component.scss']
})
export class ModifyDriveComponent implements OnInit {

    companies: any[] = [
        {
            id: 1,
            name: "Company A",
            
        }
    ];

    company_drives: any[] = [
        {
            id: 2,
            name: "Company A Drive A",
            
        }
    ];

    form: FormGroup = new FormGroup(
        {
            company_form_control: new FormControl(''),
            drive_form_control: new FormControl('')
        }
    )

    selectedCompany: any;
    drive_update_enabled: boolean = false;
    driveResponse: any;

    constructor(private adminService: AdminService, private companyService: CompanyService) { }

    ngOnInit(): void {

        this.adminService.getCompanies().subscribe(
            (data: any) => {
                console.log(data);
                this.companies = data;
            }
        )

        this.form.get('company_form_control').valueChanges.subscribe(
            (value) => {
                this.selectedCompany = value;
                this.adminService.getDrives().subscribe(
                    (drives) => {
                        console.log(drives);
                        this.company_drives = drives;
                        this.company_drives = this.company_drives.filter(val => val.company.id === this.selectedCompany);
                        console.log(this.company_drives.filter(val => val.company.id === this.selectedCompany));
                        console.log(this.selectedCompany)
                        // console.log(this.selectedCompany)
                    }
                )
            }
        );

        this.form.get('drive_form_control').valueChanges.subscribe(

            (value) => {

                this.companyService.getDriveFromDriveID(value).pipe(

                    map((res) => this.driveResponse = res.drive)

                ).subscribe((res) => {
                    console.log(res);
                    this.drive_update_enabled = true
                });
            }
            
        )

    }
}