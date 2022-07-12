import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AdminComponent } from './admin.component';
import { ModifyDriveComponent } from './modify-drive/modify.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { CompanyModule } from '../company/company.module';
import { DriveUpdateComponent } from '../company/drive-update/drive-update.component';
import { ReportsComponent } from './reports/reports.component';
import { Annexure1Component } from './reports/annexure-1/annexure-1.component';


@NgModule({
  declarations: [
    AdminComponent,
    ModifyDriveComponent,

    ReportsComponent,
    Annexure1Component
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
