import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from '../services';

@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router,
              private authService: AuthService) {
  }

  canActivate(): Observable<boolean> {
    return this.authService.isAuthorized$.pipe(
      map((isAuth: boolean) => {
        if (isAuth) {
          this.router.navigateByUrl('/profile');
        }
        return !isAuth;
      })
    );
  }

  canActivateChild(): Observable<boolean> {
    return this.canActivate();
  }
}
