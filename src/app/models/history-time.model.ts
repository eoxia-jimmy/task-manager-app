import { WPComment } from './wp-comment';

export class Point implements WPComment {
	id: number;
	parent_id: number;
	post_id: number;
	date: string;
	author_id: number;
	author_nicename: string;
	author_email: string;
	author_ip: string;
	content: string;
	status: string;
	type: string;
	due_date: any;
	estimated_time: number;
	custom: string;

	constructor(fields: any) {
		for (var f in fields) {
			this[f] = fields[f];
		}
	}

}
