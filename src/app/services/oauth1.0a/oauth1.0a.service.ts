import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const crypto        = require('crypto');
const BrowserWindow = require('electron').remote.BrowserWindow

@Injectable()
export class Oauth10aService {

	oAuth = {
		consumer: {
			key: 'pIdXmYf2DEx7',
			secret: '9n3WUQYOXQeYH48mIgMkSArefpZ1RDKxcpIDphNecZnxw9Dj'
		},
		signature_method: 'HMAC-SHA1',
		hash_function: function(base_string, key) {
			return crypto.createHmac( 'sha1', key ).update(base_string).digest('base64');
		}
	};

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

	login(): void {
		if ( 1 === Number(localStorage.getItem( 'oauth_step' )) ) {
			this.openAuthorize();
		} else if ( 2 === Number(localStorage.getItem( 'oauth_step' )) ) {
			this.getToken();
		} else {
			this.getTemporarlyToken();

		}
	}

	getHeader(): any {
		let authData = {
			oauth_consumer_key: this.oAuth.consumer.key,
			oauth_nonce: getNonce(),
			oauth_signature_method: this.oAuth.signature_method,
			oauth_timestamp: getTimeStamp(),
			oauth_version: '1.0'
		};

		if ( localStorage.getItem( 'oauth_token' ) ) {
			authData['oauth_token'] = localStorage.getItem( 'oauth_token' );
		}

		if ( localStorage.getItem( 'oauth_token_secret' ) ) {
			authData['oauth_secret'] = localStorage.getItem( 'oauth_token_secret' );
		}

		let authString = '';
		let joinAuthData = '';

		for ( var key in authData ) {
			if ( key != 'oauth_secret' ) {
				authString += key + '="' + authData[key] + '",';
			}
			joinAuthData += key + '=' + authData[key] + '&';
		}

		joinAuthData = encodeURIComponent(joinAuthData.substring(0, joinAuthData.length - 1));

		let baseString = this.requestData.method.toUpperCase() + '&';
		baseString    += encodeURIComponent(this.requestData.url);
		baseString    += '&' + joinAuthData;

		let signatureKey = this.oAuth.consumer.secret + '&';

		if ( localStorage.getItem( 'oauth_token_secret' ) ) {
			signatureKey += localStorage.getItem( 'oauth_token_secret' );
		}

		console.log(baseString);
		console.log(signatureKey);

		let signature = crypto.createHmac( 'sha1', signatureKey ).update( baseString ).digest('base64');

		authString += 'oauth_signature="' + signature + '"';

		let options: any = {
			headers:  {
				Authorization: 'OAuth ' + authString
			},
			responseType: 'text'
		};

		return options;
	}

	getTemporarlyToken(): void {
		this.requestData.url = this.baseUrl + 'oauth1/request';

		let options: any = this.getHeader();

		this.httpClient.get(this.requestData.url, options).subscribe(response => {
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
		this.requestData.url = this.baseUrl + 'oauth1/access';
		let options: any = this.getHeader();
		this.httpClient.get(this.requestData.url + '?oauth_verifier=' + localStorage.getItem( 'oauth_verifier' ), options).subscribe(data => {
			let storageData = {};
			let response: any = data;
			let tmpData: any = response.split( '&' );
			for( let key in tmpData ) {
				let tmp = tmpData[key].split( '=' );
				localStorage.setItem( tmp[0], tmp[1] );
			}
			localStorage.setItem( 'connected', 'true' );
		});
	}
}


function getNonce() {
	let word_characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	let result: any = '';
	let i : number;
	let random: number;
	for( i = 0; i < 32; i++) {
		random = Math.floor(Number(Math.random() * word_characters.length));
		result += word_characters[random];
	}

	return result;
};

/**
 * Get Current Unix TimeStamp
 * @return {Int} current unix timestamp
 */
function getTimeStamp() {
	let currentTime: number = Math.floor(Number(new Date().getTime()/1000));
 return  currentTime;
}
