import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatToolbarModule, MatButtonModule, MatIconModule } from '@angular/material';

import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';
import { AuthModule } from './auth/auth.module';
import { CoreModule  } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AuthModule,
    CoreModule,
    AppRouting,

    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
