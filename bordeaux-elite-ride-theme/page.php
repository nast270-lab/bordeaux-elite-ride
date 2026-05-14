<?php
/**
 * Template page générique
 */
get_header(); ?>

<section class="page-hero-simple">
    <div class="container-luxe">
        <h1><?php the_title(); ?></h1>
    </div>
</section>

<section class="page-content">
    <div class="container-luxe">
        <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
            <div class="entry-content">
                <?php the_content(); ?>
            </div>
        <?php endwhile; endif; ?>
    </div>
</section>

<?php get_footer();
