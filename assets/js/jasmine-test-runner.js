var JasmineTestRunner = JasmineTestRunner || {};

( function( $ ) {

	'use strict';

	JasmineTestRunner = {

		/**
		 * Responsible for initilization of JasmineTestRunner.
		 *
		 * @since 0.1
		 *
		 * @returns null Nothing returned.
		 */
		init: function() {
			$( window ).on( 'jasmineToggled', this.hideToggle );
		},

		/**
		 * Hides/Shows the Jasmine Test Runner.
		 *
		 * This method hides and shows the Jasmine Test Runner
		 * content from the toolbar.  The icon is triggered by
		 * the click that occurs on the arrow in the upper right
		 * hand corner of the Jasmine Test Runner toolbar.
		 *
		 * @since 0.1
		 *
		 * @returns null Nothing returned.
		 */
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