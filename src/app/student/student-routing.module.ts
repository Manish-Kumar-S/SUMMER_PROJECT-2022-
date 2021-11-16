import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { StudentComponent } from './student.component';
import { UpcomingCompaniesComponent } from './upcoming-companies/upcoming-companies.component';

const routes: Routes = [
  {
    path: '',
    component: StudentComponent,
    children: [
      {
        path: '',
        redirectTo: 'personal-details',
      },
      {
        path: 'personal-details',
        component: StudentDetailsComponent,
        data: { title: 'CUIC | Student' },
      },
      {
        path: 'upcoming-companies',
        component: UpcomingCompaniesComponent,
        data: { title: 'CUIC | Upcoming Companies' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}
