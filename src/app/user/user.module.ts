import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SignInComponent } from './components';
import { UserRouting } from './user.routing';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserRouting
  ],
  declarations: [
    SignInComponent
  ]
})
export class UserModule {}
