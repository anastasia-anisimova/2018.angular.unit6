import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Stage} from '../stage';
import {Task} from '../task';

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.css']
})
export class StageComponent implements OnInit {

  @Input()
  stage: Stage;
  taskName: string;

  @Output()
  moveTask: EventEmitter<Task> = new EventEmitter<Task>();

  constructor() {

  }

  ngOnInit() {
  }

  createTask() {
    this.stage.tasks.push(new Task(this.taskName, 1));
    this.taskName = '';
  }

  onTaskMoved($event: Task) {
    this.stage.tasks = this.stage.tasks.filter(value => value !== $event);
    this.moveTask.emit($event);
  }
}
