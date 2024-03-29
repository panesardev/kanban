import { Injectable, inject } from "@angular/core";
import { firstValueFrom, map } from "rxjs";
import { Board } from "../types/board.interface";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class BoardsService {
  private auth = inject(AuthService);
  private router = inject(Router);

  boards$ = this.auth.user$.pipe(
    map(user => user.boards),
  );

  find(id: string) {
    return this.boards$.pipe(
      map(boards => boards.find(b => b.id === id)),
    );
  }

  private async setBoards(boards: Board[]) {
    const user = await firstValueFrom(this.auth.user$);
    await this.auth.setUser(user.uid, { boards });
  }

  async add(board: Board) {
    let boards = await firstValueFrom(this.boards$);
    boards = [...boards, board];
    await this.setBoards(boards);
    await this.router.navigateByUrl(`/board/${board.id}`);
  }

  async update(board: Board) {
    let boards = await firstValueFrom(this.boards$);
    const index = boards.findIndex(b => b.id === board.id);
    boards[index] = board;
    await this.setBoards(boards);
  }

  async delete(board: Board) {
    let boards = await firstValueFrom(this.boards$);
    boards = boards.filter(b => b.id !== board.id);
    await this.setBoards(boards);
  }
}