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
		return this.httpService.post(localStorage.getItem( 'currentAppName' ), localStorage.getItem( 'currentAppURL' ), 'wp-json/tmapp/v2/point/add', {
			task_id: task_id,
			content: content
		}, 'json');
	}

	put(data: Point): Observable<any> {
		return this.httpService.post(localStorage.getItem( 'currentAppName' ), localStorage.getItem( 'currentAppURL' ), 'wp-json/task_manager/v1/point', data, 'json' );
	}

	get(points_id: Number[]): Observable<any> {
		return this.httpService.get(localStorage.getItem( 'currentAppName' ), localStorage.getItem( 'currentAppURL' ), 'wp-json/task_manager/v1/points/' + points_id, 'json' );
	}
}
