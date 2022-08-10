import { Component } from "@angular/core";
import { FormGroupDirective } from "@angular/forms";
import { element } from "protractor";
import { forkJoin } from "rxjs";
import { map } from "rxjs/operators";
import { CompanyService } from "src/app/company/company.service";
import { FileService } from "src/app/shared/file.service";
import { AdminService } from "../admin.service";
import { FormControl, FormGroup } from '@angular/forms';
import { AdminModule } from "../admin.module";
@Component({
    selector: 'app-schedule',
    templateUrl: './schedule.component.html',
    styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent {
    format_options: any[]=[
        {
            id:1,
            name:"Print in PDF"
        },{
            id:2,
            name:"Print in EXCEL"
        }
    ]
    form: FormGroup = new FormGroup(
        {
            generate_format_control: new FormControl(''),
            Scheduledate_form_control: new FormControl('')
        }
    )
   
    

    fullNames = {
        MIT: "Madras Institute of Technology",
        CEG: "College of Engineering, Guindy",
        ACT: "Alagappa College of Technology",
    }

    reports = [
        {
            name: "Tentative Placement Schedule (PDF)",
            tag: "placement-schedule",
        },
    ];
    
    courses: any;

    local = false;

    data: any;

    constructor(private fileService: FileService, private adminService: AdminService, private companyService: CompanyService) {
        this.getCourses().subscribe(
            (data) => this.courses = data
        );
    }

    getCourses() {
        return this.companyService.getCourses()
          .pipe(map((res: any) => res.courses));
    }
    get placementScheulearray():string[][]{
        var content=[]
        this.data.forEach((element,index)=>{
            let t=[]
            var eligibility = element['eligibility_10'] + "% in 10th, " + element['eligibility_12'] + "% in 12th, " + (parseFloat(element['eligibility_graduation'])/10).toString() + " in PG, " + (parseFloat(element['eligibility_in_present'])/10).toString() + " in UG";
            var CTC = element['ctc_for_ug'] === element['ctc_for_pg'] ? "Rs. " + element['ctc_for_ug'] : "<b>UG:</b> Rs. " + element['ctc_for_ug'].toString() + "\nPG: Rs. " + element['ctc_for_pg'].toString();
            let sequence=""
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
            t.push((index+1).toString())
            t.push(element['company']['name'])
            t.push(eligibility)
            t.push(element['eligible_courses'].map(course => course.branch).toString())
            t.push(CTC)
            t.push(sequence)
            t.push(element['bond_details'])
            t.push(element['roles'].toString())
            t.push("Day I: "+element['onlinetestdate']+"\nDay II: "+element['interviewdate'])
            t.push("Confirmed")
            content.push(t)
        })
        return content;


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
            <td style="text-align: center;width: 100%;font-weight: bold;" colspan="10">TENTATIVE CAMPUS PLACMENT SCHEDULE </td>
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
                    <td style="padding: 10px;"><p>Day I: ${element['onlinetestdate']}</p><p>Day II: ${element['interviewdate']}</p></td>
                    <td style="padding: 10px;">Confirmed</td>
                </tr>
            `
        })

        html += `</table>`

        return html;
    }

    generateReport() {

        let html = "";
        this.companyService.getAllDrivesschedule(this.form.value.Scheduledate_form_control).subscribe(res => {
                    
            console.log(res);
            this.data = res.companies;
            html = this.placementScheduleHtml;
            if (this.form.value.generate_format_control==1){
                this.makePDF(html, 'landscape');
            }
            else if (this.form.value.generate_format_control==2){
                const datas=this.placementScheulearray
                this.fileService.generateExcel(datas,"ANNA UNIVERSITY","PLACEMENT SCHEDULE")
            }
            
        })
    }
    makePDF(html: string, pageOrientation: 'portrait' | 'landscape' = 'portrait', pageSize = 'A4') {

        console.log("Making PDF", html);

        this.fileService.generatePDFfromHTML(html, {pageSize, pageOrientation});
    }
    ngOnInit(): void {
        
    }
}