import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Login } from './../../login';
import { HttpService } from './../../services/http/http.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent {
	connected: boolean = false;

	model = new Login('', '');

	constructor(private httpClient: HttpClient, private httpService: HttpService) { }

	login(login: Login): void {
		// let authData = window.btoa(login.login + ':' + login.password);
    //
		// let options: any = {
		// 	headers:  {
		// 		Authorization: 'Basic ' + authData
		// 	},
		// 	responseType: 'json'
		// };
    //
		// this.httpClient.get('http://164.132.69.238/wp-task-manager-app/wordpress/wp-json/wp/v2/users/me', options).subscribe(response => {
		// 	let data: any = response;
    //
		// 	localStorage.setItem( 'id', data.id );
		// 	localStorage.setItem( 'username', login.login );
		// 	localStorage.setItem( 'password', btoa( login.password ) );

			this.httpService.post(null, null).subscribe( (data) => {
				console.log(data);
			});
		// }, err => {
		// 	console.log(err);
		// });
    //
		// console.log(login);
	}
}
