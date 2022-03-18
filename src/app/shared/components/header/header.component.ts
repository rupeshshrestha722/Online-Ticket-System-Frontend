import { Navigate } from '@ngxs/router-plugin';
import { Logout } from '@actions/auth';
import { Store } from '@ngxs/store';
import { User } from '@core/models';
import { AuthService } from '@core/services';
import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NbSidebarService, NbMenuService, NbThemeService, NbMediaBreakpointsService } from '@nebular/theme';
import { map, takeUntil, filter } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  themes = [
    {
      title: 'default',
      name: 'Light'
    },
    {
      title: '<dark>',
      name: 'Dark'
    }
  ];
  currentTheme = 'default';
  user: any;
  firstName: string;
  lastName: string;
  userPictureOnly = false;

  userMenu = [{ title: 'Profile' }, { title: 'Logout' }];
  isUserAuthenticated = false;

  languages = [
    { title: 'English', value: 'en' },
    { title: 'नेपाली', value: 'np' }
  ];

  currentLanguage = 'en';

  constructor(
    private themeService: NbThemeService,
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private router: Router,
    private store: Store
  ) {
    this.user = JSON.parse(localStorage.getItem('login.currentUser') || '{}');
    this.currentTheme = localStorage.getItem('selected-theme') || 'default';
  }
  ngOnInit() {
    this.themeService.changeTheme(this.currentTheme);
    this.isUserAuthenticated = this.user && this.user.token != null;
    if (this.isUserAuthenticated) {
      this.user.fullName = this.user.firstName + ' ' + this.user.lastName;
    }

    this.themeService
      .onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$)
      )
      .subscribe(themeName => (this.currentTheme = themeName));
    this.menuService
      .onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'profile-context-menu'),
        map(({ item: { title } }) => title)
      )
      .subscribe(title => {
        if (title === 'Profile') {
          this.router.navigateByUrl('/');
        } else if (title === 'Logout') {
          this.logout();
        } else if (title === 'Change Password') {
          this.router.navigateByUrl('/');
        }
      });

    this.menuService
      .onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'language-menu'),
        map(({ item }) => item)
      )
      .subscribe((item: any) => {
      
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    localStorage.setItem('selected-theme', themeName);
    this.themeService.changeTheme(themeName);
  }

  toggleTheme() {
    switch (this.currentTheme) {
      case 'dark':
        this.currentTheme = 'default';
        break;
      case 'default':
        this.currentTheme = 'dark';
        break;
    }
    this.changeTheme(this.currentTheme);
  }


  toggleSidebar() {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
  logout() {
    this.store.dispatch(new Logout());
    this.store.dispatch(new Navigate(['/auth']));
  }
}
