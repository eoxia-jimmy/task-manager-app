import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { AuthDataService } from './../../services/auth-data/auth-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	constructor(private router: Router, public authDataService: AuthDataService) {
		this.authDataService.checkConnected();

		if ( ! this.authDataService.connected ) {
			this.router.navigate(['/login']);
		}
	}

	ngOnInit() {}

}
