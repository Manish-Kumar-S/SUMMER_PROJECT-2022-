import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';


@Component({
  selector: 'app-campus-drive',
  templateUrl: './campus-drive.component.html',
  styleUrls: ['./campus-drive.component.scss']
})
export class CampusDriveComponent implements OnInit {

  dept = new FormControl();
  bond: Boolean;

  deptList: string[] = 
  ['Computer Science & Engineering', 'Information Technology', 'Electronics & Communication',
   'Electrical & Electronics Engineering', 'Electrical & Instrumentation Engineering',
   'Mechanical Engineering', 'Automobile Engineering', 'Rubber & Plastic Technology', 'Chemical Engineering'];

  constructor() {
    this.bond = false;
  }

  ngOnInit(): void {
  }

  showBondDetails(e: MatRadioChange){
    if(e.value == 2)
      this.bond = false;
    else
      this.bond = true;
  }

}
