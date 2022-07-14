import { Component } from "@angular/core";
import { forkJoin } from "rxjs";
import { CompanyService } from "src/app/company/company.service";
import { FileService } from "src/app/shared/file.service";
import { AdminService } from "../admin.service";

@Component({
    selector: 'app-reports',
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent {

    local = false;

    data: any;

    fullNames = {
        MIT: "Madras Institute of Technology",
        CEG: "College of Engineering, Guindy",
        ACT: "Alagappa College of Technology",
    }

    reports = [
        {
            name: "Branch Wise Placement Statistics (PDF)",
            tag: "branch-wise-stat",
        },
        {
            name: "Tentative Placement Schedule (PDF)",
            tag: "placement-schedule",
        },
        {
            name: "Company Wise Placement Statistics (PDF)",
            tag: "company-wise-stat",
        },
    ]

    constructor(private fileService: FileService, private adminService: AdminService, private companyService: CompanyService) { }

    get branchWiseStatHtml(): string {

        //Fetch data from backend
        if(this.local) {

            this.data = {
                
            MIT: [
                {
                    "degree": "B.Tech",
                    "branch": "Computer Science",
                    "eligible": "100",
                    "placed": "50",
                    "placed_percentage": "50",
                },
            ], 
            
            CEG: [{
                "degree": "B.Tech",
                "branch": "Computer Science",
                "eligible": "100",
                "placed": "50",
                "placed_percentage": "50",
            }], 
            
            ACT: [{
                "degree": "B.Tech",
                "branch": "Computer Science",
                "eligible": "100",
                "placed": "50",
                "placed_percentage": "50",
            },]}
    
            for(let i = 0; i < 200; i++) {
    
                this.data.MIT.push(this.data.MIT[0]);
            }
        }

        let html = `
            <table style="width: 100%;">
                <tr>
                    <td style="text-align: center;width: 100%;font-weight: bold;" colspan="5">ANNA UNIVERSITY, CHENNAI - 600 025</td>
                </tr>
                <tr><td style="padding: 2px;" colspan="5"></td></tr>
                <tr>
                    <td style="text-align: center;width: 100%;font-weight: bold;" colspan="5">CENTRE FOR UNIVERSITY-INDUSTRY COLLABORATION</td>
                </tr>
                <tr>
                    <td style="text-align: center;width: 100%;font-weight: bold;" colspan="5">BRANCH-WISE PLACEMENT STATISTICS FOR THE YEAR 2021 - 2022 (As on 13-07-2022)</td>
                </tr>
                <tr><td style="padding: 10px;" colspan="5"></td></tr>
                <tr>
                    <td style="text-align: center;font-weight: bold;">Degree</td>
                    <td style="text-align: center;font-weight: bold;">Branch / Specialization</td>
                    <td style="text-align: center;font-weight: bold;" colspan="3">No. of Students</td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td style="text-align: center;font-weight: bold;">Elig.</td>
                    <td style="text-align: center;font-weight: bold;">Plcd.</td>
                    <td style="text-align: center;font-weight: bold;">%</td>
                </tr>
        `

        Object.keys(this.data).forEach(branch => {

            html += `
                <tr><td style="padding: 10px;" colspan="5"></td></tr>
                <tr>
                 <td colspan="5" style="font-weight: bold;">${this.fullNames[branch]}</td>
                </tr>
            `

            this.data[branch].forEach(data => {

                html += `
                    <tr>
                        <td>${data.degree === "B.E./B.Tech./B.Arch" ? "B.E." : data.degree}</td>
                        <td>${data.branch || "N.A."}</td>
                        <td style="text-align: center;">${data.eligible || 0}</td>
                        <td style="text-align: center;">${data.placed || 0}</td>
                        <td style="text-align: center;">${data.placed_percentage || 0}</td>
                    </tr>
                `
            })
        })
        // this.data.forEach(element => {

        //     html += `
        //         <tr>
        //             <td style="text-align: center;">${element.degree}</td>
        //             <td style="text-align: center;">${element.branch}</td>
        //             <td style="text-align: center;">${element.eligible_count}</td>
        //             <td style="text-align: center;">${element.placed_count}</td>
        //             <td style="text-align: center;">${element.percentage}</td>
        //         </tr>
        //     `
        // })

        html+="</table>"

        return html;
    }

    get placementScheduleHtml(): string {

        if(this.local) {

        }

        let html = `
        <table style="width: 100%;">
        <tr>
            <td style="text-align: center;width: 100%;font-weight: bold;" colspan="10">ANNA UNIVERSITY, CHENNAI - 600 025</td>
        </tr>
        <tr><td style="padding: 2px;" colspan="10"></td></tr>
        <tr>
            <td style="text-align: center;width: 100%;font-weight: bold;" colspan="10">CENTRE FOR UNIVERSITY-INDUSTRY COLLABORATION</td>
        </tr>
        <tr>
            <td style="text-align: center;width: 100%;font-weight: bold;" colspan="10">TENTATIVE CAMPUS PLACMENT SCHEDULE 2021 - 2022 (As on 13-07-2022)</td>
        </tr>
        <tr><td style="padding: 10px;" colspan="10"></td></tr>
        <tr>
            <td style="text-align: center;font-weight: bold;">Sl No.</td>
            <td style="text-align: center;font-weight: bold;">Name of the company</td>
            <td style="text-align: center;font-weight: bold;" >Branches considered</td>
            <td style="text-align: center;font-weight: bold;">Elgibility Criteria</td>
            <td style="text-align: center;font-weight: bold;">Annual CTC in Lakh(LPA)</td>
            <td style="text-align: center;font-weight: bold;" >Sequence of Selection</td>
            <td style="text-align: center;font-weight: bold;" >Bond and delinking amount</td>
            <td style="text-align: center;font-weight: bold;" >Job Role</td>
            <td style="text-align: center;font-weight: bold;" > Dates Allotted</td>
            <td style="text-align: center;font-weight: bold;" >Confirmation status</td>
        </tr>

        `

        this.data.forEach((element, index) => {

            const eligibility = element['eligibility_10'] + "% in 10th, " + element['eligibility_12'] + "% in 12th, " + (parseFloat(element['eligibility_graduation'])/10).toString() + " in PG, " + (parseFloat(element['eligibility_in_present'])/10).toString() + " in UG";
            const CTC = element['ctc_for_ug'] === element['ctc_for_pg'] ? "<b>Rs.</b> " + element['ctc_for_ug'] : "<b>UG:</b> Rs. " + element['ctc_for_ug'].toString() + "\n<b>PG:</b> Rs. " + element['ctc_for_pg'].toString();

            let sequence = "";

            if(element['technical_interview1']) {

                sequence += "Technical Interview 1";
            }

            if(element['technical_interview2']) {

                sequence += ", Technical Interview 2";
            }

            if(element['technical_interview3']) {

                sequence += ", Technical Interview 3";
            }

            if(element['technical_plus_hr_interview']) {

                sequence += ", Technical + HR Interview";
            }

            // const alloted_dates = ;



            html += `
                <tr>
                    <td style="padding: 10px;">${index + 1}</td>
                    <td style="padding: 10px;">${element['company']['name']}</td>
                    <td style="padding: 10px;">${element['eligible_courses'].map(course => course.branch).toString()}</td>
                    <td style="padding: 10px;">${eligibility}</td>
                    <td style="padding: 10px;">${CTC}</td>
                    <td style="padding: 10px;">${sequence}</td>
                    <td style="padding: 10px;">${element['bond_details']}</td>
                    <td style="padding: 10px;">${element['roles'].toString()}</td>
                    <td style="padding: 10px;">${element['date_of_visiting']}</td>
                    <td style="padding: 10px;">Confirmed</td>
                </tr>
            `
        })

        html += `</table>`

        return html;
    }

    get companyWiseStatHtml(): string {

        let html = `
            <table style="width: 100%;" colspan="19">
                <tr>
                    <td style="text-align: center;width: 100%;font-weight: bold;" colspan="19">ANNA UNIVERSITY, CHENNAI - 600 025</td>
                </tr>
                <tr><td style="padding: 2px;" colspan="19"></td></tr>
                <tr>
                    <td style="text-align: center;width: 100%;font-weight: bold;" colspan="19">CENTRE FOR UNIVERSITY-INDUSTRY COLLABORATION</td>
                </tr>
                <tr>
                    <td style="text-align: center;width: 100%;font-weight: bold;" colspan="19">PLACEMENT STATISTICS FOR THE YEAR XXXX - XXXX (As on XX-XX-XXXX)</td>
                </tr>
                <tr><td style="padding: 10px;" colspan="19"></td></tr>
                <tr>
                    <td style="text-align: center;font-weight: bold;" rowspan="4">SI. NO.</td>
                    <td style="text-align: center;font-weight: bold;" rowspan="4">Name of the Company</td>
                    <td style="text-align: center;font-weight: bold;" rowspan="4">Branches allotted for Online Test/Interview</td>
                    <td style="text-align: center;font-weight: bold;" rowspan="4">Dates Allotted</td>
                    <td style="text-align: center;font-weight: bold;" rowspan="4">Total Students Attended</td>
                    <td style="text-align: center;font-weight: bold;" colspan="12">Students Selected for recruitment</td>
                    <td style="text-align: center;font-weight: bold;" rowspan="4">Total Students Placed</td>
                    <td style="text-align: center;font-weight: bold;" rowspan="4">Pay Package CTC in Lakhs</td> 
                    
                </tr>
                <tr>
                    <td style="text-align: center;font-weight: bold;"  colspan="4">MIT</td>
                    <td style="text-align: center;font-weight: bold;" colspan="4">CEG</td>
                    <td style="text-align: center;font-weight: bold;" colspan="4">ACT</td>
                
                </tr>
                <tr>
                    <td style="text-align: center;font-weight: bold;" colspan="2">UG</td>
                    <td style="text-align: center;font-weight: bold;" colspan="2">PG</td>
                    <td style="text-align: center;font-weight: bold;" colspan="2">UG</td>
                    <td style="text-align: center;font-weight: bold;" colspan="2">PG</td>
                    <td style="text-align: center;font-weight: bold;" colspan="2">UG</td>
                    <td style="text-align: center;font-weight: bold;" colspan="2">PG</td>
                
                </tr>
                <tr>
                
                    <td style="text-align: center;font-weight: bold;">Branch</td>
                    <td style="text-align: center;font-weight: bold;">No.</td>
                    <td style="text-align: center;font-weight: bold;">Branch</td>
                    <td style="text-align: center;font-weight: bold;">No.</td>
                    <td style="text-align: center;font-weight: bold;">Branch</td>
                    <td style="text-align: center;font-weight: bold;">No.</td>
                    <td style="text-align: center;font-weight: bold;">Branch</td>
                    <td style="text-align: center;font-weight: bold;">No.</td>
                    <td style="text-align: center;font-weight: bold;">Branch</td>
                    <td style="text-align: center;font-weight: bold;">No.</td>
                    <td style="text-align: center;font-weight: bold;">Branch</td>
                    <td style="text-align: center;font-weight: bold;">No.</td>
                
                </tr>
        `;

        this.data.forEach((element, index) => {

            html += `
                <tr>
                            
                    <td>${index+1}</td>
                    <td>${element.drive_name}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                
                </tr>
            `
        });

        html += `</table>`;

        return html;
    }

    generateReport(type: 'branch-wise-stat' | 'placement-schedule' | 'company-wise-stat') {

        let html = "";

        if(type === 'branch-wise-stat') {

            forkJoin({
                MIT: this.adminService.getBranchWisePlacementStatistics("MIT"),
                CEG: this.adminService.getBranchWisePlacementStatistics("CEG"),
                ACT: this.adminService.getBranchWisePlacementStatistics("ACT"),
            }).subscribe(res => {
    
                console.log(res);
                this.data = res;
                html = this.branchWiseStatHtml;
                this.makePDF(html);
            })
        }
        else if(type === 'placement-schedule') {

            this.companyService.getAllDrives().subscribe(res => {
                    
                    console.log(res);
                    this.data = res.companies;
                    html = this.placementScheduleHtml;
                    this.makePDF(html, 'landscape');
            })

        } else if(type === 'company-wise-stat') {

            this.adminService.getCompanyWisePlacementStatistics().subscribe(res => {

                console.log(res);
                this.data = res;
                html = this.companyWiseStatHtml;
                this.makePDF(html, 'landscape', 'A3');
            })
        }
    }

    makePDF(html: string, pageOrientation: 'portrait' | 'landscape' = 'portrait', pageSize = 'A4') {

        console.log("Making PDF", html);

        this.fileService.generatePDFfromHTML(html, {pageSize, pageOrientation});
    }
}