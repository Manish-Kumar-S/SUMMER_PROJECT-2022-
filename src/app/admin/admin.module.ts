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
import { DriveUpdateComponent } from '../company/drive-update/drive-update.component';
import { ModifyColumnsComponent } from './modify-columns/modify-columns.component';


@NgModule({
  declarations: [
    AdminComponent,
    ModifyDriveComponent,
    UserManagementComponent,
    RegisterAdminDialog,
    ReportsComponent,
    ModifyColumnsComponent
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
