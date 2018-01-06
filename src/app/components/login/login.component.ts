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

	ngOnInit(): void {
		console.log('ok');
	}

	login(login: Login): void {
		this.oAuth10a.login('main', 'http://164.132.69.238/wp-task-manager-app/wordpress/', 'pIdXmYf2DEx7', '1xKXsJYoSDHqE7wTHbiokb6N6gxZ2jUkV1NNIS0xdcX1WNpk').subscribe( (data) => {
			this.displayVerifier = true;
		} );
	}

	checkKey(key: string): void {
		this.oAuth10a.getToken(key).subscribe( (data) => {
			let storageData = {};
			let response: any = data;
			let tmpData: any = response.split( '&' );

			for( let key in tmpData ) {
				let tmp = tmpData[key].split( '=' );
				localStorage.setItem( 'main_' + tmp[0], tmp[1] );
			}

			localStorage.setItem( 'connected', 'true' );
			this.authDataService.connected = true;
			this.router.navigate(['/']);
		});
	}

}
