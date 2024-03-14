import { Component, inject } from '@angular/core';
import { computedAsync } from 'ngxtension/computed-async';
import { BoardListComponent } from '../../layout/components/board-list.component';
import { AuthService } from '../../services/auth.service';
import { Board } from '../../types/board.interface';
import { ModalService } from '../../services/modal.service';
import { UpdateBoardComponent } from '../../layout/modals/boards/update-board.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    BoardListComponent,
  ],
  templateUrl: './dashboard.component.html',
})
export default class DashboardComponent {
  private auth = inject(AuthService);
  private modal = inject(ModalService);

  user = computedAsync(() => this.auth.user$);

  openUpdateBoard(board: Board) {
    this.modal.open(UpdateBoardComponent, [{ name: 'board', value: board }]);
  } 

}
