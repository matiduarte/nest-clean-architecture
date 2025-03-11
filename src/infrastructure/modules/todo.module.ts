import { Module } from '@nestjs/common';
// Use relative paths for all imports to ensure correct resolution
import { TodoService } from '../../application/services/todo.service';
import { TODO_REPOSITORY } from '../../domain/ports/todo-repository.port';
import { InMemoryTodoRepository } from '../adapters/repositories/in-memory-todo.repository';
import { TodoController } from '../controllers/todo.controller';
import { HealthController } from '../controllers/health.controller';

@Module({
  controllers: [HealthController, TodoController],
  providers: [
    // Explicitly provide TodoService
    {
      provide: TodoService,
      useClass: TodoService,
    },
    // Provide the repository
    {
      provide: TODO_REPOSITORY,
      useClass: InMemoryTodoRepository,
    },
  ],
  exports: [TodoService],
})
export class TodoModule {}
