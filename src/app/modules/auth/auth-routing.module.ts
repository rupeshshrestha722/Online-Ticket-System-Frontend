
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NegateAuthGuard } from '@core/services/auth/negative-auth-guard.service';

import { AuthComponent, LoginComponent } from './pages';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    canActivate: [NegateAuthGuard],
    children: [
      {
        path: '',
        component: LoginComponent
      },
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
