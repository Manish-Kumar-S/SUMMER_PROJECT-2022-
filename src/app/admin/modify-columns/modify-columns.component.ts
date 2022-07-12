import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatOption } from '@angular/material/core';

@Component({
  selector: 'app-modify-columns',
  templateUrl: './modify-columns.component.html',
  styleUrls: ['./modify-columns.component.scss']
})
export class ModifyColumnsComponent implements OnInit {


  displayedColumns = ['serial_number', 'name', 'reg_no', 'gender', 'email', 'phone', 'grade_x', 'grade_xii', 'history_of_arrears', 'backlogs', 'cgpa', 'resume'];

  columnNames = ['No.', 'Name', 'Registration Number', 'Gender', 'Email', 'Phone', '10th Grade', '12th Grade', 'History of arrears', 'Backlogs', 'CGPA', 'Resume'];

  finalList : boolean[] =[false,false,false,false,false,false,false,false,false,false,false,false];
  finalString :string;
  selectColumn: FormGroup;
  boolList = [
    {
      key: 1, value: 'No.',
    },
    {
      key: 2, value: 'Name',
    },
    {
      key: 3, value: 'Registration Number',
    },
    {
      key: 4, value: 'Email',
    },
    {
      key: 5, value: 'Gender',
    },
    {
      key: 6, value: 'Phone',
    },
    {
      key: 7, value: '10th Grade',
    },
    {
      key: 8, value: '12th Grade',
    },
    {
      key: 9, value: 'History of arrears',
    },
    {
      key: 10, value: 'Backlogs',
    },

    {
      key: 11, value: 'CGPA',
    },
    {
      key: 12, value: 'Resume',
    }

  ];
  // constructor() { }

  // ngOnInit(): void {
  // }
  @ViewChild('allSelected') private allSelected: MatOption;

  constructor(private fb: FormBuilder){}

  ngOnInit() {
    this.selectColumn = this.fb.group({
      userType: new FormControl(''),
      
    });
  }

  OnSubmit(){

    this.finalList =[false,false,false,false,false,false,false,false,false,false,false,false];
    this.finalString ="";

    this.selectColumn.controls.userType.value.map((value)=>{

        if(value!=0)
          this.finalList[value-1]=true;

    });

    this.finalList.map((val)=>{

        if(val==false)
          this.finalString  +=  '0,';
        else
          this.finalString  +=  '1,';

    });

    this.finalString = this.finalString.slice(0,-1);
    
    console.log(this.finalString);
  }

  tosslePerOne(key:any){ 

    if (this.allSelected.selected) {  

      this.selectColumn.controls.userType
      .patchValue([...this.boolList.filter((item)=>{

        if(item.key!=key)
        return item;

      }).map(item => item.key)]);

      return false;
    }

    if(this.selectColumn.controls.userType.value.length==this.boolList.length)
      this.allSelected.select();

  }
  toggleAllSelection() {

    if (this.allSelected.selected) {

      this.selectColumn.controls.userType
        .patchValue([...this.boolList.map(item => item.key), 0]);
    } 
    else {

      this.selectColumn.controls.userType.patchValue([]);
    }

  }
}
