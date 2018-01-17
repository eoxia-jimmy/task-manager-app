import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { HttpService } from './../http/http.service';

@Injectable()
export class UserService {

	constructor(private httpService: HttpService) { }

	getID(id: Number): Observable<any> {
		return this.httpService.get(localStorage.getItem( 'currentAppName' ), localStorage.getItem( 'currentAppURL' ), 'wp-json/task_manager/v1/follower/' + id, 'json' );
	}

	get(): Observable<any> {
		return this.httpService.get(localStorage.getItem( 'currentAppName' ), localStorage.getItem( 'currentAppURL' ), 'wp-json/task_manager/v1/follower', 'json' );
	}
}
