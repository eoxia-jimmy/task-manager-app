import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { HttpService } from '../http/http.service';

const BrowserWindow = require('electron').remote.BrowserWindow


@Injectable()
export class Oauth10aService {
	public url;
	constructor(
		public httpService: HttpService
	) { }

	getTemporarlyToken(namespace: string, url: string): void {
		this.url = url;

		this.httpService.get(namespace, this.url, 'oauth1/request/', 'text').subscribe(response => {
			let data: any = response;
			let tmp: any;
			data = data.split('&');

			for ( var key in data ) {
				tmp = data[key].split('=');
				switch(tmp[0]) {
					case 'oauth_token':
						localStorage.setItem( namespace + 'Token', tmp[1]);
						break;
					case 'oauth_token_secret':
						localStorage.setItem( namespace + 'TokenSecret', tmp[1]);
						break;
					default:
					break;
				}
			}

			this.openAuthorize(namespace, url);
		} );
	}

	openAuthorize(namespace: String, url: String): void {
		let win = new BrowserWindow( {show: true, width: 800, height: 600 } );
		win.loadURL(url + 'oauth1/authorize?oauth_token=' + localStorage.getItem( namespace + 'Token') );
	}

	getToken(namespace: string, oauthVerifier: String, url: String): Observable<any> {
		this.url = url;
		return this.httpService.get(namespace, this.url, 'oauth1/access?oauth_verifier=' + oauthVerifier, 'text');
	}
}
