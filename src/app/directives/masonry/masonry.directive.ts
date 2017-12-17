import { Directive, ElementRef, AfterViewChecked } from '@angular/core';
declare var Masonry:any;

@Directive({
  selector: '[appMasonry]'
})
export class MasonryDirective implements AfterViewChecked {
	constructor(public el: ElementRef) {}

	ngAfterViewChecked() {
		new Masonry( '.tasks' );
	}

}
