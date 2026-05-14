<?php
/**
 * Chargement des assets CSS et JS
 */

if ( ! defined( 'ABSPATH' ) ) exit;

add_action( 'wp_enqueue_scripts', 'ber_enqueue_assets' );
function ber_enqueue_assets() {
    $ver = BER_VERSION;

    // CSS principal
    wp_enqueue_style( 'ber-main', BER_URI . '/assets/css/main.css', [], $ver );
    wp_enqueue_style( 'ber-chatbot', BER_URI . '/assets/css/chatbot.css', [ 'ber-main' ], $ver );

    // JS modules (defer par défaut)
    wp_enqueue_script( 'ber-main', BER_URI . '/assets/js/main.js', [], $ver, true );
    wp_enqueue_script( 'ber-scroll', BER_URI . '/assets/js/scroll-effects.js', [ 'ber-main' ], $ver, true );
    wp_enqueue_script( 'ber-chatbot', BER_URI . '/assets/js/chatbot.js', [ 'ber-main' ], $ver, true );

    // Booking form uniquement sur les pages qui en ont besoin
    if ( is_front_page() || is_page( 'reservation' ) ) {
        wp_enqueue_script( 'ber-booking', BER_URI . '/assets/js/booking.js', [ 'ber-main' ], $ver, true );
    }

    // Contact form uniquement sur la page contact
    if ( is_page( 'contact' ) ) {
        wp_enqueue_script( 'ber-contact', BER_URI . '/assets/js/contact.js', [ 'ber-main' ], $ver, true );
    }

    // Localiser les scripts avec les URLs AJAX et nonces
    wp_localize_script( 'ber-main', 'berConfig', [
        'ajaxUrl'       => admin_url( 'admin-ajax.php' ),
        'restUrl'       => rest_url( 'ber/v1/' ),
        'nonceChatbot'  => wp_create_nonce( 'ber_chatbot_nonce' ),
        'nonceBooking'  => wp_create_nonce( 'ber_booking_nonce' ),
        'nonceContact'  => wp_create_nonce( 'ber_contact_nonce' ),
        'phone'         => esc_attr( get_theme_mod( 'ber_phone', '+33644691032' ) ),
        'whatsapp'      => esc_attr( get_theme_mod( 'ber_whatsapp', '33644691032' ) ),
        'reservationUrl' => esc_url( home_url( '/reservation/' ) ),
        'i18n' => [
            'required'    => 'Ce champ est requis.',
            'emailInvalid' => 'Email invalide.',
            'phoneInvalid' => 'Numéro de téléphone invalide.',
            'sending'     => 'Envoi en cours...',
            'error'       => 'Une erreur est survenue. Veuillez réessayer.',
        ],
    ]);
}

// Ajouter defer/async sur les scripts du thème
add_filter( 'script_loader_tag', 'ber_script_loader_tag', 10, 3 );
function ber_script_loader_tag( $tag, $handle, $src ) {
    $defer_scripts = [ 'ber-main', 'ber-scroll', 'ber-chatbot', 'ber-booking', 'ber-contact' ];
    if ( in_array( $handle, $defer_scripts, true ) ) {
        return str_replace( ' src=', ' defer src=', $tag );
    }
    return $tag;
}
