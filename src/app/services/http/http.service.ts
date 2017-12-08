import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

	constructor(private httpClient: HttpClient) {}

	public get(endpoint: string): Observable<any> {
		return of();
	}

	public post(endpoint: string, body: any): Observable<any> {
		let authData = window.btoa( localStorage.getItem( 'username' ) + ':' + atob( localStorage.getItem( 'password' ) ) );

		let options: any = {
			headers:  {
				Authorization: 'Basic ' + authData
			},
			responseType: 'json'
		};

		let data: any;

		this.httpClient.get( 'http://164.132.69.238/wp-task-manager-app/wordpress/wp-json/wp/v2/users/me', options).subscribe( ( response ) => {
			data = response;
			return of(data);
		});
	}

}
