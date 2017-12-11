import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { AppService } from '../../services/app/app.service';
import { AuthDataService } from './../../services/auth-data/auth-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	constructor(private router: Router, public authDataService: AuthDataService, private appService: AppService) {
		this.authDataService.checkConnected();

		if ( ! this.authDataService.connected ) {
			this.router.navigate(['/login']);
		}

		this.appService.checkInApp();

		if ( this.appService.connected ) {
			this.router.navigate(['/app/' + localStorage.getItem( 'currentAppId' )]);
		}
	}

	ngOnInit() {}

}
