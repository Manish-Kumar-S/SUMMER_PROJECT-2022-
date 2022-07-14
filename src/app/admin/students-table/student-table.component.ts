import { AfterViewInit, Component, Input, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { StudentModel } from "src/app/shared/models/student/student.model";
import { VisualFeedbackService } from "src/app/shared/visual-feedback/visual-feedback.service";
import { AdminService } from "../admin.service";

interface StudentTable {
    reg_no: number;
    name: string;
    email: string;
    phone: number;
    campus: string;
    gender: string;
    placed_status: string;
    is_pr: boolean;
}

@Component({
    selector: "app-student-table",
    templateUrl: "./student-table.component.html",
    styleUrls: ["./student-table.component.scss"]
})
export class StudentTableComponent implements OnInit, AfterViewInit {
    @Input() studentList: StudentModel[];

    displayedColumns = ['sno', 'name', 'reg_no', 'email', 'phone', 'campus', 'gender', 'placed_status', 'is_pr'];
    
    dataSource = new MatTableDataSource<StudentTable>();

    @ViewChild(MatPaginator) paginator: MatPaginator;
    
    constructor(private adminService: AdminService, private vis: VisualFeedbackService) {}

    ngOnInit() {

        console.log(this.studentList);
        this.dataSource.data = this.studentList.map((student, index) => {

            return {
                sno: index + 1,
                reg_no: student.reg_number,
                name: student.first_name + " " + student.last_name,
                email: student.email,
                phone: student.phone,
                campus: student.campus,
                gender: student.gender,
                is_pr: student.is_placement_representative,
                placed_status: student.placed_status.status
            }
        })
    }

    setDataSource() {

        this.adminService.getStudents()
            .subscribe(
                (data) => {
                    this.studentList = data;
                    this.dataSource.data = this.studentList.sort((a, b) => a.reg_number - b.reg_number).map((student, index) => {

                        return {
                            sno: index + 1,
                            reg_no: student.reg_number,
                            name: student.first_name + " " + student.last_name,
                            email: student.email,
                            phone: student.phone,
                            campus: student.campus,
                            gender: student.gender,
                            is_pr: student.is_placement_representative,
                            placed_status: student.placed_status.status
                        }
                    });
                    console.log(this.studentList);
                }
            );
    }

    ngAfterViewInit(): void {
        
        this.dataSource.paginator = this.paginator;
    }

    changePr(row: StudentTable) {

        this.adminService.changePrStatus([row.reg_no], !row.is_pr).subscribe(() => {

            this.vis.snackBar("Placement Representative status changed successfully");
            this.setDataSource();
        })
    }
    
}