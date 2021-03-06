import { Component, EventEmitter, OnDestroy, Input, OnInit, Output } from '@angular/core';
import { Stage } from '../models/stage';
import { Task } from '../models/task';
import { BackendService } from '../backend.service';
import { Subject, Subscription } from 'rxjs';
import { repeatWhen } from 'rxjs/operators';

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.css']
})
export class StageComponent implements OnInit, OnDestroy {

  @Input()
  dropEnabled: boolean;
  @Input()
  stage: Stage;
  @Input()
  task: Task;
  @Input()
  moveEnabled: boolean;
  @Output()
  moveTask: EventEmitter<Task> = new EventEmitter<Task>();
  @Output()
  dropTask: EventEmitter<Task> = new EventEmitter<Task>();


  refreshStage = new Subject();
  getTasksByStageSubscription: Subscription;


  isEditStage = false;
  isEditTask = false;
  stageName: string;
  taskName: string;
  isAddStage = false;

  constructor(private service: BackendService) {
  }

  ngOnInit() {
    this.getTasksByStageSubscription = this.service
      .getTasksByStage(this.stage.id)
      .pipe(repeatWhen(() => this.refreshStage))
      .subscribe((tasks: Task[]) => this.stage.tasks = tasks);
  }

  addTask(task: Task) {
    task.stageId = this.stage.id;
    const newTaskSubscription = this.service
      .createNewTask(task)
      .subscribe(() => {
        this.refreshStage.next();
        newTaskSubscription.unsubscribe();
      });
  }

  deleteTask(task: Task) {
    const deleteTaskSubscription = this.service
      .deleteTask(task.id)
      .subscribe(() => {
        this.refreshStage.next();
        deleteTaskSubscription.unsubscribe();
      })
  }

  filterTasks(event: Task, eventEmit?: EventEmitter<Task>) {
    this.stage.tasks = this.stage.tasks.filter(value => value !== event);
    eventEmit.emit(event);
  }

  onTaskMoved(event: Task) {
    this.filterTasks(event, this.moveTask);
  }

  ngOnDestroy(): void {
    this.getTasksByStageSubscription.unsubscribe();
  }
  
  onTaskDrop(event: Task) {
    this.filterTasks(event, this.dropTask);
  }
}
