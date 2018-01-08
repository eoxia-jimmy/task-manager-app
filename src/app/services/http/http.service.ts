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

	public setOAuthModel(oauthModel: OAuthModel): void {
		this.oauth.consumer.key = oauthModel.consumerKey;
		this.oauth.consumer.secret = oauthModel.consumerSecret;
		this.namespace = oauthModel.namespace;
		this.baseUrl = oauthModel.baseUrl;
		this.token.key = oauthModel.tokenKey;
		this.token.secret = oauthModel.tokenSecret;
	}

	public get(url: string, endpoint: string): Observable<any> {
		this.requestData.method = 'GET';

		let options = {
			headers: this.oauth.toHeader( this.oauth.authorize( this.requestData, this.token ) ),
		};

		return this.httpClient.get( url + endpoint, options );
	}

	public post(url: string, endpoint: string, body: any): Observable<any> {
		this.requestData.method = 'POST'

		this.requestData.body = body;

		let options = {
			headers: this.oauth.toHeader( this.oauth.authorize( this.requestData, this.token ) ),
		};

		return this.httpClient.post( url + endpoint, body, options );
	}

}
