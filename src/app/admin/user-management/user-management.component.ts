import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CompanyService } from 'src/app/company/company.service';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { AdminService } from '../admin.service';

@Component({
    selector: 'dialog-register-admin-dialog',
    templateUrl: './register-admin-dialog.html',
    styleUrls: ['./register-admin-dialog.scss'],
})
export class RegisterAdminDialog {

    registerForm: FormGroup;
    roles: any;
    registerError: string;

    constructor(private adminService: AdminService, private authService: AuthService, private dialog: MatDialog) {

        this.roles = [
            { id: 1, name: 'Student' },
            { id: 2, name: 'Company' },
            { id: 3, name: 'Admin' },
        ];

        this.registerForm = new FormGroup({
            email: new FormControl(null, Validators.required),
            password: new FormControl(null, Validators.required),
        });

    }

    onRegister() {
        const form = new FormData();
        form.append('email', this.registerForm.get('email').value);
        form.append('password', this.registerForm.get('password').value);
        form.append('role', '3');
        this.authService.registerUser(form)
          .subscribe(
            (data) => {
                alert(data);
            //   console.log(data.headers.get('Tokenstring'));
            //   let tokenString = data.headers.get('Tokenstring');
            //   this.router.navigate(['otp'], {queryParams: {email: this.registerForm.get('email').value, token: tokenString}, skipLocationChange: true});
            },
            (err) => (this.registerError = err.error.response.message['message'])
          );
    }
}

@Component({
    selector: 'app-admin-user-management',
    templateUrl: './user-management.component.html',
    styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

    constructor(private adminService: AdminService, private authService: AuthService, private dialog: MatDialog) {

    }

    ngOnInit(): void {

        

    }

    openDialog() {
        const dialogRef = this.dialog.open(RegisterAdminDialog);

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
            // this.router.navigateByUrl('company/dashboard');
        });
    }

    
}