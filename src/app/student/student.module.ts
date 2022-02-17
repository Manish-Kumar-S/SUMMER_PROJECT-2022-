import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { StudentRoutingModule } from './student-routing.module';
import { NgModule } from '@angular/core';

import { StudentComponent } from './student.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { StudentModelComponent } from './student-details/student-model/student-model.component';
import { UpcomingCompaniesComponent } from './upcoming-companies/upcoming-companies.component';
import { FlexModule } from '@angular/flex-layout';
import { PlacementRepresentativeComponent } from './placement-representative/placement-representative.component';
import { ApplyDriveComponent } from './apply-drive/apply-drive.component';
import { PlacementRepresentativeApproval } from './placement-representative/profile-approval/profile-approval.component';
import { StudentApprovalDetailsComponent } from './placement-representative/profile-approval/student-approval-details/student-approval-details.component';
import { CompaniesComponent } from './companies/companies.component';
import { PlacementStatusComponent } from './placement-representative/placement-status/placement-status.component';
import { ChangePlacementStatusComponent } from './placement-representative/placement-status/change-placement-status/change-placement-status.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    // NavComponent,
    StudentComponent,
    StudentDetailsComponent,
    StudentModelComponent,
    UpcomingCompaniesComponent,
    PlacementRepresentativeComponent,
    PlacementRepresentativeApproval,
    StudentApprovalDetailsComponent,
    PlacementStatusComponent,
    ChangePlacementStatusComponent,
    ApplyDriveComponent,
    CompaniesComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    FlexModule,
    StudentRoutingModule,
  ],
})
export class StudentModule {}
