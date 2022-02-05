import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-placement-representative',
  templateUrl: './placement-representative.component.html',
  styleUrls: ['./placement-representative.component.scss'],
})
export class PlacementRepresentativeComponent implements OnInit {

  constructor(
    private http: HttpClient,
  ) {
    
  }

  ngOnInit(): void {
    
  }
  
}
