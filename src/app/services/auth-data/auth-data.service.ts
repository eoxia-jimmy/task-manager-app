import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { HttpService } from './../http/http.service';

const win = require('electron').remote.getCurrentWindow();
const ses = win.webContents.session;


@Injectable()
export class AuthDataService {
	public connected: boolean = false;

	constructor(
		private httpClient: HttpClient,
		private httpService: HttpService,
		private router: Router) { }

	checkConnected(cb?: any): void {
		ses.clearStorageData({
			storages: [
				'appcache',
				'cookies',
				'filesystem',
				'indexdb',
				'shadercache',
				'websql',
				'serviceworkers',
			]
		});

		if ( ! localStorage.getItem( 'mainID' ) && localStorage.getItem( 'connected' ) ) {
			this.httpService.get('main', 'http://164.132.69.238/wp-task-manager-app/wordpress/', 'wp-json/wp/v2/users/me', 'json').subscribe(response => {
				let data: any = response;

				localStorage.setItem( 'mainID', data.id );

				if (cb) cb();
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
