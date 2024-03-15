import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Board } from '../../types/board.interface';

@Component({
  selector: 'app-board-list',
  standalone: true,
  imports: [
    RouterLink,
  ],
  template: `
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      @for (board of boards(); track $index) {
        <div class="bg-neutral flex flex-col justify-between custom-shadow rounded gap-4 p-4 md:p-6">
          <div class="gap-6">
            <h1 class="text-lg text-primary font-bold mb-2">{{ board.title }}</h1>
            <p class="text-slate-500">Created {{ board.createdAt }}</p>
          </div>
          <div class="flex gap-6">
            <button class="btn secondary w-full" (click)="onUpdate.emit(board)">Update</button>
            <button class="btn primary w-full" routerLink="/dashboard/{{ board.id }}">View</button>
          </div>
        </div>
      }
    </div>
  `,
})
export class BoardListComponent {
  boards = input<Board[]>();
  onUpdate = output<Board>();
}
