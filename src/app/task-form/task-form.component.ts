import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Task } from '../models/task';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  @Output()
  create: EventEmitter<Task> = new EventEmitter<Task>();

  taskForm: FormGroup;

  executors: string[] = ['Анисимова А.Н.', 'Иванов И.И.'];
  priorities: number[] = [1, 2, 3];
  prioritiesName: string[] = ['High', 'Middle', 'Low'];

  constructor() {
    this.taskForm = new FormGroup({
      taskName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      taskDescription: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      executorName: new FormControl(this.executors[0]),
      taskPriority: new FormControl(2, [Validators.required]),
    });
  }

  ngOnInit() {
  }

  createTask() {
    if (this.taskForm.invalid) {
      return;
    }
    const value = this.taskForm.value;
    const task = new Task(value.taskName, value.taskDescription,
      value.executorName, value.taskPriority);
    this.create.emit(task);
    this.taskForm.reset({
      taskName: '',
      taskDescription: '',
      executorName: this.executors[1],
      taskPriority: 2
    })
  }
}
