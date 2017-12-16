import { Directive, ElementRef, AfterViewChecked } from '@angular/core';
declare var $:any;

@Directive({
  selector: '[appWpeoDropdown]'
})
export class WpeoDropdownDirective implements AfterViewChecked {

	constructor(public el: ElementRef) {}

	ngAfterViewChecked() {
		$ ( this.el.nativeElement ).find( '.dropdown-toggle' ).click( function() {
			$( this ).closest( '.wpeo-dropdown' ).toggleClass( 'dropdown-active' );
		} );
	}

}
