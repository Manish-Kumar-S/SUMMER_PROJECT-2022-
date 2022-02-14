import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { StudentModel } from 'src/app/shared/models/student/student.model';
import { StudentService } from '../student.service';
import { StudentPlacementStatus } from './placement-status/placement-status.component';

interface TabDetails {

  studentApproval :{

    studentList: StudentModel[],
    filters: Object
  },

  placementStatus: {

    studentList: StudentPlacementStatus[],
    filters: Object
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
      filters: null,
    },

    placementStatus: {

      studentList: null,
      filters: null,
    }
  }

  constructor(
    private http: HttpClient,
    private studentService: StudentService,
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
