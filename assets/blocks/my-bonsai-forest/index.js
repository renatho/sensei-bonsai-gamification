/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';

registerBlockType( 'sensei-bonsai-gamification/my-bonsai-forest', {
	title: __( 'My Bonsai Forest', 'sensei-bonsai-gamification' ),
	description: __(
		'This block shows the user Bonsai Forest, with all of their claimed Knowledge Bonsais.',
		'sensei-bonsai-gamification'
	),
	keywords: [
		__( 'Forest', 'sensei-bonsai-gamification' ),
		__( 'Collection', 'sensei-bonsai-gamification' ),
		__( 'Bonsai', 'sensei-bonsai-gamification' ),
		__( 'Knowledge', 'sensei-bonsai-gamification' ),
		__( 'Gamification', 'sensei-bonsai-gamification' ),
		__( 'Reward', 'sensei-bonsai-gamification' ),
		__( 'Sensei', 'sensei-bonsai-gamification' ),
	],
	supports: {
		align: true,
		color: {
			gradients: true,
		},
	},
	attributes: {
		title: {
			type: 'string',
			default: __( 'My Bonsai Forest', 'sensei-bonsai-gamification' ),
		},
		introduction: {
			type: 'string',
			default: __(
				'This forest contains all Knowledge Bonsais you have ever claimed.',
				'sensei-bonsai-gamification'
			),
		},
	},
	edit,
	save,
} );
