import { Component, effect, inject, input, signal } from '@angular/core';
import { BaseModalComponent } from '../base-modal.component';
import { Modal } from '../../../types/modal.class';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngxs/store';
import { computedAsync } from 'ngxtension/computed-async';
import { distinctUntilChanged, tap } from 'rxjs';
import { Board, Task, TaskColor } from '../../../types/board.interface';
import { UpdateTask } from '../../../store/boards/boards.actions';
import { DeleteTaskComponent } from './delete-task.component';

@Component({
  selector: 'app-update-task',
  standalone: true,
  imports: [
    BaseModalComponent,
    ReactiveFormsModule,
  ],
  template: `
    <app-base-modal heading="Update task" classes="max-w-md">
      <div class="grid gap-2 mb-4">
        <label>change text</label>
        <input type="text" [formControl]="textControl" placeholder="type here" 
          class="border-2 rounded px-4 py-3 {{ hasError() ? ' border-red-400' : 'border-slate-200' }}">
      </div>
      <div class="grid gap-2 mb-8">
        <label>select color</label>
        <div class="border-2 border-slate-200 flex w-fit gap-2 p-2 rounded-full">
          <div class="{{ isSelectedTaskColor('red') ? 'border-[6px] border-red-500 bg-neutral' : 'bg-red-500' }} w-8 h-8 rounded-full cursor-pointer" (click)="setTaskColor('red')"></div>
          <div class="{{ isSelectedTaskColor('blue') ? 'border-[6px] border-blue-500 bg-neutral' : 'bg-blue-500' }} w-8 h-8 rounded-full cursor-pointer" (click)="setTaskColor('blue')"></div>
          <div class="{{ isSelectedTaskColor('purple') ? 'border-[6px] border-purple-500 bg-neutral' : 'bg-purple-500' }} w-8 h-8 rounded-full cursor-pointer" (click)="setTaskColor('purple')"></div>
          <div class="{{ isSelectedTaskColor('emerald') ? 'border-[6px] border-emerald-500 bg-neutral' : 'bg-emerald-500' }} w-8 h-8 rounded-full cursor-pointer" (click)="setTaskColor('emerald')"></div>
          <div class="{{ isSelectedTaskColor('amber') ? 'border-[6px] border-amber-500 bg-neutral' : 'bg-amber-500' }} w-8 h-8 rounded-full cursor-pointer" (click)="setTaskColor('amber')"></div>
        </div>
      </div>
      <div class="flex justify-center gap-4">
        <button class="btn red px-6" (click)="deleteTask()">Delete task</button>
        <button class="btn primary px-6" (click)="updateTask()">Update task</button>
      </div>
    </app-base-modal>
  `,
})
export class UpdateTaskComponent extends Modal {
  private store = inject(Store);

  board = input.required<Board>();
  task = input.required<Task>();

  textControl = new FormControl('');

  text = computedAsync(() => 
    this.textControl.valueChanges.pipe(
      distinctUntilChanged(),
      tap(title => this.hasError.set(title ? false : true)),
    ),
  );

  hasError = signal<boolean>(false);
  taskColor = signal<TaskColor>('red');

  setTaskColorRef = effect(() => this.taskColor.set(this.task().color), { allowSignalWrites: true });
  setTextRef = effect(() => this.textControl.setValue(this.task().text));

  updateTask(): void {
    if (this.textControl.value) {
      const task: Task = { ...this.task(), text: this.text(), color: this.taskColor() };
      this.store.dispatch(new UpdateTask(task, this.board()));
      this.modal.close();
    }
    else {
      this.hasError.set(true);
    }
  }

  deleteTask(): void {
    this.modal.open(DeleteTaskComponent, [
      { name: 'task', value: this.task(), },
      { name: 'board', value: this.board() },
    ]);
  }

  setTaskColor(color: TaskColor): void {
    this.taskColor.set(color);
  }

  isSelectedTaskColor(color: TaskColor): boolean {
    return this.taskColor() === color;
  }

}
