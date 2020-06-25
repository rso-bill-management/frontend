import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authService: AuthService) {}

  title = 'ngApp';

  loggedIn(): boolean {
    return this.authService.loggedIn();
  }

  logoutUser(): void {
    this.authService.logoutUser();
  }
}
