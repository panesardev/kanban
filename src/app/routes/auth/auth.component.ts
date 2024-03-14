import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { computedAsync } from 'ngxtension/computed-async';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    RouterLink,
  ],
  templateUrl: './auth.component.html',
})
export default class AuthComponent {
  private auth = inject(AuthService);

  user = computedAsync(() => this.auth.user$);

  async login() {
    await this.auth.login();
  }
}
