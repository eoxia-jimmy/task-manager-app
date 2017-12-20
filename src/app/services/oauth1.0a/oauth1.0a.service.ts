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
		method: 'POST',
		body: {}
	};

	token = {
		key: '',
		secret: '',
	};

	constructor(public httpClient: HttpClient) { }

	login(): void {
		this.openAuthorize();
	}

	getTemporarlyToken(): void {
		this.requestData.url = this.baseUrl + 'oauth1/request';

		let authData = {
			oauth_consumer_key: this.oAuth.consumer.key,
			oauth_nonce: getNonce(),
			oauth_signature_method: this.oAuth.signature_method,
			oauth_timestamp: getTimeStamp(),
			oauth_token: ''
		};

		let authString = '';
		let joinAuthData = '';

		for ( var key in authData ) {
			joinAuthData += key + '=' + authData[key] + '&';
			authString += key + '="' + authData[key] + '",';
		}

		joinAuthData = encodeURIComponent(joinAuthData.substring(0, joinAuthData.length - 1));

		let baseString = this.requestData.method.toUpperCase() + '&';
		baseString    += encodeURIComponent(this.requestData.url);
		baseString    += '&' + joinAuthData;

		let signatureKey = this.oAuth.consumer.secret + '&';

		let signature = crypto.createHmac( 'sha1', signatureKey ).update( baseString ).digest('base64');

		authString += 'oauth_signature="' + signature + '"';

		let options: any = {
			headers:  {
				Authorization: 'OAuth ' + authString
			},
			responseType: 'text'
		};

		this.httpClient.post(this.requestData.url, {}, options).subscribe(response => {
			let data: any = response;
			let tmp: any;
			data = data.split('&');


			for ( var key in data ) {
				tmp = data[key].split('=');

				localStorage.setItem( tmp[0], tmp[1] );
			}
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
					win.destroy();
					// this.giveAccess();
				} );
			}
		} );

		win.loadURL(this.baseUrl + 'oauth1/authorize?oauth_token=' + localStorage.getItem('oauth_token') );
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
