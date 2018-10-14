import { NgModule, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AuthTokenInterceptor } from './interceptors';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInterceptor,
      multi: true
    }
  ]
})
export class AuthModule {

  constructor(@Optional() @SkipSelf() private authModule: AuthModule) {
    if (this.authModule) {
      throw new Error('AuthModule is already loaded.');
    }
  }
}
