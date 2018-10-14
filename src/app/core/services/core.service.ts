import {Injectable} from '@angular/core';

import { first, mergeMap, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { UserService } from '../../user/services';
import { AuthService } from '../../auth/services';
import { ProfileService } from '../../profile/services';

@Injectable({ providedIn: 'root' })
export class CoreService {

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private profileService: ProfileService
  ) {}

  initialize(): void {
    this.authService.isAuthorized$.pipe(
      first(),
      mergeMap((isAuthorized: boolean) => {
        if (isAuthorized) {
          return this.checkUserProfile();
        }
        return of({});
      })
    ).subscribe();
  }

  private checkUserProfile(): Observable<any> {
    return this.profileService.userProfile$.pipe(
      first(),
      mergeMap((userProfile: any) => {
        if (!userProfile) {
          return this.getProfile();
        }
        return of({});
      })
    );
  }

  private getProfile(): Observable<any> {
    return this.userService.getAuthorizedUser$().pipe(
      first(),
      tap((profile: any) => {
        this.profileService.setUserProfile(profile);
      })
    );
  }
}
