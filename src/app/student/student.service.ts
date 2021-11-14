import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { API } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class StudentService {
  student: any;
  constructor(private http: HttpClient) {}

  getCourses() {
    return this.http
      .get(`${API}/get/courses`)
      .pipe(map((res: any) => res.courses));
  }
}
