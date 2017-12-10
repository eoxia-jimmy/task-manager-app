import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { App } from '../../app';
// import { APPS } from '../../mock-apps';

import { HttpService } from './../http/http.service';

@Injectable()
export class AppService {

	constructor(private httpService: HttpService) { }

	add(appData: App): Observable<any> {
		return this.httpService.post('wp-json/tmapp/v2/user/1', {
			app_id: appData.id,
			app_title: appData.name,
			app_url: appData.url,
			customer_key: appData.customerKey,
			customer_secret: appData.customerSecret,
		});
	}

	getApps(): Observable<any> {
		return this.httpService.get('wp-json/tmapp/v2/user/1');
	}
}
