<?php
/**
 * Schema.org structured data — LocalBusiness + TaxiService
 */

if ( ! defined( 'ABSPATH' ) ) exit;

add_action( 'wp_head', 'ber_schema_output', 5 );
function ber_schema_output() {
    $phone    = get_theme_mod( 'ber_phone', '+33644691032' );
    $email    = get_theme_mod( 'ber_email', 'contact@bordeaux-privilege.fr' );
    $site_url = esc_url( home_url( '/' ) );
    $logo_url = BER_URI . '/assets/images/hero-bordeaux.jpg';

    $schema = [
        '@context' => 'https://schema.org',
        '@graph'   => [
            [
                '@type'       => [ 'LocalBusiness', 'TaxiService' ],
                '@id'         => $site_url . '#business',
                'name'        => get_theme_mod( 'ber_brand_name', 'Bordeaux Privilège' ),
                'description' => 'Service de chauffeur privé VTC à Bordeaux. Transferts aéroport, gare, trajets professionnels et longue distance.',
                'url'         => $site_url,
                'telephone'   => $phone,
                'email'       => $email,
                'logo'        => $logo_url,
                'image'       => $logo_url,
                'address'     => [
                    '@type'           => 'PostalAddress',
                    'addressLocality' => 'Bordeaux',
                    'addressRegion'   => 'Gironde',
                    'postalCode'      => '33000',
                    'addressCountry'  => 'FR',
                ],
                'geo' => [
                    '@type'     => 'GeoCoordinates',
                    'latitude'  => '44.837789',
                    'longitude' => '-0.57918',
                ],
                'openingHoursSpecification' => [
                    [
                        '@type'     => 'OpeningHoursSpecification',
                        'dayOfWeek' => [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday' ],
                        'opens'     => '00:00',
                        'closes'    => '23:59',
                    ],
                ],
                'priceRange'      => '€€',
                'currenciesAccepted' => 'EUR',
                'paymentAccepted' => 'Cash, Credit Card, Bank Transfer',
                'areaServed'      => [
                    [ '@type' => 'City', 'name' => 'Bordeaux' ],
                    [ '@type' => 'State', 'name' => 'Gironde' ],
                    [ '@type' => 'State', 'name' => 'Nouvelle-Aquitaine' ],
                ],
                'hasOfferCatalog' => [
                    '@type' => 'OfferCatalog',
                    'name'  => 'Services VTC Bordeaux',
                    'itemListElement' => [
                        [ '@type' => 'Offer', 'itemOffered' => [ '@type' => 'Service', 'name' => 'Transfert aéroport Bordeaux-Mérignac', 'price' => '45', 'priceCurrency' => 'EUR' ] ],
                        [ '@type' => 'Offer', 'itemOffered' => [ '@type' => 'Service', 'name' => 'Transfert gare SNCF Bordeaux', 'price' => '35', 'priceCurrency' => 'EUR' ] ],
                        [ '@type' => 'Offer', 'itemOffered' => [ '@type' => 'Service', 'name' => 'Trajet professionnel Bordeaux' ] ],
                        [ '@type' => 'Offer', 'itemOffered' => [ '@type' => 'Service', 'name' => 'Longue distance France & Europe' ] ],
                    ],
                ],
                'aggregateRating' => [
                    '@type'       => 'AggregateRating',
                    'ratingValue' => '5',
                    'bestRating'  => '5',
                    'ratingCount' => '3',
                ],
                'sameAs' => array_filter( [
                    get_theme_mod( 'ber_instagram', '' ),
                    get_theme_mod( 'ber_facebook', '' ),
                    get_theme_mod( 'ber_linkedin', '' ),
                ] ),
            ],
            [
                '@type' => 'WebSite',
                '@id'   => $site_url . '#website',
                'url'   => $site_url,
                'name'  => get_theme_mod( 'ber_brand_name', 'Bordeaux Privilège' ),
                'potentialAction' => [
                    '@type'       => 'SearchAction',
                    'target'      => $site_url . '?s={search_term_string}',
                    'query-input' => 'required name=search_term_string',
                ],
            ],
        ],
    ];

    // Ajouter BreadcrumbList sur les pages internes
    if ( ! is_front_page() && is_page() ) {
        $schema['@graph'][] = [
            '@type'           => 'BreadcrumbList',
            'itemListElement' => [
                [ '@type' => 'ListItem', 'position' => 1, 'name' => 'Accueil', 'item' => $site_url ],
                [ '@type' => 'ListItem', 'position' => 2, 'name' => get_the_title(), 'item' => get_permalink() ],
            ],
        ];
    }

    echo '<script type="application/ld+json">' . wp_json_encode( $schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE ) . '</script>' . "\n";
}
