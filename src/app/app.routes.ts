import { Routes } from '@angular/router';
import { authGuard } from './utilities/auth.guard';
import { TitleResolver, BoardTitleResolver } from './utilities/title.resolver';
import { IndexComponent } from './routes/index/index.component';
import { DashboardComponent } from './routes/dashboard/dashboard.component';
import { BoardComponent } from './routes/board/board.component';

export const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    title: TitleResolver,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    title: TitleResolver,
    canActivate: [authGuard],
  },
  {
    path: 'board/:id',
    component: BoardComponent,
    title: BoardTitleResolver,
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full',
  }
];

