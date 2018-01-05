import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppService } from '../../services/app/app.service';
import { AuthDataService } from './../../services/auth-data/auth-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	public displayTask: boolean = false;
	public currentAppName: string = 'Select a WordPress';

	constructor(
		private appService: AppService,
		private authDataService: AuthDataService,
		private router: Router) {

	}

	ngOnInit(): void {
		this.authDataService.checkConnected();
    //
		if ( ! this.authDataService.connected ) {
			this.router.navigate(['/login']);
		}

		this.appService.checkInApp();
		this.checkConnectedToApp();
	}

	disconnected(): void {
		localStorage.removeItem( 'oauth_callback_confirmed' );
		localStorage.removeItem( 'oauth_step' );
		localStorage.removeItem( 'oauth_token' );
		localStorage.removeItem( 'oauth_token_secret' );
		localStorage.removeItem( 'connected' );
		localStorage.removeItem( 'mainID' );
		localStorage.removeItem( 'oauth_verifier' );

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
