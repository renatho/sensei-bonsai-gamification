<?php
/**
 * File containing the Sensei_Bonsai_Gamification_Main class.
 *
 * @package sensei-bonsai-gamification
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Main plugin class.
 */
class Sensei_Bonsai_Gamification_Main {

	/**
	 * Sensei_Main constructor.
	 */
	public function __construct() {
		add_action( 'enqueue_block_editor_assets', [ $this, 'enqueue_block_editor_assets' ] );
	}

	/**
	 * Enqueue block editor assets.
	 *
	 * @access private
	 */
	public function enqueue_block_editor_assets() {
		$config = require plugin_dir_path( SENSEI_BONSAI_GAMIFICATION_PLUGIN_FILE ) . 'build/editor.asset.php';

		wp_enqueue_script(
			'sensei-bonsai-gamification-editor-script',
			plugins_url( 'build/editor.js', SENSEI_BONSAI_GAMIFICATION_PLUGIN_FILE ),
			$config['dependencies'],
			$config['version'],
			true
		);
	}
}
