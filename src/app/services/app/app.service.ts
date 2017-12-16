import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { App } from '../../models/app';

import { HttpService } from './../http/http.service';

@Injectable()
export class AppService {
	connected: boolean = false;

	constructor(private httpService: HttpService) { }

	checkInApp(): void {
		if ( localStorage.getItem( 'currentAppUsername' ) ) {
			this.connected = true;
		}
	}

	add(appData: App): Observable<any> {
		return this.httpService.post('http://164.132.69.238/wp-task-manager-app/wordpress/', 'wp-json/tmapp/v2/user/1', {
			app_id: appData.id,
			app_title: appData.name,
			app_url: appData.url,
			app_username: appData.username,
			app_password: appData.password,
		});
	}

	remove(appData: App): Observable<any> {
		return this.httpService.post('http://164.132.69.238/wp-task-manager-app/wordpress/', 'wp-json/tmapp/v2/user/1/remove', {
			app_id: appData.id
		});
	}

	getApps(): Observable<any> {
		return this.httpService.get('http://164.132.69.238/wp-task-manager-app/wordpress/', 'wp-json/tmapp/v2/user/1');
	}

	connect(appData: App): Observable<any> {
		return this.httpService.get(appData.url, 'wp-json/wp/v2/users/me');
	}


}
