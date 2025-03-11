import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Todo } from '../../domain/entities/todo.entity';
import {
  TODO_REPOSITORY,
  type TodoRepositoryPort,
} from '../../domain/ports/todo-repository.port';
import type {
  CreateTodoDto,
  TodoResponseDto,
  UpdateTodoDto,
} from '../dtos/todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @Inject(TODO_REPOSITORY)
    private readonly todoRepository: TodoRepositoryPort,
  ) {}

  async getAllTodos(): Promise<TodoResponseDto[]> {
    const todos = await this.todoRepository.findAll();
    return todos.map(this.mapToDto);
  }

  async getTodoById(id: string): Promise<TodoResponseDto> {
    const todo = await this.todoRepository.findById(id);
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return this.mapToDto(todo);
  }

  async createTodo(dto: CreateTodoDto): Promise<TodoResponseDto> {
    const todo = new Todo(uuidv4(), dto.title);
    const savedTodo = await this.todoRepository.create(todo);
    return this.mapToDto(savedTodo);
  }

  async updateTodo(id: string, dto: UpdateTodoDto): Promise<TodoResponseDto> {
    const todo = await this.todoRepository.findById(id);
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }

    if (dto.title !== undefined) {
      todo.update(dto.title);
    }

    if (dto.completed !== undefined) {
      if (dto.completed) {
        todo.complete();
      } else {
        todo.uncomplete();
      }
    }

    const updatedTodo = await this.todoRepository.update(todo);
    return this.mapToDto(updatedTodo);
  }

  async deleteTodo(id: string): Promise<void> {
    const todo = await this.todoRepository.findById(id);
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    await this.todoRepository.delete(id);
  }

  private mapToDto(todo: Todo): TodoResponseDto {
    return {
      id: todo.id,
      title: todo.title,
      completed: todo.completed,
      createdAt: todo.createdAt,
    };
  }
}
