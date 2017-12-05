import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { HttpClient } from '@angular/common/http';

import { App } from './../../app';

const crypto = require('crypto');
var OAuth = require('oauth-1.0a.js');
const BrowserWindow = require('electron').remote.BrowserWindow


@Injectable()
export class AuthService {
	baseUrl: string = '';

	requestData: any = {
	  url: '',
	  method: 'POST',
		body: {}
	};

	token: any = {
	  key: '',
	  secret: ''
	};

	oauth = OAuth({
		consumer: { key: '', secret: ''},
		signature_method: 'HMAC-SHA1',
		hash_function(base_string, key) {
			return crypto.createHmac('sha1', key).update(base_string).digest('base64');
		}
	});

  constructor(private httpClient: HttpClient) { }

	prepareRequest(appData: App): void {
		this.requestData.url = appData.url + 'oauth1/request';

		this.oauth.consumer.key = appData.customerKey;
		this.oauth.consumer.secret = appData.customerSecret;
	}

	makeFirstRequest(appData: App): Observable<object> {
		this.prepareRequest(appData);

		this.httpClient.post(this.requestData.url, null, {
			headers: this.oauth.toHeader(this.oauth.authorize(this.requestData, this.token)),
			responseType: 'text'
		}).subscribe(data => {
			let storageData = {};
			let tmpData = data.split( '&' );
			for( let key in tmpData ) {
				let tmp = tmpData[key].split( '=' );
				localStorage.setItem( tmp[0], tmp[1] );
			}
		}, err => {
			console.log(err);
		});

		return of({
			status: true
		});
	}
}
