import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Login } from './../../login';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent {
	model = new Login('', '');

	constructor(private httpClient: HttpClient) { }

	login(login: Login): void {
		this.httpClient.get('http://164.132.69.238/wp-task-manager-app/wordpress/wp-json/tmapp/v2/user/login/admin/Z2xXb215U25jY0RUYUpKY01ZUFc=', null, {
			responseType: 'text'
		}).subscribe(data => {
			let storageData = {};
			let tmpData = data.split( '&' );
			for( let key in tmpData ) {
				let tmp = tmpData[key].split( '=' );
				localStorage.setItem( tmp[0], tmp[1] );
			}
		}, err => {
			console.log(err);
		});

		console.log(login);
	}
}
