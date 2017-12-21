import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Oauth10aService } from './../oauth1.0a/oauth1.0a.service';

const win = require('electron').remote.getCurrentWindow();
const ses = win.webContents.session;


@Injectable()
export class AuthDataService {
	public connected: boolean = false;

	constructor(
		private httpClient: HttpClient,
		private oauthService: Oauth10aService,
		private router: Router) { }

	checkConnected(): void {
		ses.clearStorageData({
			storages: [
				'cookies'
			]
		});

		if ( ! localStorage.getItem( 'mainID' ) && localStorage.getItem( 'connected' ) ) {
			this.oauthService.get('http://164.132.69.238/wp-task-manager-app/wordpress/wp-json/wp/v2/users/me').subscribe(response => {
				let data: any = response;

				localStorage.setItem( 'mainID', data.id );

				this.connected = true;
				this.router.navigate(['/']);
			}, err => {
				console.log(err);
			});
		}

		if ( localStorage.getItem( 'mainID' ) && localStorage.getItem( 'connected' ) ) {
			this.connected = true;
			this.router.navigate(['/']);
		}
	}
}
