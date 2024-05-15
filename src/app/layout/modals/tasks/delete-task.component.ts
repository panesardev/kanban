import { Component, inject, input } from '@angular/core';
import { TasksService } from '../../../services/tasks.service';
import { Board } from '../../../types/board.interface';
import { Modal } from '../../../types/modal.class';
import { BaseModalComponent } from '../base-modal.component';
import { Task } from '../../../types/task.interface';

@Component({
  selector: 'app-delete-task',
  standalone: true,
  imports: [
    BaseModalComponent,
  ],
  template: `
    <app-base-modal heading="Delete task" width="max-w-md">
      <p class="mb-6">Are you sure to delete <span class="font-medium">{{ task().text }}</span>?</p>

      <div class="grid">
        <button class="btn bg-red-500 text-red-50" (click)="deleteTask()">Delete task</button>
      </div>
    </app-base-modal>
  `,
})
export class DeleteTaskComponent extends Modal {
  private tasksService = inject(TasksService);

  task = input.required<Task>();
  board = input.required<Board>();

  deleteTask() {
    this.tasksService.delete(this.task(), this.board());
    this.modal.close();
  }

}
