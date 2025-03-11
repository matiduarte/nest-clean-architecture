import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import type { TodoService } from '../../application/services/todo.service';
import type {
  CreateTodoDto,
  TodoResponseDto,
  UpdateTodoDto,
} from '../../application/dtos/todo.dto';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllTodos(): Promise<TodoResponseDto[]> {
    return this.todoService.getAllTodos();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getTodoById(@Param('id') id: string): Promise<TodoResponseDto> {
    return this.todoService.getTodoById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createTodo(@Body() dto: CreateTodoDto): Promise<TodoResponseDto> {
    return this.todoService.createTodo(dto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateTodo(
    @Param('id') id: string,
    @Body() dto: UpdateTodoDto,
  ): Promise<TodoResponseDto> {
    return this.todoService.updateTodo(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTodo(@Param('id') id: string): Promise<void> {
    return this.todoService.deleteTodo(id);
  }
}
