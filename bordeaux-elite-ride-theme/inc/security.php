<?php
/**
 * Sécurité — headers HTTP, protection XMLRPC, sanitisation
 */

if ( ! defined( 'ABSPATH' ) ) exit;

// Headers de sécurité
add_action( 'send_headers', 'ber_security_headers' );
function ber_security_headers() {
    if ( is_admin() ) return;

    header( 'X-Content-Type-Options: nosniff' );
    header( 'X-Frame-Options: SAMEORIGIN' );
    header( 'X-XSS-Protection: 1; mode=block' );
    header( 'Referrer-Policy: strict-origin-when-cross-origin' );
    header( 'Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()' );

    // CSP — ajuster selon les ressources tierces utilisées
    $csp_directives = [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.gstatic.com",
        "font-src 'self' https://fonts.gstatic.com",
        "img-src 'self' data: https:",
        "connect-src 'self' https://api.anthropic.com",
        "frame-ancestors 'self'",
        "base-uri 'self'",
        "form-action 'self'",
    ];
    header( 'Content-Security-Policy: ' . implode( '; ', $csp_directives ) );
}

// Désactiver XMLRPC
add_filter( 'xmlrpc_enabled', '__return_false' );
remove_action( 'wp_head', 'rsd_link' );
remove_action( 'wp_head', 'wp_generator' );
add_filter( 'xmlrpc_methods', function() { return []; } );

// Masquer la version WordPress
add_filter( 'the_generator', '__return_empty_string' );

// Désactiver l'édition de fichiers depuis l'admin
if ( ! defined( 'DISALLOW_FILE_EDIT' ) ) {
    define( 'DISALLOW_FILE_EDIT', true );
}

// Limiter les tentatives de connexion (basique — Wordfence le fait mieux)
add_filter( 'authenticate', 'ber_limit_login_attempts', 30, 3 );
function ber_limit_login_attempts( $user, $username, $password ) {
    if ( empty( $username ) ) return $user;

    $ip       = ber_get_client_ip();
    $key      = 'ber_login_attempts_' . md5( $ip );
    $attempts = (int) get_transient( $key );

    if ( $attempts >= 5 ) {
        return new WP_Error( 'too_many_attempts', __( 'Trop de tentatives de connexion. Réessayez dans 15 minutes.', 'bordeaux-elite-ride' ) );
    }

    if ( $user instanceof WP_Error ) {
        set_transient( $key, $attempts + 1, 15 * MINUTE_IN_SECONDS );
    } else {
        delete_transient( $key );
    }

    return $user;
}

// Helper: obtenir l'IP client (respecte les proxies de confiance)
function ber_get_client_ip() {
    $headers = [ 'HTTP_CF_CONNECTING_IP', 'HTTP_X_REAL_IP', 'REMOTE_ADDR' ];
    foreach ( $headers as $header ) {
        if ( ! empty( $_SERVER[ $header ] ) ) {
            $ip = sanitize_text_field( wp_unslash( $_SERVER[ $header ] ) );
            if ( filter_var( $ip, FILTER_VALIDATE_IP ) ) {
                return $ip;
            }
        }
    }
    return '0.0.0.0';
}

// Sanitisation helpers réutilisables
function ber_sanitize_phone( $phone ) {
    $phone = preg_replace( '/[^0-9+\-\s()]/', '', $phone );
    return substr( trim( $phone ), 0, 20 );
}

function ber_sanitize_name( $name ) {
    return substr( sanitize_text_field( $name ), 0, 100 );
}
