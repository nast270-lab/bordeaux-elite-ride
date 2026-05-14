<?php
/**
 * Template Name: Page Contact
 */
get_header(); ?>

<section class="page-hero" aria-labelledby="page-contact-title">
    <div class="container-luxe">
        <div class="eyebrow">
            <span class="gold-divider-mini" aria-hidden="true"></span>
            <span>Nous contacter</span>
            <span class="gold-divider-mini" aria-hidden="true"></span>
        </div>
        <h1 id="page-contact-title">Une question ?<br>Parlons-en.</h1>
        <p>Notre équipe répond rapidement à toutes vos demandes.</p>
    </div>
</section>

<section class="contact-section">
    <div class="container-luxe">
        <div class="contact-layout">

            <!-- Infos de contact -->
            <aside class="contact-info" aria-label="Coordonnées">
                <div class="contact-info-card">
                    <div class="contact-info-icon" aria-hidden="true">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1 19.79 19.79 0 0 1 1.61 4.5 2 2 0 0 1 3.6 2.32h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l1.87-1.87a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    </div>
                    <h3>Téléphone</h3>
                    <a href="tel:<?php echo esc_attr( get_theme_mod( 'ber_phone', '+33644691032' ) ); ?>"><?php echo esc_html( get_theme_mod( 'ber_phone_display', '+33 6 44 69 10 32' ) ); ?></a>
                    <span>Disponible 24h/24 — 7j/7</span>
                </div>

                <div class="contact-info-card">
                    <div class="contact-info-icon" aria-hidden="true">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    </div>
                    <h3>Email</h3>
                    <a href="mailto:<?php echo esc_attr( get_theme_mod( 'ber_email', 'contact@bordeaux-privilege.fr' ) ); ?>"><?php echo esc_html( get_theme_mod( 'ber_email', 'contact@bordeaux-privilege.fr' ) ); ?></a>
                    <span>Réponse sous 2h en journée</span>
                </div>

                <div class="contact-info-card">
                    <div class="contact-info-icon" aria-hidden="true">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    </div>
                    <h3>Zone de service</h3>
                    <span>Bordeaux, Gironde</span>
                    <span>Nouvelle-Aquitaine & France entière</span>
                </div>

                <div class="contact-info-card">
                    <div class="contact-info-icon" aria-hidden="true">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    </div>
                    <h3>Disponibilité</h3>
                    <span>24h/24 — 7j/7</span>
                    <span>Jours fériés inclus</span>
                </div>
            </aside>

            <!-- Formulaire de contact -->
            <div class="contact-form-col">
                <form id="contact-form" class="contact-form" novalidate aria-label="Formulaire de contact">
                    <?php wp_nonce_field( 'ber_contact_nonce', 'contact_nonce' ); ?>

                    <div class="contact-form-grid">
                        <div class="form-group">
                            <label for="contact-nom">Nom complet <span class="required" aria-hidden="true">*</span></label>
                            <input type="text"
                                   id="contact-nom"
                                   name="nom"
                                   required
                                   autocomplete="name"
                                   aria-required="true"
                                   placeholder="Jean Dupont">
                            <span class="field-error" id="nom-error" role="alert"></span>
                        </div>

                        <div class="form-group">
                            <label for="contact-email">Email <span class="required" aria-hidden="true">*</span></label>
                            <input type="email"
                                   id="contact-email"
                                   name="email"
                                   required
                                   autocomplete="email"
                                   aria-required="true"
                                   placeholder="jean@exemple.fr">
                            <span class="field-error" id="email-error" role="alert"></span>
                        </div>

                        <div class="form-group">
                            <label for="contact-phone">Téléphone</label>
                            <input type="tel"
                                   id="contact-phone"
                                   name="phone"
                                   autocomplete="tel"
                                   placeholder="+33 6 XX XX XX XX">
                        </div>

                        <div class="form-group">
                            <label for="contact-sujet">Sujet</label>
                            <select id="contact-sujet" name="sujet">
                                <option value="">Choisir un sujet</option>
                                <option value="reservation">Demande de réservation</option>
                                <option value="devis">Demande de devis</option>
                                <option value="information">Renseignements généraux</option>
                                <option value="partenariat">Partenariat professionnel</option>
                                <option value="autre">Autre</option>
                            </select>
                        </div>

                        <div class="form-group form-group-full">
                            <label for="contact-message">Message <span class="required" aria-hidden="true">*</span></label>
                            <textarea id="contact-message"
                                      name="message"
                                      rows="5"
                                      required
                                      aria-required="true"
                                      placeholder="Décrivez votre demande..."
                                      maxlength="2000"></textarea>
                            <span class="field-error" id="message-error" role="alert"></span>
                        </div>
                    </div>

                    <!-- Honeypot anti-spam -->
                    <div class="hp-field" aria-hidden="true">
                        <input type="text" name="website" tabindex="-1" autocomplete="off">
                    </div>

                    <div class="form-submit">
                        <button type="submit" class="btn btn-gold btn-lg" id="contact-submit">
                            Envoyer le message
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                        </button>
                        <p class="form-legal">En soumettant, vous acceptez notre <a href="<?php echo esc_url( home_url( '/confidentialite/' ) ); ?>">politique de confidentialité</a>.</p>
                    </div>

                    <div id="contact-success" class="form-feedback success" role="alert" hidden>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                        <div>
                            <strong>Message envoyé !</strong>
                            <p>Nous vous répondrons dans les plus brefs délais. Merci de nous avoir contactés.</p>
                        </div>
                    </div>

                    <div id="contact-error" class="form-feedback error" role="alert" hidden>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                        <div>
                            <strong>Erreur d'envoi.</strong>
                            <p>Merci de réessayer ou de nous appeler au <a href="tel:<?php echo esc_attr( get_theme_mod( 'ber_phone', '+33644691032' ) ); ?>"><?php echo esc_html( get_theme_mod( 'ber_phone_display', '+33 6 44 69 10 32' ) ); ?></a>.</p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</section>

<?php get_footer();
