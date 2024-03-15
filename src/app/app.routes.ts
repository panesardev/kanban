import { Routes } from '@angular/router';
import { authGuard } from './utilities/auth.guard';
import { titleResolver, boardTitleResolver } from './utilities/title.resolver';
import IndexComponent from './routes/index/index.component';

export const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    title: titleResolver,
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./routes/dashboard/dashboard.component'),
    title: titleResolver,
    canActivate: [authGuard],
  },
  {
    path: 'dashboard/:id',
    loadComponent: () => import('./routes/board/board.component'),
    title: boardTitleResolver,
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full',
  }
];
