import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-placement-representative',
  templateUrl: './placement-representative.component.html',
  styleUrls: ['./placement-representative.component.scss'],
})
export class PlacementRepresentativeComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private studentService: StudentService,
  ) {
    
  }

  ngOnInit(): void {
    

  }
  
}
