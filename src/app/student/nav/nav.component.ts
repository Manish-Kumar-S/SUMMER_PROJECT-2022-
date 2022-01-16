import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { IMG_URL } from 'src/environments/environment';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  isClicked: boolean;
  imgUrl: string;
  @Input() name: string;
  @Input() reg_no: string;

  constructor(public authService: AuthService) {
    this.isClicked = false;
    this.imgUrl = IMG_URL;
  }

  ngOnInit(): void {}

  onToggle() {
    this.isClicked = !this.isClicked;
  }
}
