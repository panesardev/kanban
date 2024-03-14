import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ModalService } from '../services/modal.service';
import { AddBoardComponent } from './modals/boards/add-board.component';
import { LogoutComponent } from './modals/logout.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
  ],
  template: `
    <nav class="border-b-2 border-slate-200 flex justify-center items-center gap-8 py-4 md:py-6">
      <a class="text-primary hover:underline" routerLink="/dashboard">Dashboard</a>
      <a class="text-primary hover:underline cursor-pointer" (click)="openLogout()">Logout</a>
      <a class="text-primary hover:underline cursor-pointer" (click)="openAddBoard()">Add board</a>
    </nav>  
  `,
})
export class NavbarComponent {
  private modal = inject(ModalService);

  openLogout() {
    this.modal.open(LogoutComponent);
  }

  openAddBoard() {
    this.modal.open(AddBoardComponent);
  }

}
