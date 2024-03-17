import { Component, inject, input } from '@angular/core';
import { Modal } from '../../../types/modal.class';
import { BaseModalComponent } from '../base-modal.component';
import { Board, Task } from '../../../types/board.interface';
import { Store } from '@ngxs/store';
import { DeleteTask } from '../../../store/boards/boards.actions';

@Component({
  selector: 'app-delete-task',
  standalone: true,
  imports: [
    BaseModalComponent,
  ],
  template: `
    <app-base-modal heading="Delete task" classes="max-w-md">
      <p class="mb-6">Are you sure to delete <span class="font-bold">{{ board().title }}</span>?</p>

      <div class="grid">
        <button class="btn bg-red-500 text-red-50" (click)="deleteTask()">Delete task</button>
      </div>
    </app-base-modal>
  `,
})
export class DeleteTaskComponent extends Modal {
  private store = inject(Store);

  task = input.required<Task>();
  board = input.required<Board>();

  deleteTask() {
    this.store.dispatch(new DeleteTask(this.task(), this.board()));
    this.modal.close();
  }

}
