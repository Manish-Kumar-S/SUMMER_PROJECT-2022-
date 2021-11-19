import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { map } from 'rxjs/operators';
import { API } from 'src/environments/environment';

@Component({
  selector: 'app-campus-drive',
  templateUrl: './campus-drive.component.html',
  styleUrls: ['./campus-drive.component.scss'],
})
export class CampusDriveComponent implements OnInit {
  dept = new FormControl();
  historyOfArrears: Boolean;
  bond: Boolean;
  courses: any;
  categories: any = [
    {
      id: 1,
      name: 'PRODUCT',
    },
    {
      id: 2,
      name: 'SERVICE',
    },
  ];
  employment_t: any = [
    {
      id: 1,
      name: 'FULL TIME',
    },
    {
      id: 2,
      name: 'INTERNSHIP',
    },
    {
      id: 3,
      name: 'INTERNSHIP + FULLTIME',
    },
  ];
  getCourses() {
    return this.http
      .get(`${API}/get/courses`)
      .pipe(map((res: any) => res.courses));
  }

  form = new FormGroup({
    driveName: new FormControl(''),
    category: new FormControl(''),
    category_id: new FormControl(''),
    roles: new FormControl(''),
    employment_type: new FormControl(''),
    ctc_for_ug: new FormControl(''),
    ctc_for_pg: new FormControl(''),
    stipend_for_internship_for_ug: new FormControl(''),
    stipend_for_internship_for_pg: new FormControl(''),
    eligibility_10: new FormControl(''),
    eligibility_12: new FormControl(''),
    eligibility_graduation: new FormControl(''),
    eligibility_in_present: new FormControl(''),
    eligible_courses: new FormControl(''),
    year_batch_eligible: new FormControl(''),
    history_of_arrears: new FormControl(''),
    current_arrears: new FormControl(''),
    atmost_number_of_arrears: new FormControl(''),
    date_of_visiting: new FormControl(''),
    ppt_session: new FormControl(''),
    number_of_tests: new FormControl(''),
    date_time_of_test: new FormControl(''),
    duration_of_test: new FormControl(''),
    online_test: new FormControl(''),
    aptitude_test: new FormControl(''),
    coding_test: new FormControl(''),
    group_discussion: new FormControl(''),
    date_time_of_interview: new FormControl(''),
    number_of_interviews: new FormControl(''),
    technical_interview1: new FormControl(''),
    technical_interview2: new FormControl(''),
    technical_interview3: new FormControl(''),
    technical_plus_hr_interview: new FormControl(''),
    hr_interview: new FormControl(''),
    posted_date: new FormControl(''),
    registration_deadline: new FormControl(''),
    other_information: new FormControl(''),
  });

  constructor(private http: HttpClient) {
    this.bond = false;
  }

  ngOnInit(): void {
    this.getCourses().subscribe((res) => {
      this.courses = res;
    });
  }

  showBondDetails(e: MatRadioChange) {
    if (e.value == 2) this.bond = false;
    else this.bond = true;
  }

  showBacklogsDetails(e: MatRadioChange) {
    if (e.value == 2) this.historyOfArrears = false;
    else this.historyOfArrears = true;
  }

  OnSubmit() {
    const req = new FormData();
    req.append('compa', '1');
    req.append('driveName', this.form.get('driveName').value);
    req.append(
      'category',
      this.categories.filter(
        (element) => element.id === this.form.get('category').value
      )[0]['name']
    );
    req.append('category_id', this.form.get('category_id').value);
    req.append('roles', this.form.get('roles').value.split(','));
    req.append('employment_type', this.form.get('employment_type').value);
    req.append('ctc_for_ug', this.form.get('ctc_for_ug').value);
    req.append('ctc_for_pg', this.form.get('ctc_for_pg').value);
    req.append(
      'stipend_for_internship_for_ug',
      this.form.get('stipend_for_internship_for_ug').value
    );
    req.append(
      'stipend_for_internship_for_pg',
      this.form.get('stipend_for_internship_for_pg').value
    );
    req.append('eligibility_10', this.form.get('eligibility_10').value);
    req.append('eligibility_12', this.form.get('eligibility_12').value);
    req.append(
      'eligibility_graduation',
      this.form.get('eligibility_graduation').value
    );
    req.append(
      'eligibility_in_present',
      this.form.get('eligibility_in_present').value
    );
    req.append('eligible_courses', this.form.get('eligible_courses').value);
    req.append(
      'year_batch_eligible',
      this.form.get('year_batch_eligible').value
    );
    req.append('history_of_arrears', this.form.get('history_of_arrears').value);
    req.append('current_arrears', this.form.get('current_arrears').value);
    req.append(
      'atmost_number_of_arrears',
      this.form.get('atmost_number_of_arrears').value
    );
    req.append('date_of_visiting', this.form.get('history_of_arrears').value);
    req.append('ppt_session', this.form.get('ppt_session').value);
    req.append('number_of_tests', '2');
    req.append('date_time_of_test', this.form.get('date_time_of_test').value);
    req.append('duration_of_test', this.form.get('duration_of_test').value);
    req.append('aptitude_test', this.form.get('aptitude_test').value);
    req.append('coding_test', this.form.get('coding_test').value);
    req.append(
      'group_discussion',
      this.form.get('group_discussion').value ? 'true' : 'false'
    );
    req.append(
      'date_time_of_interview',
      this.form.get('date_time_of_interview').value
    );
    req.append('number_of_interviews', '1');
    req.append(
      'technical_interview1',
      this.form.get('technical_interview1').value ? 'true' : 'false'
    );
    req.append(
      'technical_interview2',
      this.form.get('technical_interview2').value ? 'true' : 'false'
    );
    req.append(
      'technical_interview3',
      this.form.get('technical_interview3').value ? 'true' : 'false'
    );
    req.append(
      'technical_plus_hr_interview',
      this.form.get('technical_plus_hr_interview').value ? 'true' : 'false'
    );
    req.append('hr_interview', this.form.get('hr_interview').value);
    req.append('posted_date', this.form.get('posted_date').value);
    req.append(
      'registration_deadline',
      this.form.get('registration_deadline').value
    );
    req.append('other_information', this.form.get('other_information').value);
    this.http.post(`${API}/company/drive`, req).subscribe(
      (data) => console.log(data),
      (err) => console.log(err)
    );
  }
}
