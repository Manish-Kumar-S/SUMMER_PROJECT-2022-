import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ModifyDriveComponent } from './modify-drive/modify.component';

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
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
