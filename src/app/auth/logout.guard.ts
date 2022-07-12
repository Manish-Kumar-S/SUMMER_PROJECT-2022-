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

        //check if token expired and logout if yes
        if('is_expired' in err.error) {

          if(err.error.is_expired) {

            console.log("logout")

            this.authService.logout();

          }

        } else {

          console.error(err);
        }

        return of(null);
      }),

      filter((response: any) => {

        if(!response) return false;

        // if(response?.status !== 200 || response.is_expire){

          
        //   this.authService.logout();
        //   return false;
        // };

        return true;
      }),

      map((response: any): number => response?.role)

    ).subscribe(role => {
      let url: string;
      if(role === Roles.STUDENT) url = 'student';
      if(role === Roles.COMPANY) url = 'company';
      if(role === Roles.ADMIN) url = 'admin';
      this.router.navigateByUrl(url);
    })
    return false;
  }
}
