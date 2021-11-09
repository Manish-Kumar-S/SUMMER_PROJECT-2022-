import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { StudentRoutingModule } from './student-routing.module';
import { NgModule } from '@angular/core';

import { NavComponent } from './nav/nav.component';
import { StudentComponent } from './student.component';
import { StudentDetailsComponent } from './student-details/student-details.component';

@NgModule({
  declarations: [NavComponent, StudentComponent, StudentDetailsComponent],
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
