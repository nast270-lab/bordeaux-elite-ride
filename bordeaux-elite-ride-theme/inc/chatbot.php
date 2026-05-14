<?php
/**
 * Chatbot IA — intégration API Anthropic (Claude)
 * Clé API à définir dans wp-config.php: define('ANTHROPIC_API_KEY', 'sk-...');
 */

if ( ! defined( 'ABSPATH' ) ) exit;

add_action( 'wp_ajax_ber_chatbot', 'ber_chatbot_handler' );
add_action( 'wp_ajax_nopriv_ber_chatbot', 'ber_chatbot_handler' );

function ber_chatbot_handler() {
    // Chatbot désactivé
    if ( ! get_theme_mod( 'ber_chatbot_enabled', '1' ) ) {
        wp_send_json_error( [ 'message' => 'Service temporairement indisponible.' ], 503 );
    }

    // Vérification nonce
    if ( ! check_ajax_referer( 'ber_chatbot_nonce', 'nonce', false ) ) {
        wp_send_json_error( [ 'message' => 'Session expirée.' ], 403 );
    }

    // Rate limiting
    $ip           = ber_get_client_ip();
    $rate_limit   = (int) get_theme_mod( 'ber_chatbot_rate_limit', 20 );
    $key          = 'ber_chat_rate_' . md5( $ip );
    $usage        = (int) get_transient( $key );
    if ( $usage >= $rate_limit ) {
        wp_send_json_error( [
            'message' => 'Limite atteinte. Pour une assistance immédiate, appelez-nous ou écrivez sur WhatsApp.',
            'escalate' => true,
        ], 429 );
    }
    set_transient( $key, $usage + 1, HOUR_IN_SECONDS );

    // Récupérer et valider le message
    $message = isset( $_POST['message'] ) ? sanitize_text_field( wp_unslash( $_POST['message'] ) ) : '';
    if ( empty( $message ) || mb_strlen( $message ) > 500 ) {
        wp_send_json_error( [ 'message' => 'Message invalide.' ], 422 );
    }

    // Récupérer l'historique de conversation (max 10 échanges)
    $history = [];
    if ( ! empty( $_POST['history'] ) ) {
        $raw_history = json_decode( stripslashes( wp_unslash( $_POST['history'] ) ), true );
        if ( is_array( $raw_history ) ) {
            $history = array_slice( $raw_history, -10 );
            // Sanitiser l'historique
            $history = array_map( function( $msg ) {
                if ( ! isset( $msg['role'], $msg['content'] ) ) return null;
                if ( ! in_array( $msg['role'], [ 'user', 'assistant' ], true ) ) return null;
                return [
                    'role'    => $msg['role'],
                    'content' => substr( sanitize_text_field( $msg['content'] ), 0, 1000 ),
                ];
            }, $history );
            $history = array_filter( $history );
            $history = array_values( $history );
        }
    }

    // Clé API Anthropic
    $api_key = defined( 'ANTHROPIC_API_KEY' ) ? ANTHROPIC_API_KEY : '';
    if ( empty( $api_key ) ) {
        wp_send_json_error( [
            'message'  => "Je ne suis pas disponible pour l'instant. Contactez-nous directement.",
            'escalate' => true,
        ], 503 );
    }

    $brand_name  = get_theme_mod( 'ber_brand_name', 'Bordeaux Privilège' );
    $phone       = get_theme_mod( 'ber_phone_display', '+33 6 44 69 10 32' );
    $whatsapp    = get_theme_mod( 'ber_whatsapp', '33644691032' );
    $reserve_url = home_url( '/reservation/' );

    $system_prompt = "Tu es l'assistant virtuel de {$brand_name}, un service de chauffeur privé VTC premium basé à Bordeaux.

Tu aides les clients à :
- Obtenir des informations sur les services (transferts aéroport, gare, trajets professionnels, longue distance, événements)
- Connaître les tarifs indicatifs (Bordeaux → Aéroport 45€, → Arcachon 95€, → Cap Ferret 115€, → Dune du Pilat 120€, → Saint-Émilion 110€)
- Réserver ou demander un devis
- Comprendre ce qui est inclus (Wi-Fi, eau offerte, suivi vols, annulation gratuite 24h avant)

Ton style : courtois, professionnel, concis. Réponds en français. Pas plus de 3-4 phrases par réponse.

Pour toute réservation, dirige vers : {$reserve_url}
Pour contact urgent ou questions complexes, escalade vers : Téléphone {$phone} ou WhatsApp https://wa.me/{$whatsapp}

Si quelqu'un demande à parler à un humain, donne immédiatement le téléphone et WhatsApp.
Ne donne JAMAIS d'informations sur des concurrents ou d'autres services que ceux de {$brand_name}.";

    // Construire les messages
    $messages = $history;
    $messages[] = [ 'role' => 'user', 'content' => $message ];

    // Appel API Anthropic
    $response = wp_remote_post( 'https://api.anthropic.com/v1/messages', [
        'timeout' => 30,
        'headers' => [
            'Content-Type'      => 'application/json',
            'x-api-key'         => $api_key,
            'anthropic-version' => '2023-06-01',
        ],
        'body' => wp_json_encode( [
            'model'      => 'claude-haiku-4-5-20251001',
            'max_tokens' => 300,
            'system'     => $system_prompt,
            'messages'   => $messages,
        ]),
    ]);

    if ( is_wp_error( $response ) ) {
        wp_send_json_error( [
            'message'  => "Désolé, je rencontre un problème technique. Contactez-nous au {$phone}.",
            'escalate' => true,
        ], 503 );
    }

    $code = wp_remote_retrieve_response_code( $response );
    $body = json_decode( wp_remote_retrieve_body( $response ), true );

    if ( $code !== 200 || empty( $body['content'][0]['text'] ) ) {
        wp_send_json_error( [
            'message'  => "Je ne suis pas disponible pour l'instant. Appelez-nous au {$phone}.",
            'escalate' => true,
        ], 503 );
    }

    $reply = sanitize_text_field( $body['content'][0]['text'] );

    // Détecter si escalade vers humain est nécessaire
    $escalade_keywords = [ 'téléphone', 'appeler', 'humain', 'personne', 'urgent', 'whatsapp', 'rappel' ];
    $needs_escalade    = false;
    foreach ( $escalade_keywords as $kw ) {
        if ( stripos( $message, $kw ) !== false ) {
            $needs_escalade = true;
            break;
        }
    }

    wp_send_json_success( [
        'message'  => $reply,
        'escalate' => $needs_escalade,
        'phone'    => $phone,
        'whatsapp' => $whatsapp,
    ]);
}
