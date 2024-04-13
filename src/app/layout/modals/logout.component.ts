import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Modal } from '../../types/modal.class';
import { BaseModalComponent } from './base-modal.component';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [
    BaseModalComponent,
  ],
  template: `
    <app-base-modal heading="Logout" width="max-w-md">
      <p class="mb-6">You will be logged out!</p>

      <button class="btn bg-red-500 text-red-50 w-full" (click)="logout()">Logout</button>
    </app-base-modal>
  `,
})
export class LogoutComponent extends Modal {
  private auth = inject(AuthService);

  logout() {
    this.auth.logout();
    this.modal.close();
  }
}
