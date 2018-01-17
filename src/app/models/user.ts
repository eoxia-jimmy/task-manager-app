import { WPUser } from './wp-user';

export class User implements WPUser {
	public id: number;
	public email: string;
	public login: string;
	public password: string;
	public displayname: string;
	public avatar: string;
	public avatar_color: string;
	public initial: string;
	public firstname: string;
	public lastname: string;

	constructor(fields: any) {
		for (var f in fields) {
			this[f] = fields[f];
		}
	}

}
