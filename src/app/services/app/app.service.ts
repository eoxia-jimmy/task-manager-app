import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { App } from '../../models/app';

import { Oauth10aService } from './../oauth1.0a/oauth1.0a.service';

@Injectable()
export class AppService {
	connected: boolean = false;

	constructor(private oauthService: Oauth10aService) { }

	checkInApp(): void {
		if ( localStorage.getItem( 'currentAppUsername' ) ) {
			this.connected = true;
		}
	}

	add(appData: App): Observable<any> {
		return this.oauthService.post('http://164.132.69.238/wp-task-manager-app/wordpress/wp-json/wp-instance/v1/instance/', {
			app_id: appData.id,
			app_title: appData.name,
			app_url: appData.url,
			app_customer_key: appData.customerKey,
			app_customer_secret: appData.customerSecret,
		});
	}

	remove(appData: App): Observable<any> {
		return this.oauthService.post('http://164.132.69.238/wp-task-manager-app/wordpress/wp-json/tmapp/v2/user/1/remove', {
			app_id: appData.id
		});
	}

	getApps(): Observable<any> {
		return this.oauthService.get('http://164.132.69.238/wp-task-manager-app/wordpress/wp-json/wp-instance/v1/instance');
	}

	connect(appData: App): Observable<any> {
		return this.oauthService.get(appData.url + 'wp-json/wp/v2/users/me');
	}


}
