<?php
/**
 * SEO — balises meta, Open Graph, Twitter Cards
 * Compatible Yoast SEO (ne double pas les balises si Yoast est actif)
 */

if ( ! defined( 'ABSPATH' ) ) exit;

// N'injecter les balises que si Yoast/RankMath n'est pas actif
add_action( 'wp_head', 'ber_seo_meta_tags', 1 );
function ber_seo_meta_tags() {
    if ( defined( 'WPSEO_VERSION' ) || defined( 'RANK_MATH_VERSION' ) ) {
        return; // Yoast ou RankMath gèrent le SEO
    }

    $title       = ber_get_seo_title();
    $description = ber_get_seo_description();
    $url         = esc_url( ( is_ssl() ? 'https' : 'http' ) . '://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'] );
    $og_image    = ber_get_og_image();
    $site_name   = get_bloginfo( 'name' );

    // Meta de base
    echo '<meta name="description" content="' . esc_attr( $description ) . '">' . "\n";
    echo '<link rel="canonical" href="' . $url . '">' . "\n";

    // Open Graph
    echo '<meta property="og:type" content="website">' . "\n";
    echo '<meta property="og:title" content="' . esc_attr( $title ) . '">' . "\n";
    echo '<meta property="og:description" content="' . esc_attr( $description ) . '">' . "\n";
    echo '<meta property="og:url" content="' . $url . '">' . "\n";
    echo '<meta property="og:site_name" content="' . esc_attr( $site_name ) . '">' . "\n";
    echo '<meta property="og:locale" content="fr_FR">' . "\n";
    if ( $og_image ) {
        echo '<meta property="og:image" content="' . esc_url( $og_image ) . '">' . "\n";
        echo '<meta property="og:image:width" content="1200">' . "\n";
        echo '<meta property="og:image:height" content="630">' . "\n";
    }

    // Twitter Card
    echo '<meta name="twitter:card" content="summary_large_image">' . "\n";
    echo '<meta name="twitter:title" content="' . esc_attr( $title ) . '">' . "\n";
    echo '<meta name="twitter:description" content="' . esc_attr( $description ) . '">' . "\n";
    if ( $og_image ) {
        echo '<meta name="twitter:image" content="' . esc_url( $og_image ) . '">' . "\n";
    }

    // Robots
    if ( is_404() || is_search() ) {
        echo '<meta name="robots" content="noindex, follow">' . "\n";
    }
}

function ber_get_seo_title() {
    $site_name = get_bloginfo( 'name' );
    if ( is_front_page() ) {
        return $site_name . ' — Chauffeur Privé VTC à Bordeaux';
    }
    if ( is_page() ) {
        return get_the_title() . ' — ' . $site_name;
    }
    return wp_get_document_title();
}

function ber_get_seo_description() {
    $page_descs = [
        'services'    => 'Découvrez tous nos services VTC à Bordeaux : transferts aéroport, gare SNCF, trajets professionnels, longue distance et événements privés.',
        'flotte'      => 'Notre flotte VTC à Bordeaux : SUV hybride haut de gamme, Wi-Fi, climatisation, eau offerte. Confort premium pour 1 à 4 passagers.',
        'tarifs'      => 'Tarifs fixes VTC Bordeaux — prix transparents sans surprise. Bordeaux → Aéroport à partir de 45 €. Devis gratuit pour longue distance.',
        'reservation' => 'Réservez votre chauffeur privé VTC à Bordeaux en ligne en 2 minutes. Confirmation immédiate, paiement sécurisé.',
        'contact'     => 'Contactez Bordeaux Privilège — votre chauffeur VTC à Bordeaux. Disponible 24h/24 par téléphone, email ou WhatsApp.',
    ];

    if ( is_page() ) {
        $slug = get_post_field( 'post_name', get_queried_object_id() );
        if ( isset( $page_descs[ $slug ] ) ) {
            return $page_descs[ $slug ];
        }
    }

    return get_theme_mod(
        'ber_meta_description',
        'Bordeaux Privilège — Votre chauffeur privé VTC à Bordeaux. Transferts aéroport, gare, longue distance. Réservation en ligne 24h/24.'
    );
}

function ber_get_og_image() {
    if ( is_singular() && has_post_thumbnail() ) {
        return get_the_post_thumbnail_url( null, 'large' );
    }
    $custom = get_theme_mod( 'ber_og_image' );
    if ( $custom ) return $custom;
    return BER_URI . '/assets/images/hero-bordeaux.jpg';
}

// Title tag
add_filter( 'document_title_separator', function() { return '—'; } );
add_filter( 'document_title_parts', 'ber_document_title_parts' );
function ber_document_title_parts( $parts ) {
    if ( is_front_page() ) {
        $parts['tagline'] = 'Chauffeur Privé VTC Bordeaux';
    }
    return $parts;
}
