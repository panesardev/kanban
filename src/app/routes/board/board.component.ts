import { Component, inject, input } from '@angular/core';
import { computedAsync } from 'ngxtension/computed-async';
import { map } from 'rxjs';
import { DeleteBoardComponent } from '../../layout/modals/boards/delete-board.component';
import { UpdateBoardComponent } from '../../layout/modals/boards/update-board.component';
import { AddTaskComponent } from '../../layout/modals/tasks/add-task.component';
import { DeleteTaskComponent } from '../../layout/modals/tasks/delete-task.component';
import { UpdateTaskComponent } from '../../layout/modals/tasks/update-task.component';
import { AuthService } from '../../services/auth.service';
import { ModalService } from '../../services/modal.service';
import { Task } from '../../types/board.interface';
import { TaskComponent } from '../../layout/components/task.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    TaskComponent,
  ],
  templateUrl: './board.component.html',
})
export default class BoardComponent {
  private auth = inject(AuthService);
  private modal = inject(ModalService);

  id = input.required<string>();

  board = computedAsync(() => 
    this.auth.user$.pipe(
      map(user => user.boards),
      map(boards => boards.find(b => b.id === this.id())),
    ),
  );

  openAddTask() {
    this.modal.open(AddTaskComponent, [{ name: 'board', value: this.board() }]);
  }

  openUpdateTask(task: Task) {
    this.modal.open(UpdateTaskComponent, [
      { name: 'board', value: this.board() },
      { name: 'task', value: task },
    ]);
  }
  
  openDeleteTask(task: Task) {
    this.modal.open(DeleteTaskComponent, [
      { name: 'board', value: this.board() },
      { name: 'task', value: task },
    ]);
  }

  openDeleteBoard() {
    this.modal.open(DeleteBoardComponent, [{ name: 'board', value: this.board() }]);
  }
  
  openUpdateBoard() {
    this.modal.open(UpdateBoardComponent, [{ name: 'board', value: this.board() }]);
  }

  styleTask(task: Task) {
    switch(task.color) {
      case 'red': return 'bg-red-50 text-red-500';
      case 'blue': return 'bg-blue-50 text-blue-500';
      case 'purple': return 'bg-purple-50 text-purple-500';
      case 'emerald': return 'bg-emerald-50 text-emerald-500';
      case 'amber': return 'bg-amber-50 text-amber-500';
    }
  }

}
