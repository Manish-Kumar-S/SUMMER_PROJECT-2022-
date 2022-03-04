import { SelectionModel } from "@angular/cdk/collections";
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { filter, map, mergeMap } from "rxjs/operators";
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from "@angular/material/chips";
import { forkJoin, of } from "rxjs";
import { VisualFeedbackService } from "src/app/shared/visual-feedback/visual-feedback.service";
import { CompanyService } from "../company.service";
import { StudentModel } from "src/app/shared/models/student/student.model";
import { ExcelService } from "src/app/shared/excel.service";

interface RegisteredStudentModel extends StudentModel {

    drive_id: number;
}

export interface RegisteredStudent {

    serial_number: number;
    name: string,
    reg_no: number,
    gender: string,
    email: string,
    phone: number,
    grade_x: number,
    grade_xii: number,
    history_of_arrears: string,
    backlogs: number,
    cgpa: number,
    resume: string
}

interface RegisteredStudentFilters {

    name: { filters: string[] },
    reg_no: { filters: number[] },
    gender: { filters: string[] },
    email: { filters: string[] },
    phone: { filters: number[] },
    grade_x: { filters: number[] },
    grade_xii: { filters: number[] },
    history_of_arrears: { filters: string[] },
    backlogs: { filters: number[] },
    cgpa: { filters: number[] },
}

@Component({
    selector: 'app-registered-students',
    templateUrl: './registered-students.component.html',
    styleUrls: ['./registered-students.component.scss']
})
export class RegisteredStudentsComponent implements OnInit {

    readonly separatorKeysCodes = [ENTER, COMMA] as const;

    displayedColumns = ['serial_number', 'name', 'reg_no', 'gender', 'email', 'phone', 'grade_x', 'grade_xii', 'history_of_arrears', 'backlogs', 'cgpa', 'resume'];

    columnNames = ['No.', 'Name', 'Registration Number', 'Gender', 'Email', 'Phone', '10th Grade', '12th Grade', 'History of arrears', 'Backlogs', 'CGPA', 'Resume'];

    studentList: RegisteredStudent[];

    @Input() driveId: number;

    dataSource = new MatTableDataSource<RegisteredStudent>();

    filters: RegisteredStudentFilters = {

        name: {
            filters: [],
        },

        reg_no: {

            filters: [],
        },

        gender: {

            filters: [],
        },

        email: {

            filters: [],
        },

        phone: {

            filters: [],
        },

        grade_x: {

            filters: [],
        },

        grade_xii: {

            filters: [],
        },

        history_of_arrears: {

            filters: [],
        },

        backlogs: {

            filters: [],
        },

        cgpa: {

            filters: [],
        },
    }

    selection = new SelectionModel<RegisteredStudent>(true, []);

    @Output() studentListChange = new EventEmitter<RegisteredStudent[]>();

    @ViewChild(MatPaginator) paginator: MatPaginator;

    get selectedNumber(): number {

        return this.selection.selected.length;
    }

    constructor(private companyService: CompanyService, private excelService: ExcelService, private visualFeedbackService: VisualFeedbackService) { }

    ngOnInit(): void {

        if(!this.studentList) this.setDatasource();
    }

    openNewTab(resume) {

        window.open(resume);
    }

    downloadAsExcel() {

        if(this.dataSource.data.length === 0) {

            this.visualFeedbackService.snackBar('No data to download (Try changing filters, if any)');
            return;
        }

        let data: any[][]= [this.columnNames];

        data = data.concat(this.dataSource.data.map(student => Object.values(student)));

        console.log(data);

        this.excelService.generateExcel(data, 'Registered Students', 'Registered Students');
    }

    ///////////////////////
    // FILTERS
    ///////////////////////

    private applyFilters(): RegisteredStudent[] {

        let filteredData: RegisteredStudent[] = Array.from(this.studentList);

        Object.keys(this.filters).forEach((filterColumn) => {

            if(this.filters[filterColumn].filters.length === 0) return;

            filteredData = filteredData.filter((student) => {

                const pred = this.filters[filterColumn].filters.map((filter) => filter.toString().toLowerCase()).includes(student[filterColumn].toString().toLowerCase());
                return pred;
            });
        });

        return filteredData;
    }

    add(event: MatChipInputEvent, column: string, type: 'text' | 'number'): void {
        const value = (event.value || '').trim();

        let values: (string | number)[] = value.split(',');

        if(type === "number") values = values.map(value => parseInt(value.toString()));

        if(value) values.forEach(value => this.filters[column].filters.push(value));

        this.dataSource.data = this.applyFilters();
    
        // Clear the input value
        event.input.value = '';
    }

    remove(filter: string | number, column: string): void {
        
        const index = this.filters[column].filters.indexOf(filter);

        if (index >= 0) {

            this.filters[column].filters.splice(index, 1);
            this.dataSource.data = this.applyFilters();
        }
    }

    clearFilters(column: string) {

        this.filters[column].filters = [];
        this.dataSource.data = this.applyFilters();
    }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        if (this.isAllSelected()) {
        this.selection.clear();
        return;
        }

        this.selection.select(...this.dataSource.data);
    }

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: RegisteredStudent): string {
        if (!row) {
        return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.serial_number + 1}`;
    }

    setDatasource() {

        // this.companyService.getAppliedStudents().subscribe(console.log);

        this.companyService.getAppliedStudents().pipe(

            map((response) => {

                return response?.drive?.filter((student: RegisteredStudentModel) => student.drive_id === this.driveId)[0];
            }),

            map((drive: any): RegisteredStudent[] => {

                if(!drive) return [];

                return drive.student_list.map((student: RegisteredStudentModel, index: number): RegisteredStudent => {

                    return {

                        serial_number: index + 1,
                        name: student.first_name + ' ' + student.last_name,
                        reg_no: student.reg_number,
                        gender: student.gender,
                        email: student.email,
                        phone: student.phone,
                        grade_x: student.grade_10_percentage,
                        grade_xii: student.grade_12_percentage,
                        history_of_arrears: student.history_of_arrears ? 'Yes' : 'No',
                        backlogs: student.number_of_arrears,
                        cgpa: student.ug_course_percentage / 10,
                        resume: student.resume_link,
                    }
                })
            }),

        ).subscribe((list) => {

            this.studentList = list;
            this.dataSource = new MatTableDataSource<RegisteredStudent>(list);
            this.dataSource.data = this.applyFilters();
            this.selection.clear();

            this.studentListChange.emit(this.studentList);
        });
    }
}