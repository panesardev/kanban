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

export type TaskColor = 'red' | 'blue' | 'purple' | 'emerald' | 'amber';

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

export function createTask(task: Partial<Task>): Task {
  return {
    id: uuid(),
    text: task.text,
    color: task.color,
  }
}
