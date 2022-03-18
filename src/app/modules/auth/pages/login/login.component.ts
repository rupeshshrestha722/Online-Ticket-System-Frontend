import { NbToastrService } from '@nebular/theme';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Navigate } from '@ngxs/router-plugin';
import { Select, Store } from '@ngxs/store';

import { Observable } from 'rxjs';

import { Authenticate } from '@actions/auth';
import { LoginState, LoginStateModel } from '@state/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private store: Store, private toaster: NbToastrService) {}

  rememberMe = false;
  loginForm = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    rememberMe: new FormControl(false)
  });

  @Select(LoginState.submitted) submitted$: Observable<boolean>;

  @Select(LoginState.rememberMe) rememberMe$: Observable<boolean>;

  @Select(LoginState) login$: Observable<LoginStateModel>;

  ngOnInit() {}

  onLogin(): void {
    this.store.dispatch(new Authenticate()).subscribe(
      () => {
        this.rememberMe$.subscribe(res => {
          if (res === true) {
            this.store.dispatch(new Navigate(['/']));
          } else if (res === false) {
            this.store.dispatch(new Navigate(['/']));
            this.loginForm.reset();
          }
        });
      },
      err => {
        this.toaster.danger(err.error.message, 'Login');
      }
    );
  }
}
