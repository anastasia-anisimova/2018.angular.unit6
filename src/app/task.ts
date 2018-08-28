export class Task {
  title: string;
  priority = 1;

  constructor(title: string, priority: number) {
    this.title = title;
    this.priority = priority;
  }
}
