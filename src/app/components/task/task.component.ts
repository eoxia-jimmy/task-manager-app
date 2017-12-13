import { Component } from '@angular/core';

import { AuthDataService } from './../../services/auth-data/auth-data.service';
import { AppService } from './../../services/app/app.service';
import { TaskService } from './../../services/task/task.service';

import { Task } from './../../task';

@Component({
	selector: 'app-task',
	templateUrl: './task.component.html',
	styleUrls: ['./task.component.scss']
})
export class TaskComponent {
	tasks: Task[] = [];

	constructor(
		private authDataService: AuthDataService,
		private appService: AppService,
		private taskService: TaskService) {
		this.authDataService.checkConnected();
		this.appService.checkInApp();

		if ( this.authDataService.connected && this.appService.connected ) {
			this.getTasks();
		}
	}

	refreshTask(data: any): void {
		this.tasks = [];
		for ( var key in data ) {
			this.tasks.push( new Task(
				data[key].id,
				data[key].title
			) );
		}

		console.log(this.tasks);
	}

	private getTasks(): void {
		this.taskService.get().subscribe( ( data ) => {
			this.refreshTask(data);
		} );
	}

}
