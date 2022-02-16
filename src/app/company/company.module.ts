import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyRoutingModule } from './company-routing.module';
import { CompanyComponent } from './company.component';
// import { NavComponent } from './nav/nav.component';
// import { NavComponent } from '../nav/nav.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CompanyDashboardComponent } from './dashboard/dashboard.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CampusDriveComponent, ConfirmationDialog } from './campus-drive/campus-drive.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { DriveUpdateComponent } from './dashboard/drive-update/drive-update.component';
import { CompanyDetailsDialog } from './company-details/company-model/company-model.component';
import { LayoutModule } from '@angular/cdk/layout';
import { NavModule } from '../nav/nav.module';

@NgModule({
  declarations: [
    CompanyComponent,
    CompanyDashboardComponent,
    CampusDriveComponent,
    CompanyDetailsComponent,
    DriveUpdateComponent,
    ConfirmationDialog,
    CompanyDetailsDialog,
    // NavComponent
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
    NavModule
  ],
})
export class CompanyModule {}
