import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyRoutingModule } from './company-routing.module';
import { CompanyComponent } from './company.component';
import { NavComponent } from './nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { CompanyDashboardComponent } from './dashboard/dashboard.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CampusDriveComponent, ConfirmationDialog } from './campus-drive/campus-drive.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatBadgeModule } from '@angular/material/badge';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { DriveUpdateComponent } from './dashboard/drive-update/drive-update.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CompanyDetailsDialog } from './company-details/company-model/company-model.component';

@NgModule({
  declarations: [
    CompanyComponent,
    CompanyDashboardComponent,
    CampusDriveComponent,
    CompanyDetailsComponent,
    DriveUpdateComponent,
    ConfirmationDialog,
    CompanyDetailsDialog,
    NavComponent
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatRadioModule,
    MatCheckboxModule,
    FlexLayoutModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatBadgeModule,
    RouterModule,
    SharedModule,
  ],
})
export class CompanyModule {}
