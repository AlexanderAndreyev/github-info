import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProfileService {

  private userProfileSubject$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  get userProfile$(): Observable<any> {
    return this.userProfileSubject$.asObservable();
  }

  constructor(private http: HttpClient) {}

  setUserProfile(userProfile: any): void {
    this.userProfileSubject$.next(userProfile);
  }

  getUserRepositories$(): Observable<any> {
    return this.http.get<any>(`https://api.github.com/user/repos`);
  }

  getRepositoryStats$(owner: string, repo: string): Observable<any> {
    return this.http.get<any>(`https://api.github.com/repos/${owner}/${repo}/stats/contributors`);
  }
}
