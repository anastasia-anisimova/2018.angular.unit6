import {Component, OnInit} from '@angular/core';
import {Stage, Stages} from '../stage';
import {Task} from '../task';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  stages: Stage[] = Stages;

  constructor() {
  }

  ngOnInit() {

  }

  onMoveTask($event: Task, i: number) {
    if (this.stages.length > i + 1) {
      this.stages[i + 1].tasks.push($event);
    }


  }
}
