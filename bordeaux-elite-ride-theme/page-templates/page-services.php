<?php
/**
 * Template Name: Page Services
 */
get_header(); ?>

<!-- Hero -->
<section class="page-hero" aria-labelledby="page-services-title">
    <div class="container-luxe">
        <div class="eyebrow">
            <span class="gold-divider-mini" aria-hidden="true"></span>
            <span>Nos prestations</span>
            <span class="gold-divider-mini" aria-hidden="true"></span>
        </div>
        <h1 id="page-services-title">Des services conçus<br>pour votre confort</h1>
        <p>Chaque trajet est une expérience. Découvrez l'ensemble de nos prestations pour particuliers et professionnels.</p>
    </div>
</section>

<!-- Services détaillés -->
<section class="services-detail-section">
    <div class="container-luxe">
        <div class="services-detail-list">

            <article class="service-detail-card" id="aeroport" aria-labelledby="service-aeroport">
                <div class="service-detail-image">
                    <div class="service-detail-icon-large" aria-hidden="true">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    </div>
                </div>
                <div class="service-detail-content">
                    <div class="eyebrow">
                        <span class="gold-divider-mini" aria-hidden="true"></span>
                        <span>Service 01</span>
                    </div>
                    <h2 id="service-aeroport">Transferts aéroport</h2>
                    <p>Votre vol atterrit à Bordeaux-Mérignac, Biarritz, Pau ou Paris CDG ? Votre chauffeur suit le vol en temps réel et adapte l'heure de prise en charge selon les retards. Aucune attente, aucun stress.</p>
                    <ul class="service-detail-features" aria-label="Inclusions du service">
                        <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg> Suivi vol temps réel (FlightAware)</li>
                        <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg> Panneau d'accueil personnalisé au terminal</li>
                        <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg> Aide aux bagages incluse</li>
                        <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg> Tarif fixe porte à porte</li>
                        <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg> 45 min d'attente offerts en cas de retard</li>
                    </ul>
                    <div class="service-detail-price">
                        <span>À partir de <strong>45 €</strong></span>
                        <a href="<?php echo esc_url( home_url( '/reservation/' ) ); ?>" class="btn btn-gold">Réserver</a>
                    </div>
                </div>
            </article>

            <article class="service-detail-card service-detail-card-reverse" id="gare" aria-labelledby="service-gare">
                <div class="service-detail-image">
                    <div class="service-detail-icon-large" aria-hidden="true">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                    </div>
                </div>
                <div class="service-detail-content">
                    <div class="eyebrow">
                        <span class="gold-divider-mini" aria-hidden="true"></span>
                        <span>Service 02</span>
                    </div>
                    <h2 id="service-gare">Transferts gare SNCF</h2>
                    <p>Gare Saint-Jean, Bordeaux-Belcier, ou toute gare de la région. Votre chauffeur suit le train en temps réel et vous attend sur place, quelle que soit l'heure d'arrivée effective.</p>
                    <ul class="service-detail-features" aria-label="Inclusions du service">
                        <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg> Suivi SNCF en temps réel</li>
                        <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg> Accueil en salle des pas perdus</li>
                        <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg> Porte à porte depuis/vers votre domicile</li>
                        <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg> Bagages pris en charge</li>
                    </ul>
                    <div class="service-detail-price">
                        <span>Devis selon trajet</span>
                        <a href="<?php echo esc_url( home_url( '/reservation/' ) ); ?>" class="btn btn-gold">Réserver</a>
                    </div>
                </div>
            </article>

            <article class="service-detail-card" id="professionnel" aria-labelledby="service-pro">
                <div class="service-detail-image">
                    <div class="service-detail-icon-large" aria-hidden="true">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                    </div>
                </div>
                <div class="service-detail-content">
                    <div class="eyebrow">
                        <span class="gold-divider-mini" aria-hidden="true"></span>
                        <span>Service 03</span>
                    </div>
                    <h2 id="service-pro">Trajets professionnels</h2>
                    <p>Séminaires, réunions clients, déplacements inter-sites. Votre chauffeur est votre ambassadeur. Discret, en tenue, Wi-Fi à bord pour travailler pendant le trajet.</p>
                    <ul class="service-detail-features" aria-label="Inclusions du service">
                        <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg> Facture professionnelle</li>
                        <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg> Wi-Fi embarqué gratuit</li>
                        <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg> Confidentialité totale</li>
                        <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg> Compte entreprise disponible</li>
                        <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg> Prise en charge hôtel/bureau</li>
                    </ul>
                    <div class="service-detail-price">
                        <span>Tarif horaire ou forfait</span>
                        <a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>" class="btn btn-gold">Nous contacter</a>
                    </div>
                </div>
            </article>

            <article class="service-detail-card service-detail-card-reverse" id="longue-distance" aria-labelledby="service-ld">
                <div class="service-detail-image">
                    <div class="service-detail-icon-large" aria-hidden="true">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                    </div>
                </div>
                <div class="service-detail-content">
                    <div class="eyebrow">
                        <span class="gold-divider-mini" aria-hidden="true"></span>
                        <span>Service 04</span>
                    </div>
                    <h2 id="service-ld">Longue distance</h2>
                    <p>Bordeaux–Paris, Bordeaux–Biarritz, ou toute destination en France et en Europe. Des pauses sont prévues selon les besoins. Tarif forfaitaire établi à l'avance.</p>
                    <ul class="service-detail-features" aria-label="Inclusions du service">
                        <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg> Devis personnalisé</li>
                        <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg> Pauses programmées</li>
                        <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg> Itinéraire personnalisé</li>
                        <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg> France entière et Europe</li>
                    </ul>
                    <div class="service-detail-price">
                        <span>Sur devis</span>
                        <a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>" class="btn btn-gold">Demander un devis</a>
                    </div>
                </div>
            </article>

            <article class="service-detail-card" id="evenements" aria-labelledby="service-event">
                <div class="service-detail-image">
                    <div class="service-detail-icon-large" aria-hidden="true">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                    </div>
                </div>
                <div class="service-detail-content">
                    <div class="eyebrow">
                        <span class="gold-divider-mini" aria-hidden="true"></span>
                        <span>Service 05</span>
                    </div>
                    <h2 id="service-event">Événements privés</h2>
                    <p>Mariage, anniversaire, soirée de gala, remise de prix. Votre chauffeur en tenue élégante assure les allers-retours avec ponctualité et discrétion pour vos invités VIP.</p>
                    <ul class="service-detail-features" aria-label="Inclusions du service">
                        <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg> Tenue professionnelle soignée</li>
                        <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg> Service champagne disponible</li>
                        <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg> Coordination avec les organisateurs</li>
                        <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg> Multi-points de collecte</li>
                    </ul>
                    <div class="service-detail-price">
                        <span>Forfait événement</span>
                        <a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>" class="btn btn-gold">Demander un devis</a>
                    </div>
                </div>
            </article>

        </div>
    </div>
</section>

<!-- CTA -->
<section class="cta-section">
    <div class="cta-bg" aria-hidden="true"></div>
    <div class="container-luxe cta-content">
        <h2>Votre trajet mérite le meilleur</h2>
        <p>Réservez en quelques instants ou demandez un devis personnalisé.</p>
        <div class="cta-actions">
            <a href="<?php echo esc_url( home_url( '/reservation/' ) ); ?>" class="btn btn-gold btn-lg">Réserver maintenant</a>
            <a href="tel:<?php echo esc_attr( get_theme_mod( 'ber_phone', '+33644691032' ) ); ?>" class="btn btn-outline btn-lg">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1 19.79 19.79 0 0 1 1.61 4.5 2 2 0 0 1 3.6 2.32h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l1.87-1.87a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                Appeler
            </a>
        </div>
    </div>
</section>

<?php get_footer();
