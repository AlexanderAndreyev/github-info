import { APP_INITIALIZER, NgModule, Optional, SkipSelf } from '@angular/core';

import { CoreService } from './services';

@NgModule({
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (core: CoreService) => () => core.initialize(),
      deps: [CoreService],
      multi: true
    }
  ]
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() private coreModule: CoreModule) {
    if (this.coreModule) {
      throw new Error('CoreModule is already loaded.');
    }
  }
}
