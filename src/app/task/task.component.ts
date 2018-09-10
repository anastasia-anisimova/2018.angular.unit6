import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Task} from '../task';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @Input()
  task: Task;
  @Input()
  dropEnabled: boolean;
  @Input()
  moveEnabled: boolean;
  @Output()
  moveTask: EventEmitter<Task> = new EventEmitter<Task>();
  @Output()
  dropTask: EventEmitter<Task> = new EventEmitter<Task>();
  @Output()
  delTask: EventEmitter<Task> = new EventEmitter<Task>();

  constructor() {
  }

  ngOnInit() {
  }

  moveAhead() {
    this.moveTask.emit(this.task);
  }

  dropBack() {
    this.dropTask.emit(this.task);
  }

  delete() {
    this.delTask.emit(this.task);
  }

  getStyleTask(): string {
    if (this.moveEnabled) {
      return this.task.priority.toLowerCase();
    }
    return 'done';
  }
}
