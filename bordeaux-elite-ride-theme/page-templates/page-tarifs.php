<?php
/**
 * Template Name: Page Tarifs
 */
get_header(); ?>

<section class="page-hero" aria-labelledby="page-tarifs-title">
    <div class="container-luxe">
        <div class="eyebrow">
            <span class="gold-divider-mini" aria-hidden="true"></span>
            <span>Transparence tarifaire</span>
            <span class="gold-divider-mini" aria-hidden="true"></span>
        </div>
        <h1 id="page-tarifs-title">Des tarifs fixes,<br>sans surprise</h1>
        <p>Prix annoncés à l'avance. Aucun supplément, aucune mauvaise surprise.</p>
    </div>
</section>

<section class="tarifs-main-section">
    <div class="container-luxe">
        <div class="tarifs-layout">

            <!-- Tableau trajets populaires -->
            <div class="tarifs-content">
                <div class="section-heading">
                    <div class="eyebrow">
                        <span class="gold-divider-mini" aria-hidden="true"></span>
                        <span>Trajets populaires</span>
                    </div>
                    <h2>Au départ de Bordeaux</h2>
                </div>

                <div class="tarifs-table-wrapper" role="region" aria-label="Tableau des tarifs">
                    <table class="tarifs-table">
                        <thead>
                            <tr>
                                <th scope="col">Trajet</th>
                                <th scope="col">Durée estimée</th>
                                <th scope="col">Tarif fixe</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Bordeaux</strong> → Aéroport Mérignac</td>
                                <td>~20 min</td>
                                <td class="price-cell"><strong>45 €</strong></td>
                                <td><a href="<?php echo esc_url( home_url( '/reservation/' ) ); ?>" class="btn btn-gold btn-xs">Réserver</a></td>
                            </tr>
                            <tr>
                                <td><strong>Bordeaux</strong> → Arcachon</td>
                                <td>~50 min</td>
                                <td class="price-cell"><strong>95 €</strong></td>
                                <td><a href="<?php echo esc_url( home_url( '/reservation/' ) ); ?>" class="btn btn-gold btn-xs">Réserver</a></td>
                            </tr>
                            <tr>
                                <td><strong>Bordeaux</strong> → Cap Ferret</td>
                                <td>~1h05</td>
                                <td class="price-cell"><strong>115 €</strong></td>
                                <td><a href="<?php echo esc_url( home_url( '/reservation/' ) ); ?>" class="btn btn-gold btn-xs">Réserver</a></td>
                            </tr>
                            <tr>
                                <td><strong>Bordeaux</strong> → Dune du Pilat</td>
                                <td>~55 min</td>
                                <td class="price-cell"><strong>120 €</strong></td>
                                <td><a href="<?php echo esc_url( home_url( '/reservation/' ) ); ?>" class="btn btn-gold btn-xs">Réserver</a></td>
                            </tr>
                            <tr>
                                <td><strong>Bordeaux</strong> → Saint-Émilion</td>
                                <td>~40 min</td>
                                <td class="price-cell"><strong>110 €</strong></td>
                                <td><a href="<?php echo esc_url( home_url( '/reservation/' ) ); ?>" class="btn btn-gold btn-xs">Réserver</a></td>
                            </tr>
                            <tr>
                                <td><strong>Bordeaux</strong> → Paris (CDG)</td>
                                <td>~5h30</td>
                                <td class="price-cell"><strong>Sur devis</strong></td>
                                <td><a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>" class="btn btn-outline btn-xs">Demander</a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Comparatif -->
                <div class="tarifs-comparatif" aria-labelledby="comparatif-title">
                    <h3 id="comparatif-title">Comparatif tarifaire au km</h3>
                    <div class="comparatif-table-wrapper" role="region" aria-label="Comparatif tarifaire par distance">
                        <table class="comparatif-table">
                            <thead>
                                <tr>
                                    <th scope="col">Distance</th>
                                    <th scope="col">Taxi</th>
                                    <th scope="col">Appli VTC</th>
                                    <th scope="col" class="our-col">Notre tarif</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>5 km</td>
                                    <td>~18 €</td>
                                    <td>~14 €</td>
                                    <td class="our-price"><strong>12 €</strong></td>
                                </tr>
                                <tr>
                                    <td>10 km</td>
                                    <td>~30 €</td>
                                    <td>~24 €</td>
                                    <td class="our-price"><strong>20 €</strong></td>
                                </tr>
                                <tr>
                                    <td>20 km</td>
                                    <td>~55 €</td>
                                    <td>~42 €</td>
                                    <td class="our-price"><strong>36 €</strong></td>
                                </tr>
                                <tr>
                                    <td>30 km</td>
                                    <td>~80 €</td>
                                    <td>~60 €</td>
                                    <td class="our-price"><strong>50 €</strong></td>
                                </tr>
                                <tr>
                                    <td>50 km</td>
                                    <td>~130 €</td>
                                    <td>~95 €</td>
                                    <td class="our-price"><strong>80 €</strong></td>
                                </tr>
                                <tr>
                                    <td>80 km</td>
                                    <td>~200 €</td>
                                    <td>~150 €</td>
                                    <td class="our-price"><strong>120 €</strong></td>
                                </tr>
                                <tr>
                                    <td>120 km</td>
                                    <td>~300 €</td>
                                    <td>~220 €</td>
                                    <td class="our-price"><strong>170 €</strong></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p class="comparatif-note"><em>Tarifs indicatifs, hors suppléments. Confirmation du prix exact avant toute réservation.</em></p>
                </div>
            </div>

            <!-- Sidebar inclusions -->
            <aside class="tarifs-sidebar" aria-labelledby="inclusions-title">
                <div class="inclusions-card">
                    <h3 id="inclusions-title">L'expérience complète incluse</h3>
                    <ul class="inclusions-list" aria-label="Ce qui est inclus dans le prix">
                        <li>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                            Prise en charge à l'adresse exacte
                        </li>
                        <li>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                            Eau minérale offerte
                        </li>
                        <li>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                            Wi-Fi gratuit à bord
                        </li>
                        <li>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                            Suivi vol/train temps réel
                        </li>
                        <li>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                            Aucun supplément bagages
                        </li>
                        <li>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                            Annulation gratuite jusqu'à 24h avant
                        </li>
                        <li>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                            Facture pro disponible
                        </li>
                    </ul>
                </div>

                <div class="tarifs-sidebar-cta">
                    <p>Un trajet qui ne figure pas dans ce tableau ?</p>
                    <a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>" class="btn btn-gold">Demander un devis</a>
                    <a href="tel:<?php echo esc_attr( get_theme_mod( 'ber_phone', '+33644691032' ) ); ?>" class="btn btn-outline">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1 19.79 19.79 0 0 1 1.61 4.5 2 2 0 0 1 3.6 2.32h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l1.87-1.87a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                        Appeler directement
                    </a>
                </div>
            </aside>
        </div>
    </div>
</section>

<?php get_footer();
