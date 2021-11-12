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


@NgModule({
  declarations: [
    CompanyComponent,
    CompanyDashboardComponent,
    NavComponent
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    FlexLayoutModule,
    RouterModule,
    SharedModule
  ]
})
export class CompanyModule { }
