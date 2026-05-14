/**
 * Bordeaux Elite Ride — Main JavaScript
 */
'use strict';

// ─── Header scroll effect ─────────────────────────────────────────────
(function () {
    const header = document.getElementById('site-header');
    if (!header) return;

    let ticking = false;
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                header.classList.toggle('scrolled', window.scrollY > 20);
                ticking = false;
            });
            ticking = true;
        }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
})();

// ─── Mobile menu ──────────────────────────────────────────────────────
(function () {
    const toggle  = document.getElementById('mobile-menu-toggle');
    const overlay = document.getElementById('mobile-menu-overlay');
    if (!toggle || !overlay) return;

    function openMenu() {
        toggle.setAttribute('aria-expanded', 'true');
        overlay.classList.add('open');
        overlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        overlay.querySelector('a, button')?.focus();
    }
    function closeMenu() {
        toggle.setAttribute('aria-expanded', 'false');
        overlay.classList.remove('open');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        toggle.focus();
    }

    toggle.addEventListener('click', () => {
        toggle.getAttribute('aria-expanded') === 'true' ? closeMenu() : openMenu();
    });

    // Fermer sur clic overlay
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeMenu();
    });

    // Fermer sur Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('open')) closeMenu();
    });

    // Fermer quand un lien est cliqué
    overlay.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
})();

// ─── Scroll animations (IntersectionObserver) ────────────────────────
(function () {
    const elements = document.querySelectorAll('.animate-on-scroll');
    if (!elements.length) return;

    // Ajouter la classe aux éléments candidates
    const candidates = [
        '.service-card', '.why-card', '.tarif-card', '.testimonial-card',
        '.timeline-item', '.service-detail-card', '.contact-info-card',
        '.evolution-card', '.section-heading',
    ];
    candidates.forEach((sel, i) => {
        document.querySelectorAll(sel).forEach((el, idx) => {
            if (!el.classList.contains('animate-on-scroll')) {
                el.classList.add('animate-on-scroll');
                if (idx < 5) el.classList.add(`delay-${idx + 1}`);
            }
        });
    });

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
})();

// ─── Smooth anchor scroll ─────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const headerH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 72;
            const top = target.getBoundingClientRect().top + window.scrollY - headerH - 16;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ─── Parallax léger sur le hero ───────────────────────────────────────
(function () {
    const heroBg = document.querySelector('.hero-bg-image');
    if (!heroBg || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                if (scrollY < window.innerHeight) {
                    heroBg.style.transform = `translateY(${scrollY * 0.25}px)`;
                }
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
})();
