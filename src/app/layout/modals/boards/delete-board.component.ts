import { Component, inject, input } from '@angular/core';
import { BoardsService } from '../../../services/boards.service';
import { Board } from '../../../types/board.interface';
import { Modal } from '../../../types/modal.class';
import { BaseModalComponent } from '../base-modal.component';

@Component({
  selector: 'app-delete-board',
  standalone: true,
  imports: [
    BaseModalComponent,
  ],
  template: `
    <app-base-modal heading="Delete board" width="max-w-md">
      <p class="mb-6">Are you sure to delete <span class="font-medium">{{ board().title }}</span>?</p>
      <div class="grid">
        <button class="btn bg-red-500 text-red-50" (click)="deleteBoard()">Delete board</button>
      </div>
    </app-base-modal>
  `,
})
export class DeleteBoardComponent extends Modal {
  private boardsService = inject(BoardsService);

  board = input.required<Board>();
  
  async deleteBoard() {
    await this.boardsService.delete(this.board());
    this.modal.close();
  }

}
