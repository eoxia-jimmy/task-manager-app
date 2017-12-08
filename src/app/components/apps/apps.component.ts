import { Component, OnInit } from '@angular/core';

import { App } from './../../app';

import { AppService } from '../../services/app/app.service'

@Component({
  selector: 'app-apps',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.scss']
})
export class AppsComponent  {
	connected: boolean = false;

	model = new App(1, 'Test', 'http://127.0.0.1/', 'JIAOJDFO', '9U89_ç' );

	constructor(private appService: AppService) {}

	add(appData: App): void {
		this.appService.add(appData);
	}

}
