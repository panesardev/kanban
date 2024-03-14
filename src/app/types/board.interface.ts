import { v4 as uuid } from 'uuid';

export interface Board {
  id: string;
  title: string;
  createdAt: string;
  planned: Task[];
  ongoing: Task[];
  completed: Task[];
}

export interface Task {
  id: string;
  color: TaskColor;
  text: string;
}

export enum TaskColor {
  RED,
  BLUE,
  PURPLE,
  GREEN,
  CYAN,
}

export function createBoard(title: string): Board {
  return {
    id: uuid(),
    title,
    createdAt: new Date().toDateString().slice(3),
    ongoing: [],
    planned: [],
    completed: [],
  };
}

export function createTask(text: string): Task {
  return {
    id: uuid(),
    text,
    color: TaskColor.BLUE,
  }
}
