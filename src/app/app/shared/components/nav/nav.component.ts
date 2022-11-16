import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { IMG_URL } from 'src/environments/environment';

export interface NavInput {

  title: string;
  primaryInfo?: string;
  secondaryInfo?: number;
  isPlacementRep?: boolean;

  routes:{
    path: string,
    icon: string,
    name: string,

    show: boolean,
  }[]
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})

export class NavComponent implements OnInit {
  isClicked: boolean;
  imgUrl: string;

  isOpened = false;

  @Input() navInput: NavInput;

  constructor(public authService: AuthService) {
    this.isClicked = false;
    this.imgUrl = IMG_URL;
  }

  ngOnInit(): void {}

  onToggle() {
    this.isClicked = !this.isClicked;
  }

  getPath(
    route :{
    path: string,
    icon: string,
    name: string,

    show: boolean,
    }
  ): string {

    return route.path;
  }

}
