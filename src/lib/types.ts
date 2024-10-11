export enum Priority {
  Low = 'Low',
  High = 'High',
  None = 'None'
}

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  priority: Priority
}

export interface TodoList {
  id: number;
  title: string;
  todos: Todo[];
}
