import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { HttpService } from './../http/http.service';

import { Task } from './../../models/task';

@Injectable()
export class TaskService {

	constructor(private httpService: HttpService) { }

	add(): Observable<any> {
		return this.httpService.post(localStorage.getItem( 'currentAppName' ), localStorage.getItem( 'currentAppURL' ), 'wp-json/task_manager/v1/task', {
			title: 'Nouvelle tâche'
		}, 'json' );
	}

	put(data: Task): Observable<any> {
		return this.httpService.post(localStorage.getItem( 'currentAppName' ), localStorage.getItem( 'currentAppURL' ), 'wp-json/task_manager/v1/task', data, 'json' );
	}

	get(): Observable<any> {
		return this.httpService.get(localStorage.getItem( 'currentAppName' ), localStorage.getItem( 'currentAppURL' ), 'wp-json/task_manager/v1/task', 'json' );
	}

	sendToArchive(task: Task): Observable<any> {
		return this.httpService.post(localStorage.getItem( 'currentAppName' ), localStorage.getItem( 'currentAppURL' ), 'wp-json/task_manager/v1/task/toarchive', {
			id: task.id
		}, 'json' );
	}
}
