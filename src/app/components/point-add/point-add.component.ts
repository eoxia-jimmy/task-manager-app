import { Component, Input } from '@angular/core';

import { PointService } from '../../services/point/point.service';

import { Task } from './../../models/task';

@Component({
  selector: 'app-point-add',
  templateUrl: './point-add.component.html',
  styleUrls: ['./point-add.component.scss']
})
export class PointAddComponent{
	@Input('task')
	task: Task;

	constructor(public pointService: PointService) {}

	addPoint(task_id: Number, content: string): void {
		this.pointService.add(task_id, content).subscribe( (data) => {
			console.log('ok');
		});
	}
}
