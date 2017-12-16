export class Auth {
	public connected: boolean = false;

	constructor() {
		if ( localStorage.getItem( 'username' ) ) {
			this.connected = true;
		}
	}
}
