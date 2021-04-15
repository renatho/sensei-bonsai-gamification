/**
 * WordPress dependencies
 */
import { BlockControls } from '@wordpress/block-editor';
import { ToolbarGroup } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import bonsais from './bonsais';
import ToolbarDropdown from '../toolbar-dropdown';

const Settings = ( { selectedBonsai, setAttributes } ) => (
	<BlockControls>
		<ToolbarGroup>
			<ToolbarDropdown
				icon={ selectedBonsai.icon }
				options={ bonsais }
				optionsLabel={ __(
					'Choose a bonsai',
					'sensei-bonsai-gamification'
				) }
				value={ selectedBonsai.value }
				onChange={ ( value ) => setAttributes( { bonsaiType: value } ) }
			/>
		</ToolbarGroup>
	</BlockControls>
);

export default Settings;
