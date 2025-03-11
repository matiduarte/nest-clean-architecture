export class Todo {
  constructor(
    public id: string,
    public title: string,
    public completed = false,
    public createdAt: Date = new Date(),
  ) {}

  complete(): void {
    this.completed = true;
  }
  uncomplete(): void {
    this.completed = false;
  }

  update(title: string): void {
    this.title = title;
  }
}
