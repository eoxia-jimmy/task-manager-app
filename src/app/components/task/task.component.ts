import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { HomeComponent } from '../home/home.component';

import { AuthDataService } from './../../services/auth-data/auth-data.service';
import { AppService } from './../../services/app/app.service';
import { TaskService } from './../../services/task/task.service';
import { PointService } from './../../services/point/point.service';

import { Task } from './../../models/task';
import { Point } from './../../models/point';

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
		private pointService: PointService,
		private router: Router,
		private homeComponent: HomeComponent) {

		this.authDataService.checkConnected();
		this.appService.checkInApp();

		if ( this.authDataService.connected && this.appService.connected ) {
			this.getTasks();
		}
	}

	add():void {
		this.taskService.add().subscribe( (data ) => {
			this.tasks.unshift( new Task( data ) );
		} );
	}

	addPoint(task: Task, content: string): void {
		this.pointService.add(task, content).subscribe( (data ) => {
			this.refreshPoint(task, data);
		} );
	}

	edit(data: Task):void {
		this.taskService.put( data ).subscribe( (data ) => {

		} );
	}

	back(): void {
		localStorage.removeItem( 'currentAppId' );
		localStorage.removeItem( 'currentAppName' );
		localStorage.removeItem( 'currentAppUserId' );
		localStorage.removeItem( 'currentAppUsername' );
		localStorage.removeItem( 'currentAppPassword' );
		localStorage.removeItem( 'currentAppURL' );

		this.appService.connected = false;

		this.homeComponent.checkConnectedToApp();
	}

	refreshTask(data: any): void {
		this.tasks = [];
		for ( var key in data ) {
			let tmpTask: Task = new Task(data[key]);

			this.tasks.push( tmpTask );

			if ( tmpTask.task_info.order_point_id.length ) {
				this.pointService.get( tmpTask ).subscribe( ( data ) => {
					data.points.subscribe( ( points ) => {
						this.refreshPoint(data.task, points);
					});
				} )
			}
		}
	}

	refreshPoint(task: Task, data: any) {
		if ( data ) {
			if ( Array.isArray( data ) ) {
				for ( var key in data ) {
					let tmpPoint: Point = new Point(data[key]);

					task.points.push(tmpPoint);
				}
			} else {
				let tmpPoint: Point = new Point(data);

				task.points.push(tmpPoint);
			}
		}
	}

	private getTasks(): void {
		this.taskService.get().subscribe( ( data ) => {
			this.refreshTask(data);
		} );
	}

}
