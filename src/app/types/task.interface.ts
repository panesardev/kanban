import { createId } from "@paralleldrive/cuid2";

export interface Task {
  id: string;
  color: TaskColor;
  text: string;
}

export type TaskColor = 'red' | 'blue' | 'purple' | 'emerald' | 'amber';

export function createTask(task: Partial<Task>): Task {
  return {
    id: createId(),
    text: task.text,
    color: task.color,
  }
}
