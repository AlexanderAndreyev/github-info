import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ProfileService } from './profile/services';
import { AuthService } from './auth/services';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  constructor(private profileService: ProfileService,
              private authService: AuthService,
              private router: Router) {
  }

  onSignOut(): void {
    this.authService.signOut$().subscribe(() => {
      this.router.navigateByUrl('/user');
    });
  }

  get userProfile$(): Observable<any> {
    return this.profileService.userProfile$;
  }
}
