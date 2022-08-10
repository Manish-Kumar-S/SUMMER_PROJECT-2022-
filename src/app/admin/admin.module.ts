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
import { ModifyColumnsComponent } from './modify-columns/modify-columns.component';
import { StudentModule } from '../student/student.module';
import { CompanyApprovalComponent, ConfirmApprovalDialog } from './company-approval/company-approval.component';
import { StudentTableComponent } from './students-table/student-table.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { DriveDoneStatusComponent } from './schedule/drive-done-status/drive-done-status.component';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";

@NgModule({
  declarations: [
    AdminComponent,
    ModifyDriveComponent,
    UserManagementComponent,
    RegisterAdminDialog,
    ReportsComponent,
    ModifyColumnsComponent,
    CompanyApprovalComponent,
    ConfirmApprovalDialog,
    StudentTableComponent,
    ScheduleComponent,
    DriveDoneStatusComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    CompanyModule,
    StudentModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
})
export class AdminModule { }
