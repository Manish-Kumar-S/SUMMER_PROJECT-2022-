import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { StudentRoutingModule } from './student-routing.module';
import { NgModule } from '@angular/core';

import { NavComponent } from './nav/nav.component';
import { StudentComponent } from './student.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { StudentModelComponent } from './student-details/student-model/student-model.component';
import { UpcomingCompaniesComponent } from './upcoming-companies/upcoming-companies.component';

@NgModule({
  declarations: [NavComponent, StudentComponent, StudentDetailsComponent, StudentModelComponent, UpcomingCompaniesComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    StudentRoutingModule,
  ],
})
export class StudentModule {}
