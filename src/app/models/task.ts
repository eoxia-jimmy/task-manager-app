import { WPPost } from './wp-post';
import { Point } from './point';

export class Task implements WPPost {
	public id: number;
	public parent_id: number;
	public author_id: number;
	public date: string;
	public date_modified: string;
	public title: string;
	public slug: string;
	public content: string;
	public status: string;
	public link: string;
	public type: string;
	public order: number;
	public comment_status: string;
	public comment_count: number;
	public thumbnail_id: number;
	public task_info: any;
	public front_info: any;
	public points: Point[] = [];

	constructor(fields: any) {
		for (var f in fields) {
			this[f] = fields[f];
		}
	}

}
