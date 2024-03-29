import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { computedAsync } from 'ngxtension/computed-async';
import { distinctUntilChanged, tap } from 'rxjs';
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
    <app-base-modal heading="Add board" classes="max-w-md">
      <div class="grid gap-2 mb-6">
        <label>enter board title</label>
        <input type="text" [formControl]="titleControl" placeholder="type here" 
          class="border-2 rounded px-4 py-3 {{ hasError() ? ' border-red-400' : 'border-slate-200' }}">
      </div>
      <div class="grid">
        <button class="btn primary px-6" (click)="addBoard()">Add board</button>
      </div>
    </app-base-modal>
  `,
})
export class AddBoardComponent extends Modal {
  private boardsService = inject(BoardsService);

  titleControl = new FormControl('');

  title = computedAsync(() => 
    this.titleControl.valueChanges.pipe(
      distinctUntilChanged(),
      tap(title => this.hasError.set(title ? false : true)),
    ),
  );

  hasError = signal<boolean>(false);

  async addBoard() {
    if (this.titleControl.value) {
      const board = createBoard(this.title());
      await this.boardsService.add(board);
      this.modal.close();
    }
    else {
      this.hasError.set(true);
    }
  }

}
