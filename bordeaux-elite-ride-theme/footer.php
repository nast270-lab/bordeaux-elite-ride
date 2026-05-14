</main><!-- #main-content -->

<!-- Floating actions -->
<div class="floating-actions" aria-label="Actions rapides">
    <!-- WhatsApp -->
    <a href="https://wa.me/<?php echo esc_attr( get_theme_mod( 'ber_whatsapp', '33644691032' ) ); ?>?text=<?php echo esc_attr( urlencode( 'Bonjour, je souhaite réserver un trajet avec Bordeaux Privilège.' ) ); ?>"
       class="fab fab-whatsapp"
       target="_blank"
       rel="noopener noreferrer"
       aria-label="Contacter sur WhatsApp">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
    </a>

    <!-- Chatbot toggle -->
    <button id="chatbot-toggle"
            class="fab fab-chat"
            aria-label="Ouvrir l'assistant virtuel"
            aria-expanded="false"
            aria-controls="chatbot-widget">
        <svg class="icon-chat" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        <svg class="icon-close" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
</div>

<!-- Chatbot widget -->
<div id="chatbot-widget" class="chatbot-widget" role="dialog" aria-label="Assistant virtuel" aria-hidden="true">
    <div class="chatbot-header">
        <div class="chatbot-avatar" aria-hidden="true">B</div>
        <div class="chatbot-info">
            <span class="chatbot-name">Assistant Bordeaux Privilège</span>
            <span class="chatbot-status">En ligne</span>
        </div>
        <button class="chatbot-close" id="chatbot-close" aria-label="Fermer l'assistant">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
    </div>
    <div class="chatbot-messages" id="chatbot-messages" role="log" aria-live="polite" aria-label="Messages de conversation">
        <div class="chatbot-message assistant">
            <p>Bonjour ! Je suis l'assistant de Bordeaux Privilège. Comment puis-je vous aider pour votre trajet ?</p>
            <div class="chatbot-quick-replies">
                <button class="quick-reply" data-message="Quels sont vos tarifs ?">Tarifs</button>
                <button class="quick-reply" data-message="Comment réserver ?">Réserver</button>
                <button class="quick-reply" data-message="Quels services proposez-vous ?">Services</button>
            </div>
        </div>
    </div>
    <div class="chatbot-input-area">
        <form id="chatbot-form" autocomplete="off">
            <?php wp_nonce_field( 'ber_chatbot_nonce', 'chatbot_nonce' ); ?>
            <input type="text"
                   id="chatbot-input"
                   name="message"
                   placeholder="Votre message..."
                   autocomplete="off"
                   maxlength="500"
                   aria-label="Votre message">
            <button type="submit" aria-label="Envoyer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </button>
        </form>
    </div>
</div>

<footer id="site-footer" class="site-footer" role="contentinfo">
    <div class="footer-main">
        <div class="container-luxe">
            <div class="footer-grid">
                <!-- Colonne 1: Brand -->
                <div class="footer-col footer-brand">
                    <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="footer-logo" aria-label="Bordeaux Privilège - Accueil">
                        <span class="logo-badge" aria-hidden="true">B</span>
                        <span class="logo-text">
                            <span class="logo-title"><?php echo esc_html( get_theme_mod( 'ber_brand_name', 'Bordeaux Privilège' ) ); ?></span>
                            <span class="logo-subtitle">Chauffeur Privé</span>
                        </span>
                    </a>
                    <p class="footer-tagline">Un chauffeur, un véhicule, une exigence absolue.</p>
                    <div class="footer-social">
                        <?php if ( $instagram = get_theme_mod( 'ber_instagram' ) ) : ?>
                        <a href="<?php echo esc_url( $instagram ); ?>" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                        </a>
                        <?php endif; ?>
                        <?php if ( $facebook = get_theme_mod( 'ber_facebook' ) ) : ?>
                        <a href="<?php echo esc_url( $facebook ); ?>" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                        </a>
                        <?php endif; ?>
                        <?php if ( $linkedin = get_theme_mod( 'ber_linkedin' ) ) : ?>
                        <a href="<?php echo esc_url( $linkedin ); ?>" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                        </a>
                        <?php endif; ?>
                    </div>
                </div>

                <!-- Colonne 2: Navigation -->
                <div class="footer-col">
                    <h3 class="footer-heading">Navigation</h3>
                    <ul class="footer-links">
                        <li><a href="<?php echo esc_url( home_url( '/' ) ); ?>">Accueil</a></li>
                        <li><a href="<?php echo esc_url( home_url( '/services/' ) ); ?>">Services</a></li>
                        <li><a href="<?php echo esc_url( home_url( '/flotte/' ) ); ?>">Notre flotte</a></li>
                        <li><a href="<?php echo esc_url( home_url( '/tarifs/' ) ); ?>">Tarifs</a></li>
                        <li><a href="<?php echo esc_url( home_url( '/reservation/' ) ); ?>">Réservation</a></li>
                        <li><a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>">Contact</a></li>
                    </ul>
                </div>

                <!-- Colonne 3: Contact -->
                <div class="footer-col">
                    <h3 class="footer-heading">Contact</h3>
                    <ul class="footer-contact-list">
                        <li>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1 19.79 19.79 0 0 1 1.61 4.5 2 2 0 0 1 3.6 2.32h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l1.87-1.87a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                            <a href="tel:<?php echo esc_attr( get_theme_mod( 'ber_phone', '+33644691032' ) ); ?>"><?php echo esc_html( get_theme_mod( 'ber_phone_display', '+33 6 44 69 10 32' ) ); ?></a>
                        </li>
                        <li>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                            <a href="mailto:<?php echo esc_attr( get_theme_mod( 'ber_email', 'contact@bordeaux-privilege.fr' ) ); ?>"><?php echo esc_html( get_theme_mod( 'ber_email', 'contact@bordeaux-privilege.fr' ) ); ?></a>
                        </li>
                        <li>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                            <span>Bordeaux, Gironde — Nouvelle-Aquitaine</span>
                        </li>
                        <li>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
                            <a href="https://wa.me/<?php echo esc_attr( get_theme_mod( 'ber_whatsapp', '33644691032' ) ); ?>" target="_blank" rel="noopener noreferrer">WhatsApp</a>
                        </li>
                    </ul>
                </div>

                <!-- Colonne 4: Disponibilité -->
                <div class="footer-col">
                    <h3 class="footer-heading">Disponibilité</h3>
                    <div class="footer-availability">
                        <div class="availability-badge">
                            <span class="availability-dot" aria-hidden="true"></span>
                            <span>Disponible 24h/24 — 7j/7</span>
                        </div>
                        <p>Réservation en ligne ou par téléphone. Confirmation immédiate.</p>
                        <a href="<?php echo esc_url( home_url( '/reservation/' ) ); ?>" class="btn btn-gold btn-sm">Réserver maintenant</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="footer-bottom">
        <div class="container-luxe">
            <p>&copy; <?php echo esc_html( gmdate( 'Y' ) ); ?> <?php echo esc_html( get_theme_mod( 'ber_brand_name', 'Bordeaux Privilège' ) ); ?>. Tous droits réservés.</p>
            <ul class="footer-legal">
                <li><a href="<?php echo esc_url( home_url( '/mentions-legales/' ) ); ?>">Mentions légales</a></li>
                <li><a href="<?php echo esc_url( home_url( '/confidentialite/' ) ); ?>">Confidentialité</a></li>
                <li><a href="<?php echo esc_url( home_url( '/cgv/' ) ); ?>">CGV</a></li>
            </ul>
        </div>
    </div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
