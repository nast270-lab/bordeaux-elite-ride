<?php
/**
 * Configuration du thème
 */

if ( ! defined( 'ABSPATH' ) ) exit;

add_action( 'after_setup_theme', 'ber_theme_setup' );
function ber_theme_setup() {
    load_theme_textdomain( 'bordeaux-elite-ride', BER_DIR . '/languages' );

    add_theme_support( 'title-tag' );
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'html5', [ 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script' ] );
    add_theme_support( 'custom-logo' );
    add_theme_support( 'customize-selective-refresh-widgets' );
    add_theme_support( 'responsive-embeds' );
    add_theme_support( 'wp-block-styles' );

    // Désactiver les emojis WordPress (perf)
    remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
    remove_action( 'wp_print_styles', 'print_emoji_styles' );
    remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
    remove_action( 'admin_print_styles', 'print_emoji_styles' );

    // Désactiver jQuery migrate (perf)
    add_action( 'wp_default_scripts', function( $scripts ) {
        if ( ! is_admin() && isset( $scripts->registered['jquery'] ) ) {
            $script = $scripts->registered['jquery'];
            if ( $script->deps ) {
                $script->deps = array_diff( $script->deps, [ 'jquery-migrate' ] );
            }
        }
    });
}

// Taille des images
add_action( 'after_setup_theme', 'ber_image_sizes' );
function ber_image_sizes() {
    add_image_size( 'ber-hero', 1920, 1080, true );
    add_image_size( 'ber-card', 800, 600, true );
    add_image_size( 'ber-thumb', 400, 300, true );
}

// Nettoyer le head WordPress
remove_action( 'wp_head', 'wp_generator' );
remove_action( 'wp_head', 'wlwmanifest_link' );
remove_action( 'wp_head', 'rsd_link' );
remove_action( 'wp_head', 'wp_shortlink_wp_head' );
remove_action( 'wp_head', 'adjacent_posts_rel_link_wp_head', 10 );
remove_action( 'wp_head', 'feed_links_extra', 3 );
