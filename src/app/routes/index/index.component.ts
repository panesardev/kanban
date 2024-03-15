import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { computedAsync } from 'ngxtension/computed-async';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    RouterLink,
  ],
  templateUrl: './index.component.html',
})
export default class IndexComponent {
  private auth = inject(AuthService);

  user = computedAsync(() => this.auth.user$);

  async login() {
    await this.auth.login();
  }
}
