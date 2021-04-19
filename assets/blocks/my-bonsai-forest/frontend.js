/**
 * WordPress dependencies
 */
import domReady from '@wordpress/dom-ready';

domReady( () => {
	const claimedBonsaiTypes = window.sensei_bonsai_gamification.userBonsais.map(
		( bonsai ) => bonsai.bonsaiType || null
	);

	document
		.querySelectorAll(
			'.wp-block-sensei-bonsai-gamification-my-bonsai-forest .wp-block-sensei-bonsai-gamification-my-bonsai-forest__list__item'
		)
		.forEach( ( bonsaiItem ) => {
			// Amount of claimed bonsais.
			const total = claimedBonsaiTypes.filter(
				( type ) =>
					type === bonsaiItem.dataset.bonsaiType ||
					( null === type && // Temporary solution until set the default value attribute.
						bonsaiItem.dataset.bonsaiType === 'bonsaiA' )
			).length;

			if ( total > 0 ) {
				bonsaiItem.classList.add(
					'wp-block-sensei-bonsai-gamification-my-bonsai-forest__list__item--claimed'
				);

				const labelElement = bonsaiItem.querySelector(
					'.wp-block-sensei-bonsai-gamification-my-bonsai-forest__list__item__label'
				);

				labelElement.innerHTML = `${ labelElement.innerHTML } (${ total })`;
			}
		} );
} );
