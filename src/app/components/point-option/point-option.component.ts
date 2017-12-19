import { Component, Input, OnInit } from '@angular/core';

import { Point } from './../../models/point';

@Component({
  selector: 'app-point-option',
  templateUrl: './point-option.component.html',
  styleUrls: ['./point-option.component.scss']
})
export class PointOptionComponent implements OnInit {
	@Input('point')
	point: Point;

	constructor() { }

	ngOnInit() {
	}

	delete(): void {
		console.log('ok');
	}
}
