<div class="booking-form-wrapper">
    <form id="booking-form" class="booking-form" novalidate aria-label="Formulaire de réservation">
        <?php wp_nonce_field( 'ber_booking_nonce', 'booking_nonce' ); ?>

        <div class="booking-grid">
            <!-- Départ -->
            <div class="form-group">
                <label for="booking-from">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    Adresse de départ <span class="required" aria-hidden="true">*</span>
                </label>
                <input type="text"
                       id="booking-from"
                       name="from"
                       placeholder="Ex: 1 place de la Comédie, Bordeaux"
                       required
                       autocomplete="street-address"
                       aria-required="true">
                <span class="field-error" id="from-error" role="alert"></span>
            </div>

            <!-- Destination -->
            <div class="form-group">
                <label for="booking-to">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    Destination <span class="required" aria-hidden="true">*</span>
                </label>
                <input type="text"
                       id="booking-to"
                       name="to"
                       placeholder="Ex: Aéroport de Bordeaux-Mérignac"
                       required
                       aria-required="true">
                <span class="field-error" id="to-error" role="alert"></span>
            </div>

            <!-- Date et heure -->
            <div class="form-group">
                <label for="booking-date">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    Date et heure <span class="required" aria-hidden="true">*</span>
                </label>
                <input type="datetime-local"
                       id="booking-date"
                       name="date"
                       required
                       aria-required="true"
                       min="<?php echo esc_attr( gmdate( 'Y-m-d\TH:i', strtotime( '+2 hours' ) ) ); ?>">
                <span class="field-error" id="date-error" role="alert"></span>
            </div>

            <!-- Passagers -->
            <div class="form-group">
                <label for="booking-pax">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                    Nombre de passagers <span class="required" aria-hidden="true">*</span>
                </label>
                <select id="booking-pax" name="pax" required aria-required="true">
                    <option value="1">1 passager</option>
                    <option value="2">2 passagers</option>
                    <option value="3">3 passagers</option>
                    <option value="4">4 passagers</option>
                    <option value="5">5 passagers (sur demande)</option>
                </select>
            </div>

            <!-- Téléphone -->
            <div class="form-group">
                <label for="booking-phone">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1 19.79 19.79 0 0 1 1.61 4.5 2 2 0 0 1 3.6 2.32h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l1.87-1.87a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    Votre téléphone <span class="required" aria-hidden="true">*</span>
                </label>
                <input type="tel"
                       id="booking-phone"
                       name="phone"
                       placeholder="+33 6 XX XX XX XX"
                       required
                       autocomplete="tel"
                       aria-required="true"
                       pattern="[+0-9\s\-()]{9,20}">
                <span class="field-error" id="phone-error" role="alert"></span>
            </div>

            <!-- Notes optionnelles -->
            <div class="form-group form-group-full">
                <label for="booking-notes">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                    Informations complémentaires
                </label>
                <textarea id="booking-notes"
                          name="notes"
                          rows="3"
                          placeholder="Numéro de vol, bagages particuliers, besoins spéciaux..."
                          maxlength="500"></textarea>
            </div>
        </div>

        <!-- Estimation tarifaire -->
        <div id="booking-estimate" class="booking-estimate" aria-live="polite" hidden>
            <div class="estimate-inner">
                <span class="estimate-label">Estimation :</span>
                <span class="estimate-amount" id="estimate-value">—</span>
                <span class="estimate-note">Prix indicatif, confirmé à la réservation</span>
            </div>
        </div>

        <!-- Honeypot anti-spam -->
        <div class="hp-field" aria-hidden="true">
            <input type="text" name="website" tabindex="-1" autocomplete="off">
        </div>

        <div class="booking-submit">
            <button type="submit" class="btn btn-gold btn-lg" id="booking-submit">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                Confirmer la réservation
            </button>
            <p class="booking-legal">En soumettant ce formulaire, vous acceptez notre <a href="<?php echo esc_url( home_url( '/confidentialite/' ) ); ?>">politique de confidentialité</a>.</p>
        </div>

        <div id="booking-success" class="form-feedback success" role="alert" hidden>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            <div>
                <strong>Réservation reçue !</strong>
                <p>Nous vous confirmons votre trajet par SMS dans les plus brefs délais. Merci de votre confiance.</p>
            </div>
        </div>

        <div id="booking-error" class="form-feedback error" role="alert" hidden>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
            <div>
                <strong>Une erreur est survenue.</strong>
                <p>Veuillez réessayer ou nous contacter directement au <a href="tel:<?php echo esc_attr( get_theme_mod( 'ber_phone', '+33644691032' ) ); ?>"><?php echo esc_html( get_theme_mod( 'ber_phone_display', '+33 6 44 69 10 32' ) ); ?></a>.</p>
            </div>
        </div>
    </form>
</div>
