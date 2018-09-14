import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Stage } from '../models/stage';
import { Task } from '../models/task';
import { BackendService } from '../backend.service';
import { repeatWhen } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';

@Component({
    selector: 'app-edit-stage',
    templateUrl: './edit-stage.component.html',
    styleUrls: ['./edit-stage.component.css']
})

export class EditStageComponent implements OnInit, OnDestroy {
    @Input()
    isEditStage: boolean;
    @Input()
    stage: Stage;
    @Input()
    task: Task;

    stageName: string;

    refreshStage = new Subject();
    getTasksByStageSubscription: Subscription;

    constructor(private service: BackendService) {
    }

    ngOnInit() {
        this.getTasksByStageSubscription = this.service
            .getTasksByStage(this.stage.id)
            .pipe(repeatWhen(() => this.refreshStage))
            .subscribe((tasks: Task[]) => this.stage.tasks = tasks);
    }

    onEditStart() {
        this.isEditStage = true;
        this.stageName = this.stage.name;
    }
    onEditFinish() {
        this.isEditStage = false;
        this.stage.name = this.stageName;
        const updateStageSubscription = this.service
            .updateStage(this.stage)
            .subscribe(() => updateStageSubscription.unsubscribe());
    }

    onEditCancel() {
        this.isEditStage = false;
    }

    ngOnDestroy(): void {
        this.getTasksByStageSubscription.unsubscribe();
    }
}
