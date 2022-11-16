import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { CompanyService } from 'src/app/company/company.service';

@Component({
  selector: 'app-modify-columns',
  templateUrl: './modify-columns.component.html',
  styleUrls: ['./modify-columns.component.scss']
})
export class ModifyColumnsComponent implements OnInit {


  displayedColumns = ['name', 'reg_no', 'gender', 'email', 'phone', 'grade_x', 'grade_xii', 'history_of_arrears', 'backlogs', 'cgpa', 'resume'];

  columnNames = ['Name', 'Registration Number', 'Gender', 'Email', 'Phone', '10th Grade', '12th Grade', 'History of arrears', 'Backlogs', 'CGPA', 'Resume'];

  driveDetails: any = {};

  @Input() set drive(v: any) {
    console.log(v);
    this.driveDetails = v;
    this.patchValues();
  }

  finalList : boolean[] =[false,false,false,false,false,false,false,false,false,false,false];
  selectColumn: FormGroup;
  boolList = [
    // {
    //   key: 1, value: 'No.',
    // },
    {
      key: 1, value: 'Name',
    },
    {
      key: 2, value: 'Registration Number',
    },
    {
      key: 3, value: 'Gender',
    },
    {
      key: 4, value: 'Email',
    },
    {
      key: 5, value: 'Phone',
    },
    {
      key: 6, value: '10th Grade',
    },
    {
      key: 7, value: '12th Grade',
    },
    {
      key: 8, value: 'History of arrears',
    },
    {
      key: 9, value: 'Backlogs',
    },

    {
      key: 10, value: 'CGPA',
    },
    {
      key: 11, value: 'Resume',
    }
  ];

  @ViewChild('allSelected') private allSelected: MatOption;

  constructor(private fb: FormBuilder, private companyService: CompanyService){}

  ngOnInit() {

    this.selectColumn = this.fb.group({
      userType: new FormControl(''),
      
    });

    this.patchValues();

    this.selectColumn.controls.userType.valueChanges.subscribe(value => {

      console.log(this.selectColumn.controls.userType.value);
    // this.selectColumn.controls.userType.value.map((value: number)=>{

    //   if(value!=0)
    //     this.finalList[value-1]=true;
    // });
    })
  }

  patchValues() {

    console.log(this.driveDetails);

    if(!this.driveDetails) return;

    let vis = (this.driveDetails['visible_columns'] as string[])

    if(!!vis && vis.length === 0) vis = null

    if(!vis) {

      this.selectColumn.controls.userType.patchValue([1,2,3,5,6,7,8,9,10]);
      return;
    }

    const selected: number[] = []

    vis.forEach((val: string, index) => {

      if (val === '1') {

        selected.push(index+1);
      }
    });

    if(selected.length === 11) selected.push(0);

    this.selectColumn.controls.userType.patchValue(selected);
  }      

  OnSubmit(){

    console.log(this.selectColumn.controls.userType.value);

    this.finalList =[false,false,false,false,false,false,false,false,false,false,false];

    this.selectColumn.controls.userType.value.map((value: number)=>{

      if(value!=0)
        this.finalList[value-1]=true;

  });

    const finalString = this.finalList.map((val) => val ? 1 : 0).toString();

    const req = new FormData();

    req.append('visible_columns', finalString);

    req.append('drive_name', this.driveDetails['drive_name']);
    req.append('category', this.driveDetails['category']['id']);
    req.append('roles', this.driveDetails['roles']);
    req.append('employment_type', this.driveDetails['employment_type']['id']);
    req.append('ctc_for_ug', this.driveDetails['ctc_for_ug']);
    req.append('ctc_for_pg', this.driveDetails['ctc_for_pg']);
    req.append('stipend_for_internship_for_ug', this.driveDetails['stipend_for_internship_for_ug']);
    req.append('stipend_for_internship_for_pg', this.driveDetails['stipend_for_internship_for_pg']);
    req.append('eligibility_10', this.driveDetails['eligibility_10']);
    req.append('eligibility_12', this.driveDetails['eligibility_12']);
    req.append('eligibility_graduation', (this.driveDetails['eligibility_graduation']/10).toString());
    req.append('eligibility_in_present', (this.driveDetails['eligibility_in_present']/10).toString());
    req.append('ug_eligible_courses_id', this.driveDetails['eligible_courses_id'][0].replace(/\s/g, "").split(','));
    req.append('pg_eligible_courses_id', this.driveDetails['eligible_courses_id'][0].replace(/\s/g, "").split(','));
    req.append('year_batch_eligible', this.driveDetails['year_batch_eligible']);
    req.append('history_of_arrears', this.driveDetails['history_of_arrears'] === true ? '1' : '2');
    req.append('current_arrears', this.driveDetails['atmost_number_of_arrears']);
    req.append('preferred_schedule', this.driveDetails['preferred_schedule'].substring(0, (this.driveDetails['preferred_schedule'] as String).length-1).split('T')[0]);
    req.append('date_of_visiting', this.driveDetails['date_of_visiting'].substring(0, (this.driveDetails['date_of_visiting'] as String).length-1).split('T')[0]);
    req.append('ppt_session', this.driveDetails['ppt_session'].substring(0, (this.driveDetails['ppt_session'] as String).length-1));
    req.append('number_of_tests', this.driveDetails['number_of_tests']);
    req.append('date_time_of_test', this.driveDetails['date_time_of_test'].substring(0, (this.driveDetails['date_time_of_test'] as String).length-1));
    req.append('duration_of_test', this.driveDetails['duration_of_test']);
    req.append('online_test', this.driveDetails['online_test']);
    req.append('aptitude_test', this.driveDetails['aptitude_test']);
    req.append('coding_test', this.driveDetails['coding_test']);
    req.append('group_discussion', this.driveDetails['group_discussion']);
    req.append('date_time_of_interview', this.driveDetails['date_time_of_interview'][0]);
    req.append('number_of_interviews', this.driveDetails['number_of_interviews']);
    req.append('technical_interview1', this.driveDetails['technical_interview1']);
    req.append('technical_interview2', this.driveDetails['technical_interview2']);
    req.append('technical_interview3', this.driveDetails['technical_interview3']);
    req.append('technical_plus_hr_interview', this.driveDetails['technical_plus_hr_interview']);
    req.append('hr_interview', this.driveDetails['hr_interview']);
    req.append('posted_date', this.driveDetails['posted_date'].split('T')[0]);
    req.append('registration_deadline', this.driveDetails['registration_deadline'].substring(0, (this.driveDetails['registration_deadline'] as String).length-1));
    req.append('ug_vacancies', this.driveDetails['ug_vacancies']);
    req.append('pg_vacancies', this.driveDetails['pg_vacancies']);
    req.append('virtual_mode', this.driveDetails['virtual_mode']);
    req.append('bond_details', this.driveDetails['bond_details']);
    req.append('allow_foreign_nationals', this.driveDetails['allow_foreign_nationals']);
    req.append('foreign_nationality_preferred', this.driveDetails['foreign_nationality_preferred']);
    req.append('academic_year', this.driveDetails['academic_year']);
    req.append('other_information', this.driveDetails['other_information']);

    console.log(this.driveDetails['category']['id']);

    this.companyService.updateDrive(this.driveDetails['id'], req)
    .subscribe(
      (data: any) => {
        if (data.response.status === 200 && this.driveDetails['id'] != null){
          console.log(data);
          setTimeout(() => {
            location.reload();
          }, 1000);
        }
      },
      (err) => console.log(err));
  }

  togglePerOne(key:any){ 

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
