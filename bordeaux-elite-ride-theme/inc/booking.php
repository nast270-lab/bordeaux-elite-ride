<?php
/**
 * Handler formulaire de réservation + envoi email
 */

if ( ! defined( 'ABSPATH' ) ) exit;

// AJAX pour les utilisateurs connectés et non connectés
add_action( 'wp_ajax_ber_booking', 'ber_booking_handler' );
add_action( 'wp_ajax_nopriv_ber_booking', 'ber_booking_handler' );

function ber_booking_handler() {
    // Vérification nonce
    if ( ! check_ajax_referer( 'ber_booking_nonce', 'nonce', false ) ) {
        wp_send_json_error( [ 'message' => 'Session expirée. Rechargez la page.' ], 403 );
    }

    // Anti-spam honeypot
    if ( ! empty( $_POST['website'] ) ) {
        wp_send_json_success( [ 'message' => 'Réservation reçue.' ] ); // Fake success
    }

    // Rate limiting: max 5 soumissions / 10 min / IP
    $ip  = ber_get_client_ip();
    $key = 'ber_booking_rate_' . md5( $ip );
    $count = (int) get_transient( $key );
    if ( $count >= 5 ) {
        wp_send_json_error( [ 'message' => 'Trop de soumissions. Réessayez dans 10 minutes.' ], 429 );
    }
    set_transient( $key, $count + 1, 10 * MINUTE_IN_SECONDS );

    // Validation et sanitisation
    $from  = isset( $_POST['from'] )  ? sanitize_text_field( wp_unslash( $_POST['from'] ) )  : '';
    $to    = isset( $_POST['to'] )    ? sanitize_text_field( wp_unslash( $_POST['to'] ) )    : '';
    $date  = isset( $_POST['date'] )  ? sanitize_text_field( wp_unslash( $_POST['date'] ) )  : '';
    $pax   = isset( $_POST['pax'] )   ? absint( $_POST['pax'] )                              : 1;
    $phone = isset( $_POST['phone'] ) ? ber_sanitize_phone( wp_unslash( $_POST['phone'] ) )  : '';
    $notes = isset( $_POST['notes'] ) ? sanitize_textarea_field( wp_unslash( $_POST['notes'] ) ) : '';

    $errors = [];
    if ( strlen( $from ) < 3 )  $errors[] = 'Adresse de départ invalide.';
    if ( strlen( $to ) < 3 )    $errors[] = 'Destination invalide.';
    if ( empty( $date ) )       $errors[] = 'Date et heure requises.';
    if ( empty( $phone ) || strlen( $phone ) < 9 ) $errors[] = 'Numéro de téléphone invalide.';
    if ( $pax < 1 || $pax > 8 ) $errors[] = 'Nombre de passagers invalide.';

    if ( $errors ) {
        wp_send_json_error( [ 'message' => implode( ' ', $errors ) ], 422 );
    }

    // Formater la date
    $date_formatted = '';
    if ( $date ) {
        $ts = strtotime( $date );
        $date_formatted = $ts ? date_i18n( 'd/m/Y à H:i', $ts ) : $date;
    }

    // Email au gérant
    $owner_email = defined( 'BER_OWNER_EMAIL' ) ? BER_OWNER_EMAIL : get_option( 'admin_email' );
    $owner_subject = 'Nouvelle réservation — ' . esc_html( $from ) . ' → ' . esc_html( $to );
    $owner_body = ber_booking_email_template_owner( $from, $to, $date_formatted, $pax, $phone, $notes );

    $headers = [ 'Content-Type: text/html; charset=UTF-8' ];
    wp_mail( $owner_email, $owner_subject, $owner_body, $headers );

    // Email au client (si email fourni)
    $client_email = isset( $_POST['email'] ) ? sanitize_email( wp_unslash( $_POST['email'] ) ) : '';
    if ( $client_email && is_email( $client_email ) ) {
        $client_subject = 'Confirmation de votre demande — Bordeaux Privilège';
        $client_body    = ber_booking_email_template_client( $from, $to, $date_formatted, $pax );
        wp_mail( $client_email, $client_subject, $client_body, $headers );
    }

    wp_send_json_success( [ 'message' => 'Réservation reçue ! Nous vous confirmons dans les plus brefs délais.' ] );
}

function ber_booking_email_template_owner( $from, $to, $date, $pax, $phone, $notes ) {
    $brand = get_theme_mod( 'ber_brand_name', 'Bordeaux Privilège' );
    ob_start(); ?>
<!DOCTYPE html><html lang="fr"><body style="font-family:Georgia,serif;background:#f5f0e8;padding:20px;">
<div style="max-width:600px;margin:0 auto;background:#fff;border:1px solid #e8dfd2;border-radius:8px;overflow:hidden;">
    <div style="background:#132547;padding:24px;text-align:center;">
        <h1 style="color:#d4a574;margin:0;font-size:20px;">Nouvelle réservation</h1>
        <p style="color:#fff;margin:8px 0 0;font-size:14px;"><?php echo esc_html( $brand ); ?></p>
    </div>
    <div style="padding:32px;">
        <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;color:#666;width:40%;">Départ :</td><td style="padding:8px 0;font-weight:bold;"><?php echo esc_html( $from ); ?></td></tr>
            <tr><td style="padding:8px 0;color:#666;">Destination :</td><td style="padding:8px 0;font-weight:bold;"><?php echo esc_html( $to ); ?></td></tr>
            <tr><td style="padding:8px 0;color:#666;">Date & heure :</td><td style="padding:8px 0;font-weight:bold;"><?php echo esc_html( $date ); ?></td></tr>
            <tr><td style="padding:8px 0;color:#666;">Passagers :</td><td style="padding:8px 0;"><?php echo esc_html( $pax ); ?></td></tr>
            <tr><td style="padding:8px 0;color:#666;">Téléphone :</td><td style="padding:8px 0;"><a href="tel:<?php echo esc_attr( $phone ); ?>"><?php echo esc_html( $phone ); ?></a></td></tr>
            <?php if ( $notes ) : ?><tr><td style="padding:8px 0;color:#666;vertical-align:top;">Notes :</td><td style="padding:8px 0;"><?php echo nl2br( esc_html( $notes ) ); ?></td></tr><?php endif; ?>
        </table>
    </div>
    <div style="background:#f5f0e8;padding:16px;text-align:center;font-size:12px;color:#666;">
        <?php echo esc_html( $brand ); ?> — Réservation reçue le <?php echo esc_html( date_i18n( 'd/m/Y à H:i' ) ); ?>
    </div>
</div>
</body></html>
<?php return ob_get_clean();
}

function ber_booking_email_template_client( $from, $to, $date, $pax ) {
    $brand = get_theme_mod( 'ber_brand_name', 'Bordeaux Privilège' );
    $phone = get_theme_mod( 'ber_phone_display', '+33 6 44 69 10 32' );
    ob_start(); ?>
<!DOCTYPE html><html lang="fr"><body style="font-family:Georgia,serif;background:#f5f0e8;padding:20px;">
<div style="max-width:600px;margin:0 auto;background:#fff;border:1px solid #e8dfd2;border-radius:8px;overflow:hidden;">
    <div style="background:#132547;padding:24px;text-align:center;">
        <h1 style="color:#d4a574;margin:0;font-size:20px;">Demande reçue !</h1>
        <p style="color:#fff;margin:8px 0 0;"><?php echo esc_html( $brand ); ?></p>
    </div>
    <div style="padding:32px;">
        <p>Bonjour,</p>
        <p>Nous avons bien reçu votre demande de réservation et vous confirmerons votre trajet sous peu.</p>
        <div style="background:#f5f0e8;border-left:3px solid #d4a574;padding:16px;margin:20px 0;">
            <p style="margin:4px 0;"><strong>De :</strong> <?php echo esc_html( $from ); ?></p>
            <p style="margin:4px 0;"><strong>À :</strong> <?php echo esc_html( $to ); ?></p>
            <p style="margin:4px 0;"><strong>Date :</strong> <?php echo esc_html( $date ); ?></p>
            <p style="margin:4px 0;"><strong>Passagers :</strong> <?php echo esc_html( $pax ); ?></p>
        </div>
        <p>Pour toute question, contactez-nous directement :<br>
        <a href="tel:<?php echo esc_attr( str_replace( ' ', '', get_theme_mod( 'ber_phone', '+33644691032' ) ) ); ?>" style="color:#d4a574;"><?php echo esc_html( $phone ); ?></a></p>
        <p>À très bientôt,<br><strong><?php echo esc_html( $brand ); ?></strong></p>
    </div>
</div>
</body></html>
<?php return ob_get_clean();
}
