import { Component, effect, inject, input, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngxs/store';
import { computedAsync } from 'ngxtension/computed-async';
import { distinctUntilChanged, tap } from 'rxjs';
import { UpdateBoard } from '../../../store/boards/boards.actions';
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
    <app-base-modal heading="Update board" classes="max-w-md">
      <div class="grid gap-2 mb-6">
        <label>change board title</label>
        <input type="text" [formControl]="titleControl" placeholder="type here" 
          class="border-2 rounded px-4 py-3 {{ hasError() ? ' border-red-400' : 'border-slate-200' }}">
      </div>
      <div class="grid">
        <button class="btn primary px-6" (click)="updateBoard()">Update board</button>
      </div>
    </app-base-modal>
  `,
})
export class UpdateBoardComponent extends Modal {
  private store = inject(Store);
  
  board = input.required<Board>();

  titleControl = new FormControl('');

  title = computedAsync(() => 
    this.titleControl.valueChanges.pipe(
      distinctUntilChanged(),
      tap(title => this.hasError.set(title ? false : true)),
    ),
  );

  effectRef = effect(() => this.titleControl.setValue(this.board().title));
  
  hasError = signal<boolean>(false);

  updateBoard(): void {
    if (this.titleControl.value) {
      const board: Board = { ...this.board(), title: this.title() };
      this.store.dispatch(new UpdateBoard(board));
      this.modal.close();
    }
  }

}
