import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {

  constructor(private http: HttpClient) {}

  getAuthorizedUser$(): Observable<any> {
    return this.http.get<any>('https://api.github.com/user');
  }
}
