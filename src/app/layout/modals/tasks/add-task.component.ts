import { Component, inject, input, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { computedAsync } from 'ngxtension/computed-async';
import { distinctUntilChanged, tap } from 'rxjs';
import { TasksService } from '../../../services/tasks.service';
import { Board, TaskColor, createTask } from '../../../types/board.interface';
import { Modal } from '../../../types/modal.class';
import { BaseModalComponent } from '../base-modal.component';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [
    BaseModalComponent,
    ReactiveFormsModule,
  ],
  template: `
    <app-base-modal heading="Add task" classes="max-w-md">
      <div class="grid gap-2 mb-4">
        <label>enter task</label>
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
      <div class="grid">
        <button class="btn primary px-6" (click)="addTask()">Add task</button>
      </div>
    </app-base-modal>
  `,
})
export class AddTaskComponent extends Modal {
  private tasksService = inject(TasksService);

  board = input.required<Board>();

  textControl = new FormControl('');

  text = computedAsync(() => 
    this.textControl.valueChanges.pipe(
      distinctUntilChanged(),
      tap(title => this.hasError.set(title ? false : true)),
    ),
  );

  hasError = signal<boolean>(false);
  taskColor = signal<TaskColor>('red');

  async addTask() {
    if (this.textControl.value) {
      const task = createTask({ text: this.text(), color: this.taskColor() });
      await this.tasksService.add(task, this.board());
      this.modal.close();
    }
    else {
      this.hasError.set(true);
    }
  }

  setTaskColor(color: TaskColor): void {
    this.taskColor.set(color);
  }

  isSelectedTaskColor(color: TaskColor): boolean {
    return this.taskColor() === color;
  }

}
