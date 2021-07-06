import { Component } from '@angular/core';
import {AuthService} from './shared/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-jwt';
  constructor(private authService: AuthService) {
  }
}
