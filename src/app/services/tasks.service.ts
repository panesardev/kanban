import { inject, Injectable } from '@angular/core';
import { Board } from '../types/board.interface';
import { BoardsService } from './boards.service';
import { Task } from '../types/task.interface';

@Injectable({ providedIn: 'root' })
export class TasksService {
  private boardsService = inject(BoardsService);

  async add(task: Task, board: Board) {
    board.planned = [...board.planned, task];
    await this.boardsService.update(board);
  }
  
  async update(task: Task, board: Board) {
    // update task if task is found in planned array
    if (board.planned.find(t => t.id === task.id)) {
      const taskIndex = board.planned.findIndex(t => t.id === task.id);
      board.planned[taskIndex] = task;
    }
    // update task if task is found in ongoing array
    if (board.ongoing.find(t => t.id === task.id)) {
      const taskIndex = board.ongoing.findIndex(t => t.id === task.id);
      board.ongoing[taskIndex] = task;
    }
    // update task if task is found in completed array
    if (board.completed.find(t => t.id === task.id)) {
      const taskIndex = board.completed.findIndex(t => t.id === task.id);
      board.completed[taskIndex] = task;
    }

    await this.boardsService.update(board);
  }
  
  async delete(task: Task, board: Board) {
    // remove task from each array
    board.planned = board.planned.filter(t => t.id !== task.id);
    board.ongoing = board.ongoing.filter(t => t.id !== task.id);
    board.completed = board.completed.filter(t => t.id !== task.id);

    await this.boardsService.update(board);
  }

}
