import { E } from '@angular/cdk/keycodes';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { API } from 'src/environments/environment';
import { CompanyService } from '../company.service';

@Component({
  selector: 'dialog-confirmation-dialog',
  templateUrl: 'confirmation-dialog.html',
})
export class ConfirmationDialog {}

@Component({
  selector: 'app-campus-drive',
  templateUrl: './campus-drive.component.html',
  styleUrls: ['./campus-drive.component.scss']
})
export class CampusDriveComponent implements OnInit {

  @Input() isAdmin? = false;

  historyOfArrears: boolean;
  valid: boolean;
  updateLoading: boolean;
  courses: any;
  ug_courses: any;
  pg_courses: any;
  isVirtual: boolean;
  isForeignNational: boolean;
  fte: boolean;
  intern: boolean;
  internOption: boolean;
  fullOption: boolean;
  year = new Date().getFullYear();
  isTabView: boolean = false;
  isMobileView: boolean = false;

  isDifferentRecruitmentDates: boolean;

  isNational: boolean;

  checking: any;

  categories: any = [
    {
      id: 1,
      name: 'PRODUCT/CONSULTANCY/BANKING/OTHER CORE',
    },
    {
      id: 2,
      name: 'SERVICE/MANUFACTURING',
    },
  ];

  employ: any = [
    {
      id: 1,
      name: 'Pre-final year' ,
    },
    {
      id: 2,
      name: 'Final year' ,
    }
  ]

  employment_t: any = [
    {
      id: 1,
      name: 'FULL TIME',
    },
    {
      id: 3,
      name: 'INTERNSHIP (6 Months) + PLACEMENT',
    },
  ];

  employment_intern: any = [
    {
      id: 2,
      name: 'INTERN (2 Months)'
    },

    {
      id: 4,
      name: 'INTERN (6 Months)'
    }
  ]

  form = new FormGroup({
    drive_name: new FormControl(""),
    category: new FormControl(""),
    category_id: new FormControl(""),
    roles: new FormControl(""),
    employment_type: new FormControl(""),
    
    

    duration_training_probation: new FormControl(""),
    salary_training_probation: new FormControl(""),
    annual_salary: new FormControl(""),
    ctc: new FormControl(""),
    stipend_for_internship: new FormControl(""),


    eligibility_10: new FormControl(""),
    eligibility_12: new FormControl(""),
    eligibility_graduation: new FormControl(""),
    eligibility_in_present: new FormControl(""),
    ug_eligible_courses_id: new FormControl(""),
    pg_eligible_courses_id: new FormControl(""),
    year_batch_eligible: new FormControl(""),
    history_of_arrears: new FormControl(""),
    current_arrears: new FormControl(""),
    atmost_number_of_arrears: new FormControl(""),
    preferred_schedule: new FormControl(""),
    date_of_visiting: new FormControl(""),
    ppt_session: new FormControl(""),
    number_of_tests: new FormControl(""),
    date_time_of_test: new FormControl(""),
    duration_of_test: new FormControl(""),
    online_test: new FormControl(""),
    aptitude_test: new FormControl(""),
    coding_test: new FormControl(""),
    group_discussion: new FormControl(""),
    date_time_of_interview: new FormControl(""),
    number_of_interviews: new FormControl(""),
    technical_interview1: new FormControl(""),
    technical_interview2: new FormControl(""),
    technical_interview3: new FormControl(""),
    technical_plus_hr_interview: new FormControl(""),
    hr_interview: new FormControl(""),
    posted_date: new FormControl(""),
    registration_deadline: new FormControl(""),
    ug_vacancies: new FormControl(""),
    pg_vacancies: new FormControl(""),
    virtual_mode: new FormControl(""),
    bond_details: new FormControl(""),
    allow_foreign_nationals: new FormControl(""),
    foreign_nationality_preferred: new FormControl(""),
    academic_year: new FormControl(""),
    different_requirement_dates: new FormControl(""), 
    other_information: new FormControl(""),

    different_recruiment_dates: new FormControl("")
  })

  constructor(private http: HttpClient,private router: Router,public dialog: MatDialog,public breakpointObserver: BreakpointObserver,private companyService: CompanyService) {
    this.valid = false;
    this.updateLoading = false;
  }

  openDialog() {
    const dialogRef = this.dialog.open(ConfirmationDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.router.navigateByUrl('company/dashboard');
    });
  }

  showBacklogsDetails(e: MatRadioChange) {
    if (e.value == 2) this.historyOfArrears = false;
    else this.historyOfArrears = true;
  }

  compare(c1: {name: any}, c2: {name: any}) {
    return c1 && c2 && c1.name === c2.name;
  }

  ngOnInit(): void {

    this.companyService.getCourses().pipe(map((res: any) => res.courses)).subscribe((res) => {
      this.courses = res;
      this.ug_courses = this.courses.filter(val => val.programme === "UG");
      this.pg_courses = this.courses.filter(val => val.programme === "PG");
    });

    //Breakpoint Observer for Screen Size
    this.breakpointObserver.observe(['(min-width: 1000px)','(min-width: 620px)']).subscribe(
      (state: BreakpointState) => {
        if(state.breakpoints['(min-width: 1000px)']){
          console.log('Desktop View');
          this.isTabView = false;
          this.isMobileView = false;
        }
        else if(state.breakpoints['(min-width: 620px)']){
          console.log('Tab View');
          this.isTabView = true;
          this.isMobileView = false;
        }
        else{
          this.isMobileView = true;
          this.isTabView = false;
          console.log('Mobile View');
        }
      }
    );

  }

  showFNDetails(e: MatRadioChange) {
    if (e.value == 2) this.isNational = false;
    else this.isNational = true;
  }


  setEmploymentType(e: any){
    console.log(e.value);
    if(e.value === 1){
      this.fte = true;
      this.intern = false;
    } else if(e.value === 2 ||  e.value === 4 ){
      this.fte = false;
      this.intern = true;
    } else if(e.value === 3){
      this.fte = true;
      this.intern = true;
    }
  }

  setEmploymentOption(year_batch_eligible : any){
    console.log(year_batch_eligible);

      if(year_batch_eligible.value === 2){
        this.internOption = false;
        this.fullOption = true;
      }
      else if(year_batch_eligible.value === 1){
        this.internOption = true;
        this.fullOption = false;
      }

      else if(year_batch_eligible.value === ''){
          this.internOption = true;
          this.fullOption = true;
      }
      
  }

  OnSubmit() {
    console.log("this form is submiteeed")
    if(this.form.invalid || this.form.pristine){
      this.valid = true;
      console.log("inside valid part")
      return;
    }
    console.log("before valid")
    this.valid = false;

    this.updateLoading = true;
    console.log("after uploading")
    const req = new FormData();
    console.log("this form is seddd")
    // req.append('compa', '1')
    req.append('drive_name', this.form.get('drive_name').value)
    // req.append('category', this.categories.filter( (element) => element.id === this.form.get('category').value)[0]['name'])
    req.append('category', this.form.get('category').value)
    req.append('roles', this.form.get('roles').value.split(','))

    req.append('employment_type', this.form.get('employment_type').value)

    if(this.form.get('employment_type').value === 1){

      req.append('duration_training_probation', this.form.get('duration_training_probation').value)
      req.append('salary_training_probation', this.form.get('salary_training_probation').value)
      req.append('annual_salary', this.form.get('annual_salary').value)
      req.append('ctc', this.form.get('ctc').value)
      req.append('stipend_for_internship', null)

    } else if(this.form.get('employment_type').value === 2 ||  this.form.get('employment_type').value === 4 ){

      req.append('duration_training_probation', null)
      req.append('salary_training_probation',  null)
      req.append('annual_salary', null)
      req.append('ctc', null)
      req.append('stipend_for_internship', this.form.get('stipend_for_internship').value)

    } else if(this.form.get('employment_type').value === 3){
      req.append('duration_training_probation', this.form.get('duration_training_probation').value)
      req.append('salary_training_probation', this.form.get('salary_training_probation').value)
      req.append('annual_salary', this.form.get('annual_salary').value)
      req.append('ctc', this.form.get('ctc').value)
      req.append('stipend_for_internship', this.form.get('stipend_for_internship').value)
    }


    //req.append('ctc_for_ug', this.form.get('ctc_for_ug').value)
    //req.append('ctc_for_pg', this.form.get('ctc_for_pg').value)
    //req.append('stipend_for_internship_for_ug', this.form.get('stipend_for_internship_for_ug').value)
    //req.append('stipend_for_internship_for_pg', this.form.get('stipend_for_internship_for_pg').value)

    // req.append('duration_training_probation', this.form.get('duration_training_probation').value)
    // req.append('salary_training_probation', this.form.get('salary_training_probation').value)
    // req.append('annual_salary', this.form.get('annual_salary').value)
    // req.append('ctc', this.form.get('ctc').value)
    //req.append('stipend_for_internship_for_ug', this.form.get('stipend_for_internship_for_ug').value)





    req.append('eligibility_10', this.form.get('eligibility_10').value)
    req.append('eligibility_12', this.form.get('eligibility_12').value)
    req.append('eligibility_graduation', (parseFloat(this.form.get('eligibility_graduation').value)*10).toString())
    req.append('eligibility_in_present', (parseFloat(this.form.get('eligibility_in_present').value)*10).toString())
    //req.append('eligible_courses_id', this.form.get('ug_eligible_courses_id').value)
    req.append('year_batch_eligible', this.form.get('year_batch_eligible').value)
    req.append('history_of_arrears', this.form.get('history_of_arrears').value)
    req.append('current_arrears', this.form.get('current_arrears').value > 0 ? 'true':'false')
    req.append('atmost_number_of_arrears', this.form.get('current_arrears').value)
    req.append('preferred_schedule', this.form.get('preferred_schedule').value)
    req.append('date_of_visiting', this.form.get('date_of_visiting').value)
    req.append('ppt_session',this.form.get('ppt_session').value + ':00')
    req.append('number_of_tests', '2')
    req.append('date_time_of_test',this.form.get('date_time_of_test').value + ':00')
    req.append('duration_of_test',this.form.get('duration_of_test').value)
    req.append('online_test', 'false')
    req.append('aptitude_test',this.form.get('aptitude_test').value ? 'true' : 'false')
    req.append('coding_test',this.form.get('coding_test').value ? 'true' : 'false')
    req.append('group_discussion',this.form.get('group_discussion').value ? 'true' : 'false')
    req.append('date_time_of_interview',this.form.get('date_time_of_interview').value + ':00')
    req.append('number_of_interviews', '1')
    req.append('technical_interview1',this.form.get('technical_interview1').value ? 'true' : 'false')
    req.append('technical_interview2',this.form.get('technical_interview2').value ? 'true' : 'false')
    req.append('technical_interview3',this.form.get('technical_interview3').value ? 'true' : 'false')
    req.append('technical_plus_hr_interview',this.form.get('technical_plus_hr_interview').value ? 'true' : 'false')
    req.append('hr_interview',this.form.get('hr_interview').value ? 'true' : 'false')
    // req.append('posted_date',this.form.get('posted_date').value)
    req.append('registration_deadline',this.form.get('registration_deadline').value.split('T')[0])
    req.append('ug_vacancies', this.form.get('ug_vacancies').value)
    req.append('pg_vacancies', this.form.get('pg_vacancies').value)
    req.append('virtual_mode',this.isVirtual ? 'true' : 'false')
    //req.append('virtual_mode',this.form.get('virtual_mode').value)
    req.append('bond_details', this.form.get('bond_details').value)
    req.append('allow_foreign_nationals', this.form.get('allow_foreign_nationals').value)

    req.append('foreign_nationality_preferred', this.form.get('allow_foreign_nationals').value ? this.form.get('foreign_nationality_preferred').value : 'nil')
    req.append('academic_year', this.form.get('academic_year').value)
    req.append('other_information',this.form.get('other_information').value)

    //req.append('different_recruitment_dates',this.form.get('different_recruitment_dates').value)
    req.append('different_recruitment_dates',this.isDifferentRecruitmentDates ? 'true' : 'false')

    var eligible_courses = (this.form.get('ug_eligible_courses_id').value as string[]).concat(this.form.get('pg_eligible_courses_id').value as string[]).toString()
    req.append('eligible_courses_id', eligible_courses)


    this.companyService.uploadDrive(req).subscribe(
      (data:any) => {
        if(data.response.status === 200){
          console.log(data);
          this.updateLoading = false;
          this.openDialog();
        }
      },
      (err) => console.log('error due to uploading data',err)
    );
  }

  setToggle(e: any) {
    if(e.checked)
      this.isVirtual = true;
    else
      this.isVirtual = false;
  }

  setDifferentRecruitmentDates(e: any){
    if(e.checked)
      this.isDifferentRecruitmentDates = true;
    else
      this.isDifferentRecruitmentDates = false;
    
  }


}
