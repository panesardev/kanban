import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ModalService } from '../services/modal.service';
import { AddBoardComponent } from './modals/boards/add-board.component';
import { LogoutComponent } from './modals/logout.component';
import { AuthService } from '../services/auth.service';
import { computedAsync } from 'ngxtension/computed-async';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
  ],
  template: `
    <header class="bg-neutral custom-shadow">
      <nav class="max-w-6xl flex justify-between items-center gap-8 mx-auto px-4 py-6 md:px-8 md:py-6">
        <div>
          <a class="text-primary font-bold" routerLink="/">NGXKanban</a>
        </div>
        <div class="flex gap-4 md:gap-8">
          <a class="text-primary hover:underline" routerLink="/dashboard">Dashboard</a>
          @if (user()) {
            <a class="text-primary hover:underline cursor-pointer" (click)="openLogout()">Logout</a>
          }
        </div>
      </nav>
    </header>
  `,
})
export class NavbarComponent {
  private modal = inject(ModalService);
  private auth = inject(AuthService);

  user = computedAsync(() => this.auth.user$);

  openLogout() {
    this.modal.open(LogoutComponent);
  }

  openAddBoard() {
    this.modal.open(AddBoardComponent);
  }

}
