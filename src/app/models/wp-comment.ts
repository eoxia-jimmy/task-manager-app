export interface WPComment {
	id: number;
	parent_id: number;
	post_id: number;
	date: string;
	author_id: number;
	author_nicename: string,
	author_email: string,
	author_ip: string,
	content: string;
	status: string;
	type: string;
}
