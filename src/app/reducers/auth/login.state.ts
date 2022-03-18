import { State, Selector, Action, StateContext } from '@ngxs/store';
import { Login } from '@core/models';
import { Authenticate, Logout } from '@actions/auth';
import { tap, catchError } from 'rxjs/operators';
import { AuthService } from '@core/services';
import { Injectable } from '@angular/core';

export interface LoginStateModel {
  loginForm: {
    model: Login.Form;
    dirty: boolean;
    status: {};
    errors: {};
  };
  currentUser: Login.SuccessResponse | null;
  submitted: boolean;
}

@State({
  name: 'login',
  defaults: {
    loginForm: {
      model: {
        username: '',
        password: '',
        rememberMe: false
      },
      dirty: false,
      status: {},
      errors: {}
    },
    currentUser: null,
    submitted: false
  }
})
@Injectable()
export class LoginState {
  constructor(private authService: AuthService) {}

  @Selector()
  static currentUser(state: LoginStateModel) {
    return state.currentUser;
  }

  @Selector()
  static isAuthenticated(state: LoginStateModel) {
    return !!state.currentUser;
  }

  @Selector()
  static submitted(state: LoginStateModel) {
    return state.submitted;
  }

  @Selector()
  static rememberMe(state: LoginStateModel) {
    return state.loginForm.model.rememberMe;
  }

  @Action(Authenticate)
  authenticate(state: StateContext<LoginStateModel>) {
    state.patchState({ submitted: true });
    const form = state.getState().loginForm.model;
    return this.authService.authenticate(form.username, form.password).pipe(
      tap((res: any) => {
        state.patchState({
          currentUser: {
            id: res.id,
            firstName: res.firstName,
            lastName: res.lastName,
            username: res.username,
            email: res.email,
            role: res.role,
            token: res.token
          },
          submitted: false
        });
      }),
      catchError(err => {
        state.patchState({ submitted: false });
        throw err;
      })
    );
  }

  @Action(Logout)
  logout(ctx: StateContext<LoginStateModel>) {
    ctx.patchState({
      currentUser: null
    });
  }
}
