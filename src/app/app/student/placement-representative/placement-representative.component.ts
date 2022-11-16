import { Component, OnInit } from '@angular/core';
import { StudentModel } from 'src/app/shared/models/student/student.model';
import { StudentPlacementStatus } from './placement-status/placement-status.component';

interface TabDetails {

  studentApproval :{

    studentList: StudentModel[],
  },

  placementStatus: {

    studentList: StudentPlacementStatus[],
  }
}

@Component({
  selector: 'app-placement-representative',
  templateUrl: './placement-representative.component.html',
  styleUrls: ['./placement-representative.component.scss'],
})
export class PlacementRepresentativeComponent implements OnInit {

  tabDetails: TabDetails = {

    studentApproval: {
      
      studentList: null,
    },

    placementStatus: {

      studentList: null,
    }
  }

  constructor(
  ) {
    
  }

  ngOnInit(): void {
    

  }

  setStudentApproval(studentList: StudentModel[]) {

    this.tabDetails.studentApproval.studentList = studentList;
  } 

  setPlacementStatus(studentList: StudentPlacementStatus[]) {

    this.tabDetails.placementStatus.studentList = studentList;
  }
  
}
