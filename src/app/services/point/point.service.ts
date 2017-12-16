import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { HttpService } from './../http/http.service';

import { Task } from './../../models/task';

@Injectable()
export class PointService {

	constructor(private httpService: HttpService) { }

	add(task: Task, content: string): Observable<any> {
		return this.httpService.post(localStorage.getItem( 'currentAppURL' ), 'wp-json/tmapp/v2/point/add', {
			task_id: task.id,
			content: content
		});
	}

	get(task: Task): Observable<any> {
		let points: any = this.httpService.get(localStorage.getItem( 'currentAppURL' ), 'wp-json/task_manager/v1/point/' + task.task_info.order_point_id.join( ',' ) );

		let data: any = {
			task: task,
			points: points,
		}

		return of (data);
	}
}
