import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ModifyDriveComponent } from './modify-drive/modify.component';
import { ReportsComponent } from './reports/reports.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { ScheduleComponent } from './schedule/schedule.component';
const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    data: { title: 'CUIC | Admin' },
    children: [
      {
        path: '',
        redirectTo: 'modify-drive',
      },
      {
        path: 'modify-drive',
        component: ModifyDriveComponent,
        data: { title: 'CUIC | Modify Drive' },
      },
      {
        path: 'user-management',
        component: UserManagementComponent,
        data: { title: 'CUIC | User Management' },
      },
      {
        path: 'reports',
        component: ReportsComponent,
        data: { title: 'CUIC | Reports' },
      },
      {
        path: 'schedule',
        component: ScheduleComponent,
        data: { title: 'CUIC | schedule' },
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
