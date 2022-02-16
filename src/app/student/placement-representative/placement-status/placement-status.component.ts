import { SelectionModel } from "@angular/cdk/collections";
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { filter, map, mergeMap } from "rxjs/operators";
import { CurrentRoundOptions, currentRoundOptions, PlacementStatusOptions, placementStatusOptions } from "../../student.resources";
import { ChangePlacementStatusComponent } from "./change-placement-status/change-placement-status.component";
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from "@angular/material/chips";
import { forkJoin, of } from "rxjs";
import { StudentService } from "../../student.service";
import { VisualFeedbackService } from "src/app/shared/visual-feedback/visual-feedback.service";

export interface StudentPlacementStatus {

    id: number;
    serial_number: number;
    name: string,
    reg_number: number,
    drive_name: string,
    company_name: string,
    current_round_number: number,
    current_round: string,
    status_number: number,
    status: string,
}

interface StudentPlacementStatusFilters {

    name: {filters: string[]},
    reg_number: {filters: number[]},
    drive_name: {filters: string[]},
    company_name: {filters: string[]},
    current_round: {filters: string[]},
    status: {filters: string[]}
}

@Component({
    selector: 'app-pr-placement-status',
    templateUrl: './placement-status.component.html',
    styleUrls: ['./placement-status.component.scss']
})
export class PlacementStatusComponent implements OnInit {

    readonly separatorKeysCodes = [ENTER, COMMA] as const;

    displayedColumns = ['serial_number' ,'name', 'reg_number', 'drive_name', 'company_name', 'current_round', 'status', 'select'];

    studentList: StudentPlacementStatus[];


    dataSource = new MatTableDataSource<StudentPlacementStatus>();

    filters: StudentPlacementStatusFilters = {

        name: {
            filters: [],
        },
        reg_number: {
            filters: [],
        },
        drive_name: {
            filters: [],
        },
        company_name: {
            filters: [],
        },
        current_round: {
            filters: [],
        },
        status: {
            filters: [],
        }
    }

    selection = new SelectionModel<StudentPlacementStatus>(true, []);

    @Input() set studentListInput(studentList: StudentPlacementStatus[]) {

        if(!studentList) return;

        this.studentList = studentList;
        this.dataSource = new MatTableDataSource<StudentPlacementStatus>(this.studentList);
        this.selection.clear();
        this.dataSource.data = this.applyFilters();
    }

    @Output() studentListChange = new EventEmitter<StudentPlacementStatus[]>();

    @ViewChild(MatPaginator) paginator: MatPaginator;

    get selectedNumber(): number {

        return this.selection.selected.length;
    }

    constructor(private dialog: MatDialog, private studentService: StudentService, private visualFeedbackService: VisualFeedbackService) { }

    ngOnInit(): void {

        if(!this.studentList) this.setDatasource();
    }

    ///////////////////////
    // FILTERS
    ///////////////////////

    private applyFilters(): StudentPlacementStatus[] {

        let filteredData: StudentPlacementStatus[] = Array.from(this.studentList);

        Object.keys(this.filters).forEach((filterColumn) => {

            if(this.filters[filterColumn].filters.length === 0) return;

            filteredData = filteredData.filter((student) => {

                const pred = this.filters[filterColumn].filters.includes(student[filterColumn]);
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
    

    getCurrentRound(round: number): string {

        return currentRoundOptions[round.toString()];
    }

    getPlacementStatus(status: number){
        
        return placementStatusOptions[status.toString()];
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
    checkboxLabel(row?: StudentPlacementStatus): string {
        if (!row) {
        return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.serial_number + 1}`;
    }

    setDatasource() {

        this.studentService.getRegisteredStudents().pipe(

            filter((response: any) => {

                if(!response && response.response.status !== 200) {

                    return false;
                }

                return true;
            }),

            map((response: any): StudentPlacementStatus[] => {

                console.log(response);

                if(!response.student_list) return [];

                return response.student_list.map((student: any, index: number): StudentPlacementStatus => {

                    return {

                        id: student.id,
                        serial_number: index + 1,
                        name: student.first_name + ' ' + student.last_name,
                        reg_number: student.reg_number,
                        drive_name: student.drive_name,
                        company_name: student.company_name,
                        current_round_number: student.current_round,
                        status_number: student.status,
                        current_round: this.getCurrentRound(student.current_round),
                        status: this.getPlacementStatus(student.status)
                    }
                })
            }),

        ).subscribe((list) => {

            this.studentList = list;
            this.dataSource = new MatTableDataSource<StudentPlacementStatus>(list);
            this.dataSource.data = this.applyFilters();
            this.selection.clear();

            this.studentListChange.emit(this.studentList);
        });
    }

    openStatusDialog() {

        const distinct = [];
        const array = this.selection.selected;
        for (var i = 0; i < array.length; i++)
            if (!distinct.includes(array[i].drive_name))
                distinct.push(array[i].drive_name)

        if(distinct.length > 1) {

            this.visualFeedbackService.snackBar("Please select students from the same drive", 5000);
            return;
        }

        const dialogRef = this.dialog.open(ChangePlacementStatusComponent, {
            data: {
                studentList: this.selection.selected
            }
        });

        dialogRef.afterClosed().pipe(

            mergeMap((result: FormData) => {

                if(!result) return of(null);

                result.append('student_list', this.selection.selected.map(student => student.id).toString().replace('[','').replace(']',''));

                const remainingStudentStatus = new FormData();

                remainingStudentStatus.append('status', PlacementStatusOptions.REJECTED.toString());

                remainingStudentStatus.append('current_round', CurrentRoundOptions.NOTAPPLICABLE.toString());

                // const remainingStudents = this.dataSource.data
                // .filter(student => !this.selection.selected.includes(student));

                const remainingStudents = 
                    this.studentList.filter(student => student.drive_name === this.selection.selected[0].drive_name) //all students of the same drive
                        .filter(student => !this.selection.selected.includes(student)); //except the selected ones

                remainingStudentStatus.append(
                    'student_list', 
                    remainingStudents
                        .map(student => student.id)
                        .toString().replace('[','').replace(']','')
                );

                return forkJoin([
                    this.studentService.changePlacementStatus(result),
                    remainingStudents.length === 0 ? of(null) : this.studentService.changePlacementStatus(remainingStudentStatus)
                ])

            })

        ).subscribe((res) => !!res ? this.setDatasource() : null);
    }
}