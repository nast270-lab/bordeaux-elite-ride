<?php
/**
 * Bordeaux Elite Ride - Functions
 */

if ( ! defined( 'ABSPATH' ) ) exit;

define( 'BER_VERSION', '1.0.0' );
define( 'BER_DIR', get_template_directory() );
define( 'BER_URI', get_template_directory_uri() );

// Load includes
require_once BER_DIR . '/inc/theme-setup.php';
require_once BER_DIR . '/inc/enqueue.php';
require_once BER_DIR . '/inc/customizer.php';
require_once BER_DIR . '/inc/seo.php';
require_once BER_DIR . '/inc/schema.php';
require_once BER_DIR . '/inc/security.php';
require_once BER_DIR . '/inc/booking.php';
require_once BER_DIR . '/inc/contact.php';
require_once BER_DIR . '/inc/chatbot.php';
