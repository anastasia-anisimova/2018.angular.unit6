export class Task {
    id: number;
    name: string;
    description: string;
    executor: string;
    priority: number;
    stageId: number;

    constructor(title: string,
        description: string,
        executor: string, priority: number) {
        this.name = title;
        this.description = description;
        this.executor = executor;
        this.priority = priority;
    }
}

