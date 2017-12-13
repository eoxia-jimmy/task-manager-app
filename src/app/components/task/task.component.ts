import { Component } from '@angular/core';

import { AuthDataService } from './../../services/auth-data/auth-data.service';
import { AppService } from './../../services/app/app.service';
import { TaskService } from './../../services/task/task.service';
import { PointService } from './../../services/point/point.service';

import { Task } from './../../task';
import { Point } from './../../point';

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
		private taskService: TaskService,
		private pointService: PointService) {
		this.authDataService.checkConnected();
		this.appService.checkInApp();

		if ( this.authDataService.connected && this.appService.connected ) {
			this.getTasks();
		}
	}

	add():void {
		console.log('add');
	}

	refreshTask(data: any): void {
		this.tasks = [];
		for ( var key in data ) {
			let tmpTask: Task = new Task(
				data[key].id,
				data[key].title,
				data[key].task_info,
				[]
			);

			this.tasks.push( tmpTask );

			if ( tmpTask.taskInfo.order_point_id.length ) {
				this.pointService.get( tmpTask ).subscribe( (data ) => {
					this.refreshPoint(tmpTask, data);
				} )
			}
		}
	}

	refreshPoint(task: Task, data: any) {
		if ( Array.isArray( data ) ) {
			for ( var key in data ) {
				let tmpPoint: Point = new Point(
					data[key].id,
					data[key].content
				);

				task.points.push(tmpPoint);
			}
		} else {
			let tmpPoint: Point = new Point(
				data.id,
				data.content
			);

			task.points.push(tmpPoint);
		}
	}

	private getTasks(): void {
		this.taskService.get().subscribe( ( data ) => {
			this.refreshTask(data);
		} );
	}

}
