import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';
import { StudentGuard } from './auth/student.guard';
import { LoginRegisterComponent } from './login-register/login-register.component';

const routes: Routes = [
  {
    path: '',
    component: LoginRegisterComponent,
    data: { title: 'CUIC | Anna University' },
  },
  {
    path: 'student',
    loadChildren: () =>
      import('./student/student.module').then((mod) => mod.StudentModule),
    canActivate: [StudentGuard],
  },
  // {
  //   path: 'company',
  //   loadChildren: () =>
  //     import('./company/company.module').then((mod) => mod.CompanyModule),
  // },
];

const routerOptions: ExtraOptions = {
  anchorScrolling: 'enabled',
  scrollPositionRestoration: 'enabled',
  scrollOffset: [0, 120],
  relativeLinkResolution: 'legacy',
  useHash: false,
};
@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
