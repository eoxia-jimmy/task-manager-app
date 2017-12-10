import { Injectable } from '@angular/core';

@Injectable()
export class AuthDataService {
	public connected: boolean = false;

	constructor() { }

	checkConnected(): void {
		if ( localStorage.getItem( 'username' ) ) {
			this.connected = true;
		}
	}
}
