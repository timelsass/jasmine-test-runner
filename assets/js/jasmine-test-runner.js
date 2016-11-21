JasmineTestRunner = {
	init: function() {
		jQuery( document ).ready( this.onReady );
		jQuery( window ).on( 'jasmineToggled', this.hideToggle );
	},
	onReady: function() {
	    if ( JasmineTestRunner.getUrlVars().jasmine ) {
	    	console.log( 'jasmine query string detected' );
	    }
	},
	// Toggles the view if it's in the way.
	hideToggle: function() {
		console.log( 'this is fired' );
		var arrow =  jQuery( '.jasmine-hide-toggle' );
		var selectors = jQuery( '.jasmine-symbol-summary, .jasmine-alert, .jasmine-status, .jasmine-results' );
		if ( ! jQuery( '.jasmine-wrapped-view' ).length ) {
			jQuery( '.jasmine-test-runner' ).css('overflow-y', 'hidden' );
			selectors.wrapAll( '<div class="jasmine-wrapped-view"/>' );
			jQuery( '.jasmine-wrapped-view' ).slideUp( 400 );
			var bar = jQuery( '.jasmine-banner' );
			var b = bar.position();
			jQuery( '.jasmine-test-runner' ).animate({
				height: b.top + bar.height() + 14
				}, 200 );
			arrow.addClass( 'jasmine-toggled' );	
		} else {
			jQuery( '.jasmine-test-runner' ).animate({height: 300},200, function() {
				jQuery( '.jasmine-test-runner' ).css('overflow-y', 'auto' );
			});
			jQuery( '.jasmine-wrapped-view' ).slideDown( 400 );
			arrow.removeClass( 'jasmine-toggled' );
			jQuery( '.jasmine-results' ).unwrap();
		}
	},
	getUrlVars: function() {
	    var vars = [], hash;
	    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	    for (var i = 0; i < hashes.length; i++) {
	        hash = hashes[i].split('=');
	        vars.push(hash[0]);
	        vars[hash[0]] = hash[1];
	    }
	    return vars;
	},
};

JasmineTestRunner.init();