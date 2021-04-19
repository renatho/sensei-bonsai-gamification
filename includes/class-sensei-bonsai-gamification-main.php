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
			wp_die( esc_html__( 'Variables not set.', 'sensei-bonsai-gamification' ), 404 );
		}

		check_ajax_referer( 'sensei_bonsai_gamification_' . absint( $_POST['post_id'] ) );

		$user_id      = get_current_user_id();
		$meta_key     = '_sensei_bonsai_gamification_bonsais';
		$bonsai_id    = sanitize_key( $_POST['bonsai_id'] );
		$post         = get_post( absint( $_POST['post_id'] ) );
		$post_blocks  = parse_blocks( $post->post_content );
		$bonsai_block = $this->get_knowledge_bonsai_block( $post_blocks, $bonsai_id );

		// Skip if bonsai doesn't exist in the post.
		if ( ! $bonsai_block ) {
			wp_die( esc_html__( 'Bonsai not found.', 'sensei-bonsai-gamification' ), 404 );
		}

		$bonsais         = get_user_meta( $user_id, $meta_key, true );
		$user_bonsai_ids = wp_list_pluck( $bonsais, 'bonsaiId' );

		// Skip if bonsai has been already collected.
		if ( in_array( $bonsai_id, $user_bonsai_ids, true ) ) {
			wp_die( esc_html__( 'Bonsai already got.', 'sensei-bonsai-gamification' ), 403 );
		}

		if ( empty( $bonsais ) ) {
			$bonsais = [];
		}

		$bonsais[] = $bonsai_block['attrs'];

		update_user_meta( get_current_user_id(), $meta_key, $bonsais );
	}

	/**
	 * Get a Knowledge Bonsai from post blocks.
	 *
	 * @param array  $post_blocks Parsed post blocks.
	 * @param string $bonsai_id   Bonsai ID.
	 *
	 * @return array|false Block if it was found, otherwise returns false.
	 */
	private function get_knowledge_bonsai_block( $post_blocks, $bonsai_id ) {
		foreach ( $post_blocks as $block ) {
			$bonsai_found = isset( $block['attrs']['bonsaiId'] ) && $bonsai_id === $block['attrs']['bonsaiId'];

			if ( $bonsai_found && 'sensei-bonsai-gamification/knowledge-bonsai' === $block['blockName'] ) {
				return $block;
			}

			// Look inside inner blocks.
			$block = $this->get_knowledge_bonsai_block( $block['innerBlocks'], $bonsai_id );

			if ( $block ) {
				return $block;
			}
		}

		return false;
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
