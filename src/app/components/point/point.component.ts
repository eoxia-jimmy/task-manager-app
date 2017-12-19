import { Component, Input, OnInit } from '@angular/core';

import { Task } from './../../models/task';
import { Point } from './../../models/point';

import { PointService } from '../../services/point/point.service';

@Component({
  selector: 'app-point',
  templateUrl: './point.component.html',
  styleUrls: ['./point.component.scss']
})
export class PointComponent implements OnInit {
	@Input('task')
	task: Task;

	@Input('points_id')
	points_id: Number[];

	@Input('completed')
	completed: Boolean;

	points: Point[] = [];

	test: string = 'points';

	constructor(private pointService: PointService) { }

	ngOnInit(): void {
		this.pointService.get(this.points_id).subscribe( (data) => {
			this.refresh(data);
		} );
	}

	refresh(data: any): void {
		if ( data ) {
			if ( Array.isArray( data ) ) {
				for ( var key in data ) {
					if (data[key].point_info.completed == this.completed ) {
						this.points.push(new Point(data[key]));
					}
				}
			} else {
				if (data.point_info.completed == this.completed ) {
					this.points.push(new Point(data));
				}
			}

			if ( this.completed ) {
				this.task.pointsCompleted = this.points;
			} else {
				this.task.pointsUncompleted = this.points;
			}
		}
	}

	add(content: string): void {
		this.pointService.add(this.task.id, content).subscribe( (data ) => {
		} );
	}

	edit(point:Point):void {
		let key: string;
		if ( point.point_info.completed ) {
			for ( key in this.task.pointsUncompleted ) {
				if ( this.task.pointsUncompleted[key] === point ) {
					this.task.pointsUncompleted.splice( parseInt( key ), 1 );
					break;
				}
			}

			this.task.pointsCompleted.push(point);

		} else {
			for ( key in this.task.pointsCompleted ) {
				if ( this.task.pointsCompleted[key] === point ) {
					this.task.pointsCompleted.splice( parseInt( key ), 1 );
					break;
				}
			}

			this.task.pointsUncompleted.push(point);
		}

		this.pointService.put(point).subscribe( (data ) => {});
	}

	delete(point:Point): void {
		for (var key in this.points) {
			if ( point == this.points[key] ) {
				this.points = this.points.splice(parseInt(key), 1);
			}
		}
	}
}
