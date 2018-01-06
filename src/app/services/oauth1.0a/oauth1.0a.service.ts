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
			secret: '1xKXsJYoSDHqE7wTHbiokb6N6gxZ2jUkV1NNIS0xdcX1WNpk'
		},
		signature_method: 'HMAC-SHA1',
		hash_function: function(base_string, key) {
			return crypto.createHmac( 'sha1', key ).update(base_string).digest('base64');
		}
	});

	namespace: string = '';

	baseUrl: string = '';

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

	login(namespace: string,
		baseUrl: string,
		customerKey: string,
		customerSecret: string): Observable<any> {
		this.namespace = namespace;
		this.baseUrl = baseUrl;
		this.oauth.consumer.key = customerKey;
		this.oauth.consumer.secret = customerSecret;

		this.getTemporarlyToken();
		return of(true);
	}

	get(namespace: string, url: string): Observable<any> {
		this.namespace = namespace;
		this.requestData.url = url;
		this.requestData.method = 'GET';
		this.requestData.body = {};

		this.token.key = '';
		this.token.secret = '';

		if ( localStorage.getItem( this.namespace + '_oauth_token' ) ) {
			this.token.key = localStorage.getItem( this.namespace + '_oauth_token' );
		}

		if ( localStorage.getItem( this.namespace + '_oauth_token_secret' ) ) {
			this.token.secret = localStorage.getItem( this.namespace + '_oauth_token_secret' );
		}

		let options = {
			headers: this.oauth.toHeader( this.oauth.authorize( this.requestData, this.token ) ),
		};

		options.headers['Content-Type'] = 'application/x-www-form-urlencoded';

		return this.httpClient.get(this.requestData.url, options);
	}

	post(namespace: string, url: string, body: any): Observable<any> {
		this.requestData.url = url;

		if ( localStorage.getItem( this.namespace + '_oauth_token' ) ) {
			this.token.key = localStorage.getItem( this.namespace + '_oauth_token' );
		}

		if ( localStorage.getItem( this.namespace + '_oauth_token_secret' ) ) {
			this.token.secret = localStorage.getItem( this.namespace + '_oauth_token_secret' );
		}

		this.requestData.method = 'POST';
		this.requestData.body = body;

		let options = {
			headers: this.oauth.toHeader( this.oauth.authorize( this.requestData, this.token ) ),
		};

		return this.httpClient.post(this.requestData.url, body, options);
	}

	getTemporarlyToken(): void {
		this.requestData.url = this.baseUrl + 'oauth1/request/';

		this.token.key = '';
		this.token.secret = '';
		this.requestData.body = {};
		this.requestData.method = 'GET';

		this.httpClient.get(this.requestData.url, {
			headers: this.oauth.toHeader( this.oauth.authorize( this.requestData, this.token ) ),
			responseType: 'text'
		}).subscribe(response => {
			let data: any = response;
			let tmp: any;
			data = data.split('&');


			for ( var key in data ) {
				tmp = data[key].split('=');

				localStorage.setItem( this.namespace + '_' + tmp[0], tmp[1] );
			}

			this.openAuthorize();
		} );
	}

	openAuthorize(): void {
		let win = new BrowserWindow( {show: true, width: 800, height: 600 } );
		win.loadURL(this.baseUrl + 'oauth1/authorize?oauth_token=' + localStorage.getItem( this.namespace + '_oauth_token') );
	}

	getToken(oauthVerifier: string): Observable<any> {
		this.requestData.url = this.baseUrl + 'oauth1/access?oauth_verifier=' + oauthVerifier;

		if ( localStorage.getItem( this.namespace + '_oauth_token' ) ) {
			this.token.key = localStorage.getItem( this.namespace + '_oauth_token' );
		}

		if ( localStorage.getItem( this.namespace + '_oauth_token_secret' ) ) {
			this.token.secret = localStorage.getItem( this.namespace + '_oauth_token_secret' );
		}

		return this.httpClient.get(this.requestData.url, {
			headers: this.oauth.toHeader( this.oauth.authorize( this.requestData, this.token ) ),
			responseType: 'text'
		});
	}
}
