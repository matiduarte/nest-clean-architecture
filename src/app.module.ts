import { Module } from '@nestjs/common';
import { TodoModule } from './infrastructure/modules/todo.module';

@Module({
  imports: [TodoModule],
})
export class AppModule {}
