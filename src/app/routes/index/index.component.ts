import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink,
  ],
  templateUrl: './index.component.html',
})
export class IndexComponent {
  private auth = inject(AuthService);

  user$ = this.auth.user$;

  async login() {
    await this.auth.login();
  }
}
