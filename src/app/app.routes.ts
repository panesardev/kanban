import { Routes } from '@angular/router';
import { authGuard } from './utilities/auth.guard';
import { titleResolver, boardTitleResolver } from './utilities/title.resolver';

export const routes: Routes = [
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
    path: 'auth',
    loadComponent: () => import('./routes/auth/auth.component'),
    title: titleResolver,
  },
  {
    path: '**',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  }
];
