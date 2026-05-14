<?php
/**
 * Template Name: Page Flotte
 */
get_header(); ?>

<section class="page-hero" aria-labelledby="page-flotte-title">
    <div class="container-luxe">
        <div class="eyebrow">
            <span class="gold-divider-mini" aria-hidden="true"></span>
            <span>Notre véhicule</span>
            <span class="gold-divider-mini" aria-hidden="true"></span>
        </div>
        <h1 id="page-flotte-title">Un SUV hybride moderne,<br>soigné et confortable</h1>
        <p>Un seul véhicule, entretenu avec soin, préparé avant chaque trajet.</p>
    </div>
</section>

<!-- Véhicule principal -->
<section class="flotte-main-section">
    <div class="container-luxe">
        <div class="flotte-grid">
            <div class="flotte-image-wrapper">
                <img src="<?php echo esc_url( BER_URI . '/assets/images/fleet-suv.jpg' ); ?>"
                     alt="SUV hybride Bordeaux Privilège - Vue extérieure, véhicule haut de gamme"
                     loading="lazy"
                     width="800"
                     height="600"
                     class="flotte-main-image">
                <div class="flotte-image-overlay" aria-hidden="true">
                    <div class="flotte-badge">
                        <span>SUV Hybride</span>
                        <span>2023+</span>
                    </div>
                </div>
            </div>

            <div class="flotte-specs">
                <div class="eyebrow">
                    <span class="gold-divider-mini" aria-hidden="true"></span>
                    <span>Spécifications</span>
                </div>
                <h2>Confort premium<br>à bord</h2>

                <div class="flotte-capacity" aria-label="Capacité du véhicule">
                    <div class="capacity-item">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                        <div>
                            <strong>1–4 passagers</strong>
                            <span>Confort garanti</span>
                        </div>
                    </div>
                    <div class="capacity-item">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                        <div>
                            <strong>4 bagages</strong>
                            <span>Grande capacité</span>
                        </div>
                    </div>
                </div>

                <p class="flotte-note">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    Véhicule 7 places potentiellement disponible sur demande pour les groupes familiaux ou événements.
                </p>

                <div class="flotte-amenities" aria-label="Équipements à bord">
                    <h3>Équipements à bord</h3>
                    <ul>
                        <li>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>
                            Wi-Fi gratuit à bord
                        </li>
                        <li>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 10 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/></svg>
                            Climatisation bizone
                        </li>
                        <li>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>
                            Eau minérale offerte
                        </li>
                        <li>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                            Écrans de confort
                        </li>
                        <li>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                            Chargeur USB-C
                        </li>
                        <li>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>
                            Sièges cuir premium
                        </li>
                    </ul>
                </div>

                <a href="<?php echo esc_url( home_url( '/reservation/' ) ); ?>" class="btn btn-gold">Réserver ce véhicule</a>
            </div>
        </div>
    </div>
</section>

<!-- Section évolution -->
<section class="flotte-evolution-section" aria-labelledby="evolution-title">
    <div class="container-luxe">
        <div class="section-heading center">
            <div class="eyebrow">
                <span class="gold-divider-mini" aria-hidden="true"></span>
                <span>Demain</span>
                <span class="gold-divider-mini" aria-hidden="true"></span>
            </div>
            <h2 id="evolution-title">Une flotte amenée à grandir</h2>
            <p class="section-desc">Bordeaux Privilège démarre avec un seul véhicule pour garantir la meilleure qualité de service. À terme, la flotte évoluera pour couvrir tous les besoins.</p>
        </div>

        <div class="evolution-grid" role="list">
            <div class="evolution-card" role="listitem">
                <div class="evolution-icon" aria-hidden="true">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                </div>
                <h3>SUV hybride</h3>
                <p>Le véhicule actuel. Élégant, économique, parfait pour 1 à 4 passagers.</p>
                <span class="evolution-status current">Disponible maintenant</span>
            </div>
            <div class="evolution-card" role="listitem">
                <div class="evolution-icon" aria-hidden="true">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3m-6 12a2 2 0 1 0 4 0 2 2 0 0 0-4 0M21 10l1 9m-4-9h5l-1 9H9l-1-9h13z"/></svg>
                </div>
                <h3>Van familial 7 places</h3>
                <p>Pour les familles, les groupes et les transferts événementiels.</p>
                <span class="evolution-status future">2026 — Sur demande</span>
            </div>
            <div class="evolution-card" role="listitem">
                <div class="evolution-icon" aria-hidden="true">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                </div>
                <h3>Berline de prestige</h3>
                <p>Pour les voyageurs VIP et les occasions exceptionnelles.</p>
                <span class="evolution-status future">2027+</span>
            </div>
        </div>
    </div>
</section>

<section class="cta-section">
    <div class="cta-bg" aria-hidden="true"></div>
    <div class="container-luxe cta-content">
        <h2>Prêt à monter à bord ?</h2>
        <p>Réservez votre prochain trajet dès maintenant.</p>
        <div class="cta-actions">
            <a href="<?php echo esc_url( home_url( '/reservation/' ) ); ?>" class="btn btn-gold btn-lg">Réserver</a>
            <a href="<?php echo esc_url( home_url( '/tarifs/' ) ); ?>" class="btn btn-outline btn-lg">Voir les tarifs</a>
        </div>
    </div>
</section>

<?php get_footer();
