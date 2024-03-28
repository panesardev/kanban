import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
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
    RouterLinkActive,
  ],
  template: `
    <header class="fixed z-10 top-0 left-0 right-0 backdrop-filter backdrop-blur-lg bg-opacity-90 bg-neutral/90">
      <nav class="max-w-6xl flex justify-between items-center gap-8 mx-auto p-6 md:px-8 md:py-6">
        <div>
          <a class="font-bold text-primary text-2xl" routerLink="/">Kanban</a>
        </div>
        @if (user()) {
          <div class="flex gap-8">
            <a class="cursor-pointer" (click)="openAddBoard()">
              <img class="w-5" src="/assets/svg/add.svg" alt="add">
            </a>
            <a routerLink="/dashboard">
              <img class="w-5" src="/assets/svg/dashboard.svg" alt="dashboard">
            </a>
            <a class="cursor-pointer" (click)="openLogout()">
              <img class="w-5" src="/assets/svg/logout.svg" alt="logout">
            </a>
          </div>
        }
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
