<?php
/**
 * Template 404
 */
get_header(); ?>

<section class="error-404-section">
    <div class="container-luxe text-center">
        <div class="error-badge" aria-hidden="true">404</div>
        <h1>Page introuvable</h1>
        <p>La page que vous cherchez n'existe pas ou a été déplacée.</p>
        <div class="error-actions">
            <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="btn btn-gold">Retour à l'accueil</a>
            <a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>" class="btn btn-outline">Nous contacter</a>
        </div>
    </div>
</section>

<?php get_footer();
