import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs/operators';
import { API } from 'src/environments/environment';
import { StudentModel } from '../../../shared/models/student/student.model';

/**
 * @title Table with pagination
 */
 @Component({
    selector: 'app-pr-approval',
    templateUrl: './profile-approval.component.html',
    styleUrls: ['./profile-approval.component.scss']
})
export class PlacementRepresentativeApproval implements AfterViewInit {
  displayedColumns: string[] = ['serial_number', 'name', 'reg_no', 'approve'];

  dataSource = new MatTableDataSource<StudentApprove>();

  selection = new SelectionModel<StudentApprove>(true, []);

  studentList: StudentModel[];

  approving = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(private http: HttpClient) {
      
    this.setDatasource();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  setDatasource() {

    this.getStudentApprovalList().pipe(

      map((response: any): StudentApprove[] => {

        this.studentList = response.students;

        return response.students.map((student, index): StudentApprove => {

            return {
    
                serial_number: index + 1,
                name: student.first_name + ' ' + student.last_name,
                reg_no: student.reg_number
            }
        });
      }) 

    ).subscribe(list => this.dataSource = new MatTableDataSource<StudentApprove>(list));
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

  getStudentApprovalList() {

    //return only id, name, reg
    return this.http.get(`${API}/pr/studentlist`);
  }

  approveStudents() {

    const approvedStudents = this.studentList.filter((student) => this.selection.selected.some((std) => std.reg_no === student.reg_number)).map((student) => student.id);

    if(approvedStudents.length === 0) return;

    const studentList = JSON.stringify(approvedStudents).replace('[', '').replace(']', '');

    const form = new FormData();

    form.set('student_list', studentList);

    this.approving = true;

    this.http.post(`${API}/pr/approvestudentprofile`, form).subscribe((response: any) => {

      this.approving = false;

      if(response.response.status === 200) {

        this.setDatasource();
      }
    });
  }
}

export interface StudentApprove {

    serial_number: number;
    reg_no: number;
    name: string;
}

// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
//   {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
//   {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
//   {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
//   {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
//   {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
//   {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
//   {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
//   {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
//   {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
//   {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
// ];
