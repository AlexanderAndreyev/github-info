import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';

import { AuthService, TokenService } from '../services';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService,
              private tokenService: TokenService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.isAuthorized$.pipe(
      switchMap((isAuthorized: boolean) => {
        if (isAuthorized) {
          const requestClone: HttpRequest<any> = request.clone();
          return this.addToken(requestClone).pipe(
            mergeMap((req: HttpRequest<any>) => next.handle(req)),
            catchError((responseError: HttpErrorResponse) => this.errorHandler(responseError))
          );
        }
        return next.handle(request);
      })
    );
  }

  private addToken(request: HttpRequest<any>): Observable<HttpRequest<any>> {
    return this.tokenService.token$.pipe(
      map((token: string) => {
        return request.clone({
          setHeaders: {
            Authorization: `Basic ${token}`
          }
        });
      })
    );
  }

  private errorHandler(responseError: HttpErrorResponse) {
    if (responseError.status === 401) {
      this.authService.signOut$().subscribe();
    }
    return throwError(responseError);
  }
}
