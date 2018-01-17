import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { App } from '../../models/app';

import { HttpService } from '../http/http.service';

@Injectable()
export class AppService {
	connected: boolean = false;

	constructor(private httpService: HttpService) { }

	checkInApp(): void {
		if ( localStorage.getItem( 'currentAppToken' ) ) {
			this.connected = true;
		}
	}

	add(appData: App): Observable<any> {
		return this.httpService.post('main', 'http://164.132.69.238/wp-task-manager-app/wordpress/', 'wp-json/wp-instance/v1/instance/', {
			app_id: appData.id,
			app_title: appData.name,
			app_url: appData.url,
			app_customer_key: appData.customerKey,
			app_customer_secret: appData.customerSecret,
		}, 'json');
	}

	remove(appData: App): Observable<any> {
		return this.httpService.post('main', 'http://164.132.69.238/wp-task-manager-app/wordpress/', 'wp-json/tmapp/v2/user/1/remove', {
			app_id: appData.id
		}, 'json');
	}

	getApps(): Observable<any> {
		return this.httpService.get('main', 'http://164.132.69.238/wp-task-manager-app/wordpress/', 'wp-json/wp-instance/v1/instance', 'json');
	}

	connect(appData: App): Observable<any> {
		return this.httpService.get( appData.name, appData.url, 'wp-json/wp/v2/users/me', 'json');
	}


}
