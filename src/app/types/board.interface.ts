import { createId } from "@paralleldrive/cuid2";
import { Task } from './task.interface';

export interface Board {
  id: string;
  title: string;
  createdAt: string;
  planned: Task[];
  ongoing: Task[];
  completed: Task[];
}

export function createBoard(title: string): Board {
  return {
    id: createId(),
    title,
    createdAt: new Date().toDateString().slice(3),
    ongoing: [],
    planned: [],
    completed: [],
  };
}
