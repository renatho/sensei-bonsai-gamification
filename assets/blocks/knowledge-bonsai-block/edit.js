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

const useSetBonsaiId = ( { bonsaiId, setAttributes } ) => {
	// Create a unique id.
	useEffect( () => {
		if ( ! bonsaiId ) {
			setAttributes( { bonsaiId: uuid() } );
		}
	}, [ bonsaiId, setAttributes ] );
};

const Edit = ( props ) => {
	const {
		attributes: { bonsaiId },
		setAttributes,
	} = props;

	useSetBonsaiId( { bonsaiId, setAttributes } );

	return <KnowledgeBonsai { ...props } scope="edit" />;
};

export default Edit;
