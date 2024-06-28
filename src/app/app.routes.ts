import { Routes } from '@angular/router';
import { AuthGuard } from './utilities/auth.guard';
import { BoardTitleResolver, TitleResolver } from './utilities/title.resolver';
import IndexComponent from './routes/index/index.component';

export const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    title: TitleResolver,
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./routes/dashboard/dashboard.component'),
    title: TitleResolver,
    canActivate: [AuthGuard],
  },
  {
    path: 'board/:id',
    loadComponent: () => import('./routes/board/board.component'),
    title: BoardTitleResolver,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full',
  }
];

