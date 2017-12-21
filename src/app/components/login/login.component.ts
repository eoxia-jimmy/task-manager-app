import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Login } from './../../models/login';

import { HttpService } from './../../services/http/http.service';
import { AuthDataService } from './../../services/auth-data/auth-data.service';
import { Oauth10aService } from './../../services/oauth1.0a/oauth1.0a.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent {
	loading: boolean = false;

	model: Login = new Login('', '');

	constructor(
		private httpClient: HttpClient,
		private router: Router,
		private httpService: HttpService,
		public authDataService: AuthDataService,
		public oAuth10a: Oauth10aService ) {
		this.authDataService.checkConnected();
	}

	login(login: Login): void {
		this.loading = true;

		this.oAuth10a.login().subscribe( (data ) => {
			console.log(data);
		} );
	}
}
