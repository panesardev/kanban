import { Component, effect, inject, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BoardsService } from '../../../services/boards.service';
import { Board } from '../../../types/board.interface';
import { Modal } from '../../../types/modal.class';
import { BaseModalComponent } from '../base-modal.component';

@Component({
  selector: 'app-update-board',
  standalone: true,
  imports: [
    BaseModalComponent,
    ReactiveFormsModule,
  ],
  template: `
    <app-base-modal heading="Update board" width="max-w-md">
      <form [formGroup]="boardForm" (submit)="updateBoard()">
        <div class="grid gap-2 mb-6">
          <label class="{{ boardForm.invalid ? 'text-red-500' : '' }}">enter board title</label>
          <input type="text" formControlName="title" placeholder="type here" class="border-2 rounded px-4 py-3">
        </div>
        <div class="grid">
          <button class="btn {{ boardForm.invalid ? 'disabled' : 'primary' }} px-6" type="submit" [disabled]="boardForm.invalid">Update board</button>
        </div>
      </form>
    </app-base-modal>
  `,
})
export class UpdateBoardComponent extends Modal {
  private boardsService = inject(BoardsService);
  
  board = input.required<Board>();

  boardForm = new FormGroup({
    title: new FormControl('', Validators.required),
  });

  setTitle = effect(() => 
    this.boardForm.setValue({ title: this.board().title })
  );

  async updateBoard() {
    if (this.boardForm.valid) {
      const board: Board = { ...this.board(), ...this.boardForm.value };
      await this.boardsService.update(board);
      this.modal.close();
    }
  }

}
