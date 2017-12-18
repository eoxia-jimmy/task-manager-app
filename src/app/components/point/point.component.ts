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
		}
	}

	add(content: string): void {
		this.pointService.add(this.task.id, content).subscribe( (data ) => {
		} );
	}

	edit(point:Point):void {
		console.log(point);
		if ( point.point_info.completed ) {

		}

		this.pointService.put(point).subscribe( (data ) => {});
	}
}
