import { Component } from "@angular/core";
import { FileService } from "src/app/shared/file.service";

@Component({
    selector: 'app-reports',
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent {

    constructor(private fileService: FileService) { }

    htmlStrings = {
        'annexure-1': `
            <div styles="text-align: center;">
                <h1>Annexure 1</h1>
            </div>
        `
    }

    makePDF(report: string) {

        console.log("Making PDF");

        this.fileService.generatePDFfromHTML(this.htmlStrings[report]);
    }
}