export class CreateTodoDto {
  title: string;
}

export class UpdateTodoDto {
  title?: string;
  completed?: boolean;
}

export class TodoResponseDto {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}
