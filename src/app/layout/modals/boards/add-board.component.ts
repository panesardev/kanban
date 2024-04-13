import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BoardsService } from '../../../services/boards.service';
import { createBoard } from '../../../types/board.interface';
import { Modal } from '../../../types/modal.class';
import { BaseModalComponent } from '../base-modal.component';

@Component({
  selector: 'app-add-board',
  standalone: true,
  imports: [
    BaseModalComponent,
    ReactiveFormsModule,
  ],
  template: `
    <app-base-modal heading="Add board" width="max-w-md">
      <form [formGroup]="boardForm" (submit)="addBoard()">
        <div class="grid gap-2 mb-6">
          <label class="{{ boardForm.invalid ? 'text-red-500' : '' }}">enter board title</label>
          <input type="text" formControlName="title" placeholder="type here" class="border-2 rounded px-4 py-3">
        </div>
        <div class="grid">
          <button class="btn {{ boardForm.invalid ? 'disabled' : 'primary' }} px-6" type="submit" [disabled]="boardForm.invalid">Add board</button>
        </div>
      </form>
    </app-base-modal>
  `,
})
export class AddBoardComponent extends Modal {
  private boardsService = inject(BoardsService);

  boardForm = new FormGroup({
    title: new FormControl('', Validators.required),
  });

  async addBoard() {
    if (this.boardForm.valid) {
      const board = createBoard(this.boardForm.value.title);
      await this.boardsService.add(board);
      this.modal.close();
    }
  }
}
