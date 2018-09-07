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
  dropEnabled: boolean;
  @Input()
  stage: Stage;
  @Input()
  moveEnabled: boolean;
  @Output()
  moveTask: EventEmitter<Task> = new EventEmitter<Task>();
  @Output()
  dropTask: EventEmitter<Task> = new EventEmitter<Task>();

  constructor() {
  }

  ngOnInit() {
  }

  createTask(task: Task) {
    this.stage.tasks.push(task);
  }

  filterTasks($event: Task, eventEmit?: EventEmitter<Task>) {
    this.stage.tasks = this.stage.tasks.filter(value => value !== $event);
    eventEmit.emit($event);
  }

  onTaskMoved($event: Task) {
    this.filterTasks($event, this.moveTask);
  }

  onTaskDrop($event: Task) {
    this.filterTasks($event, this.dropTask);
  }

  onTaskDelete($event: Task) {
    this.filterTasks($event);
  }
}
