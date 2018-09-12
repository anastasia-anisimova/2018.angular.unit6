import { Task } from './task';

export class Stage {
    id: number;
    description: string;
    boardId = 1;
    name: string;
    tasks: Task[] = [];

    constructor(name: string) {
        this.name = name;
    }
}