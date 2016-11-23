var JasmineTestRunner = JasmineTestRunner || {};

( function( $ ) {

	'use strict';

	JasmineTestRunner = {
		init: function() {
			$( window ).on( 'jasmineToggled', this.hideToggle );
		},
		hideToggle: function() {
			var arrow =  $( '.jasmine-hide-toggle' );
			var selectors = $( '.jasmine-symbol-summary, .jasmine-alert, .jasmine-status, .jasmine-results' );
			if ( ! $( '.jasmine-wrapped-view' ).length ) {
				$( '.jasmine-test-runner' ).css('overflow-y', 'hidden' );
				selectors.wrapAll( '<div class="jasmine-wrapped-view"/>' );
				$( '.jasmine-wrapped-view' ).slideUp( 400 );
				var bar = $( '.jasmine-banner' );
				var b = bar.position();
				$( '.jasmine-test-runner' ).animate({
					height: b.top + bar.height() + 14
					}, 200 );
				arrow.addClass( 'jasmine-toggled' );	
			} else {
				$( '.jasmine-test-runner' ).animate({height: 300},200, function() {
					$( '.jasmine-test-runner' ).css('overflow-y', 'auto' );
				});
				$( '.jasmine-wrapped-view' ).slideDown( 400 );
				arrow.removeClass( 'jasmine-toggled' );
				$( '.jasmine-results' ).unwrap();
			}
		},
	};
})( jQuery );

JasmineTestRunner.init();