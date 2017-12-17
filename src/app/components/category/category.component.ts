import { Component, Input, OnInit } from '@angular/core';

import { Category } from '../../models/category';

import { CategoryService } from '../../services/category/category.service';

@Component({
	selector: 'app-category',
	templateUrl: './category.component.html',
	styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
	@Input('categories_id')
	categories_id: Number[];

	categories: Category[] = [];

	constructor(private categoryService: CategoryService) {}

	ngOnInit(): void {
		this.categoryService.get(this.categories_id).subscribe( (data) => {
			if ( data ) {
				if ( Array.isArray( data ) ) {
					for ( var key in data ) {
						this.categories.push(new Category(data[key]));
					}
				} else {
					this.categories.push(new Category(data));
				}
			}
		} );
	}

}
