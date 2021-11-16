import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-student-model',
  templateUrl: './student-model.component.html',
  styleUrls: ['./student-model.component.scss'],
})
export class StudentModelComponent implements OnInit {
  studentForm: FormGroup;
  genders: string[];
  boards: string[];
  options: any[];
  courseTypes: any[];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<StudentModelComponent>
  ) {
    this.genders = ['male', 'female', 'others'];
    this.boards = ['STATE', 'CBSE', 'ICSE', 'OTHERS'];
    this.options = [
      { key: 'Yes', value: true },
      { key: 'No', value: false },
    ];
    this.courseTypes = [
      {
        key: 'Full Time',
        value: 1,
      },
      { key: 'Part Time', value: 2 },
    ];
    this.studentForm = new FormGroup({
      first_name: new FormControl(data.student.first_name, Validators.required),
      last_name: new FormControl(data.student.last_name, Validators.required),
      reg_number: new FormControl(data.student.reg_number, Validators.required),
      gender: new FormControl(data.student.gender, Validators.required),
      phone: new FormControl(data.student.phone, Validators.required),
      photograph_link: new FormControl(
        data.student.photograph_link,
        Validators.required
      ),
      resume_link: new FormControl(
        data.student.resume_link,
        Validators.required
      ),
      campus: new FormControl(data.student.campus, Validators.required),
      course_id: new FormControl(data.student.course, Validators.required),
      course_type: new FormControl(
        data.student.course_type,
        Validators.required
      ),
      course_percentage: new FormControl(
        data.student.course_percentage,
        Validators.required
      ),
      ug_course: new FormControl(data.student.ug_course),
      ug_course_percentage: new FormControl(data.student.ug_course_percentage),
      history_of_arrears: new FormControl(
        data.student.history_of_arrears,
        Validators.required
      ),
      current_arrears: new FormControl(
        data.student.current_arrears,
        Validators.required
      ),
      number_of_arrears: new FormControl(
        data.student.number_of_arrears,
        Validators.required
      ),
      grade_10: new FormControl(data.student.grade_10, Validators.required),
      grade_10_percentage: new FormControl(
        data.student.grade_10_percentage,
        Validators.required
      ),
      grade_12: new FormControl(data.student.grade_12, Validators.required),
      grade_12_percentage: new FormControl(
        data.student.grade_12_percentage,
        Validators.required
      ),
      year_gap: new FormControl(data.student.year_gap, Validators.required),
    });
  }

  ngOnInit(): void {}

  displayfn(course: any): string | undefined {
    return course ? course.name + ' ' + course.branch : undefined;
  }

  onSubmit() {
    const form: FormData = new FormData();
    form.append('first_name', this.studentForm.value['first_name']);
    form.append('last_name', this.studentForm.value['last_name']);
    form.append('reg_number', this.studentForm.value['reg_number']);
    form.append('gender', this.studentForm.value['gender']);
    form.append('phone', this.studentForm.value['phone']);
    form.append('photograph_link', this.studentForm.value['photograph_link']);
    form.append('resume_link', this.studentForm.value['resume_link']);
    form.append('campus', this.studentForm.value['campus']);
    form.append('course_id', this.studentForm.value['course_id'].id);
    form.append('course_type', this.studentForm.value['course_type']);
    form.append(
      'course_percentage',
      this.studentForm.value['course_percentage']
    );
    form.append('ug_course', this.studentForm.value['ug_course']);
    form.append(
      'ug_course_percentage',
      this.studentForm.value['ug_course_percentage']
    );
    form.append(
      'history_of_arrears',
      this.studentForm.value['history_of_arrears']
    );
    form.append('current_arrears', this.studentForm.value['current_arrears']);
    form.append(
      'number_of_arrears',
      this.studentForm.value['number_of_arrears']
    );
    form.append('grade_10', this.studentForm.value['grade_10']);
    form.append(
      'grade_10_percentage',
      this.studentForm.value['grade_10_percentage']
    );
    form.append('grade_12', this.studentForm.value['grade_12']);
    form.append(
      'grade_12_percentage',
      this.studentForm.value['grade_12_percentage']
    );
    form.append('year_gap', this.studentForm.value['year_gap']);
    this.dialogRef.close(form);
  }
}
