import { Directive, ElementRef, OnInit } from '@angular/core';
declare var $:any;


@Directive({
  selector: '[appWpeoModal]'
})
export class WpeoModalDirective implements OnInit {

  constructor(public el: ElementRef) { }

	ngOnInit() {
		$ ( this.el.nativeElement ).find( '.wpeo-modal-event' ).click( function() {
			$( this ).closest( '.parent-container' ).find( '.wpeo-modal' ).addClass( 'modal-active' );
		} );

		$( this.el.nativeElement ).find( '.modal-close' ).click( function() {
			$( this ).closest( '.wpeo-modal' ).removeClass( 'modal-active' );
		} );
	}
}
