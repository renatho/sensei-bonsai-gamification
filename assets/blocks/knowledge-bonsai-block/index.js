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

registerBlockType( 'sensei-bonsai-gamification/knowledge-bonsai', {
	title: __( 'Knowledge Bonsai', 'sensei-bonsai-gamification' ),
	description: __(
		'Add this Knowledge Bonsais in strategic parts of your site where you think a reward is deserved.',
		'sensei-bonsai-gamification'
	),
	keywords: [
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
		bonsaiId: {
			type: 'string',
		},
		bonsaiType: {
			type: 'string',
			default: 'bonsaiA',
		},
		congratulationsMessage: {
			type: 'string',
			default: __(
				'Congratulations on being here! You are learning a lot!',
				'sensei-bonsai-gamification'
			),
		},
		buttonLabel: {
			type: 'string',
			default: __(
				'Claim Knowledge Bonsai!',
				'sensei-bonsai-gamification'
			),
		},
	},
	edit,
	save,
} );
