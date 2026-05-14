<?php
/**
 * Page d'accueil du thème Bordeaux Elite Ride
 */
get_header(); ?>

<!-- ===================== SECTION HERO ===================== -->
<section class="hero-section" aria-labelledby="hero-title">
    <div class="hero-media">
        <img src="<?php echo esc_url( BER_URI . '/assets/images/hero-bordeaux.jpg' ); ?>"
             alt="SUV de luxe Bordeaux Privilège - Chauffeur privé Bordeaux"
             class="hero-bg-image"
             loading="eager"
             fetchpriority="high"
             width="1920"
             height="1080">
        <div class="hero-overlay" aria-hidden="true"></div>
    </div>

    <div class="hero-content container-luxe">
        <div class="hero-eyebrow">
            <span class="gold-divider-mini" aria-hidden="true"></span>
            <span>Chauffeur Privé — Bordeaux</span>
            <span class="gold-divider-mini" aria-hidden="true"></span>
        </div>
        <h1 id="hero-title" class="hero-title">Votre chauffeur privé<br><span class="text-gradient-gold">à Bordeaux</span></h1>
        <p class="hero-subtitle">Un chauffeur, un véhicule, une exigence absolue.<br>Confort, ponctualité et discrétion pour chaque trajet.</p>
        <div class="hero-ctas">
            <a href="<?php echo esc_url( home_url( '/reservation/' ) ); ?>" class="btn btn-gold btn-lg">
                Réserver maintenant
            </a>
            <a href="<?php echo esc_url( home_url( '/tarifs/' ) ); ?>" class="btn btn-outline btn-lg">
                Obtenir un devis
            </a>
        </div>
        <div class="hero-indicators" aria-label="Indicateurs de confiance">
            <div class="hero-indicator">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                <span>Carte professionnelle</span>
            </div>
            <div class="hero-indicator">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                <span>Assurance VTC</span>
            </div>
            <div class="hero-indicator">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <span>Disponible 24/7</span>
            </div>
        </div>
    </div>

    <div class="hero-scroll-hint" aria-hidden="true">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
    </div>
</section>

<!-- ===================== SECTION BOOKING ===================== -->
<section id="reservation" class="booking-section" aria-labelledby="booking-title">
    <div class="container-luxe">
        <div class="section-heading center">
            <div class="eyebrow">
                <span class="gold-divider-mini" aria-hidden="true"></span>
                <span>Réservation rapide</span>
                <span class="gold-divider-mini" aria-hidden="true"></span>
            </div>
            <h2 id="booking-title">Votre trajet, en quelques instants</h2>
        </div>
        <?php get_template_part( 'template-parts/booking-form' ); ?>
    </div>
</section>

<!-- ===================== SECTION CHAUFFEUR ===================== -->
<section class="chauffeur-section" aria-labelledby="chauffeur-title">
    <div class="container-luxe">
        <div class="chauffeur-grid">
            <div class="chauffeur-image">
                <img src="<?php echo esc_url( BER_URI . '/assets/images/fleet-suv.jpg' ); ?>"
                     alt="SUV hybride moderne Bordeaux Privilège - Intérieur premium"
                     loading="lazy"
                     width="800"
                     height="600">
                <div class="chauffeur-image-badge" aria-hidden="true">
                    <span class="logo-badge">B</span>
                </div>
            </div>
            <div class="chauffeur-content">
                <div class="eyebrow">
                    <span class="gold-divider-mini" aria-hidden="true"></span>
                    <span>Un engagement personnel</span>
                    <span class="gold-divider-mini" aria-hidden="true"></span>
                </div>
                <h2 id="chauffeur-title">Un chauffeur dédié,<br>un véhicule soigné</h2>
                <p>Bordeaux Privilège, c'est un service à taille humaine : un chauffeur professionnel, un SUV hybride haut de gamme, et une exigence constante de qualité à chaque trajet.</p>
                <ul class="chauffeur-certifs" aria-label="Certifications et garanties">
                    <li>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                        Carte professionnelle VTC délivrée par la préfecture
                    </li>
                    <li>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                        Assurance professionnelle tous risques
                    </li>
                    <li>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                        Tenue professionnelle, discrétion assurée
                    </li>
                    <li>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-09.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                        Interlocuteur unique — vous connaissez votre chauffeur
                    </li>
                </ul>
                <a href="<?php echo esc_url( home_url( '/flotte/' ) ); ?>" class="btn btn-outline">Découvrir notre flotte</a>
            </div>
        </div>
    </div>
</section>

<!-- ===================== SECTION SERVICES ===================== -->
<section class="services-section" aria-labelledby="services-title">
    <div class="container-luxe">
        <div class="section-heading center">
            <div class="eyebrow">
                <span class="gold-divider-mini" aria-hidden="true"></span>
                <span>Nos prestations</span>
                <span class="gold-divider-mini" aria-hidden="true"></span>
            </div>
            <h2 id="services-title">Un service adapté<br>à chaque besoin</h2>
            <p class="section-desc">Des transferts aéroport aux trajets longue distance, nous assurons votre mobilité avec le même niveau d'exigence.</p>
        </div>

        <div class="services-grid" role="list">
            <article class="service-card" role="listitem">
                <div class="service-icon" aria-hidden="true">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <h3>Transferts aéroport</h3>
                <p>Suivi des vols en temps réel, accueil personnalisé au terminal, prise en charge bagages. Bordeaux-Mérignac, Biarritz, Paris CDG.</p>
                <span class="service-tag">Suivi vols inclus</span>
            </article>

            <article class="service-card" role="listitem">
                <div class="service-icon" aria-hidden="true">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                </div>
                <h3>Transferts gare</h3>
                <p>Toutes les gares SNCF de Bordeaux et alentours. Suivi des trains, porte-à-porte garanti quels que soient retards ou modifications.</p>
                <span class="service-tag">Suivi SNCF inclus</span>
            </article>

            <article class="service-card" role="listitem">
                <div class="service-icon" aria-hidden="true">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                </div>
                <h3>Trajets professionnels</h3>
                <p>Déplacements d'affaires, séminaires, rendez-vous clients. Facture pro disponible, Wi-Fi embarqué, confidentialité totale.</p>
                <span class="service-tag">Facturation pro</span>
            </article>

            <article class="service-card" role="listitem">
                <div class="service-icon" aria-hidden="true">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                </div>
                <h3>Longue distance</h3>
                <p>Trajets France entière et Europe. Pauses programmées, itinéraire personnalisé. Devis sur mesure pour chaque destination.</p>
                <span class="service-tag">Devis personnalisé</span>
            </article>
        </div>

        <div class="section-cta">
            <a href="<?php echo esc_url( home_url( '/services/' ) ); ?>" class="btn btn-gold">Voir tous nos services</a>
        </div>
    </div>
</section>

<!-- ===================== SECTION POURQUOI NOUS ===================== -->
<section class="why-section" aria-labelledby="why-title">
    <div class="container-luxe">
        <div class="section-heading center">
            <div class="eyebrow">
                <span class="gold-divider-mini" aria-hidden="true"></span>
                <span>Nos engagements</span>
                <span class="gold-divider-mini" aria-hidden="true"></span>
            </div>
            <h2 id="why-title">Pourquoi choisir<br>Bordeaux Privilège ?</h2>
        </div>

        <div class="why-grid" role="list">
            <div class="why-card" role="listitem">
                <div class="why-icon" aria-hidden="true">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                </div>
                <h3>Prix fixes garantis</h3>
                <p>Aucune surprise. Tarif annoncé avant le trajet, sans supplément.</p>
            </div>
            <div class="why-card" role="listitem">
                <div class="why-icon" aria-hidden="true">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                <h3>Disponible 24/7</h3>
                <p>Tôt le matin, tard le soir ou en week-end — nous sommes là.</p>
            </div>
            <div class="why-card" role="listitem">
                <div class="why-icon" aria-hidden="true">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
                <h3>Chauffeur sérieux</h3>
                <p>Professionnel certifié, ponctuel, discret. Votre image entre de bonnes mains.</p>
            </div>
            <div class="why-card" role="listitem">
                <div class="why-icon" aria-hidden="true">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                </div>
                <h3>Véhicule récent</h3>
                <p>SUV hybride 2023+, entretenu, climatisé. Confort premium garanti.</p>
            </div>
            <div class="why-card" role="listitem">
                <div class="why-icon" aria-hidden="true">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                </div>
                <h3>Suivi vols & trains</h3>
                <p>On adapte l'heure de prise en charge selon les retards en temps réel.</p>
            </div>
            <div class="why-card" role="listitem">
                <div class="why-icon" aria-hidden="true">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                </div>
                <h3>Paiement sécurisé</h3>
                <p>CB, virement, espèces, PayPal. Facture disponible pour les pros.</p>
            </div>
        </div>
    </div>
</section>

<!-- ===================== SECTION TARIFS ===================== -->
<section class="tarifs-preview-section" aria-labelledby="tarifs-title">
    <div class="container-luxe">
        <div class="section-heading center">
            <div class="eyebrow">
                <span class="gold-divider-mini" aria-hidden="true"></span>
                <span>Tarifs indicatifs</span>
                <span class="gold-divider-mini" aria-hidden="true"></span>
            </div>
            <h2 id="tarifs-title">Trajets populaires<br>au départ de Bordeaux</h2>
            <p class="section-desc">Prix fixes, sans surcharge. Consultez nos tarifs complets pour une estimation détaillée.</p>
        </div>

        <div class="tarifs-grid" role="list">
            <div class="tarif-card" role="listitem">
                <div class="tarif-route">
                    <span class="tarif-from">Bordeaux Centre</span>
                    <span class="tarif-arrow" aria-hidden="true">→</span>
                    <span class="tarif-to">Aéroport de Mérignac</span>
                </div>
                <div class="tarif-price"><span class="tarif-amount">45</span> <span class="tarif-currency">€</span></div>
                <span class="tarif-duration">~20 min</span>
            </div>
            <div class="tarif-card" role="listitem">
                <div class="tarif-route">
                    <span class="tarif-from">Bordeaux Centre</span>
                    <span class="tarif-arrow" aria-hidden="true">→</span>
                    <span class="tarif-to">Arcachon</span>
                </div>
                <div class="tarif-price"><span class="tarif-amount">95</span> <span class="tarif-currency">€</span></div>
                <span class="tarif-duration">~50 min</span>
            </div>
            <div class="tarif-card" role="listitem">
                <div class="tarif-route">
                    <span class="tarif-from">Bordeaux Centre</span>
                    <span class="tarif-arrow" aria-hidden="true">→</span>
                    <span class="tarif-to">Cap Ferret</span>
                </div>
                <div class="tarif-price"><span class="tarif-amount">115</span> <span class="tarif-currency">€</span></div>
                <span class="tarif-duration">~1h05</span>
            </div>
            <div class="tarif-card" role="listitem">
                <div class="tarif-route">
                    <span class="tarif-from">Bordeaux Centre</span>
                    <span class="tarif-arrow" aria-hidden="true">→</span>
                    <span class="tarif-to">Dune du Pilat</span>
                </div>
                <div class="tarif-price"><span class="tarif-amount">120</span> <span class="tarif-currency">€</span></div>
                <span class="tarif-duration">~55 min</span>
            </div>
            <div class="tarif-card" role="listitem">
                <div class="tarif-route">
                    <span class="tarif-from">Bordeaux Centre</span>
                    <span class="tarif-arrow" aria-hidden="true">→</span>
                    <span class="tarif-to">Saint-Émilion</span>
                </div>
                <div class="tarif-price"><span class="tarif-amount">110</span> <span class="tarif-currency">€</span></div>
                <span class="tarif-duration">~40 min</span>
            </div>
            <div class="tarif-card tarif-card-devis" role="listitem">
                <div class="tarif-route">
                    <span class="tarif-from">Longue distance</span>
                    <span class="tarif-arrow" aria-hidden="true">→</span>
                    <span class="tarif-to">France & Europe</span>
                </div>
                <div class="tarif-price tarif-devis">Sur devis</div>
                <a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>" class="btn btn-outline btn-sm">Demander</a>
            </div>
        </div>

        <div class="section-cta">
            <a href="<?php echo esc_url( home_url( '/tarifs/' ) ); ?>" class="btn btn-gold">Voir tous les tarifs</a>
        </div>
    </div>
</section>

<!-- ===================== SECTION TÉMOIGNAGES ===================== -->
<section class="testimonials-section" aria-labelledby="testimonials-title">
    <div class="container-luxe">
        <div class="section-heading center">
            <div class="eyebrow">
                <span class="gold-divider-mini" aria-hidden="true"></span>
                <span>Avis clients</span>
                <span class="gold-divider-mini" aria-hidden="true"></span>
            </div>
            <h2 id="testimonials-title">Ils nous font confiance</h2>
        </div>

        <div class="testimonials-grid" role="list">
            <blockquote class="testimonial-card" role="listitem">
                <div class="testimonial-stars" aria-label="Note : 5 étoiles sur 5">
                    <span aria-hidden="true">★★★★★</span>
                </div>
                <p>"Ponctuel, discret, véhicule impeccable. J'utilise Bordeaux Privilège pour tous mes déplacements professionnels. Vraiment au-dessus du lot."</p>
                <footer class="testimonial-author">
                    <strong>Sophie L.</strong>
                    <span>Directrice marketing</span>
                </footer>
            </blockquote>

            <blockquote class="testimonial-card" role="listitem">
                <div class="testimonial-stars" aria-label="Note : 5 étoiles sur 5">
                    <span aria-hidden="true">★★★★★</span>
                </div>
                <p>"Trajet Bordeaux–Paris en toute sérénité. Le chauffeur a géré le retard de mon vol sans problème, m'a tenu informé à chaque étape."</p>
                <footer class="testimonial-author">
                    <strong>Marc D.</strong>
                    <span>Chef d'entreprise</span>
                </footer>
            </blockquote>

            <blockquote class="testimonial-card" role="listitem">
                <div class="testimonial-stars" aria-label="Note : 5 étoiles sur 5">
                    <span aria-hidden="true">★★★★★</span>
                </div>
                <p>"Le service premium que je cherchais. Prix justes, eau et wi-fi à bord, et un chauffeur qui connaît parfaitement la région bordelaise."</p>
                <footer class="testimonial-author">
                    <strong>Claire B.</strong>
                    <span>Voyageuse d'affaires</span>
                </footer>
            </blockquote>
        </div>
    </div>
</section>

<!-- ===================== SECTION VISION ===================== -->
<section class="vision-section" aria-labelledby="vision-title">
    <div class="container-luxe">
        <div class="section-heading center">
            <div class="eyebrow">
                <span class="gold-divider-mini" aria-hidden="true"></span>
                <span>Notre vision</span>
                <span class="gold-divider-mini" aria-hidden="true"></span>
            </div>
            <h2 id="vision-title">Une ambition sur le long terme</h2>
            <p class="section-desc">Bordeaux Privilège est né en 2025. Voici notre feuille de route.</p>
        </div>

        <ol class="timeline" aria-label="Feuille de route Bordeaux Privilège">
            <li class="timeline-item">
                <div class="timeline-year" aria-hidden="true">2025</div>
                <div class="timeline-content">
                    <h3>Lancement</h3>
                    <p>1 chauffeur, 1 SUV hybride haut de gamme. Focus sur l'excellence et la satisfaction client à Bordeaux et sa région.</p>
                </div>
            </li>
            <li class="timeline-item">
                <div class="timeline-year" aria-hidden="true">2026</div>
                <div class="timeline-content">
                    <h3>Second véhicule</h3>
                    <p>Ajout d'un véhicule familial 7 places pour les groupes, les familles et les événements spéciaux.</p>
                </div>
            </li>
            <li class="timeline-item">
                <div class="timeline-year" aria-hidden="true">2027</div>
                <div class="timeline-content">
                    <h3>Équipe partenaires</h3>
                    <p>Réseau de chauffeurs partenaires qualifiés pour répondre à une demande croissante.</p>
                </div>
            </li>
            <li class="timeline-item">
                <div class="timeline-year" aria-hidden="true">2028+</div>
                <div class="timeline-content">
                    <h3>Flotte complète</h3>
                    <p>SUV, berline, van, 7 places. Service clé en main pour particuliers, entreprises et agences de voyage.</p>
                </div>
            </li>
        </ol>
    </div>
</section>

<!-- ===================== SECTION CTA FINAL ===================== -->
<section class="cta-section" aria-labelledby="cta-title">
    <div class="cta-bg" aria-hidden="true"></div>
    <div class="container-luxe cta-content">
        <h2 id="cta-title">Prêt à voyager autrement ?</h2>
        <p>Réservez en ligne en moins de 2 minutes ou appelez-nous directement.</p>
        <div class="cta-actions">
            <a href="<?php echo esc_url( home_url( '/reservation/' ) ); ?>" class="btn btn-gold btn-lg">
                Réserver maintenant
            </a>
            <a href="tel:<?php echo esc_attr( get_theme_mod( 'ber_phone', '+33644691032' ) ); ?>" class="btn btn-outline btn-lg">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1 19.79 19.79 0 0 1 1.61 4.5 2 2 0 0 1 3.6 2.32h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l1.87-1.87a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                Appeler
            </a>
        </div>
    </div>
</section>

<?php get_footer();
