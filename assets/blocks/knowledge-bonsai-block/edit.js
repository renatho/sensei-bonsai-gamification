/**
 * External dependencies
 */
import { v4 as uuid } from 'uuid';

/**
 * WordPress dependencies
 */
import { useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import KnowledgeBonsai from './knowledge-bonsai';

const Edit = ( props ) => {
	const {
		attributes: { bonsaiId },
		setAttributes,
	} = props;

	useEffect( () => {
		if ( ! bonsaiId ) {
			setAttributes( { bonsaiId: uuid() } );
		}
	}, [ bonsaiId, setAttributes ] );

	return <KnowledgeBonsai { ...props } scope="edit" />;
};

export default Edit;
