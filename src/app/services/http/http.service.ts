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

	public get(url: string, endpoint: string): Observable<any> {
		let options = this.getOauthBasicHeader();

		return this.httpClient.get( url + endpoint, options );
	}

	public post(url: string, endpoint: string, body: any): Observable<any> {
		let options = this.getOauthBasicHeader();

		return this.httpClient.post( url + endpoint, body, options );
	}

}
