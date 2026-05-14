<?php
/**
 * Handler formulaire de contact
 */

if ( ! defined( 'ABSPATH' ) ) exit;

add_action( 'wp_ajax_ber_contact', 'ber_contact_handler' );
add_action( 'wp_ajax_nopriv_ber_contact', 'ber_contact_handler' );

function ber_contact_handler() {
    if ( ! check_ajax_referer( 'ber_contact_nonce', 'nonce', false ) ) {
        wp_send_json_error( [ 'message' => 'Session expirée. Rechargez la page.' ], 403 );
    }

    // Anti-spam honeypot
    if ( ! empty( $_POST['website'] ) ) {
        wp_send_json_success( [ 'message' => 'Message envoyé.' ] );
    }

    // Rate limiting
    $ip  = ber_get_client_ip();
    $key = 'ber_contact_rate_' . md5( $ip );
    $count = (int) get_transient( $key );
    if ( $count >= 5 ) {
        wp_send_json_error( [ 'message' => 'Trop de messages. Réessayez dans 10 minutes.' ], 429 );
    }
    set_transient( $key, $count + 1, 10 * MINUTE_IN_SECONDS );

    // Sanitisation
    $nom     = isset( $_POST['nom'] )     ? ber_sanitize_name( wp_unslash( $_POST['nom'] ) )          : '';
    $email   = isset( $_POST['email'] )   ? sanitize_email( wp_unslash( $_POST['email'] ) )           : '';
    $phone   = isset( $_POST['phone'] )   ? ber_sanitize_phone( wp_unslash( $_POST['phone'] ) )       : '';
    $sujet   = isset( $_POST['sujet'] )   ? sanitize_text_field( wp_unslash( $_POST['sujet'] ) )      : '';
    $message = isset( $_POST['message'] ) ? sanitize_textarea_field( wp_unslash( $_POST['message'] ) ) : '';

    $errors = [];
    if ( strlen( $nom ) < 2 )         $errors[] = 'Nom invalide.';
    if ( ! is_email( $email ) )        $errors[] = 'Email invalide.';
    if ( strlen( $message ) < 10 )     $errors[] = 'Message trop court.';

    if ( $errors ) {
        wp_send_json_error( [ 'message' => implode( ' ', $errors ) ], 422 );
    }

    $sujet_labels = [
        'reservation'  => 'Demande de réservation',
        'devis'        => 'Demande de devis',
        'information'  => 'Renseignements',
        'partenariat'  => 'Partenariat',
        'autre'        => 'Autre',
    ];
    $sujet_label = $sujet_labels[ $sujet ] ?? 'Contact';

    $owner_email   = defined( 'BER_OWNER_EMAIL' ) ? BER_OWNER_EMAIL : get_option( 'admin_email' );
    $email_subject = "Message de {$nom} — {$sujet_label}";
    $headers       = [ 'Content-Type: text/html; charset=UTF-8', "Reply-To: {$nom} <{$email}>" ];

    $body = ber_contact_email_template( $nom, $email, $phone, $sujet_label, $message );
    wp_mail( $owner_email, $email_subject, $body, $headers );

    // Email de confirmation au client
    $confirm_subject = 'Votre message a bien été reçu — ' . get_theme_mod( 'ber_brand_name', 'Bordeaux Privilège' );
    $confirm_body    = ber_contact_confirm_template( $nom, $message );
    wp_mail( $email, $confirm_subject, $confirm_body, [ 'Content-Type: text/html; charset=UTF-8' ] );

    wp_send_json_success( [ 'message' => 'Message envoyé ! Nous vous répondrons sous 2h.' ] );
}

function ber_contact_email_template( $nom, $email, $phone, $sujet, $message ) {
    $brand = get_theme_mod( 'ber_brand_name', 'Bordeaux Privilège' );
    ob_start(); ?>
<!DOCTYPE html><html lang="fr"><body style="font-family:Georgia,serif;background:#f5f0e8;padding:20px;">
<div style="max-width:600px;margin:0 auto;background:#fff;border:1px solid #e8dfd2;border-radius:8px;overflow:hidden;">
    <div style="background:#132547;padding:24px;"><h1 style="color:#d4a574;margin:0;font-size:20px;">Nouveau message</h1></div>
    <div style="padding:32px;">
        <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;color:#666;width:30%;">Nom :</td><td style="padding:8px 0;font-weight:bold;"><?php echo esc_html( $nom ); ?></td></tr>
            <tr><td style="padding:8px 0;color:#666;">Email :</td><td style="padding:8px 0;"><a href="mailto:<?php echo esc_attr( $email ); ?>"><?php echo esc_html( $email ); ?></a></td></tr>
            <?php if ( $phone ) : ?><tr><td style="padding:8px 0;color:#666;">Tél :</td><td style="padding:8px 0;"><?php echo esc_html( $phone ); ?></td></tr><?php endif; ?>
            <tr><td style="padding:8px 0;color:#666;">Sujet :</td><td style="padding:8px 0;"><?php echo esc_html( $sujet ); ?></td></tr>
        </table>
        <div style="background:#f5f0e8;border-left:3px solid #d4a574;padding:16px;margin-top:16px;">
            <?php echo nl2br( esc_html( $message ) ); ?>
        </div>
    </div>
    <div style="background:#f5f0e8;padding:16px;text-align:center;font-size:12px;color:#666;"><?php echo esc_html( $brand ); ?> — <?php echo esc_html( date_i18n( 'd/m/Y à H:i' ) ); ?></div>
</div>
</body></html>
<?php return ob_get_clean();
}

function ber_contact_confirm_template( $nom, $message ) {
    $brand = get_theme_mod( 'ber_brand_name', 'Bordeaux Privilège' );
    $phone = get_theme_mod( 'ber_phone_display', '+33 6 44 69 10 32' );
    ob_start(); ?>
<!DOCTYPE html><html lang="fr"><body style="font-family:Georgia,serif;background:#f5f0e8;padding:20px;">
<div style="max-width:600px;margin:0 auto;background:#fff;border:1px solid #e8dfd2;border-radius:8px;overflow:hidden;">
    <div style="background:#132547;padding:24px;text-align:center;"><h1 style="color:#d4a574;margin:0;">Message reçu !</h1></div>
    <div style="padding:32px;">
        <p>Bonjour <?php echo esc_html( $nom ); ?>,</p>
        <p>Nous avons bien reçu votre message et vous répondrons dans les plus brefs délais (généralement sous 2h en journée).</p>
        <p>Si votre demande est urgente, n'hésitez pas à nous appeler directement :<br>
        <a href="tel:<?php echo esc_attr( str_replace( ' ', '', get_theme_mod( 'ber_phone', '+33644691032' ) ) ); ?>" style="color:#d4a574;font-size:18px;"><?php echo esc_html( $phone ); ?></a></p>
        <p>Cordialement,<br><strong><?php echo esc_html( $brand ); ?></strong></p>
    </div>
</div>
</body></html>
<?php return ob_get_clean();
}
