import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Login } from './../../login';

import { HttpService } from './../../services/http/http.service';
import { AuthDataService } from './../../services/auth-data/auth-data.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent {
	loading: boolean = false;

	model = new Login('', '');

	constructor(private httpClient: HttpClient, private router: Router, private httpService: HttpService, public authDataService: AuthDataService) {
		this.authDataService.checkConnected();
	}

	login(login: Login): void {
		this.loading = true;
		let authData = window.btoa(login.login + ':' + login.password);

		let options: any = {
			headers:  {
				Authorization: 'Basic ' + authData
			},
			responseType: 'json'
		};

		this.httpClient.get('http://164.132.69.238/wp-task-manager-app/wordpress/wp-json/wp/v2/users/me', options).subscribe(response => {
			this.loading = false;
			let data: any = response;

			localStorage.setItem( 'id', data.id );
			localStorage.setItem( 'username', login.login );
			localStorage.setItem( 'password', btoa( login.password ) );

			this.authDataService.connected = true;
			this.router.navigate(['/']);
		}, err => {
			this.loading = false;
			console.log(err);
		});
	}
}
