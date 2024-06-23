import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, inject, input } from '@angular/core';
import { derivedAsync } from 'ngxtension/derived-async';
import { TaskComponent } from '../../layout/components/task.component';
import { DeleteBoardComponent } from '../../layout/modals/boards/delete-board.component';
import { UpdateBoardComponent } from '../../layout/modals/boards/update-board.component';
import { AddTaskComponent } from '../../layout/modals/tasks/add-task.component';
import { DeleteTaskComponent } from '../../layout/modals/tasks/delete-task.component';
import { UpdateTaskComponent } from '../../layout/modals/tasks/update-task.component';
import { BoardsService } from '../../services/boards.service';
import { ModalService } from '../../services/modal.service';
import { Task } from '../../types/task.interface';

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
export class BoardComponent {
  private boardsService = inject(BoardsService);
  private modal = inject(ModalService);

  id = input.required<string>();

  board = derivedAsync(() => this.boardsService.find(this.id()));

  async drop(e: CdkDragDrop<Task[]>) {
    if (e.previousContainer === e.container) {
      moveItemInArray(e.container.data, e.previousIndex, e.currentIndex);
    }
    else {
      transferArrayItem(
        e.previousContainer.data,
        e.container.data,
        e.previousIndex,
        e.currentIndex,
      );
    }

    const previousContainerId = e.previousContainer.element.nativeElement.id;
    const containerId = e.container.element.nativeElement.id;

    // from planned to ongoing
    if (previousContainerId === 'planned' && containerId === 'ongoing') {
      this.board().planned = e.previousContainer.data;
      this.board().ongoing = e.container.data;
    }
    // from planned to completed
    if (previousContainerId === 'planned' && containerId === 'completed') {
      this.board().planned = e.previousContainer.data;
      this.board().completed = e.container.data;
    }
    // from ongoing to planned
    if (previousContainerId === 'ongoing' && containerId === 'planned') {
      this.board().ongoing = e.previousContainer.data;
      this.board().planned = e.container.data;
    }
    // from ongoing to completed
    if (previousContainerId === 'ongoing' && containerId === 'completed') {
      this.board().ongoing = e.previousContainer.data;
      this.board().completed = e.container.data;
    }
    // from completed to planned
    if (previousContainerId === 'completed' && containerId === 'planned') {
      this.board().completed = e.previousContainer.data;
      this.board().planned = e.container.data;
    }
    // from completed to ongoing
    if (previousContainerId === 'completed' && containerId === 'ongoing') {
      this.board().completed = e.previousContainer.data;
      this.board().ongoing = e.container.data;
    }

    await this.boardsService.update(this.board());
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
