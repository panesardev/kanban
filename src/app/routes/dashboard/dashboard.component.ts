import { Component, inject } from '@angular/core';
import { computedAsync } from 'ngxtension/computed-async';
import { BoardListComponent } from '../../layout/components/board-list.component';
import { AddBoardComponent } from '../../layout/modals/boards/add-board.component';
import { DeleteBoardComponent } from '../../layout/modals/boards/delete-board.component';
import { BoardsService } from '../../services/boards.service';
import { ModalService } from '../../services/modal.service';
import { Board } from '../../types/board.interface';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    BoardListComponent,
  ],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  private boardsService = inject(BoardsService);
  private modal = inject(ModalService);

  boards = computedAsync(() => this.boardsService.boards$);

  openAddBoard() {
    this.modal.open(AddBoardComponent);
  }

  openDeleteBoard(board: Board) {
    this.modal.open(DeleteBoardComponent, [{ name: 'board', value: board }]);
  } 

}
