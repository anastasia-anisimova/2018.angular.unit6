import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Task} from '../task';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  @Output()
  create: EventEmitter<Task> = new EventEmitter<Task>();
  taskForm: FormGroup;
  priorities: string[] = ['High', 'Middle', 'Low'];
  pr: [{ value: 'High', style: 'high' }, { value: 'Middle', style: 'middle' }];

  constructor() {
    this.taskForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      priority: new FormControl('Middle', [Validators.required]),
    });
  }

  ngOnInit() {
  }

  createTask() {
    if (this.taskForm.valid) {
      const value: {
        name: string,
        description: string,
        priority: string
      } = this.taskForm.value;
      const task = new Task(value.name, value.description, value.priority);
      this.taskForm.reset({
        name: '',
        description: '',
        priority: 'Middle'
      });
      this.create.emit(task);
    }
  }
}
