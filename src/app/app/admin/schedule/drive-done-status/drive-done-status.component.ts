import { AfterViewInit, Component, OnInit, ViewChild ,Input,Output,EventEmitter} from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { SelectionModel } from "@angular/cdk/collections";
import { VisualFeedbackService } from "src/app/shared/visual-feedback/visual-feedback.service";
import { AdminService } from "../../admin.service";
import { forkJoin, of } from "rxjs";
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from "@angular/material/chips";
import { filter, map, mergeMap } from "rxjs/operators";
export interface Companydonestatus{
  id:number;
  serial_number:number;
  company_name:string;
  drive_name:string;

}
interface companydrive{
  drive_id:number;
  serial_number:number;
  company_name:string;
  drive_name:string;

}

@Component({
  selector: 'app-drive-done-status',
  templateUrl: './drive-done-status.component.html',
  styleUrls: ['./drive-done-status.component.scss']
})

export class DriveDoneStatusComponent implements AfterViewInit,OnInit  {
   companylist: companydrive[];

  dataSource = new MatTableDataSource<Companydonestatus>(); 
  displayedColumns:string[]=['serial_number','id','company_Name','dff','select']
  
  changingStatus = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  selection = new SelectionModel<Companydonestatus>(true, []);

  constructor(private adminService: AdminService, private vis: VisualFeedbackService) {}

  get selectedNumber(): number {
    return this.selection.selected.length;
  }
  ngOnInit(){
    this.adminService.getunfinisheddrive().subscribe(
      (data)=>{
        this.companylist=data;
        console.log("company drive list",this.companylist)
        this.dataSource.data = this.companylist.map((c, index) => {

          return {
              id:c.drive_id,
              serial_number:index+1,
              company_name:c.company_name,
              drive_name:c.drive_name,
             
          }
      });
      },
      (error)=>{
        console.log("Error in ",error)
      }
    )
  }
  setDataSource(){
    this.adminService.getunfinisheddrive().subscribe(
      (data)=>{
        this.companylist=data;
        this.dataSource.data = this.companylist.map((c, index) => {

          return {
              id:c.drive_id,
              serial_number:index+1,
              company_name:c.company_name,
              drive_name:c.drive_name,
          }
      });
    
      }
    )
  }
  

  ngAfterViewInit(): void {
    this.dataSource.paginator=this.paginator;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    if (this.isAllSelected()) {
    this.selection.clear();
    return;
    }
    this.selection.select(...this.dataSource.data);
    }
    checkboxLabel(row?: Companydonestatus): string {
      if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.serial_number + 1}`;
    }




    onsubmit_changestatus(){
      this.changingStatus=true;
    var driveids =[];
    for(var i=0;i<this.selection.selected.length;i++){
      driveids[i]=this.selection.selected[i].id;
    }
    this.adminService.changecompanydrivestatus(driveids).subscribe(()=>{
      this.vis.snackBar('Company drive status changed successfully');
      this.setDataSource();
    })
    this.changingStatus=false;
    
   }
}

