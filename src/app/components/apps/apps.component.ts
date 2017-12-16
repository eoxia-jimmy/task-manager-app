import { Component, OnInit } from '@angular/core';

import { App } from './../../models/app';

import { HomeComponent } from '../home/home.component';

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

	constructor(
		private appService: AppService,
		public authDataService: AuthDataService,
		public homeComponent: HomeComponent) {

		this.authDataService.checkConnected();
		this.appService.checkInApp();

		if ( this.authDataService.connected ) {
			this.getApps();
		}
	}

	add(appData: App): void {
		this.appService.add(appData).subscribe( ( data ) => {
			this.refreshList(data);
		} );
	}

	edit(appData: App): void {
		this.appService.add(appData).subscribe( ( data ) => {
			this.refreshList(data);
		} );
	}

	delete(appData: App): void {
		this.appService.remove(appData).subscribe(response => {
			let index: number = -1;

			if ( parseInt( localStorage.getItem( 'currentAppId' ) ) === appData.id ) {
				localStorage.removeItem( 'currentAppId' );
				localStorage.removeItem( 'currentAppName' );
				localStorage.removeItem( 'currentAppUserId' );
				localStorage.removeItem( 'currentAppUsername' );
				localStorage.removeItem( 'currentAppPassword' );
				localStorage.removeItem( 'currentAppURL' );
			}

			index = this.apps.indexOf(appData);

			if ( index > -1 ) {
				this.apps.splice(index, 1);
			}
		});

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
		this.model.id = appData.id + 1;
	}

	getApps(): void {
		this.appService.getApps().subscribe( ( data ) => {
			this.refreshList(data);
		} );
	}

	connect(appData: App): void {
		this.appService.connect(appData).subscribe(response => {
			let data: any = response;

			localStorage.setItem( 'currentAppId', appData.id.toString() );
			localStorage.setItem( 'currentAppName', appData.name );
			localStorage.setItem( 'currentAppUserId', data.id );
			localStorage.setItem( 'currentAppUsername', appData.username );
			localStorage.setItem( 'currentAppPassword', btoa( appData.password ) );
			localStorage.setItem( 'currentAppURL', appData.url );

			this.appService.connected = true;

			this.homeComponent.checkConnectedToApp();

			this.getApps();
		}, err => {
			localStorage.removeItem( 'currentAppId' );
			localStorage.removeItem( 'currentAppName' );
			localStorage.removeItem( 'currentAppUserId' );
			localStorage.removeItem( 'currentAppUsername' );
			localStorage.removeItem( 'currentAppPassword' );
			localStorage.removeItem( 'currentAppURL' );

			this.appService.connected = false;

			this.homeComponent.checkConnectedToApp();
		});
	}

}
