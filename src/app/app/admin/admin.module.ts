import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OTPComponent} from './user-management/user-management.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AdminComponent } from './admin.component';
import { ModifyDriveComponent } from './modify-drive/modify.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { CompanyModule } from '../company/company.module';
import { ReportsComponent } from './reports/reports.component';
import { RegisterCompanyDialog, RegisterAdminDialog, UserManagementComponent } from './user-management/user-management.component';
import { ModifyColumnsComponent } from './modify-columns/modify-columns.component';
import { StudentModule } from '../student/student.module';
import { CompanyApprovalComponent, ConfirmApprovalDialog } from './company-approval/company-approval.component';
import { StudentTableComponent } from './students-table/student-table.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { DriveDoneStatusComponent } from './schedule/drive-done-status/drive-done-status.component';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import {MatStepperModule} from '@angular/material/stepper';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatBadgeModule} from '@angular/material/badge';

@NgModule({
  declarations: [
    AdminComponent,
    ModifyDriveComponent,
    UserManagementComponent,
    RegisterAdminDialog,
    RegisterCompanyDialog,
    OTPComponent,
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
    MatStepperModule,
    AdminRoutingModule,
    SharedModule,
    MatGridListModule,
    CdkStepperModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    CompanyModule,
    StudentModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatBadgeModule
  ],
})
export class AdminModule { }
