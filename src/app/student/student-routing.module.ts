import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplyDriveComponent } from './apply-drive/apply-drive.component';
import { PlacementRepresentativeComponent } from './placement-representative/placement-representative.component';
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
      {
        path: 'apply-drive',
        component: ApplyDriveComponent,
        data: { title: 'CUIC | Apply for Job' },
      },
      {
        path: 'placement-representative',
        component: PlacementRepresentativeComponent,
        data: { title: 'CUIC | Placement Representative' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}
