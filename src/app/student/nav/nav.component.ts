import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IMG_URL } from 'src/environments/environment';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  isClicked: boolean;
  imgUrl: string;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.isClicked = false;
    this.imgUrl = IMG_URL;
  }

  ngOnInit(): void {}

  onToggle() {
    this.isClicked = !this.isClicked;
  }
}
