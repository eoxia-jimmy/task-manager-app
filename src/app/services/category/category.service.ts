import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { HttpService } from './../http/http.service';

@Injectable()
export class CategoryService {

  constructor(private httpService: HttpService) { }

	get(id: Number[]): Observable<any> {
		return this.httpService.get(localStorage.getItem( 'currentAppURL' ), 'wp-json/task_manager/v1/tags/' + id.join( ',' ) );
	}

}
