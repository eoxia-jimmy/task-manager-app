import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { HttpClient } from '@angular/common/http';

import { OAuthModel } from '../../models/oauth.model';

const crypto        = require('crypto');
var OAuth           = require('../oauth1.0a/oauth-1.0a.js');

@Injectable()
export class HttpService {
	oauth = OAuth({
		consumer: {
			key: '',
			secret: ''
		},
		signature_method: 'HMAC-SHA1',
		hash_function: function(base_string, key) {
			return crypto.createHmac( 'sha1', key ).update(base_string).digest('base64');
		}
	});

	namespace: String = '';

	baseUrl: String = '';

	requestData: any = {
		url: '',
		method: 'GET',
		body: {}
	};

	token = {
		key: '',
		secret: '',
	};

	constructor(private httpClient: HttpClient) {}

	private setOauthData(): void {
		if ( localStorage.getItem( this.namespace + 'CustomerKey' ) ) {
			this.oauth.consumer.key = localStorage.getItem( this.namespace + 'CustomerKey' );
		} else {
			this.oauth.consumer.key = 'pIdXmYf2DEx7';
		}

		if ( localStorage.getItem( this.namespace + 'CustomerSecret' ) ) {
			this.oauth.consumer.secret = localStorage.getItem( this.namespace + 'CustomerSecret' );
		} else {
			this.oauth.consumer.secret = '1xKXsJYoSDHqE7wTHbiokb6N6gxZ2jUkV1NNIS0xdcX1WNpk';
		}

		if ( localStorage.getItem( this.namespace + 'URL' ) ) {
			this.baseUrl = localStorage.getItem( this.namespace + 'URL' );
		} else {
			this.baseUrl = '';
		}

		if ( localStorage.getItem( this.namespace + 'Token' ) ) {
			this.token.key = localStorage.getItem( this.namespace + 'Token' );
		} else {
			this.token.key = '';
		}

		if ( localStorage.getItem( this.namespace + 'TokenSecret' ) ) {
			this.token.secret = localStorage.getItem( this.namespace + 'TokenSecret' );
		} else {
			this.token.secret = '';
		}
	}

	public get(namespace: string, url: string, endpoint: string, type: any): Observable<any> {
		this.requestData.method = 'GET';
		this.namespace = namespace;

		this.setOauthData();


		this.requestData.url = url + endpoint;

		let options = {
			headers: this.oauth.toHeader( this.oauth.authorize( this.requestData, this.token ) ),
			responseType: type
		};

		return this.httpClient.get( url + endpoint, options );
	}

	public post(namespace: string, url: string, endpoint: string, body: any, type: any): Observable<any> {
		this.requestData.method = 'POST'
		this.namespace = namespace;
		this.setOauthData();

		this.requestData.body = body;
		this.requestData.url = url + endpoint;

		let options = {
			headers: this.oauth.toHeader( this.oauth.authorize( this.requestData, this.token ) ),
			responseType: type
		};

		return this.httpClient.post( url + endpoint, body, options );
	}

}
