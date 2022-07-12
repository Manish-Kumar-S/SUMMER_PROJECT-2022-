import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AdminComponent } from './admin.component';
import { ModifyDriveComponent } from './modify-drive/modify.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { CompanyModule } from '../company/company.module';
import { ReportsComponent } from './reports/reports.component';
import { RegisterAdminDialog, UserManagementComponent } from './user-management/user-management.component';


@NgModule({
  declarations: [
    AdminComponent,
    ModifyDriveComponent,
    UserManagementComponent,
    RegisterAdminDialog,
    ReportsComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    CompanyModule,
  ]
})
export class AdminModule { }
