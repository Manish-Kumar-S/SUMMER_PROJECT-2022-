import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../shared/auth/auth.service';
import { catchError, filter, map } from 'rxjs/operators';
import { Roles } from '../shared/models/shared.resources';


@Injectable({
  providedIn: 'root',
})
export class LogoutGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.authService.isAuthenticated()) return true;

    //check role and navigate to that route
    this.authService.getRole().pipe(

      catchError((err) => {

        if(err.status !== 200) {
          
          this.authService.logout();
        }
        return of(null);
      }),

      filter((response: any) => {

        if(!response) return false;

        // console.log(response);
        if(response?.status !== 200 || response.is_expire){
          // console.log(response.response);
          // console.log(response?.response.error);
          this.authService.logout();
          return false;
        };

        return true;
      }),

      map((response: any): number => response?.role)

    ).subscribe(role => {

      let url: string;
    
      if(role === Roles.STUDENT) url = 'student';
      if(role === Roles.COMPANY) url = 'company';

      this.router.navigate([url]);
    })
    return false;
  }
}
