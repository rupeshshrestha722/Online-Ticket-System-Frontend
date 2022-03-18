import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './../../core/services/auth/auth-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookingListByUserComponent, DashboardComponent } from './pages';
import { BusListComponent } from './pages/search/bus-list/bus-list.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'bus',
        component: BusListComponent
      },
      {
        path: 'booking',
        component: BookingListByUserComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
