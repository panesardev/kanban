import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { map } from "rxjs";
import { AuthService } from "../services/auth.service";

export const titleResolver: ResolveFn<string> = (route: ActivatedRouteSnapshot) => {
  const path = route.routeConfig?.path;

  let title: string = `Home`;

  if (path) {
    title = path[0].toUpperCase() + path.slice(1, path.length);
  }

  return `${title} - Kanban`;
}

export const boardTitleResolver = (route: ActivatedRouteSnapshot) => {
  const auth = inject(AuthService);
  const boardId = route.paramMap.get('id');
  
  return auth.user$.pipe(
    map(user => user.boards),
    map(boards => boards.find(b => b.id === boardId)),
    map(board => `${board.title} - Kanban`),
  );
}