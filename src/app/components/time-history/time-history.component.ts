import { Component, Input, OnInit } from '@angular/core';

import { Task } from './../../models/task';

@Component({
  selector: 'app-time-history',
  templateUrl: './time-history.component.html',
  styleUrls: ['./time-history.component.scss']
})
export class TimeHistoryComponent implements OnInit {
	@Input('task')
	task: Task;

  constructor() { }

  ngOnInit() {
  }

}
