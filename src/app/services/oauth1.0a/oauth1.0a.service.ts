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

	getTemporarlyToken(namespace: String): void {
		this.httpService.get(this.url, 'oauth1/request/').subscribe(response => {
			let data: any = response;
			let tmp: any;
			data = data.split('&');


			for ( var key in data ) {
				tmp = data[key].split('=');

				localStorage.setItem( namespace + '_' + tmp[0], tmp[1] );
			}

			this.openAuthorize(namespace);
		} );
	}

	openAuthorize(namespace: String): void {
		let win = new BrowserWindow( {show: true, width: 800, height: 600 } );
		win.loadURL(this.url + 'oauth1/authorize?oauth_token=' + localStorage.getItem( namespace + '_oauth_token') );
	}

	getToken(oauthVerifier: String): Observable<any> {
		return this.httpService.get(this.url, 'oauth1/access');
	}
}
