import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  constructor() {}

  back() {
    return false;
  }
}
