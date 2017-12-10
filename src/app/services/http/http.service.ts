import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

	constructor(private httpClient: HttpClient) {}

	private getOauthBasicHeader(): any {
		let authData = window.btoa( localStorage.getItem( 'username' ) + ':' + atob( localStorage.getItem( 'password' ) ) );
		let options: any = {
			headers:  {
				Authorization: 'Basic ' + authData
			},
			responseType: 'json'
		};

		return options;
	}

	public get(endpoint: string): Observable<any> {
		let options = this.getOauthBasicHeader();

		return this.httpClient.get( 'http://164.132.69.238/wp-task-manager-app/wordpress/' + endpoint, options );
	}

	public post(endpoint: string, body: any): Observable<any> {
		let options = this.getOauthBasicHeader();

		console.log(endpoint);

		return this.httpClient.post( 'http://164.132.69.238/wp-task-manager-app/wordpress/' + endpoint, body, options );
	}

}
