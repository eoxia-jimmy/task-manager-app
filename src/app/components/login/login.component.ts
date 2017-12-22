import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Login } from './../../models/login';

import { HttpService } from './../../services/http/http.service';
import { AuthDataService } from './../../services/auth-data/auth-data.service';
import { Oauth10aService } from './../../services/oauth1.0a/oauth1.0a.service';

const win = require('electron').remote.getCurrentWindow();
const ses = win.webContents.session;

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	loading: boolean = false;

	model: Login = new Login('', '');

	constructor(
		private httpClient: HttpClient,
		private router: Router,
		private httpService: HttpService,
		public authDataService: AuthDataService,
		public oAuth10a: Oauth10aService ) {
		// this.authDataService.checkConnected();
	}

	ngOnInit(): void {
		console.log('init')
	}

	login(login: Login): void {
		this.loading = true;

		localStorage.removeItem( 'oauth_callback_confirmed' );
		localStorage.removeItem( 'oauth_step' );
		localStorage.removeItem( 'oauth_token' );
		localStorage.removeItem( 'oauth_token_secret' );
		localStorage.removeItem( 'connected' );
		localStorage.removeItem( 'mainID' );

		ses.clearStorageData({
			origin: 'file://',
			quotas: [
				'temporary', 'persistent', 'syncable'
			],
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
    //
		this.oAuth10a.getTemporarlyToken().subscribe((response) => {
			// let data: any = response;
			// let tmp: any;
			// data = data.split('&');
      //
			// // for ( var key in data ) {
			// // 	tmp = data[key].split('=');
      // //
			// // 	localStorage.setItem( tmp[0], tmp[1] );
			// // }

			this.oAuth10a.getTemporarlyToken().subscribe((response) => {
				let data: any = response;
				let tmp: any;
				data = data.split('&');

				for ( var key in data ) {
					tmp = data[key].split('=');

					localStorage.setItem( tmp[0], tmp[1] );
				}

				localStorage.setItem( 'connected', '1' );
					localStorage.setItem( 'mainID', '1' );
					this.router.navigate(['/']);
			});
			// this.oAuth10a.openAuthorize();
      //
			// this.oAuth10a.test.subscribe(() => {
      //
			// }, (err) => {
			// 	console.log(err);
			// }, () => {
			// 	localStorage.setItem( 'connected', '1' );
			// 		localStorage.setItem( 'mainID', '1' );
			// 		this.router.navigate(['/']);
			// } );
      //
			// localStorage.setItem( 'oauth_step', '1' );
		});
    //
		// 	this.oAuth10a.openAuthorize(() => {
		// 		this.oAuth10a.getToken().subscribe((data)  => {
		// 			let storageData = {};
		// 			let response: any = data;
		// 			let tmpData: any = response.split( '&' );
		// 			for( let key in tmpData ) {
		// 				let tmp = tmpData[key].split( '=' );
		// 				localStorage.setItem( tmp[0], tmp[1] );
		// 			}
    //
		// 			localStorage.setItem( 'connected', 'true' );
		// 			this.authDataService.connected = true;
    //
		// 			this.authDataService.checkConnected(() => {
		// 				this.router.navigate(['/']);
		// 			});
		// 		});
		// 	});
		// } );
	}

	test(): void {
		console.log('navigate to /')
		this.authDataService.connected = true;
		this.router.navigate(['/']);
	}
}
