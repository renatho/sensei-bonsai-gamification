/**
 * External dependencies
 */
import { v4 as uuid } from 'uuid';

/**
 * WordPress dependencies
 */
import { useEffect } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';

/**
 * Internal dependencies
 */
import KnowledgeBonsai from './knowledge-bonsai';

const useSetBonsaiId = ( { bonsaiId, setAttributes } ) => {
	const { editPost } = useDispatch( 'core/editor' );

	const bonsaiIds = useSelect(
		( select ) =>
			select( 'core/editor' ).getEditedPostAttribute( 'meta' )
				?._bonsai_ids
	);

	// Create a unique id.
	useEffect( () => {
		if ( ! bonsaiId ) {
			setAttributes( { bonsaiId: uuid() } );
		}
	}, [ bonsaiId, setAttributes ] );

	// Add bonsai id to the post bonsai ids.
	useEffect( () => {
		if ( bonsaiId && ! bonsaiIds.includes( bonsaiId ) ) {
			editPost( {
				meta: { _bonsai_ids: [ ...bonsaiIds, bonsaiId ] },
			} );
		}
	}, [ bonsaiId, bonsaiIds, editPost ] );
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
