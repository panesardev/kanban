import { Component, input, output } from '@angular/core';
import { Task } from '../../types/board.interface';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [],
  template: `
    <div class="{{ styleTask(task()) }} flex justify-between gap-4 px-4 py-3 rounded cursor-pointer">
      <div (click)="onUpdate.emit(task())">{{ task().text }}</div>
      <button (click)="onDelete.emit(task())">
        <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="25" height="25"><path d="M18,6h0a1,1,0,0,0-1.414,0L12,10.586,7.414,6A1,1,0,0,0,6,6H6A1,1,0,0,0,6,7.414L10.586,12,6,16.586A1,1,0,0,0,6,18H6a1,1,0,0,0,1.414,0L12,13.414,16.586,18A1,1,0,0,0,18,18h0a1,1,0,0,0,0-1.414L13.414,12,18,7.414A1,1,0,0,0,18,6Z"/></svg>
      </button>
    </div>
  `,  
})
export class TaskComponent {
  task = input.required<Task>();
  onUpdate = output<Task>();
  onDelete = output<Task>();

  styleTask(task: Task) {
    switch(task.color) {
      case 'red': return 'bg-red-50 text-red-600 border-2 border-red-500';
      case 'blue': return 'bg-blue-50 text-blue-600 border-2 border-blue-500';
      case 'purple': return 'bg-violet-50 text-violet-600 border-2 border-violet-500';
      case 'emerald': return 'bg-emerald-50 text-emerald-600 border-2 border-emerald-500';
      case 'amber': return 'bg-amber-50 text-amber-600 border-2 border-amber-500';
    }
  }
}
