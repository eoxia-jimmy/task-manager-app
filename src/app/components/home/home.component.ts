import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppService } from '../../services/app/app.service';
import { AuthDataService } from './../../services/auth-data/auth-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
	displayTask: boolean = false;
	currentAppName: string = 'Select a WordPress';

	constructor(
		private appService: AppService,
		private authDataService: AuthDataService,
		private router: Router) {
		this.authDataService.checkConnected();

		if ( ! this.authDataService.connected ) {
			this.router.navigate(['/login']);
		}

		this.appService.checkInApp();
		this.checkConnectedToApp();

		this.authDataService.checkConnected();
		this.appService.checkInApp();

		this.checkConnectedToApp();
	}

	disconnected(): void {
		localStorage.removeItem( 'id' );
		localStorage.removeItem( 'username' );
		localStorage.removeItem( 'password' );

		this.authDataService.connected = false;

		this.router.navigate(['/login']);
	}

	checkConnectedToApp(): void {
		this.displayTask = this.appService.connected;

		if ( this.displayTask ) {
			this.currentAppName = 'Connected to ' + localStorage.getItem('currentAppName');
		} else {
			this.currentAppName = 'Select a WordPress';
		}
	}

}
