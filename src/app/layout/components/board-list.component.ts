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
      <div class="border-2 border-dashed border-slate-300 rounded flex justify-center items-center p-4">
        <button class="btn primary px-6" (click)="onAdd.emit()">Add board</button>
      </div>
      @for (board of boards(); track $index) {
        <div class="border-[1px] border-slate-300 flex flex-col justify-between rounded-md gap-4 p-4 md:p-6">
          <div class="gap-6">
            <h1 class="text-lg font-medium mb-2">{{ board.title }}</h1>
            <p class="text-sm text-slate-500">Created {{ board.createdAt }}</p>
          </div>
          <div class="flex justify-end items-center gap-6">
            <a class="text-red-500 hover:underline cursor-pointer" (click)="onDelete.emit(board)">Delete</a>
            <button class="btn primary px-6 py-2" routerLink="/board/{{ board.id }}">View</button>
          </div>
        </div>
      }
    </div>
  `,
})
export class BoardListComponent {
  boards = input.required<Board[]>();
  onAdd = output<void>();
  onDelete = output<Board>();
}
