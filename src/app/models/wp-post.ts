export interface WPPost {
	id: number;
	parent_id: number;
	author_id: number;
	date: string;
	date_modified: string;
	title: string;
	slug: string;
	content: string;
	status: string;
	link: string;
	type: string;
	order: number;
	comment_status: string;
	comment_count: number;
	thumbnail_id: number;

}
