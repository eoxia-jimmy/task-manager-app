import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { HttpService } from './../http/http.service';

import { Task } from './../../task';

@Injectable()
export class TaskService {

	constructor(private httpService: HttpService) { }

	add(): Observable<any> {
		return this.httpService.post(localStorage.getItem( 'currentAppURL' ), 'wp-json/task_manager/v1/task', {
			title: 'Nouvelle tâche'
		} );
	}

	put(data: Task): Observable<any> {
		return this.httpService.post(localStorage.getItem( 'currentAppURL' ), 'wp-json/task_manager/v1/task', data );
	}

	get(): Observable<any> {
		return this.httpService.get(localStorage.getItem( 'currentAppURL' ), 'wp-json/task_manager/v1/task');
	}
}
