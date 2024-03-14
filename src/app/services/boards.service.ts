import { Injectable, inject } from "@angular/core";
import { first, firstValueFrom, map, switchMap } from "rxjs";
import { Board } from "../types/board.interface";
import { AuthService } from "./auth.service";

@Injectable({ providedIn: 'root' })
export class BoardsService {
  private auth = inject(AuthService);

  getBoards() {
    return this.auth.user$.pipe(
      first(),
      map(user => user.boards),
    );
  }

  async setBoards(boards: Board[]) {
    const user = await firstValueFrom(this.auth.user$);
    await this.auth.setUser(user.uid, { boards });
  }

}