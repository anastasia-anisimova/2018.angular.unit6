import { Component, OnDestroy, OnInit } from '@angular/core';
import { Stage } from '../models/stage';
import { Task } from '../models/task';
import { BackendService } from '../backend.service';
import { Subject, Subscription } from 'rxjs';
import { repeatWhen } from 'rxjs/operators';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit, OnDestroy {

  stages: Stage[];
  getStagesSubscription: Subscription;
  refreshStage = new Subject();
  stageName: string;
  isError = false;

  constructor(private service: BackendService) {
  }

  ngOnInit() {
    this.getStagesSubscription = this.service
      .getStages()
      .pipe(repeatWhen(() => this.refreshStage))
      .subscribe((stages: Stage[]) => this.stages = stages);
  }

  onMoveTask(event: Task, i: number) {
    this.stages[i + 1].tasks.push(event);
  }

  onDropTask(event: Task, i: number) {
    this.stages[i - 1].tasks.push(event);
  }

  ngOnDestroy(): void {
    this.getStagesSubscription.unsubscribe();
  }

  onAddStage() {
    const stage = new Stage(this.stageName);
    const newStageDescription = this.service
      .addStage(stage)
      .subscribe(() => {
        this.refreshStage.next();
        newStageDescription.unsubscribe();
      })
    this.stageName = '';
  }

  onDelAllTasks(stage: Stage) {
    for (let i = 0; i < stage.tasks.length; i++) {
      let deleteTaskDescription = this.service
        .deleteTask(stage.tasks[i].id)
        .subscribe(() => {
          this.refreshStage.next();
          deleteTaskDescription.unsubscribe();
        })
    }
  }

  deleteStage(stage: Stage) {
    if (stage.tasks.length == 0) {
      let deleteStageDescription = this.service
        .deleteStage(stage.id)
        .subscribe(() => {
          this.refreshStage.next();
          deleteStageDescription.unsubscribe();
        })
    }
    else alert('Сначала удалите все задачи');
  }
}
