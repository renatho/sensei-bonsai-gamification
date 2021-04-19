/**
 * WordPress dependencies
 */
import { Icon } from '@wordpress/components';
import { RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import bonsais from '../knowledge-bonsai-block/bonsais';

const MyBonsaiForest = ( {
	className,
	attributes: { title, introduction },
	setAttributes,
	scope,
} ) => {
	const RichTextComponent = 'edit' === scope ? RichText : RichText.Content;

	return (
		<section className={ className }>
			<RichTextComponent
				className="wp-block-sensei-bonsai-gamification-my-bonsai-forest__title"
				tagName="h2"
				value={ title }
				{ ...( 'edit' === scope && {
					onChange: ( value ) => setAttributes( { title: value } ),
					placeholder: __(
						'Write a title to the Bonsai Forest…',
						'sensei-bonsai-gamification'
					),
				} ) }
			/>
			<RichTextComponent
				className="wp-block-sensei-bonsai-gamification-my-bonsai-forest__introduction"
				tagName="p"
				value={ introduction }
				{ ...( 'edit' === scope && {
					onChange: ( value ) =>
						setAttributes( { introduction: value } ),
					placeholder: __(
						'Write a introduction to the Bonsai Forest…',
						'sensei-bonsai-gamification'
					),
				} ) }
			/>
			<ul className="wp-block-sensei-bonsai-gamification-my-bonsai-forest__list">
				{ bonsais.map( ( bonsai ) => (
					<li
						key={ bonsai.value }
						className="wp-block-sensei-bonsai-gamification-my-bonsai-forest__list__item"
						data-bonsai-type={ bonsai.value }
					>
						<Icon icon={ bonsai.icon } size="100" />
						<p>{ bonsai.label }</p>
					</li>
				) ) }
			</ul>
		</section>
	);
};

export default MyBonsaiForest;
