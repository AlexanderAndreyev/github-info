import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild } from '@angular/router';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthService } from '../services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router,
              private authService: AuthService) {
  }

  canActivate(): Observable<boolean> {
    return this.authService.isAuthorized$.pipe(
      tap((isAuth: boolean) => {
        if (!isAuth) {
          this.router.navigateByUrl('/user');
        }
      })
    );
  }

  canActivateChild(): Observable<boolean> {
    return this.canActivate();
  }
}
