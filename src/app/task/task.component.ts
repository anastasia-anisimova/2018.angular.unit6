import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '../models/task';
import { BackendService } from '../backend.service';

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

  prioritiesName: string[] = ['High', 'Middle', 'Low'];
  priorities: number[] = [1, 2, 3];
  executors: string[] = ['Анисимова А.Н.', 'Иванов И.И.'];

  isEditTask = false;
  taskName: string;
  taskDescription: string;
  taskExecutor: string;
  taskPriority: number;

  constructor(private service: BackendService) {
  }

  ngOnInit() {
  }

  moveAhead() {
    this.moveTask.emit(this.task);
  }

  dropBack() {
    this.dropTask.emit(this.task);
  }

  deleteTask() {
    this.delTask.emit(this.task);
  }

  getStyleTask(): string {
    return 'style' + this.task.priority;
  }

  onEditStartTask() {
    this.isEditTask = true;
    this.taskName = this.task.name;
    this.taskDescription = this.task.description;
    this.taskExecutor = this.task.executor;
    this.taskPriority = this.task.priority;
  }

  onEditFinishTask() {
    this.isEditTask = false;
    this.task.name = this.taskName;
    this.task.description = this.taskDescription;
    this.task.executor = this.taskExecutor;
    this.task.priority = this.taskPriority;
    const updateTaskSubscription = this.service
      .updateTask(this.task)
      .subscribe(() => updateTaskSubscription.unsubscribe());
  }

  onEditCancelTask() {
    this.isEditTask = false;
  }

}
