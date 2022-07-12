import { Component } from "@angular/core";
import { FileService } from "src/app/shared/file.service";

@Component({
    selector: 'app-reports',
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent {

    constructor(private fileService: FileService) { }

    get branchWiseStatHtml(): string {

        //Fetch data from backend
        const res = [
            {
                "degree": "B.Tech",
                "branch": "Computer Science",
                "eligible_count": "100",
                "placed_count": "50",
                "percentage": "50",
            },
        ]

        for(let i = 0; i < 50; i++) {

            res.push(res[0]);
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
                    <td style="text-align: center;width: 100%;font-weight: bold;" colspan="10">BRANCH-WISE PLACEMENT STATISTICS FOR THE YEAR XXXX - XXXX (As on XX-XX-XXXX)</td>
                </tr>
                <tr><td style="padding: 10px;" colspan="10"></td></tr>
                <tr>
                    <td style="text-align: center;font-weight: bold;">Degree</td>
                    <td style="text-align: center;font-weight: bold;">Branch / Specialization</td>
                    <td style="text-align: center;font-weight: bold;" colspan="3">No. of Students</td>
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
                    <td></td>
                    <td></td>
                    <td style="text-align: center;font-weight: bold;">Elig.</td>
                    <td style="text-align: center;font-weight: bold;">Plcd.</td>
                    <td style="text-align: center;font-weight: bold;">%</td>
                </tr>
        `

        res.forEach(element => {

            html += `
                <tr>
                    <td style="text-align: center;">${element.degree}</td>
                    <td style="text-align: center;">${element.branch}</td>
                    <td style="text-align: center;">${element.eligible_count}</td>
                    <td style="text-align: center;">${element.placed_count}</td>
                    <td style="text-align: center;">${element.percentage}</td>
                    <td></td>
                    <td></td>
                    <td style="text-align: center;">${element.eligible_count}</td>
                    <td style="text-align: center;">${element.placed_count}</td>
                    <td style="text-align: center;">${element.percentage}</td>
                </tr>
            `
        })

        html+="</table>"

        return html;
    }

    makePDF(html: string) {

        console.log("Making PDF", html);

        this.fileService.generatePDFfromHTML(html);
    }
}