import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { HttpService } from './../http/http.service';

import { Task } from './../../task';

@Injectable()
export class PointService {

	constructor(private httpService: HttpService) { }

	get(task: Task): Observable<any> {
		return this.httpService.get(localStorage.getItem( 'currentAppURL' ), 'wp-json/task_manager/v1/point/' + task.taskInfo.order_point_id.join( ',' ) );
	}
}
