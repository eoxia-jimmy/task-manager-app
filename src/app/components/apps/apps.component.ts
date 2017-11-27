import { Component, OnInit } from '@angular/core';

import { App } from './../../app';

import { AppService } from './../../services/app/app.service';

@Component({
  selector: 'app-apps',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.scss']
})
export class AppsComponent implements OnInit {
	apps: App[];

  constructor(private appService: AppService) { }

  ngOnInit() {
		this.getApps();
  }

	add(): void {
		this.appService.add();
	}

	getApps(): void {
		this.appService.getApps()
			.subscribe(apps => this.apps = apps);
	}

}
