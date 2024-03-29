import { Routes } from '@angular/router';
import { AuthGuard } from './utilities/auth.guard';
import { BoardTitleResolver, TitleResolver } from './utilities/title.resolver';
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
    canActivate: [AuthGuard],
  },
  {
    path: 'board/:id',
    component: BoardComponent,
    title: BoardTitleResolver,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full',
  }
];

