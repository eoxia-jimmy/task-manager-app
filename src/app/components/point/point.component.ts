import { Component, Input, OnInit } from '@angular/core';

import { Point } from './../../models/point';

import { PointService } from '../../services/point/point.service';

@Component({
  selector: 'app-point',
  templateUrl: './point.component.html',
  styleUrls: ['./point.component.scss']
})
export class PointComponent implements OnInit {
	@Input('task_id')
	task_id: Number;

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

	add(task_id: Number, content: string): void {
		this.pointService.add(task_id, content).subscribe( (data ) => {
		} );
	}

	edit(point:Point):void {
		this.pointService.put(point).subscribe( (data ) => {});
	}
}
