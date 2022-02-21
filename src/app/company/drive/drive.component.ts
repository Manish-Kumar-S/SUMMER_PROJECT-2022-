import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs/operators";
import { CompanyService } from "../company.service";

@Component({
    selector: 'app-drive',
    templateUrl: './drive.component.html',
    styleUrls: ['./drive.component.scss']
})
export class DriveComponent implements OnInit {

    constructor(private route: ActivatedRoute, private companyService: CompanyService) { }

    drive_id: number;
    driveResponse: any;

    ngOnInit() {

        this.drive_id = parseInt(this.route.snapshot.queryParams['id']);

        this.companyService.getDriveFromDriveID(this.drive_id).pipe(

            map((res) => this.driveResponse = res.drive)

        ).subscribe(console.log);
    }
}