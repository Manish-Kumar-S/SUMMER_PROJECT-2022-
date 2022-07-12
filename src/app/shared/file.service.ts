import { Injectable } from "@angular/core";
import { Workbook } from "exceljs";
import * as fs from 'file-saver';
declare var require: any;

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { PredefinedPageSize } from "pdfmake/interfaces";
const htmlToPdfmake = require("html-to-pdfmake");
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Injectable({
    providedIn: 'root'
})
export class FileService {

    constructor() { }

    generatePDFfromHTML(htmlString: string) {

        var html = htmlToPdfmake(htmlString);
        const documentDefinition: { content: string, pageSize: PredefinedPageSize} = { content: html, pageSize: `A5` };
        const pdf = pdfMake.createPdf(documentDefinition);   
        pdf.download();     
    }

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