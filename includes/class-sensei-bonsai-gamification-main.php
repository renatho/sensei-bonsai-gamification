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
		add_action( 'enqueue_block_editor_assets', [ $this, 'enqueue_block_editor_assets' ] );
		add_action( 'wp_ajax_sensei_bonsai_gamification_claim_bonsai', array( $this, 'claim_bonsai' ) );
		add_action( 'init', [ $this, 'register_post_metas' ] );

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
				$this->config_frontend_assets['dependencies'],
				$this->config_frontend_assets['version'],
				true
			);

			global $post;

			wp_localize_script(
				'sensei-bonsai-gamification-frontend-script',
				'sensei_bonsai_gamification',
				[
					'postId'     => $post->ID,
					'claimSound' => plugins_url( 'build/sounds/bonsai.mp3', SENSEI_BONSAI_GAMIFICATION_PLUGIN_FILE ),
					'ajax'       => [
						'nonce'  => wp_create_nonce( 'sensei_bonsai_gamification_' . $post->ID ),
						'url'    => admin_url( 'admin-ajax.php' ),
						'action' => 'sensei_bonsai_gamification_claim_bonsai',
					],
				]
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

	/**
	 * Claim bonsai Ajax.
	 *
	 * @access private
	 */
	public function claim_bonsai() {
		if ( ! isset( $_POST['post_id'] ) || ! isset( $_POST['bonsai_id'] ) ) {
			wp_die();
		}

		check_ajax_referer( 'sensei_bonsai_gamification_' . absint( $_POST['post_id'] ) );

		error_log( $_POST['post_id'] );
		error_log( $_POST['bonsai_id'] );
		error_log( get_current_user_id() );
	}

	/**
	 * Register post metas.
	 *
	 * @access private
	 */
	public function register_post_metas() {
		register_post_meta(
			'',
			'_bonsai_ids',
			[
				'show_in_rest'  => true,
				'single'        => false,
				'type'          => 'string',
				'auth_callback' => function( $allowed, $meta_key, $post_id ) {
					$post_type = get_post_type( $post_id );
					return current_user_can( get_post_type_object( $post_type )->cap->edit_post, $post_id );
				},
			]
		);
	}
}
