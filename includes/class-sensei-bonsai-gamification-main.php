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
	 * An array which contains job state.
	 *
	 * @var array
	 */
	private $config_index_assets;

	/**
	 * Sensei_Main constructor.
	 */
	public function __construct() {
		add_action( 'enqueue_block_assets', [ $this, 'enqueue_block_assets' ] );
		add_action( 'enqueue_block_editor_assets', [ $this, 'enqueue_block_editor_assets' ] );

		$this->config_index_assets = require plugin_dir_path( SENSEI_BONSAI_GAMIFICATION_PLUGIN_FILE ) . 'build/index.asset.php';
	}

	/**
	 * Enqueue block assets.
	 *
	 * @access private
	 */
	public function enqueue_block_assets() {
		wp_enqueue_style(
			'sensei-bonsai-gamification-style',
			plugins_url( 'build/style-index.css', SENSEI_BONSAI_GAMIFICATION_PLUGIN_FILE ),
			[],
			$this->config_index_assets['version']
		);

		// Frontend only.
		$this->config_frontend_assets = require plugin_dir_path( SENSEI_BONSAI_GAMIFICATION_PLUGIN_FILE ) . 'build/frontend.asset.php';

		if ( ! is_admin() ) {
			wp_enqueue_script(
				'sensei-bonsai-gamification-frontend-script',
				plugins_url( 'build/frontend.js', SENSEI_BONSAI_GAMIFICATION_PLUGIN_FILE ),
				$this->config_index_assets['dependencies'],
				$this->config_index_assets['version'],
				true
			);
		}
	}

	/**
	 * Enqueue block editor assets.
	 *
	 * @access private
	 */
	public function enqueue_block_editor_assets() {
		wp_enqueue_script(
			'sensei-bonsai-gamification-editor-script',
			plugins_url( 'build/index.js', SENSEI_BONSAI_GAMIFICATION_PLUGIN_FILE ),
			$this->config_index_assets['dependencies'],
			$this->config_index_assets['version'],
			true
		);

		wp_enqueue_style(
			'sensei-bonsai-gamification-editor-style',
			plugins_url( 'build/index.css', SENSEI_BONSAI_GAMIFICATION_PLUGIN_FILE ),
			[],
			$this->config_index_assets['version']
		);
	}
}
