import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

const crypto        = require('crypto');
const BrowserWindow = require('electron').remote.BrowserWindow
var OAuth           = require('./oauth-1.0a.js');

@Injectable()
export class Oauth10aService {

	oauth = OAuth({
		consumer: {
			key: 'pIdXmYf2DEx7',
			secret: '9n3WUQYOXQeYH48mIgMkSArefpZ1RDKxcpIDphNecZnxw9Dj'
		},
		signature_method: 'HMAC-SHA1',
		hash_function: function(base_string, key) {
			return crypto.createHmac( 'sha1', key ).update(base_string).digest('base64');
		}
	});

	baseUrl: string = 'http://164.132.69.238/wp-task-manager-app/wordpress/';

	requestData: any = {
		url: '',
		method: 'GET',
		body: {}
	};

	token = {
		key: '',
		secret: '',
	};

	constructor(public httpClient: HttpClient) { }

	login(): Observable<any> {
		if ( 1 === Number(localStorage.getItem( 'oauth_step' )) ) {
			this.openAuthorize();
		} else if ( 2 === Number(localStorage.getItem( 'oauth_step' )) ) {
			this.getToken();
		} else {
			this.getTemporarlyToken();
		}

		return of(true);
	}

	get(url: string): Observable<any> {
		this.requestData.url = url;

		if ( localStorage.getItem( 'oauth_token' ) ) {
			this.token.key = localStorage.getItem( 'oauth_token' );
		}

		if ( localStorage.getItem( 'oauth_token_secret' ) ) {
			this.token.secret = localStorage.getItem( 'oauth_token_secret' );
		}


		let options = {
			headers: this.oauth.toHeader( this.oauth.authorize( this.requestData, this.token ) ),
		};

		options.headers['Content-Type'] = 'application/x-www-form-urlencoded';

		return this.httpClient.get(this.requestData.url, options);
	}

	post(url: string): Observable<any> {
		this.requestData.url = url;

		if ( localStorage.getItem( 'oauth_token' ) ) {
			this.token.key = localStorage.getItem( 'oauth_token' );
		}

		if ( localStorage.getItem( 'oauth_token_secret' ) ) {
			this.token.secret = localStorage.getItem( 'oauth_token_secret' );
		}

		this.requestData.method = 'POST';

		let options = {
			headers: this.oauth.toHeader( this.oauth.authorize( this.requestData, this.token ) ),
		};

		options.headers['Content-Type'] = 'application/x-www-form-urlencoded';


		return this.httpClient.post(this.requestData.url, {}, options);
	}

	getTemporarlyToken(): void {
		this.requestData.url = this.baseUrl + 'oauth1/request';

		if ( localStorage.getItem( 'oauth_token' ) ) {
			this.token.key = localStorage.getItem( 'oauth_token' );
		}

		if ( localStorage.getItem( 'oauth_token_secret' ) ) {
			this.token.secret = localStorage.getItem( 'oauth_token_secret' );
		}

		this.httpClient.get(this.requestData.url, {
			headers: this.oauth.toHeader( this.oauth.authorize( this.requestData, this.token ) ),
			responseType: 'text'
		}).subscribe(response => {
			let data: any = response;
			let tmp: any;
			data = data.split('&');


			for ( var key in data ) {
				tmp = data[key].split('=');

				localStorage.setItem( tmp[0], tmp[1] );
			}

			localStorage.setItem( 'oauth_step', '1' );
			this.openAuthorize();
		} );
	}

	openAuthorize(): void {
		let win = new BrowserWindow( {show: false, width: 800, height: 600 } );
		win.on('close', ( event ) => {
			win.destroy();
			win = null; event.preventDefault();
		} );

		win.once( 'ready-to-show', () => {
			win.show();
		});

		win.webContents.on( 'did-frame-finish-load', ( event, isMainFrame ) => {
			if ( win.webContents.getURL() == this.baseUrl + 'wp-login.php?action=oauth1_authorize' || win.webContents.getURL() == this.baseUrl + 'wp-login.php?action=oauth1_authorize&oauth_token=' + localStorage.getItem('oauth_token') ) {
				win.webContents.executeJavaScript('document.querySelector("code").innerHTML', false)
				.then((result) => {
					localStorage.setItem( 'oauth_verifier', result );
					localStorage.setItem( 'oauth_step', '2' );
					win.destroy();
					this.getToken();
				} );
			}
		} );

		win.loadURL(this.baseUrl + 'oauth1/authorize?oauth_token=' + localStorage.getItem('oauth_token') );
	}

	getToken(): void {
		this.requestData.url = this.baseUrl + 'oauth1/access?oauth_verifier=' + localStorage.getItem( 'oauth_verifier' );

		if ( localStorage.getItem( 'oauth_token' ) ) {
			this.token.key = localStorage.getItem( 'oauth_token' );
		}

		if ( localStorage.getItem( 'oauth_token_secret' ) ) {
			this.token.secret = localStorage.getItem( 'oauth_token_secret' );
		}

		this.httpClient.get(this.requestData.url, {
			headers: this.oauth.toHeader( this.oauth.authorize( this.requestData, this.token ) ),
			responseType: 'text'
		}).subscribe(data => {
			let storageData = {};
			let response: any = data;
			let tmpData: any = response.split( '&' );
			console.log(tmpData);
			for( let key in tmpData ) {
				let tmp = tmpData[key].split( '=' );
				localStorage.setItem( tmp[0], tmp[1] );
			}
			localStorage.setItem( 'connected', 'true' );
		});
	}
}
