/**
 * Bordeaux Elite Ride — Booking Form
 * Estimation tarifaire + soumission AJAX
 */
'use strict';

(function () {
    const form     = document.getElementById('booking-form');
    if (!form) return;

    const cfg      = window.berConfig || {};
    const fromEl   = document.getElementById('booking-from');
    const toEl     = document.getElementById('booking-to');
    const dateEl   = document.getElementById('booking-date');
    const paxEl    = document.getElementById('booking-pax');
    const phoneEl  = document.getElementById('booking-phone');
    const submit   = document.getElementById('booking-submit');
    const estimate = document.getElementById('booking-estimate');
    const estValue = document.getElementById('estimate-value');
    const successEl = document.getElementById('booking-success');
    const errorEl   = document.getElementById('booking-error');

    // ─── Calcul estimation ──────────────────────────────────────
    const TARIFS_FIXES = {
        'aeroport': { keywords: ['aéroport', 'merignac', 'mérignac', 'bdx'], base: 45 },
        'arcachon': { keywords: ['arcachon'], base: 95 },
        'capferret': { keywords: ['cap ferret', 'cap-ferret'], base: 115 },
        'pilat':    { keywords: ['pilat', 'dune'], base: 120 },
        'sauternion': { keywords: ['saint-émilion', 'saint emilion', 'saintémilion'], base: 110 },
    };

    function estimatePrice(from, to, pax) {
        const dest = (to || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
        for (const [, data] of Object.entries(TARIFS_FIXES)) {
            if (data.keywords.some(kw => dest.includes(kw))) {
                const base = data.base + (pax - 1) * 3;
                return base;
            }
        }
        // Estimation générique basée sur la longueur du texte (heuristique simple)
        if (to && from) {
            const combined = (from + to).length;
            return Math.round(45 + combined * 0.4 + (pax - 1) * 3);
        }
        return null;
    }

    function updateEstimate() {
        const price = estimatePrice(fromEl?.value, toEl?.value, parseInt(paxEl?.value || 1));
        if (price && toEl?.value.length > 3) {
            estimate.hidden = false;
            estValue.textContent = price + ' €';
        } else {
            estimate.hidden = true;
        }
    }

    [fromEl, toEl, paxEl].forEach(el => {
        if (el) el.addEventListener('input', updateEstimate);
    });

    // ─── Validation ────────────────────────────────────────────
    function validateField(el, errorId, condition, msg) {
        const errEl = document.getElementById(errorId);
        if (!el || !errEl) return true;
        if (!condition) {
            errEl.textContent = msg;
            el.classList.add('error');
            return false;
        }
        errEl.textContent = '';
        el.classList.remove('error');
        return true;
    }

    function validateForm() {
        const i18n = cfg.i18n || {};
        let valid = true;
        valid = validateField(fromEl,  'from-error',  fromEl?.value.trim().length >= 3, i18n.required || 'Ce champ est requis.') && valid;
        valid = validateField(toEl,    'to-error',    toEl?.value.trim().length >= 3,   i18n.required || 'Ce champ est requis.') && valid;
        valid = validateField(dateEl,  'date-error',  !!dateEl?.value,                  i18n.required || 'Ce champ est requis.') && valid;
        const phone = phoneEl?.value.trim();
        const phoneOk = phone && /^[+0-9\s\-()]{9,20}$/.test(phone);
        valid = validateField(phoneEl, 'phone-error', phoneOk, i18n.phoneInvalid || 'Numéro invalide.') && valid;
        return valid;
    }

    // ─── Soumission AJAX ────────────────────────────────────────
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        submit.classList.add('loading');
        submit.disabled = true;
        successEl.hidden = true;
        errorEl.hidden = true;

        const formData = new FormData(form);
        formData.append('action', 'ber_booking');
        formData.append('nonce', cfg.nonceBooking || '');

        // Prix estimé
        const price = estimatePrice(fromEl?.value, toEl?.value, parseInt(paxEl?.value || 1));
        if (price) formData.append('estimate', price);

        try {
            const resp = await fetch(cfg.ajaxUrl || '/wp-admin/admin-ajax.php', {
                method: 'POST',
                body: formData,
            });
            const data = await resp.json();

            if (data.success) {
                form.reset();
                estimate.hidden = true;
                successEl.hidden = false;
                successEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                const errMsg = data.data?.message || (cfg.i18n?.error || 'Une erreur est survenue.');
                errorEl.querySelector('p').textContent = errMsg;
                errorEl.hidden = false;
            }
        } catch {
            errorEl.hidden = false;
        } finally {
            submit.classList.remove('loading');
            submit.disabled = false;
        }
    });

    // ─── Validation en temps réel ───────────────────────────────
    [fromEl, toEl, dateEl, phoneEl].forEach(el => {
        if (!el) return;
        el.addEventListener('blur', () => {
            if (el === fromEl) validateField(fromEl, 'from-error', fromEl.value.trim().length >= 3, 'Ce champ est requis.');
            if (el === toEl)   validateField(toEl, 'to-error', toEl.value.trim().length >= 3, 'Ce champ est requis.');
            if (el === dateEl) validateField(dateEl, 'date-error', !!dateEl.value, 'Ce champ est requis.');
            if (el === phoneEl) {
                const phone = phoneEl.value.trim();
                validateField(phoneEl, 'phone-error', !phone || /^[+0-9\s\-()]{9,20}$/.test(phone), 'Numéro invalide.');
            }
        });
    });
})();
