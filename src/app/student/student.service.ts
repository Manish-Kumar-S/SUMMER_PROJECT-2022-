import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { API } from 'src/environments/environment';
import { StudentModel } from '../shared/models/student/student.model';
@Injectable({
  providedIn: 'root',
})
export class StudentService {

  studentToken: {email: string, exp: number};
  currentStudentChange$ = new BehaviorSubject<StudentModel>(null);
  
  constructor(private http: HttpClient) {}

  get currentStudent(): StudentModel {

    return this.currentStudentChange$.value;
  }

  set currentStudent(v: StudentModel) {

    this.currentStudentChange$.next(v);
  }

  getCourses() {
    return this.http
      .get<any>(`${API}/get/courses`)
      .pipe(map((res) => res.courses));
  }

  getStudent() {
    return this.http
      .get(`${API}/student/profile`)
      .pipe(map((res: any) => res.profile));
  }
}
