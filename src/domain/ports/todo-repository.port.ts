import type { Todo } from '../entities/todo.entity';

export interface TodoRepositoryPort {
  findAll(): Promise<Todo[]>;
  findById(id: string): Promise<Todo | null>;
  create(todo: Todo): Promise<Todo>;
  update(todo: Todo): Promise<Todo>;
  delete(id: string): Promise<void>;
}

// Add this token for dependency injection
export const TODO_REPOSITORY = 'TODO_REPOSITORY';
