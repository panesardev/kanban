import { Component, inject, input, signal } from '@angular/core';
import { BaseModalComponent } from '../base-modal.component';
import { Modal } from '../../../types/modal.class';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngxs/store';
import { computedAsync } from 'ngxtension/computed-async';
import { distinctUntilChanged, tap } from 'rxjs';
import { Board, createTask } from '../../../types/board.interface';
import { AddTask } from '../../../store/boards/boards.actions';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [
    BaseModalComponent,
    ReactiveFormsModule,
  ],
  template: `
    <app-base-modal heading="New Task" classes="max-w-md">
      <div class="grid gap-2 mb-6">
        <label>enter task</label>
        <input type="text" [formControl]="textControl" placeholder="type here" 
          class="border-2 rounded px-4 py-3 {{ hasError() ? ' border-red-400' : 'border-slate-200' }}">
      </div>
      <div class="flex justify-center">
        <button class="btn primary px-6" (click)="addTask()">Add Task</button>
      </div>
    </app-base-modal>
  `,
})
export class AddTaskComponent extends Modal {
  private store = inject(Store);

  board = input.required<Board>();

  textControl = new FormControl('');

  text = computedAsync(() => 
    this.textControl.valueChanges.pipe(
      distinctUntilChanged(),
      tap(title => this.hasError.set(title ? false : true)),
    ),
  );

  hasError = signal<boolean>(false);

  addTask(): void {
    if (this.textControl.value) {
      const task = createTask(this.text());
      this.store.dispatch(new AddTask(task, this.board()));
      this.modal.close();
    }
    else {
      this.hasError.set(true);
    }
  }

}
