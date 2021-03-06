import { Component, OnInit } from '@angular/core';

import { App } from './../../models/app';

import { HomeComponent } from '../home/home.component';

import { AppService } from '../../services/app/app.service';
import { AuthDataService } from './../../services/auth-data/auth-data.service';
import { Oauth10aService } from './../../services/oauth1.0a/oauth1.0a.service';

const BrowserWindow = require('electron').remote.BrowserWindow

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
		public oAuth10a: Oauth10aService,
		public homeComponent: HomeComponent) {

		this.authDataService.checkConnected();
		this.appService.checkInApp();
		if ( this.authDataService.connected ) {
			this.getApps();
		}
	}

	add(appData: App): void {
		this.appService.add(appData).subscribe( ( data ) => {
			// this.oAuth10a.login(appData.name, appData.url, appData.customerKey, appData.customerSecret).subscribe( (data) => {
			// } );

		} );
	}

	edit(appData: App): void {
		localStorage.setItem( appData.name + 'CustomerKey', appData.customerKey );
		localStorage.setItem( appData.name + 'CustomerSecret', appData.customerSecret );
		this.appService.add(appData).subscribe( ( data ) => {
			this.oAuth10a.getTemporarlyToken(appData.name, appData.url);
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
			appData.customer_key,
			appData.customer_secret,
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

	checkVerifier(appData: App, code: string): void {
		this.oAuth10a.getToken(appData.name, code, appData.url).subscribe( (data) => {
			let storageData = {};
			let response: any = data;
			let tmpData: any = response.split( '&' );

			for ( var key in tmpData ) {
				let tmp: any = tmpData[key].split('=');
				switch(tmp[0]) {
					case 'oauth_token':
						localStorage.setItem( appData.name + 'Token', tmp[1]);
						break;
					case 'oauth_token_secret':
						localStorage.setItem( appData.name + 'TokenSecret', tmp[1]);
						break;
					default:
					break;
				}
			}
		});
	}

	connect(appData: App): void {
		this.appService.connect(appData).subscribe(response => {
			let data: any = response;

			localStorage.setItem( 'currentAppId', appData.id.toString() );
			localStorage.setItem( 'currentAppName', appData.name );
			localStorage.setItem( 'currentAppUserId', data.id );
			localStorage.setItem( 'currentAppCustomerKey', appData.customerKey );
			localStorage.setItem( 'currentAppCustomerSecret', appData.customerSecret );
			localStorage.setItem( 'currentAppURL', appData.url );
			localStorage.setItem( 'currentAppToken', appData.url );

			this.appService.connected = true;

			this.homeComponent.checkConnectedToApp();

			this.getApps();
		}, err => {
			localStorage.removeItem( 'currentAppId' );
			localStorage.removeItem( 'currentAppName' );
			localStorage.removeItem( 'currentAppUserId' );
			localStorage.removeItem( 'currentAppCustomerKey' );
			localStorage.removeItem( 'currentAppCustomerSecret' );
			localStorage.removeItem( 'currentAppURL' );
			localStorage.removeItem( 'currentAppToken' );

			this.appService.connected = false;

			this.homeComponent.checkConnectedToApp();
		});
	}

}
