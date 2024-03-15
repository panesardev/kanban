import { Injectable, inject } from "@angular/core";
import { catchError, first, firstValueFrom, map, of, switchMap } from "rxjs";
import { Board } from "../types/board.interface";
import { AuthService } from "./auth.service";

@Injectable({ providedIn: 'root' })
export class BoardsService {
  private auth = inject(AuthService);

  getBoards() {
    return this.auth.user$.pipe(
      first(),
      map(user => user.boards),
      catchError(() => of([])),
    );
  }

  async setBoards(boards: Board[]) {
    const user = await firstValueFrom(this.auth.user$);
    await this.auth.setUser(user.uid, { boards });
  }

}