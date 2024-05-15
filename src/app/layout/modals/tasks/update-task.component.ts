import { Component, effect, inject, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TasksService } from '../../../services/tasks.service';
import { Board } from '../../../types/board.interface';
import { Modal } from '../../../types/modal.class';
import { BaseModalComponent } from '../base-modal.component';
import { Task, TaskColor } from '../../../types/task.interface';

@Component({
  selector: 'app-update-task',
  standalone: true,
  imports: [
    BaseModalComponent,
    ReactiveFormsModule,
  ],
  template: `
    <app-base-modal heading="Update task" width="max-w-md">
      <form [formGroup]="taskForm" (submit)="updateTask()">
        <div class="grid gap-2 mb-4">
          <label class="{{ taskForm.invalid ? 'text-red-500' : '' }}">enter task</label>
          <input type="text" formControlName="text" placeholder="type here" class="border-2 rounded px-4 py-3">
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
          <button class="btn {{ taskForm.invalid ? 'disabled' : 'primary' }} px-6" type="submit" [disabled]="taskForm.invalid">Update task</button>
        </div>
      </form>
    </app-base-modal>
  `,
})
export class UpdateTaskComponent extends Modal {
  private tasksService = inject(TasksService);

  board = input.required<Board>();
  task = input.required<Task>();

  taskForm = new FormGroup({
    text: new FormControl<string>('', Validators.required),
    color: new FormControl<TaskColor>('red', Validators.required),
  });

  setTaskForm = effect(() =>
    this.taskForm.setValue({ 
      text: this.task().text,
      color: this.task().color,
    })
  );
  
  async updateTask() {
    if (this.taskForm.valid) {
      const task: Task = { 
        ...this.task(), 
        text: this.taskForm.value.text,
        color: this.taskForm.value.color,
      };
      await this.tasksService.update(task, this.board());
      this.modal.close();
    }
  }

  setTaskColor(color: TaskColor): void {
    this.taskForm.value.color = color;
  }

  isSelectedTaskColor(color: TaskColor): boolean {
    return this.taskForm.value.color === color;
  }

}
