import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  isClicked: boolean;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.isClicked = false;
  }

  ngOnInit(): void {}

  onToggle() {
    this.isClicked = !this.isClicked;
  }
}
