/**
 * WordPress dependencies
 */
import domReady from '@wordpress/dom-ready';

domReady( () => {
	document.querySelectorAll( '.claim-bonsai-button' ).forEach( ( button ) => {
		button.addEventListener( 'click', () => {
			button.setAttribute( 'disabled', 'disabled' );

			const formData = new window.FormData();
			formData.append(
				'action',
				window.sensei_bonsai_gamification.ajax.action
			);
			formData.append(
				'_ajax_nonce',
				window.sensei_bonsai_gamification.ajax.nonce
			);
			formData.append(
				'post_id',
				window.sensei_bonsai_gamification.postId
			);
			formData.append( 'bonsai_id', button.dataset.bonsaiId );

			window
				.fetch( window.sensei_bonsai_gamification.ajax.url, {
					method: 'POST',
					body: formData,
				} )
				.then( ( res ) => {
					console.log( res );
					new window.Audio(
						window.sensei_bonsai_gamification.claimSound
					).play();
				} );
		} );
	} );
} );
