import { Injectable, inject } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { BoardsService } from "../../services/boards.service";
import { Board } from "../../types/board.interface";
import { AddBoard, AddTask, DeleteBoard, DeleteTask, GetBoards, SetBoards, UpdateBoard, UpdateTask } from "./boards.actions";

type BoardsStateType = Board[];

const initial: BoardsStateType = [];

@State({
  name: 'boards',
  defaults: initial,
})
@Injectable()
export class BoardsState {
  private boardsService = inject(BoardsService);

  ngxsOnInit(ctx: StateContext<BoardsStateType>) {
    ctx.dispatch(new GetBoards());
  }

  @Action(GetBoards)
  getBoards(ctx: StateContext<BoardsStateType>) {
    return this.boardsService.getBoards().pipe(
      tap(boards => ctx.setState(boards)),
    );
  }
  
  @Action(SetBoards)
  async setBoards(ctx: StateContext<BoardsStateType>, action: SetBoards) {
    ctx.setState(action.boards);
    await this.boardsService.setBoards(action.boards);
  }

  @Action(AddBoard)
  addBoard(ctx: StateContext<BoardsStateType>, action: AddBoard) {
    const boards = ctx.getState();
    const nextBoards = [...boards, action.board];

    ctx.dispatch(new SetBoards(nextBoards));
  }
  
  @Action(UpdateBoard)
  updateBoard(ctx: StateContext<BoardsStateType>, action: UpdateBoard) {
    const boards = ctx.getState();
    const index = boards.findIndex(b => b.id === action.board.id);
    boards[index] = action.board;

    ctx.dispatch(new SetBoards(boards));
  }

  @Action(DeleteBoard)
  deleteBoard(ctx: StateContext<BoardsStateType>, action: DeleteBoard) {
    const boards = ctx.getState();
    const nextBoards = boards.filter(b => b.id !== action.board.id);

    ctx.dispatch(new SetBoards(nextBoards));
  }

  /// tasks ///

  @Action(AddTask)
  addTask(ctx: StateContext<BoardsStateType>, action: AddTask) {
    const boards = ctx.getState();
    boards.find(b => b.id === action.board.id).planned.push(action.task);

    ctx.dispatch(new SetBoards(boards));
  }

  @Action(UpdateTask)
  updateTask(ctx: StateContext<BoardsStateType>, action: UpdateTask) {
    const boards = ctx.getState();
    const boardIndex = boards.findIndex(b => b.id === action.board.id);
    // update task if task is found in planned array
    if (boards[boardIndex].planned.find(t => t.id === action.task.id)) {
      const taskIndex = boards[boardIndex].planned.findIndex(t => t.id === action.task.id);
      boards[boardIndex].planned[taskIndex] = action.task;
    }
    // update task if task is found in ongoing array
    if (boards[boardIndex].ongoing.find(t => t.id === action.task.id)) {
      const taskIndex = boards[boardIndex].ongoing.findIndex(t => t.id === action.task.id);
      boards[boardIndex].ongoing[taskIndex] = action.task;
    }
    // update task if task is found in completed array
    if (boards[boardIndex].completed.find(t => t.id === action.task.id)) {
      const taskIndex = boards[boardIndex].completed.findIndex(t => t.id === action.task.id);
      boards[boardIndex].completed[taskIndex] = action.task;
    }

    ctx.dispatch(new SetBoards(boards));
  }
  
  @Action(DeleteTask)
  deleteTask(ctx: StateContext<BoardsStateType>, action: DeleteTask) {
    const boards = ctx.getState();
    const index = boards.findIndex(b => b.id === action.board.id);
    // remove task from each array
    boards[index].planned = boards[index].planned.filter(t => t.id !== action.task.id);
    boards[index].ongoing = boards[index].ongoing.filter(t => t.id !== action.task.id);
    boards[index].completed = boards[index].completed.filter(t => t.id !== action.task.id);

    ctx.dispatch(new SetBoards(boards));
  }

}