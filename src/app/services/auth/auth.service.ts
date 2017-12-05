// import { Injectable } from '@angular/core';
//
// import { Observable } from 'rxjs/Observable';
// import { of } from 'rxjs/observable/of';
//
// import { HttpClient } from '@angular/common/http';
//
// const crypto = require('crypto');
// var OAuth = require('oauth-1.0a.js');
// const BrowserWindow = require('electron').remote.BrowserWindow
//
//
// @Injectable()
// export class AuthService {
// 	baseUrl: string = 'http://127.0.0.1/wordpress/';
//
// 	requestData: any = {
// 	  url: this.baseUrl,
// 	  method: 'POST',
// 		body: {}
// 	};
//
// 	token: any = {
// 	  key: '',
// 	  secret: ''
// 	};
//
// 	oauth = OAuth({
// 		consumer: { key: '5PzlvRcC0Pfy', secret: '40NjVaNBDjqB6bKcUq4LBtfz0moODHsurY1gGdkj787Yu9oG'},
// 		signature_method: 'HMAC-SHA1',
// 		hash_function(base_string, key) {
// 			return crypto.createHmac('sha1', key).update(base_string).digest('base64');
// 		}
// 	});
//
//   constructor(private httpClient: HttpClient) { }
//
// 	makeFirstRequest(): Observable<object> {
// 		this.requestData.url = this.baseUrl + 'oauth1/request';
// 		this.httpClient.post(this.requestData.url, null, {
// 			headers: this.oauth.toHeader(this.oauth.authorize(this.requestData, this.token)),
// 			responseType: 'text'
// 		}).subscribe(data => {
// 			// let storageData = {};
// 			// let tmpData = data.split( '&' );
// 			// for( let key in tmpData ) {
// 			// 	let tmp = tmpData[key].split( '=' );
// 			// 	localStorage.setItem( tmp[0], tmp[1] );
// 			// }
//       //
// 			// this.openAuthorize();
//
// 		}, err => {
// 			console.log(err);
// 		});
//
// 		return of({
// 			status: true
// 		});
// 	}
// }
