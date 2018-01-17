import { Component, Input, OnInit } from '@angular/core';

import { Task } from './../../models/task';
import { User } from './../../models/user';

import { TaskService } from '../../services/task/task.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss']
})
export class OwnerComponent implements OnInit {
	@Input('task')
	task: Task;

	users: User[] = [];
	currentUser: User;

	constructor(
		public userService: UserService,
		public taskService: TaskService) { }

	ngOnInit() {
		this.userService.getID(this.task.user_info.owner_id).subscribe( (data) => {
			this.currentUser = data;
		} );

		this.userService.get().subscribe( (data) => {
			this.refresh(data);
		} );
	}

	refresh(data: any): void {
		for ( var key in data ) {
			this.users.push(new User(data[key]));
		}
	}

	changeOwner(task: Task, user: User) {
		task.user_info.owner_id = user.id;
		this.currentUser = user;
		this.taskService.put(task).subscribe( (data) => {

		});
	}

}
