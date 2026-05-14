<?php
/**
 * Template Name: Page Réservation
 */
get_header(); ?>

<section class="page-hero" aria-labelledby="page-reservation-title">
    <div class="container-luxe">
        <div class="eyebrow">
            <span class="gold-divider-mini" aria-hidden="true"></span>
            <span>Réservation en ligne</span>
            <span class="gold-divider-mini" aria-hidden="true"></span>
        </div>
        <h1 id="page-reservation-title">Votre trajet,<br>en quelques instants</h1>
        <p>Remplissez le formulaire ci-dessous. Confirmation sous 15 minutes.</p>
    </div>
</section>

<section class="reservation-section">
    <div class="container-luxe">
        <div class="reservation-layout">
            <div class="reservation-form-col">
                <?php get_template_part( 'template-parts/booking-form' ); ?>
            </div>

            <aside class="reservation-info-col" aria-label="Informations de contact">
                <div class="reservation-contact-card">
                    <h2>Besoin d'aide ?</h2>
                    <p>Notre équipe est disponible 24h/24 pour répondre à vos questions et confirmer votre réservation.</p>

                    <div class="reservation-contact-items">
                        <div class="reservation-contact-item">
                            <div class="contact-item-icon" aria-hidden="true">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1 19.79 19.79 0 0 1 1.61 4.5 2 2 0 0 1 3.6 2.32h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l1.87-1.87a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                            </div>
                            <div>
                                <span class="contact-item-label">Téléphone</span>
                                <a href="tel:<?php echo esc_attr( get_theme_mod( 'ber_phone', '+33644691032' ) ); ?>" class="contact-item-value"><?php echo esc_html( get_theme_mod( 'ber_phone_display', '+33 6 44 69 10 32' ) ); ?></a>
                                <span class="contact-item-note">Disponible 24h/24</span>
                            </div>
                        </div>

                        <div class="reservation-contact-item">
                            <div class="contact-item-icon" aria-hidden="true">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                            </div>
                            <div>
                                <span class="contact-item-label">WhatsApp</span>
                                <a href="https://wa.me/<?php echo esc_attr( get_theme_mod( 'ber_whatsapp', '33644691032' ) ); ?>?text=<?php echo esc_attr( urlencode( 'Bonjour, je souhaite réserver un trajet.' ) ); ?>" target="_blank" rel="noopener noreferrer" class="contact-item-value">Message direct</a>
                                <span class="contact-item-note">Réponse rapide</span>
                            </div>
                        </div>

                        <div class="reservation-contact-item">
                            <div class="contact-item-icon" aria-hidden="true">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                            </div>
                            <div>
                                <span class="contact-item-label">Email</span>
                                <a href="mailto:<?php echo esc_attr( get_theme_mod( 'ber_email', 'contact@bordeaux-privilege.fr' ) ); ?>" class="contact-item-value"><?php echo esc_html( get_theme_mod( 'ber_email', 'contact@bordeaux-privilege.fr' ) ); ?></a>
                                <span class="contact-item-note">Réponse sous 2h</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="reservation-guarantees">
                    <h3>Nos garanties</h3>
                    <ul>
                        <li>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                            Confirmation sous 15 minutes
                        </li>
                        <li>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                            Annulation gratuite jusqu'à 24h avant
                        </li>
                        <li>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                            Prix fixe confirmé à l'avance
                        </li>
                        <li>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                            Chauffeur professionnel certifié
                        </li>
                    </ul>
                </div>
            </aside>
        </div>
    </div>
</section>

<?php get_footer();
