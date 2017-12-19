import { Component, Input, OnInit } from '@angular/core';

import { Point } from './../../models/point';

import { PointComponent } from '../../components/point/point.component';
import { PointService } from '../../services/point/point.service';

@Component({
  selector: 'app-point-option',
  templateUrl: './point-option.component.html',
  styleUrls: ['./point-option.component.scss']
})
export class PointOptionComponent implements OnInit {
	@Input('point')
	point: Point;

	constructor(public pointComponent: PointComponent, public pointService: PointService) { }

	ngOnInit() {}

	delete(): void {
		this.point.status = '-34071';
		this.pointService.put( this.point ).subscribe( (data) => {
			this.pointComponent.delete(this.point);
		} );
	}
}
