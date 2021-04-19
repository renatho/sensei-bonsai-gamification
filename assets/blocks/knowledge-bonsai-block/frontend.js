/**
 * WordPress dependencies
 */
import domReady from '@wordpress/dom-ready';
import { __ } from '@wordpress/i18n';

domReady( () => {
	// Claim button action.
	document.querySelectorAll( '.claim-bonsai-button' ).forEach( ( button ) => {
		// Check if bonsai has ever been claimed.
		const found = window.sensei_bonsai_gamification.userBonsais.find(
			( bonsai ) => bonsai.bonsaiId === button.dataset.bonsaiId
		);

		if ( found ) {
			button.setAttribute( 'disabled', 'disabled' );
			return;
		}

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
				.then( ( response ) => {
					if ( ! response.ok ) {
						throw new Error(
							__(
								'An error ocurred: ',
								'sensei-bonsai-gamification'
							) + response.statusText
						);
					}

					new window.Audio(
						window.sensei_bonsai_gamification.claimSound
					).play();
				} )
				.catch( ( err ) => {
					// Todo: Give a better error message than an alert.
					// eslint-disable-next-line no-alert
					window.alert( err );
					button.removeAttribute( 'disabled' );
				} );
		} );
	} );
} );
