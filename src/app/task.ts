import { Point } from './point';

export class Task {
	constructor(
		public ID: number,
		public title: string,
		public taskInfo: any,
		public points: Point[]
	) {}

}
