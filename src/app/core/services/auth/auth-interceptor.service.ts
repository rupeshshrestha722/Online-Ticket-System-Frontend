import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

import { Select } from '@ngxs/store';

import { Observable } from 'rxjs';
import { concatMap, take } from 'rxjs/operators';

import { LoginState } from '@state/auth';
import { Login } from '@core/models';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  @Select(LoginState.currentUser) user$: Observable<Login.SuccessResponse | null>;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(req.url);
    return this.user$.pipe(
      take(1),
      concatMap(user => {
        if (user) {
          console.log(req.url, user);
          const modifiedReq = req.clone({ headers: req.headers.set('Authorization', `Bearer ${user.token}`) });
          return next.handle(modifiedReq);
        } else {
          console.log(req.url, user);
          return next.handle(req);
        }
      })
    );
  }
}
