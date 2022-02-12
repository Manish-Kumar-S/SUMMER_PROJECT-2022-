import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/auth/auth.service';
import { Location } from '@angular/common';
import jwt_decode from 'jwt-decode';
import { filter, map } from 'rxjs/operators';
import { Roles } from '../shared/models/shared.resources';
import { API } from 'src/environments/environment';


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

      filter((response: any) => {

        if(response.response.status !== 200){
          console.error(response.response.error);
          return false;
        };

        return true;
      }),

      map((response: any): number => response?.role)

    ).subscribe(role => {

      console.log(role);

      let url: string;
    
      if(role === Roles.STUDENT) url = 'student';
      if(role === Roles.COMPANY) url = 'company';

      this.router.navigate([url]);
    })
    return false;
  }
}
