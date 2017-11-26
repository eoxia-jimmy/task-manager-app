import { Component, OnInit } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

// Import HttpClientModule from @angular/common/http
import { HttpClient } from '@angular/common/http';

const crypto = require('crypto');
var OAuth = require('oauth-1.0a.js');
const BrowserWindow = require('electron').remote.BrowserWindow

const oauth = OAuth({
  consumer: { key: 'MC32owCykTzj', secret: 'x5Ep94o9BEAHgzKBiD4SPMRvYLkQT9DhRQ5EL7SgKCoiM3Rm'},
  signature_method: 'HMAC-SHA1',
  hash_function(base_string, key) {
    return crypto.createHmac('sha1', key).update(base_string).digest('base64');
  }
});

let base_url = 'http://127.0.0.1/wordpress/';

let request_data = {
  url: base_url + 'oauth1/',
  method: 'POST',
	body: {}
};

// Note: The token is optional for some requests
let token = {
  key: '',
  secret: ''
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = `Soler Lisa & Latour Jimmy <3 !`;

  constructor(private http: HttpClient) {}


  ngOnInit() {
		this.refreshData();
		if ( localStorage.getItem( 'connected' ) == 'true' ) {
			this.title = "Vous êtes connecté!";
			this.exempleRequest();
		} else {
			if ( localStorage.getItem( 'oauth_verifier' ) ) {
				this.giveAccess();
			} else if ( token.key ) {
				this.openAuthorize();
			} else {
				this.makeFirstRequest();
			}
		}
  }

	makeFirstRequest() {
		request_data.url = base_url + 'oauth1/request';
		this.http.post(request_data.url, null, {
			headers: oauth.toHeader(oauth.authorize(request_data, token)),
			responseType: 'text'
		}).subscribe(data => {
			let storageData = {};
			let tmpData = data.split( '&' );
			for( let key in tmpData ) {
				let tmp = tmpData[key].split( '=' );
				localStorage.setItem( tmp[0], tmp[1] );
			}

			this.openAuthorize();

		}, err => {
			console.log(err);
		});
	}

	openAuthorize() {
		this.refreshData();
		let win = new BrowserWindow( {show: false, width: 800, height: 600 } );
		win.on('close', ( event ) => {
			win.destroy();
			win = null; event.preventDefault();
		} );

		win.once( 'ready-to-show', () => {
			win.show();
		});

		win.webContents.on( 'did-frame-finish-load', ( event, isMainFrame ) => {
			if ( win.webContents.getURL() == base_url + 'wp-login.php?action=oauth1_authorize' || win.webContents.getURL() == base_url + 'wp-login.php?action=oauth1_authorize&oauth_token=' + token.key ) {
				win.webContents.executeJavaScript('document.querySelector("code").innerHTML', false)
				.then((result) => {
					localStorage.setItem( 'oauth_verifier', result );
					win.destroy();
					this.giveAccess();
				} );
			}
		} );

		win.loadURL(base_url + 'oauth1/authorize?oauth_token=' + token.key );
	}

	giveAccess() {
		this.refreshData();
		request_data.url = base_url + 'oauth1/access?oauth_verifier=' + localStorage.getItem( 'oauth_verifier' );
		this.http.post(request_data.url, null, {
			headers: oauth.toHeader(oauth.authorize(request_data, token)),
			responseType: 'text'
		}).subscribe(data => {
			let storageData = {};
			let tmpData = data.split( '&' );
			for( let key in tmpData ) {
				let tmp = tmpData[key].split( '=' );
				localStorage.setItem( tmp[0], tmp[1] );
			}
			localStorage.setItem( 'connected', 'true' );

			this.refreshData();
			this.exempleRequest();

		} );
	}

	refreshData() {
		if ( localStorage.getItem( 'oauth_token_secret' ) ) {
			token.secret = localStorage.getItem( 'oauth_token_secret' );
		}
		if ( localStorage.getItem( 'oauth_token' ) ) {
			token.key = localStorage.getItem( 'oauth_token' );
		}
	}

	exempleRequest() {
		this.title ="Chocolat";

		request_data.url = 'http://127.0.0.1/wordpress/wp-json/wp/v2/posts';
		request_data.body = {
			"title": "JDUIAZDHUIAHDUIh",
			"content": "HFUZIAHFuiazffhazuifh"
		};

		this.http.post( request_data.url, request_data.body, {
			headers: oauth.toHeader(oauth.authorize(request_data, token)),
			responseType: 'text'
		}).subscribe(data => {
			console.log(data);
		});
	}
}
