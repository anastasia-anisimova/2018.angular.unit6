import {Task} from './task';

export class Stage {
  name: string;
  tasks: Task[] = [];

  constructor(name: string) {
    this.name = name;
  }
}

export const Stages: Stage[] = [new Stage('To Do'), new Stage('In Progress'), new Stage('Done')];
