import { Injectable, inject } from "@angular/core";
import { Action, NgxsOnChanges, NgxsSimpleChange, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { BoardsService } from "../../services/boards.service";
import { Board } from "../../types/board.interface";
import { AddBoard, DeleteBoard, GetBoards, SetBoards, UpdateBoard } from "./boards.actions";

type BoardsStateType = Board[];

const initial: BoardsStateType = [];

@State({
  name: 'boards',
  defaults: initial,
})
@Injectable()
export class BoardsState implements NgxsOnChanges {
  private boardsService = inject(BoardsService);

  ngxsOnInit(ctx: StateContext<BoardsStateType>) {
    ctx.dispatch(new GetBoards());
  }

  ngxsOnChanges(change: NgxsSimpleChange<BoardsStateType>): void {
    console.log(change.currentValue);
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

    ctx.setState(nextBoards);
    ctx.dispatch(new SetBoards(nextBoards));
  }
  
  @Action(UpdateBoard)
  updateBoard(ctx: StateContext<BoardsStateType>, action: UpdateBoard) {
    const boards = ctx.getState();
    const index = boards.findIndex(b => b.id === action.board.id);
    boards[index] = action.board;

    ctx.setState(boards);
    ctx.dispatch(new SetBoards(boards));
  }

  @Action(DeleteBoard)
  deleteBoard(ctx: StateContext<BoardsStateType>, action: DeleteBoard) {
    const boards = ctx.getState();
    const nextBoards = boards.filter(b => b.id !== action.board.id);

    ctx.setState(nextBoards);
    ctx.dispatch(new SetBoards(nextBoards));
  }

}