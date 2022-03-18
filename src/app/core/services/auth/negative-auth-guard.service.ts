import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';

import { Store } from '@ngxs/store';

import { Observable } from 'rxjs';

import { LoginState } from '@state/auth';

@Injectable({ providedIn: 'root' })
export class NegateAuthGuard implements CanActivate {
  constructor(private router: Router, private store: Store) {}

  canActivate(): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
    const isAuthenticated = this.store.selectSnapshot(LoginState.isAuthenticated);
    if (!isAuthenticated) {
      return true;
    } else {
      return this.router.createUrlTree(['/']);
    }
  }
}
