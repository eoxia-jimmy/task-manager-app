import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Login } from './../../models/login';

import { HttpService } from './../../services/http/http.service';
import { AuthDataService } from './../../services/auth-data/auth-data.service';
import { Oauth10aService } from './../../services/oauth1.0a/oauth1.0a.service';

// Dans le processus main.
const BrowserWindow = require('electron').remote.BrowserWindow

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	loading: boolean = false;
	displayVerifier: boolean = false;

	model: Login = new Login('', '');

	constructor(
		private httpClient: HttpClient,
		private router: Router,
		private httpService: HttpService,
		public authDataService: AuthDataService,
		public oAuth10a: Oauth10aService ) {
		this.authDataService.checkConnected();
	}

	ngOnInit(): void {}

	login(login: Login): void {
		this.displayVerifier = true;
		this.oAuth10a.getTemporarlyToken('main', 'http://164.132.69.238/wp-task-manager-app/wordpress/');
	}

	checkKey(key: string): void {
		this.oAuth10a.getToken('main', key, 'http://164.132.69.238/wp-task-manager-app/wordpress/').subscribe( (data) => {
			let storageData = {};
			let response: any = data;
			let tmpData: any = response.split( '&' );

			for ( var key in tmpData ) {
				let tmp: any = tmpData[key].split('=');
				switch(tmp[0]) {
					case 'oauth_token':
						localStorage.setItem( 'mainToken', tmp[1]);
						break;
					case 'oauth_token_secret':
						localStorage.setItem( 'mainTokenSecret', tmp[1]);
						break;
					default:
					break;
				}
			}

			localStorage.setItem( 'connected', 'true' );
			this.authDataService.connected = true;
			this.router.navigate(['/']);
		});
	}

}
