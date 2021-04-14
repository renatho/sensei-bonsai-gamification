<?php
/**
 * Plugin Name: Sensei Bonsai Gamification
 * Description: Make your courses more fun with this gamification plugin for Sensei, where the students can claim Knowledge Bonsais in their learning process!
 * Version: 0.0.1
 * Author: Automattic
 * Author URI: https://automattic.com
 * License: GPL version 2 or later - http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 * Requires at least: 5.5
 * Tested up to: 5.7
 * Requires PHP: 7.0
 * Text Domain: sensei-bonsai-gamification
 * Domain path: /lang/
 *
 * @package sensei-bonsai-gamification
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

define( 'SENSEI_BONSAI_GAMIFICATION_PLUGIN_FILE', __FILE__ );

require_once dirname( __FILE__ ) . '/includes/class-sensei-bonsai-gamification-main.php';

new Sensei_Bonsai_Gamification_Main();
