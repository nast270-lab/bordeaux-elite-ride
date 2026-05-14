<?php
/**
 * Fallback template
 */
get_header(); ?>

<main id="main-content" class="container-luxe py-20">
    <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
        <article>
            <h1><?php the_title(); ?></h1>
            <?php the_content(); ?>
        </article>
    <?php endwhile; else : ?>
        <p><?php esc_html_e( 'Aucun contenu trouvé.', 'bordeaux-elite-ride' ); ?></p>
    <?php endif; ?>
</main>

<?php get_footer();
