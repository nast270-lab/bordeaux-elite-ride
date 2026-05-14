/**
 * Bordeaux Elite Ride — Scroll Effects
 * Animations avancées au défilement
 */
'use strict';

// ─── Counter animation ─────────────────────────────────────────────────
(function () {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el  = entry.target;
            const end = parseInt(el.dataset.count, 10);
            let start = 0;
            const duration = 1500;
            const step = Math.max(1, Math.floor(end / (duration / 16)));
            const timer = setInterval(() => {
                start = Math.min(start + step, end);
                el.textContent = start;
                if (start >= end) clearInterval(timer);
            }, 16);
            observer.unobserve(el);
        });
    }, { threshold: 0.5 });

    counters.forEach(el => observer.observe(el));
})();

// ─── Stagger children animation ───────────────────────────────────────
(function () {
    const parents = document.querySelectorAll('.tarifs-grid, .services-grid, .why-grid, .testimonials-grid, .evolution-grid');
    if (!parents.length) return;

    parents.forEach(parent => {
        const children = parent.children;
        Array.from(children).forEach((child, i) => {
            child.style.transitionDelay = `${i * 80}ms`;
        });
    });
})();

// ─── Contact form AJAX ─────────────────────────────────────────────────
(function () {
    const form    = document.getElementById('contact-form');
    if (!form) return;

    const cfg     = window.berConfig || {};
    const submit  = document.getElementById('contact-submit');
    const success = document.getElementById('contact-success');
    const error   = document.getElementById('contact-error');

    function validateContact() {
        const nom     = form.querySelector('#contact-nom');
        const email   = form.querySelector('#contact-email');
        const message = form.querySelector('#contact-message');
        let valid = true;

        function setErr(el, errId, ok, msg) {
            const errEl = document.getElementById(errId);
            if (!errEl) return ok;
            if (!ok) {
                errEl.textContent = msg;
                el?.classList.add('error');
                valid = false;
            } else {
                errEl.textContent = '';
                el?.classList.remove('error');
            }
        }

        setErr(nom, 'nom-error', nom?.value.trim().length >= 2, 'Nom requis.');
        const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email?.value || '');
        setErr(email, 'email-error', emailOk, 'Email invalide.');
        setErr(message, 'message-error', message?.value.trim().length >= 10, 'Message trop court.');

        return valid;
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!validateContact()) return;

        submit.classList.add('loading');
        submit.disabled = true;
        success.hidden = true;
        error.hidden = true;

        const fd = new FormData(form);
        fd.append('action', 'ber_contact');
        fd.append('nonce', cfg.nonceContact || '');

        try {
            const resp = await fetch(cfg.ajaxUrl || '/wp-admin/admin-ajax.php', {
                method: 'POST',
                body: fd,
            });
            const data = await resp.json();

            if (data.success) {
                form.reset();
                success.hidden = false;
                success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                error.hidden = false;
            }
        } catch {
            error.hidden = false;
        } finally {
            submit.classList.remove('loading');
            submit.disabled = false;
        }
    });

    // Validation temps réel
    form.querySelectorAll('input, textarea').forEach(el => {
        el.addEventListener('blur', validateContact);
    });
})();
