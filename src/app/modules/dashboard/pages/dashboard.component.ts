import { Observable } from 'rxjs';
import { LoginState } from '@state/auth';
import { Component } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { Select } from '@ngxs/store';
import { Login } from '@core/models';

@Component({
  selector: 'app-index',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  @Select(LoginState.currentUser) currentUser: Observable<Login.SuccessResponse>;
  roleList: any;
  role: any;
  adminMenu: NbMenuItem[] = [
    {
      title: 'Dashboard',
      icon: 'home-outline',
      link: '/'
    },
    {
      title: 'Manage Bus Info',
      icon: 'people-outline',
      link: '/add-employee'
    },
    {
      title: 'Manage Customer Info',
      icon: 'people-outline',
      link: '/add-employee'
    },
    {
      title: 'Manage Staff Info',
      icon: 'people-outline',
      link: '/add-employee'
    },
    
  ];

  userMenu: NbMenuItem[] = [
    {
      title: 'Dashboard',
      icon: 'home-outline',
      link: '/'
    },
    {
      title: 'Search & Book',
      icon: 'people-outline',
      link: '/bus'
    },
    
    {
      title: 'Booking List',
      icon: 'list-outline',
      link: '/booking'
    },
   
  ];

  constructor() {
    this.currentUser.subscribe(res => {
      if (res !== null) {
        this.role = res.role;
      }
    });
  }
}
