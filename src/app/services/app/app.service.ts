import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { App } from '../../app';
// import { APPS } from '../../mock-apps';

import { AuthService } from './../auth/auth.service';

@Injectable()
export class AppService {

  constructor(private authService: AuthService) { }

	add(appData: App): void {
		this.authService.makeFirstRequest(appData)
			.subscribe((response) => {
				console.log(response);
			});
	}

	getApps(): void {
		// return of(APPS);
	}
}
