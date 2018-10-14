import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatButtonModule, MatProgressSpinnerModule } from '@angular/material';

import { RepositoriesComponent, CommitStatsComponent } from './components';
import { ProfileRouting } from './profile.routing';

@NgModule({
  imports: [
    CommonModule,
    ProfileRouting,
    MatTableModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  declarations: [
    RepositoriesComponent,
    CommitStatsComponent
  ]
})
export class ProfileModule { }
