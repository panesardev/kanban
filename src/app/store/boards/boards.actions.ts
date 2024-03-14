import { Board, Task } from "../../types/board.interface";

export class AddBoard {
  static readonly type = '[BOARDS] add board';
  constructor(public board: Board) {}
}

export class UpdateBoard {
  static readonly type = '[BOARDS] update board';
  constructor(public board: Board) {}
}

export class DeleteBoard {
  static readonly type = '[BOARDS] delete board';
  constructor(public board: Board) {}
}

export class GetBoards {
  static readonly type = '[BOARDS] get boards';
}

export class SetBoards {
  static readonly type = '[BOARDS] set boards';
  constructor(public boards: Board[]) {}
}

export class AddTask {
  static readonly type = '[BOARDS] add task';
  constructor(public task: Task, public board: Board) {}
}
