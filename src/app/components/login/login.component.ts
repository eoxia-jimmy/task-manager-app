import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Login } from './../../models/login';

import { HttpService } from './../../services/http/http.service';
import { AuthDataService } from './../../services/auth-data/auth-data.service';

const crypto = require('crypto');

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent {
	loading: boolean = false;

	model: Login = new Login('', '');

	oAuth = {
		consumer: {
			key: 'pIdXmYf2DEx7',
			secret: '9n3WUQYOXQeYH48mIgMkSArefpZ1RDKxcpIDphNecZnxw9Dj'
		},
		signature_method: 'HMAC-SHA1',
		hash_function: function(base_string, key) {
			return crypto.createHmac( 'sha1', key ).update(base_string).digest('base64');
		}
	};

	baseUrl: string = 'http://164.132.69.238/wp-task-manager-app/';

	requestData: any = {
		url: '',
		method: 'POST',
		body: {}
	};

	token = {
		key: '',
		secret: '',
	};

	constructor(private httpClient: HttpClient, private router: Router, private httpService: HttpService, public authDataService: AuthDataService) {
		this.authDataService.checkConnected();
	}

	login(login: Login): void {
		this.loading = true;

		this.requestData.url = this.baseUrl + 'oauth1/request';

		// let authData = window.btoa(login.login + ':' + login.password);
    //
		// let options: any = {
		// 	headers:  {
		// 		Authorization: 'Basic ' + authData
		// 	},
		// 	responseType: 'json'
		// };
    //
		// this.httpClient.post('http://164.132.69.238/wp-task-manager-app/wp', options).subscribe(response => {
		// 	this.loading = false;
		// 	let data: any = response;
    //
		// 	localStorage.setItem( 'id', data.id );
		// 	localStorage.setItem( 'username', login.login );
		// 	localStorage.setItem( 'password', btoa( login.password ) );
    //
		// 	this.authDataService.connected = true;
		// 	this.router.navigate(['/']);
		// }, err => {
		// 	this.loading = false;
		// 	console.log(err);
		// });
	}
}
