<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600&display=swap">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<a href="#main-content" class="skip-link"><?php esc_html_e( 'Aller au contenu', 'bordeaux-elite-ride' ); ?></a>

<header id="site-header" class="site-header" role="banner">
    <div class="header-container">
        <!-- Logo -->
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="header-logo" aria-label="<?php bloginfo( 'name' ); ?> - Accueil">
            <span class="logo-badge" aria-hidden="true">B</span>
            <span class="logo-text">
                <span class="logo-title"><?php echo esc_html( get_theme_mod( 'ber_brand_name', 'Bordeaux Privilège' ) ); ?></span>
                <span class="logo-subtitle"><?php echo esc_html( get_theme_mod( 'ber_brand_tagline', 'Chauffeur Privé' ) ); ?></span>
            </span>
        </a>

        <!-- Navigation principale -->
        <nav id="primary-nav" class="primary-nav" role="navigation" aria-label="Navigation principale">
            <ul class="nav-list">
                <li><a href="<?php echo esc_url( home_url( '/' ) ); ?>" <?php echo is_front_page() ? 'class="active" aria-current="page"' : ''; ?>>Accueil</a></li>
                <li><a href="<?php echo esc_url( home_url( '/services/' ) ); ?>" <?php echo is_page( 'services' ) ? 'class="active" aria-current="page"' : ''; ?>>Services</a></li>
                <li><a href="<?php echo esc_url( home_url( '/flotte/' ) ); ?>" <?php echo is_page( 'flotte' ) ? 'class="active" aria-current="page"' : ''; ?>>Flotte</a></li>
                <li><a href="<?php echo esc_url( home_url( '/tarifs/' ) ); ?>" <?php echo is_page( 'tarifs' ) ? 'class="active" aria-current="page"' : ''; ?>>Tarifs</a></li>
                <li><a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>" <?php echo is_page( 'contact' ) ? 'class="active" aria-current="page"' : ''; ?>>Contact</a></li>
            </ul>
        </nav>

        <!-- Actions header -->
        <div class="header-actions">
            <a href="tel:<?php echo esc_attr( get_theme_mod( 'ber_phone', '+33644691032' ) ); ?>" class="header-phone" aria-label="Appeler">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1 19.79 19.79 0 0 1 1.61 4.5 2 2 0 0 1 3.6 2.32h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l1.87-1.87a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <span><?php echo esc_html( get_theme_mod( 'ber_phone_display', '+33 6 44 69 10 32' ) ); ?></span>
            </a>
            <a href="<?php echo esc_url( home_url( '/reservation/' ) ); ?>" class="btn btn-gold">Réserver</a>
        </div>

        <!-- Burger menu mobile -->
        <button id="mobile-menu-toggle" class="mobile-menu-toggle" aria-expanded="false" aria-controls="primary-nav" aria-label="Menu">
            <span class="burger-line"></span>
            <span class="burger-line"></span>
            <span class="burger-line"></span>
        </button>
    </div>
</header>

<div id="mobile-menu-overlay" class="mobile-menu-overlay" aria-hidden="true">
    <nav class="mobile-nav" role="navigation" aria-label="Menu mobile">
        <ul>
            <li><a href="<?php echo esc_url( home_url( '/' ) ); ?>">Accueil</a></li>
            <li><a href="<?php echo esc_url( home_url( '/services/' ) ); ?>">Services</a></li>
            <li><a href="<?php echo esc_url( home_url( '/flotte/' ) ); ?>">Flotte</a></li>
            <li><a href="<?php echo esc_url( home_url( '/tarifs/' ) ); ?>">Tarifs</a></li>
            <li><a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>">Contact</a></li>
            <li><a href="<?php echo esc_url( home_url( '/reservation/' ) ); ?>" class="btn btn-gold">Réserver maintenant</a></li>
            <li>
                <a href="tel:<?php echo esc_attr( get_theme_mod( 'ber_phone', '+33644691032' ) ); ?>" class="mobile-phone-link">
                    <?php echo esc_html( get_theme_mod( 'ber_phone_display', '+33 6 44 69 10 32' ) ); ?>
                </a>
            </li>
        </ul>
    </nav>
</div>

<main id="main-content" role="main">
