import { Component, effect, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AsyncPipe } from '@angular/common';
import { derivedAsync } from 'ngxtension/derived-async';

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
  private router = inject(Router);

  user = derivedAsync(() => this.auth.user$);

  redirect = effect(() => 
    this.user() && this.router.navigateByUrl('/dashboard')
  );

  async login() {
    await this.auth.login();
  }
}
