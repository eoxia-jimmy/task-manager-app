export class OAuthModel {
	constructor(
		public consumerKey: string,
		public consumerSecret: string,
		public namespace: string,
		public baseUrl: string,
		public tokenKey: string,
		public tokenSecret: string
	) {}

}
