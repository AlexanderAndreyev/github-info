import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { first } from 'rxjs/operators';

import { AuthService, TokenService } from '../../../auth/services';
import { ProfileService } from '../../../profile/services';

@Component({
  templateUrl: './sign-in.component.html'
})
export class SignInComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private tokenService: TokenService,
              private profileService: ProfileService) {
  }

  get formControls() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.authService.signIn$(this.formControls['username'].value, this.formControls['password'].value)
      .pipe(first())
      .subscribe(
        (userData: any) => {
          this.tokenService.saveAccessToken(JSON.stringify(userData.access_token));
          this.profileService.setUserProfile(userData.profile);
          this.router.navigate(['/profile']);
        },
        (error: any) => {
          this.error = error.error.message || error.statusText;
          this.loading = false;
        }
      );
  }
}
