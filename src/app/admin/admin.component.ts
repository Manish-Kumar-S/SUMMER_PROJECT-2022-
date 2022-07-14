import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { NavInput } from '../shared/components/nav/nav.component';
import { AuthService } from '../shared/auth/auth.service';
import { VisualFeedbackService } from '../shared/visual-feedback/visual-feedback.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit, OnDestroy {

  navInput: NavInput = {

    title: 'CUIC | ADMIN',
    primaryInfo: '',
    secondaryInfo: 0,
    isPlacementRep: false,

    routes: [
        {
            path: './home',
            icon: 'fa-home',
            name: 'Home',
            show: false,
        },
        {
            path: './modify-drive',
            icon: 'fa-cogs',
            name: 'Modify Company Drive',
            show: true,
        },
        {
            path: './reports',
            icon: 'fa-chart-bar',
            name: 'Statistics',
            show: true,
        },
        {
            path: './user-management',
            icon: 'fa-users',
            name: 'User Management',
            show: true,
        },
    ]
  }

  first_login = new BehaviorSubject<boolean>(false);

  subs = new Subscription();

  constructor(
    // private studentService: StudentService,
    private authSerivce: AuthService,
    private router: Router,
    private visualFeedbackService: VisualFeedbackService,
  ) { }

  ngOnInit(): void {

    // this.studentService.studentToken = jwtDecode(this.authSerivce.getToken());
    
    // this.studentService.getStudent().pipe(

    //   map((res: any) => {

    //     this.first_login.next(res?.first_login);

    //     return res?.profile
    //   }),

    // ).subscribe((student: StudentModel) => {
      
    //   this.studentService.currentStudent = student;
    // });

    // const s1 = this.studentService.currentStudentChange$.subscribe(data => {

    //   this.navInput.primaryInfo = data?.first_name + ' ' + data?.last_name;
    //   this.navInput.secondaryInfo = data?.reg_number;
    //   this.navInput.routes[this.navInput.routes.length - 1].show = data?.is_placement_representative;
    // });

    // const s2 = this.first_login.subscribe((data) => {

    //   console.log(data);  
    //   if(data) {

    //     this.router.navigateByUrl('student/personal-details');
    //     this.visualFeedbackService.snackBar("Complete your profile to proceed!", 5000);
    //   }
    // });

    // this.subs.add(s1).add(s2);
  }

  ngOnDestroy(): void {
      
    this.subs.unsubscribe();
    // this.studentService.currentStudent = null;
  }

}
