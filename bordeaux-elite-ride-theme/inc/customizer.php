<?php
/**
 * Options WordPress Customizer
 */

if ( ! defined( 'ABSPATH' ) ) exit;

add_action( 'customize_register', 'ber_customizer_register' );
function ber_customizer_register( $wp_customize ) {

    // ─── Section: Identité de marque ───────────────────────────
    $wp_customize->add_section( 'ber_brand', [
        'title'    => 'Bordeaux Elite Ride — Identité',
        'priority' => 30,
    ]);

    $fields = [
        'ber_brand_name'    => [ 'label' => 'Nom de la marque',         'default' => 'Bordeaux Privilège' ],
        'ber_brand_tagline' => [ 'label' => 'Slogan (sous logo)',        'default' => 'Chauffeur Privé' ],
        'ber_phone'         => [ 'label' => 'Téléphone (format tel:)',   'default' => '+33644691032' ],
        'ber_phone_display' => [ 'label' => 'Téléphone (affiché)',       'default' => '+33 6 44 69 10 32' ],
        'ber_whatsapp'      => [ 'label' => 'WhatsApp (sans +)',         'default' => '33644691032' ],
        'ber_email'         => [ 'label' => 'Email de contact',          'default' => 'contact@bordeaux-privilege.fr' ],
    ];

    foreach ( $fields as $id => $args ) {
        $wp_customize->add_setting( $id, [ 'default' => $args['default'], 'sanitize_callback' => 'sanitize_text_field' ]);
        $wp_customize->add_control( $id, [ 'label' => $args['label'], 'section' => 'ber_brand', 'type' => 'text' ]);
    }

    // ─── Section: Réseaux sociaux ──────────────────────────────
    $wp_customize->add_section( 'ber_social', [
        'title'    => 'Bordeaux Elite Ride — Réseaux sociaux',
        'priority' => 31,
    ]);

    $socials = [
        'ber_instagram' => 'URL Instagram',
        'ber_facebook'  => 'URL Facebook',
        'ber_linkedin'  => 'URL LinkedIn',
    ];

    foreach ( $socials as $id => $label ) {
        $wp_customize->add_setting( $id, [ 'default' => '', 'sanitize_callback' => 'esc_url_raw' ]);
        $wp_customize->add_control( $id, [ 'label' => $label, 'section' => 'ber_social', 'type' => 'url' ]);
    }

    // ─── Section: API & Intégrations ──────────────────────────
    $wp_customize->add_section( 'ber_api', [
        'title'    => 'Bordeaux Elite Ride — API & Intégrations',
        'priority' => 32,
    ]);

    // Note: les clés API sensibles doivent être dans wp-config.php
    // Ces champs sont pour les options non-sensibles
    $wp_customize->add_setting( 'ber_chatbot_enabled', [ 'default' => '1', 'sanitize_callback' => 'sanitize_text_field' ]);
    $wp_customize->add_control( 'ber_chatbot_enabled', [
        'label'   => 'Activer le chatbot IA',
        'section' => 'ber_api',
        'type'    => 'checkbox',
    ]);

    $wp_customize->add_setting( 'ber_chatbot_rate_limit', [ 'default' => '20', 'sanitize_callback' => 'absint' ]);
    $wp_customize->add_control( 'ber_chatbot_rate_limit', [
        'label'       => 'Limite messages chatbot / heure / IP',
        'description' => 'Nombre maximum de messages par heure par adresse IP (défaut: 20)',
        'section'     => 'ber_api',
        'type'        => 'number',
    ]);

    // ─── Section: SEO ─────────────────────────────────────────
    $wp_customize->add_section( 'ber_seo', [
        'title'    => 'Bordeaux Elite Ride — SEO',
        'priority' => 33,
    ]);

    $wp_customize->add_setting( 'ber_meta_description', [
        'default'           => 'Bordeaux Privilège — Votre chauffeur privé VTC à Bordeaux. Transferts aéroport, gare, longue distance. Réservation en ligne 24h/24.',
        'sanitize_callback' => 'sanitize_textarea_field',
    ]);
    $wp_customize->add_control( 'ber_meta_description', [
        'label'   => 'Meta description par défaut',
        'section' => 'ber_seo',
        'type'    => 'textarea',
    ]);

    $wp_customize->add_setting( 'ber_og_image', [ 'default' => '', 'sanitize_callback' => 'esc_url_raw' ]);
    $wp_customize->add_control( new WP_Customize_Image_Control( $wp_customize, 'ber_og_image', [
        'label'   => 'Image Open Graph par défaut',
        'section' => 'ber_seo',
    ]));
}
