import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
	selector: '[appFlextext]'
})
export class FlextextDirective {

	constructor(public el: ElementRef) {}

	@HostListener('keyup') onKeyUp() {
		this.el.nativeElement.style.height = 'auto';
		this.el.nativeElement.style.height = this.el.nativeElement.scrollHeight + 'px';
	}
}
