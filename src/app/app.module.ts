import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BoardComponent} from './board/board.component';
import {StageComponent} from './stage/stage.component';
import {TaskComponent} from './task/task.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TaskFormComponent} from './task-form/task-form.component';
import { ControlErrorComponent } from './control-error/control-error.component';
import {HttpClientModule} from '@angular/common/http';
import {BackendService} from './backend.service';
import { EditStageComponent } from './edit-stage/edit-stage.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    StageComponent,
    TaskComponent,
    TaskFormComponent,
    ControlErrorComponent,
    EditStageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [BackendService],
  bootstrap: [AppComponent]
})
export class AppModule { }
