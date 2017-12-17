import { WPTerm } from './wp-term';

export class Category implements WPTerm {
	public id: number;
	public type: string;
	public term_taxonomy_id: number;
	public name: string;
	public description: string;
	public slug: string;
	public parent_id: number;
	public post_id: number;

	constructor(fields: any) {
		for (var f in fields) {
			this[f] = fields[f];
		}
	}

}
