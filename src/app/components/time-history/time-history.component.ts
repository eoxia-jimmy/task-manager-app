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

	addTimeHistory(task: Task, estimated_time: string, date: string, custom: string): void {
		console.log(estimated_time);
		console.log(date);
		console.log(custom);
	}
}
