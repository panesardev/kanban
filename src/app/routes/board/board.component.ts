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
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    CdkDrag,
    CdkDropList, 
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

  drop(event: CdkDragDrop<Task[]>, tasks: Task[]) {
    moveItemInArray(tasks, event.previousIndex, event.currentIndex);
  }

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

}
