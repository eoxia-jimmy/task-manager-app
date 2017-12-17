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

	edit(data: Task):void {
		this.taskService.put( data ).subscribe( (data) => {

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
		}
	}

	private getTasks(): void {
		this.taskService.get().subscribe( ( data ) => {
			this.refreshTask(data);
		} );
	}

}
