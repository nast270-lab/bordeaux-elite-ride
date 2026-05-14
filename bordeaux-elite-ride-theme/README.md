# Bordeaux Elite Ride — Thème WordPress Premium

Thème WordPress custom pour service VTC chauffeur privé à Bordeaux.  
Design luxueux avec chatbot IA Claude, réservation en ligne, SEO optimisé.

---

## Prérequis

- WordPress 6.0+
- PHP 8.0+
- Serveur avec support HTTPS
- Accès FTP ou SFTP

---

## Installation

### 1. Copier le thème

```bash
cp -r bordeaux-elite-ride-theme/ /chemin/vers/wp-content/themes/
```

Ou compressez le dossier et téléversez via **Apparence → Thèmes → Ajouter → Téléverser**.

### 2. Activer le thème

Dans WordPress : **Apparence → Thèmes → Bordeaux Elite Ride → Activer**

### 3. Créer les pages

Créez ces pages dans **Pages → Ajouter** avec les slugs exacts :

| Titre | Slug | Template |
|-------|------|----------|
| Accueil | `accueil` | *(défaut — front-page.php s'applique automatiquement)* |
| Services | `services` | Page Services |
| Notre flotte | `flotte` | Page Flotte |
| Tarifs | `tarifs` | Page Tarifs |
| Réservation | `reservation` | Page Réservation |
| Contact | `contact` | Page Contact |

Définir la page d'accueil : **Réglages → Lecture → La page d'accueil affiche → Une page statique → Accueil**

### 4. Configurer le thème

**Apparence → Personnaliser → Bordeaux Elite Ride**

- **Identité** : Nom de marque, téléphone, email, WhatsApp
- **Réseaux sociaux** : URLs Instagram, Facebook, LinkedIn
- **API & Intégrations** : Activer/désactiver chatbot, limite rate
- **SEO** : Meta description par défaut, image Open Graph

### 5. Configurer la clé API Claude (chatbot)

Ajoutez dans `wp-config.php` (avant `/* That's all, stop editing! */`) :

```php
define('ANTHROPIC_API_KEY', 'sk-ant-api03-VOTRE_CLE_ICI');
define('BER_OWNER_EMAIL', 'votre@email.fr');
```

Obtenez votre clé sur [console.anthropic.com](https://console.anthropic.com/).

---

## Plugins recommandés

| Plugin | Usage | Obligatoire |
|--------|-------|-------------|
| **Yoast SEO** | SEO avancé (remplace les meta du thème) | Recommandé |
| **WP Rocket** ou **W3 Total Cache** | Cache & performance | Recommandé |
| **Wordfence Security** | Sécurité & firewall | Recommandé |
| **WP Mail SMTP** | Envoi d'emails fiable | Recommandé |
| **UpdraftPlus** | Sauvegardes automatiques | Conseillé |

---

## Configuration des plugins

### Yoast SEO
- Remplir le profil d'organisation (nom, logo, coordonnées)
- Configurer le sitemap XML (activé par défaut)
- Les meta du thème s'effacent automatiquement si Yoast est actif

### WP Rocket
Configuration recommandée :
- Cache : activé
- Fichiers : minifier CSS + JS
- Media : lazy loading images activé
- Preload : activer le preload cache

### Wordfence
- Scanner le thème lors de l'activation
- Activer le pare-feu applicatif
- Configurer les alertes email

---

## Configuration serveur (performance)

### Apache (.htaccess)
```apache
# Compression Gzip
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/css application/javascript
</IfModule>

# Cache navigateur
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/webp "access plus 1 year"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

### Variables d'environnement (Apache)
```apache
# Dans VirtualHost ou .htaccess
SetEnv ANTHROPIC_API_KEY sk-ant-api03-...
SetEnv BER_OWNER_EMAIL admin@votredomaine.fr
```

---

## Structure du thème

```
bordeaux-elite-ride-theme/
├── style.css                    # Info thème
├── functions.php                # Chargement des modules
├── index.php                    # Template fallback
├── front-page.php               # Page d'accueil
├── header.php                   # En-tête global
├── footer.php                   # Pied de page + chatbot
├── page.php                     # Page générique
├── 404.php                      # Page d'erreur
├── template-parts/
│   └── booking-form.php         # Formulaire de réservation
├── page-templates/
│   ├── page-services.php        # Template Services
│   ├── page-flotte.php          # Template Flotte
│   ├── page-tarifs.php          # Template Tarifs
│   ├── page-reservation.php     # Template Réservation
│   └── page-contact.php         # Template Contact
├── inc/
│   ├── theme-setup.php          # Fonctionnalités thème
│   ├── enqueue.php              # Chargement assets
│   ├── customizer.php           # Options admin
│   ├── seo.php                  # Meta tags & OG
│   ├── schema.php               # Schema.org JSON-LD
│   ├── security.php             # Headers & protection
│   ├── booking.php              # Handler réservation
│   ├── contact.php              # Handler contact
│   └── chatbot.php              # API Claude
└── assets/
    ├── css/
    │   ├── main.css             # Design system complet
    │   └── chatbot.css          # Widget chatbot
    ├── js/
    │   ├── main.js              # Header, menu, animations
    │   ├── booking.js           # Formulaire réservation
    │   ├── chatbot.js           # Widget chatbot
    │   └── scroll-effects.js    # Animations + formulaire contact
    └── images/
        ├── hero-bordeaux.jpg    # Image hero (à remplacer)
        └── fleet-suv.jpg        # Image flotte (à remplacer)
```

---

## Checklist sécurité

- [x] Nonces WordPress sur tous les formulaires AJAX
- [x] Rate limiting (5 req/10min formulaires, 20 msg/h chatbot)
- [x] Honeypot anti-spam sur tous les formulaires
- [x] Sanitisation de toutes les entrées (sanitize_text_field, sanitize_email, etc.)
- [x] Headers HTTP de sécurité (CSP, X-Frame-Options, X-XSS-Protection)
- [x] XMLRPC désactivé
- [x] Version WordPress masquée
- [x] Clés API dans les constantes PHP (pas dans le code JS)
- [x] Limitation des tentatives de connexion
- [ ] Wordfence installé et configuré
- [ ] HTTPS forcé (à configurer dans Réglages → Général)
- [ ] Sauvegardes automatiques configurées
- [ ] Mise à jour WordPress + plugins régulière

---

## Checklist SEO

- [x] Balises title optimisées par page
- [x] Meta descriptions configurables
- [x] Schema.org LocalBusiness + TaxiService
- [x] Open Graph (Facebook, LinkedIn)
- [x] Twitter Card
- [x] Balise canonique
- [x] Sitemap XML (via Yoast SEO)
- [x] Structure H1/H2/H3 cohérente
- [x] Images avec attribut alt descriptif
- [x] Core Web Vitals : defer JS, lazy loading images, fonts preconnect
- [ ] Google Search Console vérifié
- [ ] Google My Business configuré
- [ ] Avis Google intégrés

---

## Personnalisation des couleurs

Modifiez les variables CSS dans `assets/css/main.css` :

```css
:root {
  --color-gold:   #D4A574;  /* Couleur signature or */
  --color-navy:   #132547;  /* Bleu marine */
  --color-bg:     #FFFBF2;  /* Ivoire chaud */
}
```

---

## Support & maintenance

- Mettre à jour WordPress régulièrement
- Tester les formulaires après chaque mise à jour de plugins
- Vérifier la clé API Claude mensuellement (quota)
- Monitorer les logs d'erreur PHP

---

*Thème développé pour Bordeaux Privilège — Service VTC Premium*
