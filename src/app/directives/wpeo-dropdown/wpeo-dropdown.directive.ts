import { Directive, ElementRef, OnInit } from '@angular/core';
declare var $:any;

@Directive({
  selector: '[appWpeoDropdown]'
})
export class WpeoDropdownDirective implements OnInit {

	constructor(public el: ElementRef) {}

	ngOnInit() {
		$ ( this.el.nativeElement ).find( '.dropdown-toggle' ).click( function() {
			$( this ).closest( '.wpeo-dropdown' ).toggleClass( 'dropdown-active' );
		} );
	}

}
