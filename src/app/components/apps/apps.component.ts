import { Component, OnInit } from '@angular/core';

import { App } from './../../app';

import { AppService } from '../../services/app/app.service';
import { AuthDataService } from './../../services/auth-data/auth-data.service';

@Component({
  selector: 'app-apps',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.scss']
})
export class AppsComponent {
	apps: App[] = [];

	currentId: number = 1;

	model = new App(1, 'Test', 'http://127.0.0.1/', 'username', 'password' );

	constructor(private appService: AppService, public authDataService: AuthDataService) {
		this.authDataService.checkConnected();

		if ( this.authDataService.connected ) {
			this.getApps();
		}
	}

	add(appData: App): void {
		this.appService.add(appData).subscribe( ( data ) => {
			this.refreshList(data);
		} );
	}

	refreshList(appsData): void {
		this.apps = [];

		for (var key in appsData) {
			this.addApp( appsData[key] );
		}
	}

	addApp(appData): void {
		let tmpApp = new App(
			appData.id,
			appData.title,
			appData.url,
			appData.username,
			appData.password,
		);

		this.apps.push( tmpApp );

		this.currentId = this.apps.length;
		this.model.id = this.currentId + 1;
	}

	getApps(): void {
		this.appService.getApps().subscribe( ( data ) => {
			this.refreshList(data);
		} );
	}

	connect(appData: App): void {
		this.appService.connect(appData);
	}

}
