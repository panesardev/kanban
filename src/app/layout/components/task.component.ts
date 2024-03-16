import { Component, input, output } from '@angular/core';
import { Task } from '../../types/board.interface';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [],
  template: `
    <div class="{{ styleTask(task()) }} px-4 py-3 rounded cursor-move" (click)="onUpdate.emit(task())">{{ task().text }}</div>
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
      case 'purple': return 'bg-purple-50 text-purple-600 border-2 border-purple-500';
      case 'emerald': return 'bg-emerald-50 text-emerald-600 border-2 border-emerald-500';
      case 'amber': return 'bg-amber-50 text-amber-600 border-2 border-amber-500';
    }
  }
}
