import { Component, Input } from '@angular/core';
import { Point } from './../../models/point';

@Component({
  selector: 'app-point',
  templateUrl: './point.component.html',
  styleUrls: ['./point.component.scss']
})
export class PointComponent {
	@Input('point')
	point: Point;

	constructor() { }

}
