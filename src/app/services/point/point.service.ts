import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { HttpService } from './../http/http.service';

import { Task } from './../../models/task';
import { Point } from './../../models/point';

@Injectable()
export class PointService {

	constructor(private httpService: HttpService) { }

	add(task_id: Number, content: string): Observable<any> {
		return this.httpService.post(localStorage.getItem( 'currentAppURL' ), 'wp-json/tmapp/v2/point/add', {
			task_id: task_id,
			content: content
		});
	}

	put(data: Point): Observable<any> {
		return this.httpService.post(localStorage.getItem( 'currentAppURL' ), 'wp-json/task_manager/v1/point', data );
	}

	get(points_id: Number[]): Observable<any> {
		return this.httpService.get(localStorage.getItem( 'currentAppURL' ), 'wp-json/task_manager/v1/point/' + points_id );
	}
}
