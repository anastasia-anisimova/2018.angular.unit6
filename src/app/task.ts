export class Task {
  title: string;
  description: string;
  priority: string;

  constructor(title: string, description: string, priority: string) {
    this.title = title;
    this.description = description;
    this.priority = priority;
  }
}
