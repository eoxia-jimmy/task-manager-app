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

	get(url: string): Observable<any> {
		this.requestData.url = url;
		this.requestData.method = 'GET';

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

	post(url: string, body: any): Observable<any> {
		this.requestData.url = url;

		if ( localStorage.getItem( 'oauth_token' ) ) {
			this.token.key = localStorage.getItem( 'oauth_token' );
		}

		if ( localStorage.getItem( 'oauth_token_secret' ) ) {
			this.token.secret = localStorage.getItem( 'oauth_token_secret' );
		}

		this.requestData.method = 'POST';
		this.requestData.body = body;

		let options = {
			headers: this.oauth.toHeader( this.oauth.authorize( this.requestData, this.token ) ),
		};

		return this.httpClient.post(this.requestData.url, {}, options);
	}

	refresh(): void {
		if ( localStorage.getItem( 'oauth_token' ) ) {
			this.token.key = localStorage.getItem( 'oauth_token' );
		} else {
		this.token.key = '';
		}

		if ( localStorage.getItem( 'oauth_token_secret' ) ) {
			this.token.secret = localStorage.getItem( 'oauth_token_secret' );
		} else {
			this.token.secret = '';
		}
	}

	getTemporarlyToken(): Observable<any> {
		this.requestData.url = this.baseUrl + 'oauth1/request';

		this.refresh();

		return this.httpClient.get(this.requestData.url, {
			headers: this.oauth.toHeader( this.oauth.authorize( this.requestData, this.token ) ),
			responseType: 'text'
		})
	}

	openAuthorize(cb: any): any {
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
					cb();
				} );
			}
		} );

		win.loadURL(this.baseUrl + 'oauth1/authorize?oauth_token=' + localStorage.getItem('oauth_token') );
	}

	getToken(): Observable<any> {
		this.requestData.url = this.baseUrl + 'oauth1/access?oauth_verifier=' + localStorage.getItem( 'oauth_verifier' );

		this.refresh();
		
		return this.httpClient.get(this.requestData.url, {
			headers: this.oauth.toHeader( this.oauth.authorize( this.requestData, this.token ) ),
			responseType: 'text'
		});
	}
}
