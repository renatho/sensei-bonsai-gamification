/**
 * WordPress dependencies
 */
import { Icon } from '@wordpress/components';
import { RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import bonsais from './bonsais';
import Settings from './settings';

const KnowledgeBonsai = ( {
	className,
	attributes: { bonsaiId, bonsaiType, congratulationsMessage, buttonLabel },
	setAttributes,
	scope,
} ) => {
	const selectedBonsai = bonsais.filter(
		( bonsai ) => bonsai.value === bonsaiType
	)[ 0 ];

	const RichTextComponent = 'edit' === scope ? RichText : RichText.Content;

	return (
		<>
			<section className={ className }>
				{ 'edit' === scope }
				<RichTextComponent
					className="wp-block-sensei-bonsai-gamification-knowledge-bonsai__congratulations-message"
					tagName="h3"
					value={ congratulationsMessage }
					{ ...( 'edit' === scope && {
						onChange: ( value ) =>
							setAttributes( { congratulationsMessage: value } ),
						placeholder: __(
							'Write a congratulations message here…',
							'sensei-bonsai-gamification'
						),
					} ) }
				/>

				<div className="wp-block-sensei-bonsai-gamification-knowledge-bonsai__bonsai">
					<span
						className="wp-block-sensei-bonsai-gamification-knowledge-bonsai__bonsai__glow"
						aria-hidden="true"
					/>
					<Icon
						className="wp-block-sensei-bonsai-gamification-knowledge-bonsai__bonsai__icon"
						icon={ selectedBonsai.icon }
						size="100"
					/>
				</div>

				<div className="wp-block-button">
					<RichTextComponent
						className="wp-block-button__link"
						value={ buttonLabel }
						{ ...( 'edit' === scope
							? {
									onChange: ( value ) =>
										setAttributes( { buttonLabel: value } ),

									placeholder: __(
										'Write a button CTA to claim the Bonsai…',
										'sensei-bonsai-gamification'
									),
							  }
							: {
									tagName: 'button',
									'data-bonsai-id': bonsaiId,
							  } ) }
					/>
				</div>
			</section>

			{ 'edit' === scope && (
				<Settings
					selectedBonsai={ selectedBonsai }
					setAttributes={ setAttributes }
				/>
			) }
		</>
	);
};

export default KnowledgeBonsai;
