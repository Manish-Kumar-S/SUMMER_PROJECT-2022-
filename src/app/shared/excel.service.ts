import { Injectable } from "@angular/core";
import { Workbook } from "exceljs";
import * as fs from 'file-saver';

@Injectable({
    providedIn: 'root'
})
export class ExcelService {

    constructor() { }

    generateExcel(data: any[][], title: string, sheetName: string) {
        
        // Use this if you want seperate styles for headers and rows
        // const headers: string[] = data[0];

        // const rows = data.slice(1);

        const workbook = new Workbook();

        const worksheet = workbook.addWorksheet(title);

        worksheet.addRows(data);

        workbook.xlsx.writeBuffer().then((data) => {
            let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            fs.saveAs(blob, sheetName + '.xlsx');
        });
        
    }
}