import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyRoutingModule } from './company-routing.module';
import { CompanyComponent } from './company.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CampusDriveComponent, ConfirmationDialog } from './campus-drive/campus-drive.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { CompanyDetailsDialog } from './company-details/company-model/company-model.component';
import { LayoutModule } from '@angular/cdk/layout';
import { CompanyDashboardComponent } from './dashboard/dashboard.component';
import { DriveUpdateComponent } from './drive-update/drive-update.component';
import { DrivesComponent } from './drives/drives.component';
import { DriveComponent } from './drive/drive.component';
import { RegisteredStudentsComponent } from './registered-students/registered-students.component';

@NgModule({
  declarations: [
    CompanyComponent,
    CompanyDashboardComponent,
    CampusDriveComponent,
    DrivesComponent,
    DriveComponent,
    CompanyDetailsComponent,
    DriveUpdateComponent,
    ConfirmationDialog,
    CompanyDetailsDialog,
    RegisteredStudentsComponent
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    LayoutModule,
    RouterModule,
    SharedModule,
  ],
  exports: [
    DriveUpdateComponent
  ]
})
export class CompanyModule {}
