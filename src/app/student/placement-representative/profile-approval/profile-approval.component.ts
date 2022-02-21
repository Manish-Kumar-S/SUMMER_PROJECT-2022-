import { SelectionModel } from '@angular/cdk/collections';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { map, mergeMap } from 'rxjs/operators';
import { API } from 'src/environments/environment';
import { StudentModel } from '../../../shared/models/student/student.model';
import { StudentService } from '../../student.service';
import { StudentApprovalDetailsComponent } from './student-approval-details/student-approval-details.component';

interface StudentApprove {

  serial_number: number;
  reg_no: number;
  name: string;
}

interface StudentApproveFilters {

  name: {filters: string[]},
  reg_no: {filters: number[]},
}

/**
 * @title Table with pagination
 */
 @Component({
    selector: 'app-pr-approval',
    templateUrl: './profile-approval.component.html',
    styleUrls: ['./profile-approval.component.scss']
})
export class PlacementRepresentativeApproval implements OnInit, AfterViewInit {
 
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
 
  displayedColumns: string[] = ['serial_number', 'name', 'reg_no', 'approve'];

  dataSource = new MatTableDataSource<StudentApprove>();

  selection = new SelectionModel<StudentApprove>(true, []);

  filters: StudentApproveFilters = {

    name: {
      filters: [],
    },

    reg_no: {
      filters: [],
    },
  }

  studentList: StudentModel[];
  studentApproveList: StudentApprove[];

  private _approving = false;

  get approving(): boolean {

    return this._approving && (!this.studentList || this.studentList.length !== 0);
  }

  @Input() set studentListInput(studentList: StudentModel[]) {

    if(!studentList) return;

    this.studentList = studentList;
    this.studentApproveList = studentList.map((student: StudentModel, index: number): StudentApprove => {

        return {

          serial_number: index + 1,
          name: student.first_name + ' ' + student.last_name,
          reg_no: student.reg_number
        }
    });

    this.dataSource = new MatTableDataSource<StudentApprove>(this.studentApproveList);
    this.selection.clear();
    if(!!studentList) this.dataSource.data = this.applyFilters();
  }

  @Output() studentListChange = new EventEmitter<StudentModel[]>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(private http: HttpClient, private dialog: MatDialog, private studentService: StudentService) { }

  ngOnInit(): void {
      
    if(!this.studentList) this.setDatasource();
  }

  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
  }

  setDatasource() {

    this.studentService.getStudentApprovalList().pipe(

      map((response: any): StudentApprove[] => {

        console.log(response);

        this.studentList = response.students;

        return response.students.map((student: StudentModel, index: number): StudentApprove => {

            return {
    
                serial_number: index + 1,
                name: student.first_name + ' ' + student.last_name,
                reg_no: student.reg_number
            }
        });
      }) 

    ).subscribe(list => {

      this.studentApproveList = list;
      this.dataSource = new MatTableDataSource<StudentApprove>(list);
      this.selection.clear();
      this.dataSource.data = this.applyFilters();
      this.studentListChange.emit(this.studentList);
    });
  }

  detailedView(row: StudentApprove) {

    const studentModel = this.studentList.find((student) => student.reg_number === row.reg_no);

     this.dialog.open(StudentApprovalDetailsComponent, {
      panelClass: 'student-approval-details-dialog',
      data: {
        student: studentModel,
      }
    });
  }

  get selectedNumber(): number {

    return this.selection.selected.length;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data?.length;
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
  checkboxLabel(row?: StudentApprove): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.serial_number + 1}`;
  }

  approveStudents() {

    const approvedStudents = this.studentList.filter((student) => this.selection.selected.some((std) => std.reg_no === student.reg_number)).map((student) => student.id);

    if(approvedStudents.length === 0) return;

    const studentList = JSON.stringify(approvedStudents).replace('[', '').replace(']', '');

    const form = new FormData();

    form.set('student_list', studentList);

    this._approving = true;

    this.studentService.approveStudentProfile(form).pipe(

      mergeMap((response) => {

        this._approving = false;

        if(response.response.status === 200) {

          this.setDatasource();
        }

        return this.studentService.getStudent();
      })

    ).
    subscribe((response: any) => {

      this.studentService.currentStudent = response.profile;      
    });
  }

   ///////////////////////
    // FILTERS
    ///////////////////////

    private applyFilters(): StudentApprove[] {

      let filteredData: StudentApprove[] = Array.from(this.studentApproveList);

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
}
