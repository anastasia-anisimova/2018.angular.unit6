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

  @Output()
  moveTask: EventEmitter<Task> = new EventEmitter<Task>();

  constructor() {
  }

  ngOnInit() {
  }

  moveAhead() {
    this.moveTask.emit(this.task);
  }
}
