import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { TokenService } from './token.service';

@Injectable({ providedIn: 'root' })
export class AuthService {

  get isAuthorized$(): Observable<boolean> {
    return this.tokenService.token$.pipe(
      map((token: string) => {
        return !!token;
      })
    );
  }

  constructor(private http: HttpClient,
              private tokenService: TokenService) {
  }

  signIn$(username: string, password: string): Observable<any> {
    const accessToken = btoa(`${username}:${password}`);
    return this.http.get<any>('https://api.github.com/user', {
      headers: new HttpHeaders({
        Authorization: `Basic ${accessToken}`
      })
    }).pipe(
      map((userProfile: any) => {
        return {
          access_token: accessToken,
          profile: userProfile
        };
      })
    );
  }

  signOut$(): Observable<string> {
    this.tokenService.removeAccessToken();
    return of(this.tokenService.getAccessToken());
  }
}
