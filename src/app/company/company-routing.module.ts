import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampusDriveComponent } from './campus-drive/campus-drive.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { CompanyComponent } from './company.component';
import { CompanyDashboardComponent } from './dashboard/dashboard.component';
import { DriveComponent } from './drive/drive.component';
import { DrivesComponent } from './drives/drives.component';

const routes: Routes = [
  {
    path: '',
    component: CompanyComponent,
    children: [
      { path: '', redirectTo: 'dashboard' },
      // { path: 'dashboard', component: CompanyDashboardComponent },
      { 
        path: 'dashboard', 
        component: DrivesComponent,
        children: [
          {
            path: '',
            component: CompanyDashboardComponent,
          },
          {
            path: 'drive',
            component: DriveComponent,
          }
        ]
      },
      { path: 'campus-drive', component: CampusDriveComponent },
      { path: 'company-details', component: CompanyDetailsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyRoutingModule { }
