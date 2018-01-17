import { Component, Input, OnInit } from '@angular/core';

import { TaskService } from './../../services/task/task.service';
import { TaskComponent } from './../task/task.component';

import { Task } from './../../models/task';

@Component({
	selector: 'app-task-option',
	templateUrl: './task-option.component.html',
	styleUrls: ['./task-option.component.scss']
})
export class TaskOptionComponent implements OnInit {
	@Input('task')
	task: Task;

	constructor(
		private taskService: TaskService,
		private taskComponent: TaskComponent) {}

	ngOnInit() {}

	changeColor(color: string): void {
		this.task.front_info.display_color = color;

		this.taskService.put(this.task).subscribe( (data) => {} );
	}

	goToArchive(task: Task): void {
		this.taskService.sendToArchive(task).subscribe( (data) => {
			this.taskComponent.deleteTask(task);
		});
	}

	deleteTask(task: Task): void {
		task.status = 'trash';
		this.taskService.put(task).subscribe( (data) => {
			this.taskComponent.deleteTask(task);
		});
	}
}
