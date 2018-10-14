import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../auth/guard';
import { RepositoriesComponent } from './components';

const appRoutes: Routes = [
  {
    path: '',
    component: RepositoriesComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class ProfileRouting {}
