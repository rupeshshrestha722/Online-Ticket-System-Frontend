import { HeaderComponent } from './shared/components/header/header.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Online Ticket System';

  @ViewChild(HeaderComponent) child: any;
  currentLanguage: string;

  constructor(private themeService: NbThemeService) {
  
    const themeName = localStorage.getItem('selected-theme') || '{}';
    console.log(themeName);
    this.themeService.changeTheme(themeName);
  }

  ngOnInit() {}
}
