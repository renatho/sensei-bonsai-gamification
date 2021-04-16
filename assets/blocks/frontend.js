document.querySelectorAll( '.claim-bonsai-button' ).forEach( ( button ) => {
	button.addEventListener( 'click', () => {
		new window.Audio(
			'/wp-content/plugins/sensei-bonsai-gamification/build/sounds/bonsai.mp3'
		).play();

		button.setAttribute( 'disabled', 'disabled' );
	} );
} );
