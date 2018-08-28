import {Task} from './task';

export class Stage {
  name: string;
  tasks: Task[] = [];

  constructor(name: string) {
    this.name = name;
  }
}

export const Stages: Stage[] = [new Stage('План'), new Stage('В работе'), new Stage('Готово')];
