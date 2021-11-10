import { Component, HostListener, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.scss'],
})
export class NavHeaderComponent implements OnInit {
  @Input() user_name: string;
  @Input() email: number;

  dropdown: boolean;

  constructor(private dialog: MatDialog) {}

  @HostListener('document:click', ['$event']) onDocumentClick(event: any) {
    this.dropdown = false;
  }

  toggleDropDown() {
    this.dropdown = !this.dropdown;
  }

  changePassword() {
    //   this.dropdown = false;
    //   let dialogRef = this.dialog.open(ChangePasswordModelComponent);
    //   dialogRef.afterClosed().subscribe((result) => {
    //       if (result) {
    //           this.dialog.open(AlertBoxComponent, {
    //               data: {
    //                   message: 'Password Updated Successfully',
    //                   submessage: '',
    //               },
    //           });
    //       }
    //   });
  }

  logoutUser() {
    //   localStorage.removeItem('token');
    //   localStorage.removeItem('refreshToken');
    //   localStorage.removeItem('Person_ID');
    //   localStorage.removeItem('urole');
    //   this.apollo.client.clearStore();
    //   window.location.replace('');
  }

  ngOnInit(): void {}
}
