import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TokenService {

  private readonly TOKEN_LOCAL_STORAGE_KEY: string = 'user_session';
  private tokenSubject$: BehaviorSubject<string> = new BehaviorSubject<string>(this.getAccessToken());

  get token$(): Observable<string> {
    return this.tokenSubject$.asObservable();
  }

  getAccessToken(): string {
    return JSON.parse(localStorage.getItem(this.TOKEN_LOCAL_STORAGE_KEY));
  }

  saveAccessToken(userSession: string): void {
    this.tokenSubject$.next(userSession);
    localStorage.setItem(this.TOKEN_LOCAL_STORAGE_KEY, userSession);
  }

  removeAccessToken(): void {
    this.tokenSubject$.next(null);
    localStorage.removeItem(this.TOKEN_LOCAL_STORAGE_KEY);
  }
}
